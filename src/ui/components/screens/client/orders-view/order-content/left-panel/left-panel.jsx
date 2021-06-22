import React from 'react'

import {Divider, Grid, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './left-panel.style'
import {Parameters} from './parameters'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderLeftPanel

export const LeftPanel = ({order, collapsed, narrow, setCollapsed}) => {
  const classNames = useClassNames()

  return (
    <Grid item xs={12} className={(classNames.orderContainer, classNames.orderBorderRightMdUp)}>
      <div className={classNames.product}>
        <img
          alt=""
          className={classNames.productImg}
          src={order.product.images && order.product.images[0] && getAmazonImageUrl(order.product.images[0])}
        />
        <div>
          <Typography className={(classNames.containerTitle, classNames.csCodeTypo)}>{order.product.csCode}</Typography>
          <Typography className={classNames.text}>
            <span className={classNames.asinTypo}>{textConsts.id}</span> {order.product.id}
          </Typography>
        </div>
      </div>

      <Divider orientation={'horizontal'} className={classNames.divider} />

      <Parameters order={order} collapsed={collapsed} />

      <Divider orientation={'horizontal'} className={classNames.divider} />

      <div className={classNames.collapsedWrapper} onClick={() => setCollapsed(!collapsed)}>
        <Typography className={classNames.containerTitle}>
          {!collapsed ? textConsts.allParameters : textConsts.close}
        </Typography>
      </div>
      {narrow && <Divider orientation={'horizontal'} className={classNames.lastDivider} />}
    </Grid>
  )
}
