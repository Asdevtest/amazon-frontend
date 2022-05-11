import React from 'react'

import {Typography} from '@material-ui/core'

import {UserLinkCell} from '@components/data-grid-cells/data-grid-cells'
import {Field} from '@components/field'

import {formatDateWithoutTime} from '@utils/date-time'
import {getFullTariffTextForBoxOrOrder} from '@utils/text'

// import {texts} from '@constants/texts'
// import {getLocalizedTexts} from '@utils/get-localized-texts'
import {useClassNames} from './delivery-parameters.style'

// const textConsts = getLocalizedTexts(texts, 'ru').clientOrderParameters

export const DeliveryParameters = ({order}) => {
  const classNames = useClassNames()

  const OrderParameter = ({label, value}) => (
    <Field
      oneLine
      label={label}
      containerClasses={classNames.parameterTableCellWrapper}
      labelClasses={classNames.fieldLabel}
      inputComponent={<Typography className={classNames.text}>{value || 'N/A'}</Typography>}
    />
  )

  return (
    <div className={classNames.root}>
      <div className={classNames.destinationWrapper}>
        <OrderParameter label={'Destination'} value={order.destination.name} />
        <OrderParameter label={'Zip Code'} value={order.destination.zipCode} />
        <OrderParameter label={'Country'} value={order.destination.country} />
        <OrderParameter label={'City'} value={order.destination.city} />
        <OrderParameter label={'State'} value={order.destination.state} />
        <OrderParameter label={'Address'} value={order.destination.address} />
      </div>

      <div className={classNames.storekeeperWrapper}>
        <Field
          oneLine
          label={'Storekeeper'}
          containerClasses={classNames.parameterTableCellWrapper}
          labelClasses={classNames.fieldLabel}
          inputComponent={<UserLinkCell name={order.storekeeper?.name} userId={order.storekeeper?._id} />}
        />

        <OrderParameter label={'Tariff'} value={getFullTariffTextForBoxOrOrder(order)} />

        <OrderParameter
          label={'ETD (Дата отправки)'}
          value={order.logicsTariff?.etd && formatDateWithoutTime(order.logicsTariff?.etd)}
        />
        <OrderParameter
          label={'ETA (Дата прибытия)'}
          value={order.logicsTariff?.eta && formatDateWithoutTime(order.logicsTariff?.eta)}
        />
        <OrderParameter
          label={'CLS (Дата закрытия партии)'}
          value={order.logicsTariff?.cls && formatDateWithoutTime(order.logicsTariff?.cls)}
        />
      </div>

      <div className={classNames.buyerWrapper}>
        <Field
          oneLine
          label={'Buyer'}
          containerClasses={classNames.parameterTableCellWrapper}
          labelClasses={classNames.fieldLabel}
          inputComponent={<UserLinkCell name={order.buyer?.name} userId={order.buyer?._id} />}
        />
      </div>
    </div>
  )
}
