/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, memo, useEffect, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { IconButton, Radio } from '@mui/material'

import { unitsOfChangeOptions } from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CopyValue } from '@components/shared/copy-value'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { LabelWithCopy } from '@components/shared/label-with-copy'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getNewTariffTextForBoxOrOrder } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './box.style'

import { WarehouseDemensions } from '../warehouse-demensions/warehouse-demensions'

interface BoxProps {
  isNewBox?: boolean
  isActiveOneBox?: boolean
  destinations: any
  box: any
  onChangeField: any
  onRemoveBox: any
  index: number
  basicBox: any
  onClickBasicBoxRadio: any
}

export const Box: FC<BoxProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const {
    isNewBox,
    isActiveOneBox,
    destinations,
    box,
    onChangeField,
    onRemoveBox,
    index,
    basicBox,
    onClickBasicBoxRadio,
  } = props

  const [sizeSetting, setSizeSetting] = useState<string>(unitsOfChangeOptions.EU)
  const [showFullCard, setShowFullCard] = useState(isNewBox ? false : true)

  useEffect(() => {
    if (isActiveOneBox) {
      onClickBasicBoxRadio(box)
    }
  }, [isActiveOneBox])

  return (
    <div className={styles.box}>
      {!isNewBox && (
        <div className={styles.headerWrapper}>
          <div className={styles.radioWrapper}>
            {(basicBox?._id === box._id || !basicBox) && (
              <Radio checked={box._id === basicBox?._id || isActiveOneBox} onClick={() => onClickBasicBoxRadio(box)} />
            )}

            <p className={styles.standartText}>{t(TranslationKey['Basic box'])}</p>
          </div>
        </div>
      )}

      <div className={styles.orderWrapper}>
        <div className={styles.boxHeaderWrapper}>
          <div className={styles.iconWrapperAndboxNum}>
            {box.amount > 1 ? (
              <div className={styles.iconWrapper}>
                <img src="/assets/icons/mini-box.svg" />
                <p className={styles.iconText}>{'SuperBox'}</p>
              </div>
            ) : (
              <div className={cx(styles.iconWrapper, styles.standartIconWrapper)}>
                <img src="/assets/icons/mini-box.svg" />
                <p className={cx(styles.iconText, styles.standartText)}>{'Box'}</p>
              </div>
            )}

            <p className={styles.boxNum}>{`№ ${box.humanFriendlyId || '-'}`}</p>
          </div>

          <Field
            oneLine
            disabled={!isNewBox}
            label={t(TranslationKey['Boxes in group']) + ':'}
            // @ts-ignore
            inputProps={{ maxLength: 5 }}
            containerClasses={styles.amountField}
            className={styles.orderInput}
            labelClasses={styles.label}
            value={box.amount}
            onChange={(e: any) => onChangeField(e, 'amount', index)}
          />
        </div>

        {box.items.map((order: any, orderIndex: number) => (
          <div key={orderIndex} className={styles.order}>
            <img className={styles.img} src={getAmazonImageUrl(order.product.images[0])} />
            <div className={styles.orderInfo}>
              <div className={styles.asinWrapper}>
                <p className={styles.asinTitle}>{`${t(TranslationKey.Order)} / item`}</p>
                <p className={styles.asinValue}>{`${order.order.id} / ${
                  Number(order.order.item) ? order.order.item : '-'
                }`}</p>
              </div>

              <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={order.product.asin} />
              <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={order.product.skuByClient} />

              <p className={styles.title}>{order.product.amazonTitle}</p>

              <LabelWithCopy
                labelTitleColor="gray"
                labelTitle={t(TranslationKey.BarCode)}
                labelValue={order.barCode}
                lableLinkTitle={t(TranslationKey.View)}
              />

              <LabelWithCopy
                labelTitleColor="gray"
                labelTitle={t(TranslationKey['Transparency codes'])}
                labelValue={order.transparencyFile}
                lableLinkTitle={t(TranslationKey.View)}
              />
            </div>

            <div>
              <Field
                disabled
                containerClasses={styles.field}
                label={t(TranslationKey.Quantity)}
                className={styles.orderInput}
                labelClasses={[styles.label, styles.quantityLabel]}
                value={order.amount}
                tooltipInfoContent={t(TranslationKey['Number of product units in the box'])}
              />

              <Field
                disabled
                containerClasses={styles.field}
                label={t(TranslationKey['Quantity in group'])}
                className={styles.orderInput}
                labelClasses={[styles.label, styles.quantityLabel]}
                value={order.amount * box.amount}
              />
            </div>
          </div>
        ))}
        {showFullCard ? (
          <div className={styles.itemSubWrapper}>
            <div>
              <div className={styles.sizesTitleWrapper}>
                <p className={styles.label}>{t(TranslationKey.Dimensions)}</p>

                <div>
                  <CustomSwitcher
                    condition={sizeSetting}
                    switcherSettings={[
                      { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
                      { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
                    ]}
                    changeConditionHandler={condition => {
                      if (typeof condition === 'string') {
                        setSizeSetting(condition)
                      }
                    }}
                  />
                </div>
              </div>

              <WarehouseDemensions orderBox={box} sizeSetting={sizeSetting} />
            </div>
            <div>
              <Field
                containerClasses={styles.field}
                tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the USA, available for change"])}
                label={t(TranslationKey.Destination)}
                labelClasses={styles.label}
                inputComponent={
                  <p className={styles.standartText}>
                    {destinations.find((el: any) => el._id === box.destinationId)?.name ||
                      t(TranslationKey['Not chosen'])}
                  </p>
                }
              />

              <Field
                containerClasses={styles.field}
                tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
                label={`${t(TranslationKey['Int warehouse'])} / ` + t(TranslationKey.Tariff)}
                labelClasses={styles.label}
                inputComponent={
                  <p className={styles.standartText}>{`${box.storekeeper?.name} / ${getNewTariffTextForBoxOrOrder(
                    box,
                  )}`}</p>
                }
              />

              <Field
                // @ts-ignore
                inputProps={{ maxLength: 255 }}
                tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                containerClasses={styles.field}
                labelClasses={styles.label}
                className={styles.fieldInput}
                label={t(TranslationKey['FBA Shipment'])}
                value={box.fbaShipment}
                inputComponent={<p className={styles.standartText}>{box.fbaShipment || t(TranslationKey.Missing)}</p>}
              />

              <LabelWithCopy
                direction="column"
                labelTitleColor="gray"
                labelTitle={t(TranslationKey['Shipping label'])}
                labelValue={box.shippingLabel}
                lableLinkTitle={t(TranslationKey.View)}
              />

              {!isNewBox && (
                <Field
                  // @ts-ignore
                  inputProps={{ maxLength: 255 }}
                  containerClasses={styles.field}
                  labelClasses={styles.label}
                  className={styles.fieldInput}
                  label={'Prep ID'}
                  value={box.fbaShipment}
                  inputComponent={
                    <div className={styles.prepIdWrapper}>
                      <p className={styles.standartText}>{box.prepId || t(TranslationKey.Missing)}</p>
                      {box.prepId && <CopyValue text={box.prepId} />}
                    </div>
                  }
                />
              )}
            </div>
          </div>
        ) : null}

        <div className={styles.bottomBlockWrapper}>
          <IconButton classes={{ root: styles.icon }} onClick={() => onRemoveBox(isNewBox ? index : box._id)}>
            <DeleteOutlineOutlinedIcon className={styles.deleteBtn} />
          </IconButton>
          {isNewBox && (
            <div className={styles.prepId}>
              <p>Prep ID</p>
              <Input value={box.prepId || ''} onChange={(e: any) => onChangeField(e, 'prepId', index)} />
            </div>
          )}
          <div className={styles.incomingBtnWrapper}>
            <div className={styles.tablePanelSortWrapper} onClick={() => setShowFullCard(!showFullCard)}>
              <p className={styles.tablePanelViewText}>
                {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
              </p>

              {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
