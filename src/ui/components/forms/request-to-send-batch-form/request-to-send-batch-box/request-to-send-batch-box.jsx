import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'

import {TranslationKey} from '@constants/translations/translation-key'

import {ErrorButton} from '@components/buttons/error-button/error-button'
import {BoxViewForm} from '@components/forms/box-view-form'
import {Modal} from '@components/modal'

import {calcVolumeWeightForBox, calcFinalWeightForBox} from '@utils/calculation'
import {getShortenStringIfLongerThanCount} from '@utils/change-string-length'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixedWithDollarSign, toFixedWithKg} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './request-to-send-batch-box.styles'

export const RequestToSendBatchBox = ({box, price, onClickRemoveBoxFromBatch, volumeWeightCoefficient}) => {
  const classNames = useClassNames()

  const [showBoxViewModal, setShowBoxViewModal] = useState(false)

  const tableCellClsx = clsx(classNames.tableCell, {[classNames.boxNoPrice]: !price})

  const copyValue = value => {
    navigator.clipboard.writeText(value)
  }

  const isNoBarCodGlued = box.items.some(
    item => !item.isBarCodeAlreadyAttachedByTheSupplier && !item.isBarCodeAttachedByTheStorekeeper,
  )

  return (
    <div
      className={clsx(classNames.box, classNames.row, {[classNames.badBox]: isNoBarCodGlued})}
      onDoubleClick={() => setShowBoxViewModal(!showBoxViewModal)}
    >
      <div className={clsx(tableCellClsx, classNames.indexCell)}>
        <Typography variant="subtitle2">{`№ ${box.humanFriendlyId}`}</Typography>
      </div>

      <div className={clsx(tableCellClsx, classNames.productCell)}>
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
                      className={clsx(classNames.spanText, {[classNames.alertSpan]: !box.items[0].product.barCode})}
                    >
                      {t(TranslationKey.BarCode)}
                    </Typography>

                    {/* <div className={classNames.checkboxWrapper}>
                      <Typography className={clsx({[classNames.alertSpan]: isNoBarCodGlued})}>
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

                        <img
                          className={classNames.copyImg}
                          src="/assets/icons/copy-img.svg"
                          alt=""
                          onClick={() => copyValue(box.items[0].product.barCode)}
                        />
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
                      <Typography className={clsx(classNames.spanText, {[classNames.alertSpan]: !item.barCode})}>
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

                          <img
                            className={classNames.copyImg}
                            src="/assets/icons/copy-img.svg"
                            alt=""
                            onClick={() => copyValue(item.barCode)}
                          />
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
      </div>

      <div className={clsx(tableCellClsx, classNames.dementionsCell)}>
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
          <Typography className={classNames.dementionsTitle}>{t(TranslationKey['Final weight'])}</Typography>

          <Typography className={classNames.dementionsSpanText}>
            {toFixedWithKg(calcFinalWeightForBox(box, volumeWeightCoefficient), 2)}
          </Typography>
        </div>
      </div>

      <div className={clsx(tableCellClsx, classNames.shippingLabelCell)}>
        <div className={classNames.shippingLabelWrapper}>
          <Typography className={clsx(classNames.spanText, {[classNames.alertSpan]: !box.shippingLabel})}>
            {t(TranslationKey['Shipping label'])}
          </Typography>

          {box.shippingLabel ? (
            <div className={classNames.linkWrapper}>
              <a download target="_blank" rel="noreferrer" href={box.shippingLabel} className={classNames.downloadLink}>
                {t(TranslationKey.download)}
              </a>

              <img
                className={classNames.copyImg}
                src="/assets/icons/copy-img.svg"
                alt=""
                onClick={() => copyValue(box.shippingLabel)}
              />
            </div>
          ) : (
            <Typography className={classNames.alertSpan}>{t(TranslationKey.Missing)}</Typography>
          )}
        </div>
      </div>

      <div className={clsx(tableCellClsx, classNames.priceCell)}>
        <Typography className={classNames.spanText}>{t(TranslationKey['Box delivery cost'])}</Typography>
      </div>

      <div className={clsx(tableCellClsx, classNames.priceCellRight)}>
        {price ? <Typography variant="h5">{toFixedWithDollarSign(price, 2)}</Typography> : null}
      </div>

      <div className={classNames.tableCellCrossBtn}>
        <ErrorButton className={classNames.crossBtn} onClick={onClickRemoveBoxFromBatch}>
          X
        </ErrorButton>
      </div>

      <Modal openModal={showBoxViewModal} setOpenModal={() => setShowBoxViewModal(!showBoxViewModal)}>
        <BoxViewForm
          box={box}
          volumeWeightCoefficient={volumeWeightCoefficient}
          setOpenModal={() => setShowBoxViewModal(!showBoxViewModal)}
        />
      </Modal>
    </div>
  )
}
