import React from 'react'

import {Divider, Grid} from '@material-ui/core'

import {Comments} from './comments'
import {Delivery} from './delivery'
import {Info} from './info'
import {useClassNames} from './right-panel.style'

export const RightPanel = ({order, deliveryType, setDeliveryType, deliveryTypes}) => {
  const classNames = useClassNames()

  return (
    <Grid item xs={12} md={8} className={classNames.orderContainer}>
      <div className={classNames.deliveryInfoWrapper}>
        <Delivery deliveryType={deliveryType} setDeliveryType={setDeliveryType} deliveryTypes={deliveryTypes} />

        <Divider flexItem orientation={'vertical'} className={classNames.verticalDivider} />

        <Info order={order} />
      </div>

      <Divider orientation={'horizontal'} className={classNames.horizontalDivider} />

      <Comments />
    </Grid>
  )
}
