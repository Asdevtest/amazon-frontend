import React from 'react'

import {Divider, Typography, Button} from '@material-ui/core'
import LaunchIcon from '@material-ui/icons/Launch'

import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {t} from '@utils/translations'

import {useClassNames} from './left-panel.style'
import {ProductParameters} from './product-parameters'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderLeftPanel

export const LeftPanel = ({order, collapsed, narrow, setCollapsed}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.orderContainer}>
      <div className={classNames.product}>
        <img alt="" className={classNames.productImg} src={getAmazonImageUrl(order.product.images[0])} />
        <div>
          <Typography className={classNames.amazonTitle}>{order.product.amazonTitle}</Typography>
          <Typography className={classNames.text}>
            <span className={classNames.asinTypo}>{textConsts.id}</span> {order.product.asin}
          </Typography>
        </div>
      </div>

      <Divider orientation={'horizontal'} className={classNames.divider} />

      <Button className={classNames.documentsButton} variant="outlined" endIcon={<LaunchIcon fontSize="small" />}>
        {t(TranslationKey.Documents)}
      </Button>

      <ProductParameters order={order} collapsed={collapsed} />

      <Divider orientation={'horizontal'} className={classNames.divider} />

      <div className={classNames.collapsedWrapper} onClick={() => setCollapsed(!collapsed)}>
        <Typography className={classNames.containerTitle}>
          {!collapsed ? t(TranslationKey['All product parameters']) : t(TranslationKey.Collapse)}
        </Typography>
      </div>
      {narrow && <Divider orientation={'horizontal'} className={classNames.lastDivider} />}
    </div>
  )
}
