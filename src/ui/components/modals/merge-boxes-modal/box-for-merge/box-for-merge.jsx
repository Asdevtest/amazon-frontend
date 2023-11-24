import { useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CopyValue } from '@components/shared/copy-value/copy-value'
import { Field } from '@components/shared/field/field'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getNewTariffTextForBoxOrOrder, getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './box-for-merge.style'

export const BoxForMerge = ({ box, readOnly = false, index, destinations }) => {
  const { classes: classNames } = useClassNames()
  const [showFullCard, setShowFullCard] = useState(true)

  return (
    <div className={classNames.box}>
      <Typography className={classNames.boxTitle}>{`${t(TranslationKey.Box)} № ${box.humanFriendlyId}`}</Typography>
      <div>
        <div>
          {box.items.map((order, orderIndex) => (
            <div key={`box_${box._id}_${readOnly ? 1 : 0}_${index}`}>
              <div key={orderIndex} className={classNames.order}>
                <img className={classNames.img} src={getAmazonImageUrl(order.product.images[0])} />
                <div>
                  <div className={classNames.asinWrapper}>
                    <Typography className={classNames.asinTitle}>{t(TranslationKey.ASIN)}</Typography>

                    <div className={classNames.asinTextWrapper}>
                      <Typography className={classNames.asinValue}>{order.product.asin}</Typography>
                      {order.product.asin && <CopyValue text={order.product.asin} />}
                    </div>
                  </div>

                  <div className={classNames.asinWrapper}>
                    <Typography className={classNames.asinTitle}>{t(TranslationKey.Order)}</Typography>
                    <Typography className={classNames.asinValue}>{order.order.id}</Typography>
                  </div>

                  <Typography className={classNames.title}>
                    {getShortenStringIfLongerThanCount(order.product.amazonTitle, 85)}
                  </Typography>
                </div>

                <div>
                  <Field
                    disabled={!readOnly}
                    label={t(TranslationKey.Quantity)}
                    className={classNames.orderInput}
                    labelClasses={classNames.label}
                    value={order.amount}
                    tooltipInfoContent={t(TranslationKey['Number of product units in the box'])}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {showFullCard ? (
          <div className={classNames.itemSubWrapper}>
            <Field
              containerClasses={classNames.field}
              tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the USA, available for change"])}
              label={t(TranslationKey.Destination)}
              labelClasses={classNames.label}
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
              containerClasses={classNames.field}
              tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
              label={`${t(TranslationKey['Int warehouse'])} / ` + t(TranslationKey.Tariff)}
              labelClasses={classNames.label}
              inputComponent={
                <div>
                  <Typography className={classNames.storekeeperDisableBtn}>
                    {getNewTariffTextForBoxOrOrder(box)}
                  </Typography>
                </div>
              }
            />
            <Field
              disabled
              inputProps={{ maxLength: 255 }}
              tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
              containerClasses={classNames.field}
              labelClasses={classNames.label}
              className={classNames.fieldInput}
              label={t(TranslationKey['FBA Shipment'])}
              value={box.fbaShipment}
            />

            <LabelWithCopy
              direction="column"
              labelTitleColor="gray"
              lableLinkTitleSize="medium"
              labelTitle={t(TranslationKey['Shipping label'])}
              labelValue={box.shippingLabel}
              lableLinkTitle={t(TranslationKey.View)}
              labelWrapperStyles={classNames.labelWrapperStyles}
            />
          </div>
        ) : null}
      </div>
      <div className={classNames.bottomBlockWrapper}>
        <div className={classNames.incomingBtnWrapper}>
          <div className={classNames.tablePanelSortWrapper} onClick={() => setShowFullCard(!showFullCard)}>
            <Typography className={classNames.tablePanelViewText}>
              {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
            </Typography>

            {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
          </div>
        </div>
      </div>
    </div>
  )
}
