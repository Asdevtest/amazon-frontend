import { memo, useState } from 'react'

import { Checkbox, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { LabelWithCopy } from '@components/shared/label-with-copy'

import { calcFinalWeightForBox, calcVolumeWeightForBox, calculateDeliveryCostPerPcs } from '@utils/calculation'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getShortenStringIfLongerThanCount, toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './request-to-send-batch-box.styles'

export const RequestToSendBatchBox = memo(
  ({ box, price, onClickRemoveBoxFromBatch, volumeWeightCoefficient, setCurrentOpenedBox }) => {
    const { classes: styles, cx } = useStyles()
    const [showBoxViewModal, setShowBoxViewModal] = useState(false)

    const tableCellClsx = cx(styles.tableCell)

    const isNoBarCodGlued = box.items.some(
      item => !item.isBarCodeAlreadyAttachedByTheSupplier && !item.isBarCodeAttachedByTheStorekeeper,
    )

    const isNoTransparencyGlued =
      box.items.some(
        item =>
          !item.isTransparencyFileAttachedByTheStorekeeper && !item.isTransparencyFileAlreadyAttachedByTheSupplier,
      ) && box.items?.[0]?.product?.transparency

    const isSmallWeight = calcFinalWeightForBox(box, volumeWeightCoefficient) < 12

    const isBadBox =
      isNoBarCodGlued ||
      (!box.shippingLabel && !box.destination?.storekeeperId) ||
      !price ||
      !box.items.some(item => item.barCode)

    return (
      <tr
        className={cx(styles.box, styles.row, { [styles.badBox]: isBadBox })}
        onDoubleClick={() => {
          setCurrentOpenedBox(box)
          setShowBoxViewModal(!showBoxViewModal)
        }}
      >
        <div className={cx(tableCellClsx, styles.indexCell)}>
          <Typography variant="subtitle2">{`№ ${box.humanFriendlyId}`}</Typography>
        </div>

        <div className={cx(tableCellClsx, styles.productCell)}>
          <div className={styles.boxWrapper}>
            {box.amount > 1 ? (
              <div className={styles.boxItemWrapper}>
                <img src={getAmazonImageUrl(box.items[0].product.images[0])} className={styles.img} />

                <div className={styles.boxItemSubWrapper}>
                  <Typography className={styles.amazonTitle}>{`${getShortenStringIfLongerThanCount(
                    box.items[0].product.amazonTitle,
                    40,
                  )}`}</Typography>

                  <div className={styles.boxItemSubInfoWrapper}>
                    <div>
                      <AsinOrSkuLink
                        withCopyValue
                        withAttributeTitle="asin"
                        textStyles={styles.asinTitle}
                        link={box.items[0].product.asin}
                      />

                      <Typography variant="subtitle1">{`${t(TranslationKey.Quantity)} ${box.items[0].amount} ${t(
                        TranslationKey['pcs.'],
                      )}`}</Typography>

                      <Typography className={styles.superBoxTypo}>{`Superbox x ${box.amount}`}</Typography>
                    </div>

                    <div className={styles.barCodeLabelWrapper}>
                      <Typography className={cx(styles.spanText, { [styles.alertSpan]: !box.items[0].barCode })}>
                        {t(TranslationKey.BarCode)}
                      </Typography>

                      <LabelWithCopy labelValue={box.items[0].barCode} lableLinkTitle={t(TranslationKey.View)} />

                      <div className={styles.checkboxWrapper}>
                        <Typography className={cx({ [styles.alertSpan]: isNoBarCodGlued })}>
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

                    <div className={styles.barCodeLabelWrapper}>
                      <Typography
                        className={cx(styles.spanText, {
                          [styles.alertSpan]:
                            !box.items?.[0]?.transparencyFile && box.items?.[0]?.product?.transparency,
                        })}
                      >
                        {t(TranslationKey['Transparency codes'])}
                      </Typography>

                      <LabelWithCopy
                        labelValue={box.items[0].transparencyFile}
                        lableLinkTitle={t(TranslationKey.View)}
                      />

                      <div className={styles.checkboxWrapper}>
                        <Typography className={cx({ [styles.alertSpan]: isNoTransparencyGlued })}>
                          {t(TranslationKey.glued)}
                        </Typography>

                        <Checkbox
                          disabled
                          color="primary"
                          checked={
                            box.items[0].isTransparencyFileAlreadyAttachedByTheSupplier ||
                            box.items[0].isTransparencyFileAttachedByTheStorekeeper
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              box.items.map((item, idx) => (
                <div key={idx} className={styles.boxItemWrapper}>
                  <img src={getAmazonImageUrl(item.product.images[0])} className={styles.img} />

                  <div className={styles.boxItemSubWrapper}>
                    <Typography className={styles.amazonTitle}>{`${getShortenStringIfLongerThanCount(
                      item.product.amazonTitle,
                      40,
                    )}`}</Typography>

                    <div className={styles.boxItemSubInfoWrapper}>
                      <div>
                        <AsinOrSkuLink
                          withCopyValue
                          withAttributeTitle="asin"
                          textStyles={styles.asinTitle}
                          link={box.items[0].product.asin}
                        />

                        <Typography variant="subtitle1">{`${t(TranslationKey.Quantity)} ${item.amount} ${t(
                          TranslationKey['pcs.'],
                        )}`}</Typography>
                      </div>

                      <div className={styles.barCodeLabelWrapper}>
                        <Typography className={cx(styles.spanText, { [styles.alertSpan]: !item.barCode })}>
                          {t(TranslationKey.BarCode)}
                        </Typography>

                        <LabelWithCopy labelValue={box.items[0].barCode} lableLinkTitle={t(TranslationKey.View)} />

                        <div className={styles.checkboxWrapper}>
                          <Typography className={cx({ [styles.alertSpan]: isNoBarCodGlued })}>
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

                      <div className={styles.barCodeLabelWrapper}>
                        <Typography
                          className={cx(styles.spanText, {
                            [styles.alertSpan]:
                              !box.items?.[0]?.transparencyFile && box.items?.[0]?.product?.transparency,
                          })}
                        >
                          {t(TranslationKey['Transparency codes'])}
                        </Typography>

                        <LabelWithCopy
                          labelValue={box.items[0].transparencyFile}
                          lableLinkTitle={t(TranslationKey.View)}
                        />

                        <div className={styles.checkboxWrapper}>
                          <Typography className={cx({ [styles.alertSpan]: isNoTransparencyGlued })}>
                            {t(TranslationKey.glued)}
                          </Typography>

                          <Checkbox
                            disabled
                            color="primary"
                            checked={
                              box.items[0].isTransparencyFileAlreadyAttachedByTheSupplier ||
                              box.items[0].isTransparencyFileAttachedByTheStorekeeper
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

        <div className={cx(tableCellClsx, styles.dementionsCell)}>
          <div className={styles.dementionsSubWrapper}>
            <Typography className={styles.dementionsTitle}>{t(TranslationKey['Actual weight'])}</Typography>

            <Typography className={styles.dementionsSpanText}>{toFixedWithKg(box.weighGrossKgWarehouse, 2)}</Typography>
          </div>

          <div className={styles.dementionsSubWrapper}>
            <Typography className={styles.dementionsTitle}>{t(TranslationKey['Volume weight'])}</Typography>

            <Typography className={styles.dementionsSpanText}>
              {toFixedWithKg(calcVolumeWeightForBox(box, volumeWeightCoefficient), 2)}
            </Typography>
          </div>

          <div className={styles.dementionsSubWrapper}>
            <Typography
              className={cx(styles.dementionsTitle, {
                [styles.alertText]: isSmallWeight,
              })}
            >
              {t(TranslationKey['Final weight'])}
            </Typography>

            <Typography
              className={cx(styles.dementionsSpanText, {
                [styles.alertText]: isSmallWeight,
              })}
            >
              {toFixedWithKg(calcFinalWeightForBox(box, volumeWeightCoefficient), 2)}
            </Typography>
          </div>

          {calcFinalWeightForBox(box, volumeWeightCoefficient) < 12 ? (
            <Typography className={styles.alertText}>{`(${t(TranslationKey['Weight less than 12 kg!'])})`}</Typography>
          ) : null}

          {box.amount > 1 ? (
            <div className={styles.dementionsSubWrapper}>
              <Typography className={styles.dementionsTitle}>{t(TranslationKey['Total final weight'])}</Typography>

              <Typography className={styles.dementionsSpanText}>
                {toFixedWithKg(calcFinalWeightForBox(box, volumeWeightCoefficient) * box.amount, 2)}
              </Typography>
            </div>
          ) : null}
        </div>

        <td>
          <div className={styles.shippingLabelWrapper}>
            <Typography className={cx(styles.spanText, { [styles.alertSpan]: !box.shippingLabel })}>
              {t(TranslationKey['Shipping label'])}
            </Typography>

            {box.shippingLabel ? (
              <div className={styles.linkWrapper}>
                <a download target="_blank" rel="noreferrer" href={box.shippingLabel} className={styles.downloadLink}>
                  {t(TranslationKey.download)}
                </a>
                <CopyValue text={box.shippingLabel} />
              </div>
            ) : (
              <Typography className={styles.alertSpan}>{t(TranslationKey.Missing)}</Typography>
            )}
          </div>
        </td>
        <td className={cx(tableCellClsx, styles.pricePerAmoutCell)}>
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
                <div className={cx(tableCellClsx, styles.priceCell)}>
                  <Typography className={styles.dementionsTitle}>
                    {t(TranslationKey['Average delivery cost per pc'])}
                  </Typography>
                </div>

                <div className={cx(tableCellClsx, styles.priceCellRight)}>
                  <Typography className={styles.priceText}>
                    {deliveryCostPerPcs ? toFixedWithDollarSign(deliveryCostPerPcs, 2) : t(TranslationKey['No data'])}
                  </Typography>
                </div>
              </div>
            )
          })}
        </td>
        {/* cx(tableCellClsx, styles.priceCell) */}
        {box.amount > 1 ? (
          <td className={styles.suberboxPriceCellWrapper}>
            <div className={styles.suberboxPriceCell}>
              <div className={styles.priceCell}>
                <Typography className={styles.dementionsTitle}>{t(TranslationKey['Box delivery cost'])}</Typography>
              </div>
              <div className={styles.priceCellRight}>
                <Typography className={styles.priceText}>{toFixedWithDollarSign(price / box.amount, 2)}</Typography>
              </div>
            </div>
            <div className={styles.suberboxPriceCell}>
              <div className={styles.priceCell}>
                <Typography className={styles.dementionsTitle}>{t(TranslationKey['Delivery cost'])}</Typography>
              </div>
              <div className={styles.priceCellRight}>
                <Typography className={styles.priceText}>{toFixedWithDollarSign(price, 2)}</Typography>
              </div>
            </div>
          </td>
        ) : (
          <>
            <td className={cx(tableCellClsx, styles.priceCell)}>
              <Typography className={styles.spanText}>{t(TranslationKey['Box delivery cost'])}</Typography>
            </td>
            <td className={cx(tableCellClsx, styles.priceCellRight)}>
              {/* <Typography variant="h5">{toFixedWithDollarSign(price, 2)}</Typography> */}
              <Typography className={styles.priceText}>{toFixedWithDollarSign(price, 2)}</Typography>
            </td>
          </>
        )}

        <td className={styles.tableCellCrossBtn}>
          <Button danger className={styles.crossBtn} onClick={onClickRemoveBoxFromBatch}>
            X
          </Button>
        </td>
      </tr>
    )
  },
)
