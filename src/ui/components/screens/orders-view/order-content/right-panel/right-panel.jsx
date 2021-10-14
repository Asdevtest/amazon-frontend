import React from 'react'

import {Divider} from '@material-ui/core'

import {Comments} from './comments'
import {Delivery} from './delivery'
import {Info} from './info'
import {useClassNames} from './right-panel.style'

export const RightPanel = ({order, deliveryType, setDeliveryType, deliveryOptions}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.orderContainer}>
      <div className={classNames.deliveryInfoWrapper}>
        <Info order={order} />

        <Divider flexItem orientation={'vertical'} className={classNames.verticalDivider} />

        <Delivery
          order={order}
          deliveryType={deliveryType}
          setDeliveryType={setDeliveryType}
          deliveryOptions={deliveryOptions}
        />
      </div>

      <Divider orientation={'horizontal'} className={classNames.horizontalDivider} />

      <Comments order={order} />
    </div>
  )
}
