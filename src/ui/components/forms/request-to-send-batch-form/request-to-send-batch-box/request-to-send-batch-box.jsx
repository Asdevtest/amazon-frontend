import React from 'react'

import {Checkbox, Typography} from '@material-ui/core'
import clsx from 'clsx'

import {ErrorButton} from '@components/buttons/error-button/error-button'

import {calcVolumeWeightForBox, calcFinalWeightForBox} from '@utils/calculation'
import {getShortenStringIfLongerThanCount} from '@utils/change-string-length'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixedWithDollarSign, toFixedWithKg} from '@utils/text'

import {useClassNames} from './request-to-send-batch-box.styles'

export const RequestToSendBatchBox = ({box, price, onClickRemoveBoxFromBatch, volumeWeightCoefficient}) => {
  const classNames = useClassNames()

  const tableCellClsx = clsx(classNames.tableCell, {[classNames.boxNoPrice]: !price})

  const copyValue = value => {
    navigator.clipboard.writeText(value)
  }

  const isNoBarCodGlued = box.items.some(
    item => !item.isBarCodeAlreadyAttachedByTheSupplier && !item.isBarCodeAttachedByTheStorekeeper,
  )

  const isBadBox = isNoBarCodGlued || !box.isShippingLabelAttachedByStorekeeper

  return (
    <div className={clsx(classNames.box, {[classNames.badBox]: isBadBox})}>
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
                  30,
                )}`}</Typography>

                <Typography variant="subtitle1">{`ASIN: ${box.items[0].product.asin}`}</Typography>

                <Typography variant="subtitle1">{`Количество${box.items[0].amount}шт.`}</Typography>

                <Typography className={classNames.superBoxTypo}>{`Superbox x ${box.amount}`}</Typography>

                <div className={classNames.barCodeLabelWrapper}>
                  <Typography className={classNames.spanText}>{'Баркод'}</Typography>

                  <div className={classNames.checkboxWrapper}>
                    <Typography className={clsx({[classNames.alertSpan]: isNoBarCodGlued})}>{'проклеен'}</Typography>

                    <Checkbox
                      disabled
                      color="primary"
                      checked={
                        box.items[0].isBarCodeAlreadyAttachedByTheSupplier ||
                        box.items[0].isBarCodeAttachedByTheStorekeeper
                      }
                    />
                  </div>

                  {box.items[0].product.barCode ? (
                    <div className={classNames.linkWrapper}>
                      <a
                        download
                        target="_blank"
                        rel="noreferrer"
                        href={box.items[0].product.barCode}
                        className={classNames.downloadLink}
                      >
                        {'Скачать'}
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
          ) : (
            box.items.map((item, idx) => (
              <div key={idx} className={classNames.boxItemWrapper}>
                <img src={getAmazonImageUrl(item.product.images[0])} className={classNames.img} />

                <div className={classNames.boxItemSubWrapper}>
                  <Typography className={classNames.amazonTitle}>{`${idx + 1}: ${getShortenStringIfLongerThanCount(
                    item.product.amazonTitle,
                    30,
                  )}`}</Typography>

                  <Typography variant="subtitle1">{`ASIN: ${box.items[0].product.asin}`}</Typography>

                  <Typography variant="subtitle1">{`Количество ${item.amount}шт.`}</Typography>

                  <div className={classNames.barCodeLabelWrapper}>
                    <Typography className={classNames.spanText}>{'Баркод'}</Typography>

                    <div className={classNames.checkboxWrapper}>
                      <Typography className={clsx({[classNames.alertSpan]: isNoBarCodGlued})}>{'проклеен'}</Typography>

                      <Checkbox
                        disabled
                        color="primary"
                        checked={
                          box.items[0].isBarCodeAlreadyAttachedByTheSupplier ||
                          box.items[0].isBarCodeAttachedByTheStorekeeper
                        }
                      />
                    </div>

                    {item.product.barCode ? (
                      <div className={classNames.linkWrapper}>
                        <a
                          download
                          target="_blank"
                          rel="noreferrer"
                          href={item.product.barCode}
                          className={classNames.downloadLink}
                        >
                          {'Скачать'}
                        </a>

                        <img
                          className={classNames.copyImg}
                          src="/assets/icons/copy-img.svg"
                          alt=""
                          onClick={() => copyValue(item.product.barCode)}
                        />
                      </div>
                    ) : (
                      <Typography className={classNames.alertSpan}>{'N/A'}</Typography>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={clsx(tableCellClsx, classNames.dementionsCell)}>
        <div className={classNames.dementionsSubWrapper}>
          <Typography className={classNames.dementionsTitle}>{'Фактический вес'}</Typography>

          <Typography className={classNames.dementionsSpanText}>
            {toFixedWithKg(box.weighGrossKgWarehouse, 2)}
          </Typography>
        </div>

        <div className={classNames.dementionsSubWrapper}>
          <Typography className={classNames.dementionsTitle}>{'Объемный вес'}</Typography>

          <Typography className={classNames.dementionsSpanText}>
            {toFixedWithKg(calcVolumeWeightForBox(box, volumeWeightCoefficient), 2)}
          </Typography>
        </div>

        <div className={classNames.dementionsSubWrapper}>
          <Typography className={classNames.dementionsTitle}>{'Финальный вес'}</Typography>

          <Typography className={classNames.dementionsSpanText}>
            {toFixedWithKg(calcFinalWeightForBox(box, volumeWeightCoefficient), 2)}
          </Typography>
        </div>
      </div>

      <div className={clsx(tableCellClsx, classNames.shippingLabelCell)}>
        <div className={classNames.shippingLabelWrapper}>
          <Typography className={classNames.spanText}>{'Шиппинг Лейбл'}</Typography>

          <div className={classNames.checkboxWrapper}>
            <Typography className={clsx({[classNames.alertSpan]: !box.isShippingLabelAttachedByStorekeeper})}>
              {'проклеен'}
            </Typography>

            <Checkbox disabled color="primary" checked={box.isShippingLabelAttachedByStorekeeper} />
          </div>

          {box.shippingLabel ? (
            <div className={classNames.linkWrapper}>
              <a download target="_blank" rel="noreferrer" href={box.shippingLabel} className={classNames.downloadLink}>
                {'Скачать'}
              </a>

              <img
                className={classNames.copyImg}
                src="/assets/icons/copy-img.svg"
                alt=""
                onClick={() => copyValue(box.shippingLabel)}
              />
            </div>
          ) : (
            <Typography className={classNames.alertSpan}>{'N/A'}</Typography>
          )}
        </div>
      </div>

      <div className={clsx(tableCellClsx, classNames.priceCell)}>
        <Typography className={classNames.spanText}>{`Стоимость доставки коробки`}</Typography>
      </div>

      <div className={clsx(tableCellClsx, classNames.priceCellRight)}>
        {price ? <Typography variant="h5">{toFixedWithDollarSign(price, 2)}</Typography> : null}
      </div>

      <div className={classNames.tableCellCrossBtn}>
        <ErrorButton className={classNames.crossBtn} onClick={onClickRemoveBoxFromBatch}>
          X
        </ErrorButton>
      </div>
    </div>
  )
}
