import {cx} from '@emotion/css'
import {Typography} from '@mui/material'

import React, {useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value/copy-value'
import {BoxViewForm} from '@components/forms/box-view-form'
import {Modal} from '@components/modal'

import {calcVolumeWeightForBox, calcFinalWeightForBox} from '@utils/calculation'
import {getShortenStringIfLongerThanCount} from '@utils/change-string-length'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixedWithDollarSign, toFixedWithKg} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './request-to-send-batch-box.styles'

export const RequestToSendBatchBox = ({box, price, onClickRemoveBoxFromBatch, volumeWeightCoefficient}) => {
  const {classes: classNames} = useClassNames()
  const [showBoxViewModal, setShowBoxViewModal] = useState(false)

  const tableCellClsx = cx(classNames.tableCell, {[classNames.boxNoPrice]: !price})

  const isNoBarCodGlued = box.items.some(
    item => !item.isBarCodeAlreadyAttachedByTheSupplier && !item.isBarCodeAttachedByTheStorekeeper,
  )

  const isSmallWeight = calcFinalWeightForBox(box, volumeWeightCoefficient) < 12

  const isBadBox = isNoBarCodGlued || !box.shippingLabel

  const calculateDeliveryCostPerPcs = (items, boxWeigh, price, amount, amountInBox) => {
    if (items.length === 1 && boxWeigh) {
      return toFixedWithDollarSign(price / amount, 2)
    } else if (items.length > 1 && boxWeigh) {
      const finalWeight = toFixedWithDollarSign(
        (price * (((boxWeigh / amountInBox) * amount) / calcFinalWeightForBox(box, volumeWeightCoefficient))) / amount,
        2,
      )

      return finalWeight
    } else {
      return t(TranslationKey['No data'])
    }
  }

  return (
    <tr
      className={cx(classNames.box, classNames.row, {[classNames.badBox]: isBadBox})}
      onDoubleClick={() => setShowBoxViewModal(!showBoxViewModal)}
    >
      <td className={cx(tableCellClsx, classNames.indexCell)}>
        <Typography variant="subtitle2">{`№ ${box.humanFriendlyId}`}</Typography>
      </td>

      <td className={cx(tableCellClsx, classNames.productCell)}>
        <div className={classNames.boxWrapper}>
          {box.amount > 1 ? (
            <div className={classNames.boxItemWrapper}>
              <img src={getAmazonImageUrl(box.items[0].product.images[0])} className={classNames.img} />

              <div className={classNames.boxItemSubWrapper}>
                <Typography className={classNames.amazonTitle}>{`${getShortenStringIfLongerThanCount(
                  box.items[0].product.amazonTitle,
                  40,
                )}`}</Typography>

                <div className={classNames.boxItemSubInfoWrapper}>
                  <div className={classNames.boxItemSubSubInfoWrapper}>
                    <Typography variant="subtitle1">{`ASIN: ${box.items[0].product.asin}`}</Typography>

                    <Typography variant="subtitle1">{`${t(TranslationKey.Quantity)} ${box.items[0].amount} ${t(
                      TranslationKey['pcs.'],
                    )}`}</Typography>

                    <Typography className={classNames.superBoxTypo}>{`Superbox x ${box.amount}`}</Typography>
                  </div>

                  <div className={classNames.barCodeLabelWrapper}>
                    <Typography
                      className={cx(classNames.spanText, {[classNames.alertSpan]: !box.items[0].product.barCode})}
                    >
                      {t(TranslationKey.BarCode)}
                    </Typography>

                    {/* <div className={classNames.checkboxWrapper}>
                      <Typography className={cx({[classNames.alertSpan]: isNoBarCodGlued})}>
                        {t(TranslationKey.glued)}
                      </Typography>

                      <Checkbox
                        disabled
                        color="primary"
                        checked={
                          box.items[0].isBarCodeAlreadyAttachedByTheSupplier ||
                          box.items[0].isBarCodeAttachedByTheStorekeeper
                        }
                      />
                    </div> */}

                    {box.items[0].product.barCode ? (
                      <div className={classNames.linkWrapper}>
                        <a
                          download
                          target="_blank"
                          rel="noreferrer"
                          href={box.items[0].product.barCode}
                          className={classNames.downloadLink}
                        >
                          {t(TranslationKey.download)}
                        </a>
                        <CopyValue text={box.items[0].product.barCode} />
                      </div>
                    ) : (
                      <Typography className={classNames.alertSpan}>{'N/A'}</Typography>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            box.items.map((item, idx) => (
              <div key={idx} className={classNames.boxItemWrapper}>
                <img src={getAmazonImageUrl(item.product.images[0])} className={classNames.img} />

                <div className={classNames.boxItemSubWrapper}>
                  <Typography className={classNames.amazonTitle}>{`${getShortenStringIfLongerThanCount(
                    item.product.amazonTitle,
                    40,
                  )}`}</Typography>

                  <div className={classNames.boxItemSubInfoWrapper}>
                    <div className={classNames.boxItemSubSubInfoWrapper}>
                      <Typography variant="subtitle1">{`ASIN: ${box.items[0].product.asin}`}</Typography>

                      <Typography variant="subtitle1">{`${t(TranslationKey.Quantity)} ${item.amount} ${t(
                        TranslationKey['pcs.'],
                      )}`}</Typography>
                    </div>

                    <div className={classNames.barCodeLabelWrapper}>
                      <Typography className={cx(classNames.spanText, {[classNames.alertSpan]: !item.barCode})}>
                        {t(TranslationKey.BarCode)}
                      </Typography>

                      {item.barCode ? (
                        <div className={classNames.linkWrapper}>
                          <a
                            download
                            target="_blank"
                            rel="noreferrer"
                            href={item.barCode}
                            className={classNames.downloadLink}
                          >
                            {t(TranslationKey.download)}
                          </a>
                          <CopyValue text={item.barCode} />
                        </div>
                      ) : (
                        <Typography className={classNames.alertSpan}>{t(TranslationKey.Missing)}</Typography>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </td>

      <td className={cx(tableCellClsx, classNames.dementionsCell)}>
        <div className={classNames.dementionsSubWrapper}>
          <Typography className={classNames.dementionsTitle}>{t(TranslationKey['Actual weight'])}</Typography>

          <Typography className={classNames.dementionsSpanText}>
            {toFixedWithKg(box.weighGrossKgWarehouse, 2)}
          </Typography>
        </div>

        <div className={classNames.dementionsSubWrapper}>
          <Typography className={classNames.dementionsTitle}>{t(TranslationKey['Volume weight'])}</Typography>

          <Typography className={classNames.dementionsSpanText}>
            {toFixedWithKg(calcVolumeWeightForBox(box, volumeWeightCoefficient), 2)}
          </Typography>
        </div>

        <div className={classNames.dementionsSubWrapper}>
          <Typography
            className={cx(classNames.dementionsTitle, {
              [classNames.alertText]: isSmallWeight,
            })}
          >
            {t(TranslationKey['Final weight'])}
          </Typography>

          <Typography
            className={cx(classNames.dementionsSpanText, {
              [classNames.alertText]: isSmallWeight,
            })}
          >
            {toFixedWithKg(calcFinalWeightForBox(box, volumeWeightCoefficient), 2)}
          </Typography>
        </div>

        {calcFinalWeightForBox(box, volumeWeightCoefficient) < 12 ? (
          <span className={classNames.alertText}>{`(${t(TranslationKey['Weight less than 12 kg!'])})`}</span>
        ) : null}
      </td>

      <td className={cx(tableCellClsx, classNames.shippingLabelCell)}>
        <div className={classNames.shippingLabelWrapper}>
          <Typography className={cx(classNames.spanText, {[classNames.alertSpan]: !box.shippingLabel})}>
            {t(TranslationKey['Shipping label'])}
          </Typography>

          {box.shippingLabel ? (
            <div className={classNames.linkWrapper}>
              <a download target="_blank" rel="noreferrer" href={box.shippingLabel} className={classNames.downloadLink}>
                {t(TranslationKey.download)}
              </a>
              <CopyValue text={box.shippingLabel} />
            </div>
          ) : (
            <Typography className={classNames.alertSpan}>{t(TranslationKey.Missing)}</Typography>
          )}
        </div>
      </td>
      <td className={cx(tableCellClsx, classNames.pricePerAmoutCell)}>
        {box.items.map((item, index) => (
          <div key={index}>
            <div className={cx(tableCellClsx, classNames.priceCell)}>
              <Typography className={classNames.spanText}>
                {t(TranslationKey['Average delivery cost per pc'])}
              </Typography>
            </div>

            <div className={cx(tableCellClsx, classNames.priceCellRight)}>
              <Typography variant="h5">
                {calculateDeliveryCostPerPcs(
                  box.items,
                  item.product.currentSupplier.boxProperties?.boxWeighGrossKg,
                  price,
                  item.amount,
                  item.product.currentSupplier.boxProperties?.amountInBox,
                  box.weighGrossKgWarehouse,
                )}
                {/* {box.items.length === 1 && item.product.currentSupplier.boxProperties?.boxWeighGrossKg
                  ? toFixedWithDollarSign(price / item.amount)
                  : t(TranslationKey['No data'])}
                {box.items.length > 1 && item.product.currentSupplier.boxProperties?.boxWeighGrossKg
                  ? toFixedWithDollarSign(
                      (price *
                        toFixed(
                          ((item.product.currentSupplier.boxProperties?.boxWeighGrossKg /
                            item.product.currentSupplier.boxProperties?.amountInBox) *
                            item.amount) /
                            toFixed(box.weighGrossKgWarehouse, 2),
                        )) /
                        item.amount,
                      2,
                    )
                  : t(TranslationKey['No data'])} */}
              </Typography>
            </div>
          </div>
        ))}
      </td>

      <td className={cx(tableCellClsx, classNames.priceCell)}>
        <Typography className={classNames.spanText}>{t(TranslationKey['Box delivery cost'])}</Typography>
      </td>

      <td className={cx(tableCellClsx, classNames.priceCellRight)}>
        {price ? <Typography variant="h5">{toFixedWithDollarSign(price, 2)}</Typography> : null}
      </td>

      <td className={classNames.tableCellCrossBtn}>
        <Button danger className={classNames.crossBtn} onClick={onClickRemoveBoxFromBatch}>
          X
        </Button>
      </td>

      <Modal openModal={showBoxViewModal} setOpenModal={() => setShowBoxViewModal(!showBoxViewModal)}>
        <BoxViewForm
          box={box}
          volumeWeightCoefficient={volumeWeightCoefficient}
          setOpenModal={() => setShowBoxViewModal(!showBoxViewModal)}
        />
      </Modal>
    </tr>
  )
}
