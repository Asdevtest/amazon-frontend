import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

import React, {useState} from 'react'

import {NativeSelect, Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Field} from '@components/field/field'
import {Input} from '@components/input'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getFullTariffTextForBoxOrOrder} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './box-for-merge.style'

export const BoxForMerge = ({box, readOnly = false, index}) => {
  const classNames = useClassNames()
  const [showFullCard, setShowFullCard] = useState(false)

  return (
    <div className={classNames.box}>
      <Typography className={classNames.boxTitle}>{`${t(TranslationKey.Box)} № ${box.humanFriendlyId}`}</Typography>
      <div className={classNames.itemsWrapper}>
        <div>
          {box.items.map((order, orderIndex) => (
            <div key={`box_${box._id}_${readOnly ? 1 : 0}_${index}`}>
              <div key={orderIndex} className={classNames.order}>
                <img className={classNames.img} src={getAmazonImageUrl(order.product.images[0])} />
                <div>
                  <div className={classNames.asinWrapper}>
                    <Typography className={classNames.asinTitle}>{t(TranslationKey.ASIN)}</Typography>
                    <Typography className={classNames.asinValue}>{order.product.asin}</Typography>
                  </div>

                  <Typography className={classNames.title}>{order.product.amazonTitle}</Typography>
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
                <NativeSelect
                  disabled
                  variant="filled"
                  className={classNames.destinationSelect}
                  input={<Input />}
                  value={box.destination?.name}
                >
                  <option value={''}>{'none'}</option>

                  <option>{box.destination?.name}</option>
                </NativeSelect>
              }
            />
            <Field
              containerClasses={classNames.field}
              tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
              label={`${t(TranslationKey['Int warehouse'])} / ` + t(TranslationKey.Tariff)}
              labelClasses={classNames.label}
              inputComponent={
                <div>
                  <Typography className={classNames.storekeeperDisableBtn}>{`${
                    box.storekeeper?.name
                  } / ${getFullTariffTextForBoxOrOrder(box)}`}</Typography>
                </div>
              }
            />
            <Field
              disabled
              inputProps={{maxLength: 255}}
              tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
              containerClasses={classNames.field}
              labelClasses={classNames.label}
              className={classNames.fieldInput}
              label={t(TranslationKey['FBA Shipment'])}
              value={box.fbaShipment}
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
