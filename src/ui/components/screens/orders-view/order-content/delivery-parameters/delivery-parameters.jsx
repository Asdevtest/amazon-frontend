import React from 'react'

import {Typography} from '@material-ui/core'

import {Field} from '@components/field'

import {formatDateWithoutTime} from '@utils/date-time'

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
        <OrderParameter label={'Storekeeper'} value={order.storekeeper.name} />
        <OrderParameter label={'Tarif'} value={order.logicsTariff?.name} />
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
    </div>
  )
}
