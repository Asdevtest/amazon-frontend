import React from 'react'

import {Avatar, Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Field} from '@components/field'
import {UserLink} from '@components/user-link'

import {formatDateWithoutTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {getFullTariffTextForBoxOrOrder} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './delivery-parameters.style'

export const DeliveryParameters = ({order}) => {
  const classNames = useClassNames()

  const OrderParameter = ({label, value, tooltipText}) => (
    <Field
      oneLine
      tooltipInfoContent={tooltipText}
      label={label}
      containerClasses={classNames.parameterTableCellWrapper}
      labelClasses={classNames.fieldLabel}
      inputComponent={<Typography className={classNames.text}>{value || ''}</Typography>}
    />
  )

  return (
    <div className={classNames.root}>
      <div className={classNames.destinationWrapper}>
        <OrderParameter
          tooltipText={t(TranslationKey["Amazon's final warehouse in the United States"])}
          label={t(TranslationKey.Destination)}
          value={order.destination?.name || t(TranslationKey['Not chosen'])}
        />
        <OrderParameter label={'Zip Code'} value={order.destination?.zipCode} />
        <OrderParameter label={t(TranslationKey.Country)} value={order.destination?.country} />
        <OrderParameter label={t(TranslationKey.City)} value={order.destination?.city} />
        <OrderParameter label={t(TranslationKey.State)} value={order.destination?.state} />
        <OrderParameter label={t(TranslationKey.Address)} value={order.destination?.address} />
      </div>

      <div className={classNames.storekeeperWrapper}>
        <Field
          oneLine
          label={t(TranslationKey['Int warehouse'])}
          tooltipInfoContent={t(TranslationKey['Prep Center in China'])}
          containerClasses={classNames.parameterTableCellWrapper}
          labelClasses={classNames.fieldLabel}
          inputComponent={
            <div className={classNames.intWarehouseWrapper}>
              <Avatar className={classNames.avatar} src={getUserAvatarSrc(order.storekeeper?._id)} />
              <UserLink blackText name={order.storekeeper?.name} userId={order.storekeeper?._id} />
            </div>
          }
        />

        <OrderParameter
          tooltipText={t(TranslationKey['Rate selected for delivery to the final Amazon warehouse in the USA'])}
          label={t(TranslationKey.Tariff)}
          value={getFullTariffTextForBoxOrOrder(order)}
        />

        <OrderParameter
          label={t(TranslationKey['CLS (batch closing date)'])}
          value={order.logicsTariff?.cls && formatDateWithoutTime(order.logicsTariff?.cls)}
        />

        <OrderParameter
          label={t(TranslationKey['ETD (date of shipment)'])}
          value={order.logicsTariff?.etd && formatDateWithoutTime(order.logicsTariff?.etd)}
        />
        <OrderParameter
          label={t(TranslationKey['ETA (arrival date)'])}
          value={order.logicsTariff?.eta && formatDateWithoutTime(order.logicsTariff?.eta)}
        />
      </div>

      <div className={classNames.buyerWrapper}>
        <Field
          oneLine
          label={t(TranslationKey.Buyer)}
          tooltipInfoContent={t(
            TranslationKey['Buyer with whom the order is being processed / Buyer assigned to the order'],
          )}
          containerClasses={classNames.parameterTableCellWrapper}
          labelClasses={classNames.fieldLabel}
          inputComponent={
            <div className={classNames.intWarehouseWrapper}>
              <Avatar className={classNames.avatar} src={getUserAvatarSrc(order.buyer?._idv)} />
              <UserLink blackText name={order.buyer?.name} userId={order.buyer?._id} />
            </div>
          }
        />
      </div>
    </div>
  )
}
