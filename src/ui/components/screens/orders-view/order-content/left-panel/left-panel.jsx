import React from 'react'

import {Divider, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './left-panel.style'
import {Parameters} from './parameters'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderLeftPanel

export const LeftPanel = ({order, collapsed, narrow, setCollapsed}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.orderContainer}>
      <div className={classNames.product}>
        <img alt="" className={classNames.productImg} src={getAmazonImageUrl(order.product.images[0])} />
        <div>
          <Typography>{order.product.amazonTitle}</Typography>
          <Typography className={classNames.text}>
            <span className={classNames.asinTypo}>{textConsts.id}</span> {order.product.asin}
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
    </div>
  )
}
