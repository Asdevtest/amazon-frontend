import { cx } from '@emotion/css'
import React, { useState } from 'react'

import { Checkbox, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { BoxViewForm } from '@components/forms/box-view-form'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { Modal } from '@components/shared/modal'

import { calcFinalWeightForBox, calcVolumeWeightForBox, calculateDeliveryCostPerPcs } from '@utils/calculation'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getShortenStringIfLongerThanCount, toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './request-to-send-batch-box.styles'

export const RequestToSendBatchBox = ({
  box,
  price,
  onClickRemoveBoxFromBatch,
  volumeWeightCoefficient,
  userInfo,
  onSubmitChangeBoxFields,
  onClickHsCode,
}) => {
  const { classes: classNames } = useClassNames()
  const [showBoxViewModal, setShowBoxViewModal] = useState(false)

  const tableCellClsx = cx(classNames.tableCell)

  const isNoBarCodGlued = box.items.some(
    item => !item.isBarCodeAlreadyAttachedByTheSupplier && !item.isBarCodeAttachedByTheStorekeeper,
  )

  const isSmallWeight = calcFinalWeightForBox(box, volumeWeightCoefficient) < 12

  const isBadBox =
    isNoBarCodGlued ||
    (!box.shippingLabel && !box.destination?.storekeeperId) ||
    !price ||
    // Новое условие для подсветки красным
    !box.items.some(item => item.barCode)

  return (
    <tr
      className={cx(classNames.box, classNames.row, { [classNames.badBox]: isBadBox })}
      onDoubleClick={() => setShowBoxViewModal(!showBoxViewModal)}
    >
      <div className={cx(tableCellClsx, classNames.indexCell)}>
        <Typography variant="subtitle2">{`№ ${box.humanFriendlyId}`}</Typography>
      </div>

      <div className={cx(tableCellClsx, classNames.productCell)}>
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
                    <Typography className={cx(classNames.spanText, { [classNames.alertSpan]: !box.items[0].barCode })}>
                      {t(TranslationKey.BarCode)}
                    </Typography>

                    {box.items[0].barCode ? (
                      <div className={classNames.linkWrapper}>
                        <a
                          download
                          target="_blank"
                          rel="noreferrer"
                          href={box.items[0].barCode}
                          className={classNames.downloadLink}
                        >
                          {t(TranslationKey.download)}
                        </a>
                        <CopyValue text={box.items[0].barCode} />
                      </div>
                    ) : (
                      <Typography className={classNames.alertSpan}>{t(TranslationKey.Missing)}</Typography>
                    )}

                    <div className={classNames.checkboxWrapper}>
                      <Typography className={cx({ [classNames.alertSpan]: isNoBarCodGlued })}>
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
                    </div>
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
                      <Typography className={cx(classNames.spanText, { [classNames.alertSpan]: !item.barCode })}>
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

                      <div className={classNames.checkboxWrapper}>
                        <Typography className={cx({ [classNames.alertSpan]: isNoBarCodGlued })}>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={cx(tableCellClsx, classNames.dementionsCell)}>
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
          <Typography className={classNames.alertText}>{`(${t(
            TranslationKey['Weight less than 12 kg!'],
          )})`}</Typography>
        ) : null}

        {box.amount > 1 ? (
          <div className={classNames.dementionsSubWrapper}>
            <Typography className={classNames.dementionsTitle}>{t(TranslationKey['Total final weight'])}</Typography>

            <Typography className={classNames.dementionsSpanText}>
              {toFixedWithKg(calcFinalWeightForBox(box, volumeWeightCoefficient) * box.amount, 2)}
            </Typography>
          </div>
        ) : null}
      </div>

      <td>
        <div className={classNames.shippingLabelWrapper}>
          <Typography className={cx(classNames.spanText, { [classNames.alertSpan]: !box.shippingLabel })}>
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
        {box.items.map((item, index) => {
          const deliveryCostPerPcs = calculateDeliveryCostPerPcs({
            itemSupplierBoxWeightGrossKg: item.order.orderSupplier.boxProperties?.boxWeighGrossKg,
            deliveryCost: price,
            itemAmount: item.amount,
            itemSupplierAmountInBox: item.order.orderSupplier.boxProperties?.amountInBox,
            boxFinalWeight: calcFinalWeightForBox(box, volumeWeightCoefficient),
            box,
          })

          return (
            <div key={index}>
              <div className={cx(tableCellClsx, classNames.priceCell)}>
                <Typography className={classNames.dementionsTitle}>
                  {t(TranslationKey['Average delivery cost per pc'])}
                </Typography>
              </div>

              <div className={cx(tableCellClsx, classNames.priceCellRight)}>
                <Typography className={classNames.priceText}>
                  {deliveryCostPerPcs ? toFixedWithDollarSign(deliveryCostPerPcs, 2) : t(TranslationKey['No data'])}
                </Typography>
              </div>
            </div>
          )
        })}
      </td>
      {/* cx(tableCellClsx, classNames.priceCell) */}
      {box.amount > 1 ? (
        <td className={classNames.suberboxPriceCellWrapper}>
          <div className={classNames.suberboxPriceCell}>
            <div className={classNames.priceCell}>
              <Typography className={classNames.dementionsTitle}>{t(TranslationKey['Box delivery cost'])}</Typography>
            </div>
            <div className={classNames.priceCellRight}>
              <Typography className={classNames.priceText}>{toFixedWithDollarSign(price / box.amount, 2)}</Typography>
            </div>
          </div>
          <div className={classNames.suberboxPriceCell}>
            <div className={classNames.priceCell}>
              <Typography className={classNames.dementionsTitle}>{t(TranslationKey['Delivery cost'])}</Typography>
            </div>
            <div className={classNames.priceCellRight}>
              <Typography className={classNames.priceText}>{toFixedWithDollarSign(price, 2)}</Typography>
            </div>
          </div>
        </td>
      ) : (
        <>
          <td className={cx(tableCellClsx, classNames.priceCell)}>
            <Typography className={classNames.spanText}>{t(TranslationKey['Box delivery cost'])}</Typography>
          </td>
          <td className={cx(tableCellClsx, classNames.priceCellRight)}>
            {/* <Typography variant="h5">{toFixedWithDollarSign(price, 2)}</Typography> */}
            <Typography className={classNames.priceText}>{toFixedWithDollarSign(price, 2)}</Typography>
          </td>
        </>
      )}

      {/* <td className={cx(tableCellClsx, classNames.priceCellRight)}>
        {box.amount > 1 ? (
          price ? (
            <>
              <Typography variant="h5">{toFixedWithDollarSign(price / box.amount, 2)}</Typography>
              <Typography variant="h5">{toFixedWithDollarSign(price, 2)}</Typography>
            </>
          ) : (
            <Typography variant="h5">{'-'}</Typography>
          )
        ) : price ? (
          <Typography variant="h5">{toFixedWithDollarSign(price, 2)}</Typography>
        ) : (
          <Typography variant="h5">{'-'}</Typography>
        )}
      </td> */}

      <td className={classNames.tableCellCrossBtn}>
        <Button danger className={classNames.crossBtn} onClick={onClickRemoveBoxFromBatch}>
          X
        </Button>
      </td>

      <Modal openModal={showBoxViewModal} setOpenModal={() => setShowBoxViewModal(!showBoxViewModal)}>
        <BoxViewForm
          userInfo={userInfo}
          box={box}
          volumeWeightCoefficient={volumeWeightCoefficient}
          setOpenModal={() => setShowBoxViewModal(!showBoxViewModal)}
          onSubmitChangeFields={data => {
            onSubmitChangeBoxFields(data, true)
            setShowBoxViewModal(!showBoxViewModal)
          }}
          onClickHsCode={onClickHsCode}
        />
      </Modal>
    </tr>
  )
}
