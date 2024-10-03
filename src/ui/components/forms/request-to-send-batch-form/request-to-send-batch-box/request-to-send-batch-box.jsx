import { memo, useState } from 'react'

import { Checkbox } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { LabelWithCopy } from '@components/shared/label-with-copy'

import { calcFinalWeightForBox, calcVolumeWeightForBox, calculateDeliveryCostPerPcs } from '@utils/calculation'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getShortenStringIfLongerThanCount, toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './request-to-send-batch-box.style'

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

    const isWeightMismatch =
      Number(box.heightCmWarehouse) < 10 || Number(box.lengthCmWarehouse) < 10 || Number(box.widthCmWarehouse) < 10

    return (
      <tr
        className={cx(styles.box, styles.row, { [styles.badBox]: isBadBox })}
        onDoubleClick={() => {
          setCurrentOpenedBox(box)
          setShowBoxViewModal(!showBoxViewModal)
        }}
      >
        <div className={cx(tableCellClsx, styles.indexCell)}>
          <p>{`№ ${box.humanFriendlyId}`}</p>
        </div>

        <div className={cx(tableCellClsx, styles.productCell)}>
          <div className={styles.boxWrapper}>
            {box.amount > 1 ? (
              <div className={styles.boxItemWrapper}>
                <img src={getAmazonImageUrl(box.items[0].product.images[0])} className={styles.img} />

                <div className={styles.boxItemSubWrapper}>
                  <p className={styles.amazonTitle}>{`${getShortenStringIfLongerThanCount(
                    box.items[0].product.amazonTitle,
                    40,
                  )}`}</p>

                  <div className={styles.boxItemSubInfoWrapper}>
                    <div>
                      <AsinOrSkuLink
                        withCopyValue
                        withAttributeTitle="asin"
                        textStyles={styles.asinTitle}
                        link={box.items[0].product.asin}
                      />

                      <p>{`${t(TranslationKey.Quantity)} ${box.items[0].amount} ${t(TranslationKey['pcs.'])}`}</p>

                      <p className={styles.superBoxTypo}>{`Superbox x ${box.amount}`}</p>
                    </div>

                    <div className={styles.barCodeLabelWrapper}>
                      <p className={cx(styles.spanText, { [styles.alertSpan]: !box.items[0].barCode })}>
                        {t(TranslationKey.BarCode)}
                      </p>

                      <LabelWithCopy labelValue={box.items[0].barCode} lableLinkTitle={t(TranslationKey.View)} />

                      <div className={styles.checkboxWrapper}>
                        <p className={cx({ [styles.alertSpan]: isNoBarCodGlued })}>{t(TranslationKey.glued)}</p>

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
                      <p
                        className={cx(styles.spanText, {
                          [styles.alertSpan]:
                            !box.items?.[0]?.transparencyFile && box.items?.[0]?.product?.transparency,
                        })}
                      >
                        Transparency Codes
                      </p>

                      <LabelWithCopy
                        labelValue={box.items[0].transparencyFile}
                        lableLinkTitle={t(TranslationKey.View)}
                      />

                      <div className={styles.checkboxWrapper}>
                        <p className={cx({ [styles.alertSpan]: isNoTransparencyGlued })}>{t(TranslationKey.glued)}</p>

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
                    <p className={styles.amazonTitle}>{`${getShortenStringIfLongerThanCount(
                      item.product.amazonTitle,
                      40,
                    )}`}</p>

                    <div className={styles.boxItemSubInfoWrapper}>
                      <div>
                        <AsinOrSkuLink
                          withCopyValue
                          withAttributeTitle="asin"
                          textStyles={styles.asinTitle}
                          link={box.items[0].product.asin}
                        />

                        <p>{`${t(TranslationKey.Quantity)} ${item.amount} ${t(TranslationKey['pcs.'])}`}</p>
                      </div>

                      <div className={styles.barCodeLabelWrapper}>
                        <p className={cx(styles.spanText, { [styles.alertSpan]: !item.barCode })}>
                          {t(TranslationKey.BarCode)}
                        </p>

                        <LabelWithCopy labelValue={box.items[0].barCode} lableLinkTitle={t(TranslationKey.View)} />

                        <div className={styles.checkboxWrapper}>
                          <p className={cx({ [styles.alertSpan]: isNoBarCodGlued })}>{t(TranslationKey.glued)}</p>

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
                        <p
                          className={cx(styles.spanText, {
                            [styles.alertSpan]:
                              !box.items?.[0]?.transparencyFile && box.items?.[0]?.product?.transparency,
                          })}
                        >
                          {t(TranslationKey['Transparency Codes'])}
                        </p>

                        <LabelWithCopy
                          labelValue={box.items[0].transparencyFile}
                          lableLinkTitle={t(TranslationKey.View)}
                        />

                        <div className={styles.checkboxWrapper}>
                          <p className={cx({ [styles.alertSpan]: isNoTransparencyGlued })}>{t(TranslationKey.glued)}</p>

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
            <p className={styles.dementionsTitle}>{t(TranslationKey['Actual weight'])}</p>

            <p className={styles.dementionsSpanText}>{toFixedWithKg(box.weighGrossKgWarehouse, 2)}</p>
          </div>

          <div className={styles.dementionsSubWrapper}>
            <p className={styles.dementionsTitle}>{t(TranslationKey['Volume weight'])}</p>

            <p className={styles.dementionsSpanText}>
              {toFixedWithKg(calcVolumeWeightForBox(box, volumeWeightCoefficient), 2)}
            </p>
          </div>

          <div className={styles.dementionsSubWrapper}>
            <p
              className={cx(styles.dementionsTitle, {
                [styles.alertText]: isSmallWeight,
              })}
            >
              {t(TranslationKey['Final weight'])}
            </p>

            <p
              className={cx(styles.dementionsSpanText, {
                [styles.alertText]: isSmallWeight,
              })}
            >
              {toFixedWithKg(calcFinalWeightForBox(box, volumeWeightCoefficient), 2)}
            </p>
          </div>

          {calcFinalWeightForBox(box, volumeWeightCoefficient) < box?.variationTariff?.minBoxWeight || 0 ? (
            <p className={styles.alertText}>{`${t(TranslationKey['Weight less than'])} ${
              box?.variationTariff?.minBoxWeight
            } ${t(TranslationKey.kg)}!`}</p>
          ) : null}

          {box.amount > 1 ? (
            <div className={styles.dementionsSubWrapper}>
              <p className={styles.dementionsTitle}>{t(TranslationKey['Total final weight'])}</p>

              <p className={styles.dementionsSpanText}>
                {toFixedWithKg(calcFinalWeightForBox(box, volumeWeightCoefficient) * box.amount, 2)}
              </p>
            </div>
          ) : null}
        </div>

        <td>
          <div className={styles.shippingLabelWrapper}>
            <p className={cx(styles.spanText, { [styles.alertSpan]: !box.shippingLabel })}>
              Shipping label
            </p>

            {box.shippingLabel ? (
              <div className={styles.linkWrapper}>
                <a
                  download
                  target="_blank"
                  rel="noreferrer noopener"
                  href={getAmazonImageUrl(box.shippingLabel, true)}
                  className={styles.downloadLink}
                >
                  {t(TranslationKey.View)}
                </a>
                <CopyValue text={getAmazonImageUrl(box.shippingLabel)} />
              </div>
            ) : (
              <p className={styles.alertSpan}>{t(TranslationKey.Missing)}</p>
            )}
          </div>
        </td>

        <td className={cx(tableCellClsx, styles.pricePerAmoutCell)}>
          {box.items.map((item, index) => {
            const deliveryCostPerPcs = calculateDeliveryCostPerPcs({
              itemSupplierBoxWeightGrossKg: item.order?.orderSupplier?.boxProperties?.boxWeighGrossKg,
              deliveryCost: price,
              itemAmount: item.amount,
              itemSupplierAmountInBox: item.order?.orderSupplier?.boxProperties?.amountInBox,
              boxFinalWeight: calcFinalWeightForBox(box, volumeWeightCoefficient),
              box,
            })

            return (
              <div key={index}>
                <div className={cx(tableCellClsx, styles.priceCell)}>
                  <p className={styles.dementionsTitle}>{t(TranslationKey['Average delivery cost per pc'])}</p>
                </div>

                <div className={cx(tableCellClsx, styles.priceCellRight)}>
                  <p className={styles.priceText}>
                    {deliveryCostPerPcs ? toFixedWithDollarSign(deliveryCostPerPcs, 2) : t(TranslationKey['No data'])}
                  </p>
                </div>
              </div>
            )
          })}
        </td>

        {box.amount > 1 ? (
          <td className={styles.suberboxPriceCellWrapper}>
            <div className={styles.suberboxPriceCell}>
              <div className={styles.priceCell}>
                <p className={styles.dementionsTitle}>{t(TranslationKey['Box delivery cost'])}</p>
              </div>
              <div className={styles.priceCellRight}>
                <p className={styles.priceText}>{toFixedWithDollarSign(price / box.amount, 2)}</p>
              </div>
            </div>
            <div className={styles.suberboxPriceCell}>
              <div className={styles.priceCell}>
                <p className={styles.dementionsTitle}>{t(TranslationKey['Delivery cost'])}</p>
              </div>
              <div className={styles.priceCellRight}>
                <p className={styles.priceText}>{toFixedWithDollarSign(price, 2)}</p>
              </div>
            </div>
          </td>
        ) : (
          <>
            <td className={cx(tableCellClsx, styles.priceCell)}>
              <p className={styles.spanText}>{t(TranslationKey['Box delivery cost'])}</p>
            </td>
            <td className={cx(tableCellClsx, styles.priceCellRight)}>
              {/* <p variant="h5">{toFixedWithDollarSign(price, 2)}</p> */}
              <p className={styles.priceText}>{toFixedWithDollarSign(price, 2)}</p>
            </td>
          </>
        )}

        <td className={styles.tableCellCrossBtn}>
          <Button styleType={ButtonStyle.DANGER} className={styles.crossBtn} onClick={onClickRemoveBoxFromBatch}>
            X
          </Button>
        </td>

        {isWeightMismatch ? (
          <p className={styles.warningText}>{t(TranslationKey["Box dimensions don't meet carrier requirements!"])}</p>
        ) : null}
      </tr>
    )
  },
)
