import React, {useState} from 'react'

import {Container, Divider, Grid, Typography, Hidden, useTheme, useMediaQuery, Paper} from '@material-ui/core'

import {getOrderStatusOptionByCode} from '@constants/order-status'

import {LeftPanel} from './left-panel'
import {useClassNames} from './order-content.style'
import {RightPanel} from './right-panel'

const MEDIA_SCALE_POINTS = '1812'

export const OrderContent = ({order, deliveryOptions}) => {
  const classNames = useClassNames()

  const [collapsed, setCollapsed] = useState(false)
  const [deliveryType, setDeliveryType] = useState(false)
  const theme = useTheme()
  const narrow = useMediaQuery(theme.breakpoints.down(MEDIA_SCALE_POINTS))

  return (
    <Paper>
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={0}>
          <Grid item xs={12} className={classNames.orderContainer}>
            <Typography className={classNames.containerTitle}>
              {getOrderStatusOptionByCode(order.status).label}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider orientation={'horizontal'} />
          </Grid>

          <LeftPanel order={order} collapsed={collapsed} narrow={narrow} setCollapsed={setCollapsed} />

          <Hidden mdUp>
            <Grid item xs={12}>
              <Divider orientation={'horizontal'} />
            </Grid>
          </Hidden>

          <RightPanel
            order={order}
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType}
            deliveryOptions={deliveryOptions}
          />
        </Grid>
      </Container>
    </Paper>
  )
}
