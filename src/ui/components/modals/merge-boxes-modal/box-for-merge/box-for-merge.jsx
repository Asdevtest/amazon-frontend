import { useState } from 'react'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field/field'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { Text } from '@components/shared/text'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getNewTariffTextForBoxOrOrder, getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './box-for-merge.style'

export const BoxForMerge = ({ box, readOnly = false, index, destinations }) => {
  const { classes: styles } = useStyles()
  const [showFullCard, setShowFullCard] = useState(true)

  return (
    <div className={styles.box}>
      <Typography className={styles.boxTitle}>{`${t(TranslationKey.Box)} № ${box.xid}`}</Typography>
      <div>
        <div>
          {box.items.map((order, orderIndex) => (
            <div key={`box_${box._id}_${readOnly ? 1 : 0}_${index}`}>
              <div key={orderIndex} className={styles.order}>
                <img className={styles.img} src={getAmazonImageUrl(order.product.images[0])} />
                <div>
                  <div className={styles.asinWrapper}>
                    <Typography className={styles.asinTitle}>{t(TranslationKey.ASIN)}</Typography>
                    <Text className={styles.asinValue} text={order.product?.asin} />
                  </div>

                  <div className={styles.asinWrapper}>
                    <Typography className={styles.asinTitle}>{t(TranslationKey.Order)}</Typography>
                    <Typography className={styles.asinValue}>{order.order.id}</Typography>
                  </div>

                  <Typography className={styles.title}>
                    {getShortenStringIfLongerThanCount(order.product.amazonTitle, 85)}
                  </Typography>
                </div>

                <div>
                  <Field
                    disabled={!readOnly}
                    label={t(TranslationKey.Quantity)}
                    className={styles.orderInput}
                    labelClasses={styles.label}
                    value={order.amount}
                    tooltipInfoContent={t(TranslationKey['Number of product units in the box'])}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {showFullCard ? (
          <div className={styles.itemSubWrapper}>
            <Field
              containerClasses={styles.field}
              tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the USA, available for change"])}
              label={t(TranslationKey.Destination)}
              labelClasses={styles.label}
              inputComponent={
                <WithSearchSelect
                  disabled
                  width={230}
                  selectedItemName={
                    destinations.find(el => el._id === box.destination?._id)?.name || t(TranslationKey['Not chosen'])
                  }
                  data={destinations}
                  searchFields={['name']}
                />
              }
            />
            <Field
              containerClasses={styles.field}
              tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
              label={`${t(TranslationKey['Int warehouse'])} / ` + t(TranslationKey.Tariff)}
              labelClasses={styles.label}
              inputComponent={
                <div>
                  <Typography className={styles.storekeeperDisableBtn}>{getNewTariffTextForBoxOrOrder(box)}</Typography>
                </div>
              }
            />
            <Field
              disabled
              inputProps={{ maxLength: 255 }}
              tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
              containerClasses={styles.field}
              labelClasses={styles.label}
              className={styles.fieldInput}
              label="FBA Shipment"
              value={box.fbaShipment}
            />

            <LabelWithCopy
              direction="column"
              labelTitleColor="gray"
              lableLinkTitleSize="medium"
              labelTitle="Shipping label"
              labelValue={box.shippingLabel}
              lableLinkTitle={t(TranslationKey.View)}
              labelWrapperStyles={styles.labelWrapperStyles}
            />
          </div>
        ) : null}
      </div>
      <div className={styles.bottomBlockWrapper}>
        <div className={styles.incomingBtnWrapper}>
          <div className={styles.tablePanelSortWrapper} onClick={() => setShowFullCard(!showFullCard)}>
            <Typography className={styles.tablePanelViewText}>
              {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
            </Typography>

            {!showFullCard ? (
              <MdArrowDropDown size={22} className={styles.icon} />
            ) : (
              <MdArrowDropUp size={22} className={styles.icon} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
