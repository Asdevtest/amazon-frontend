/* eslint-disable no-unused-vars */
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import React from 'react'

import {Divider, Typography, Button} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {t} from '@utils/translations'

import {useClassNames} from './left-panel.style'
import {ProductParameters} from './product-parameters'

export const LeftPanel = ({order, collapsed, narrow, setCollapsed}) => {
  const classNames = useClassNames()
  const copyValue = value => {
    navigator.clipboard.writeText(value)
  }
  return (
    <div className={classNames.orderContainer}>
      <div className={classNames.product}>
        <img alt="" className={classNames.productImg} src={getAmazonImageUrl(order.product.images[0])} />

        <div>
          <Typography className={classNames.amazonTitle}>{order.product.amazonTitle}</Typography>
          <div className={classNames.copyValueWrapper}>
            <Typography className={classNames.text}>
              <span className={classNames.asinTypo}>{t(TranslationKey.ASIN) + ': '}</span> {order.product.asin}
            </Typography>
            {order.product.asin ? (
              <img
                className={classNames.copyImg}
                src="/assets/icons/copy-img.svg"
                alt=""
                onClick={e => {
                  e.stopPropagation()
                  copyValue(order.product.asin)
                }}
              />
            ) : null}
          </div>
          <div className={classNames.copyValueWrapper}>
            <Typography className={classNames.text}>
              <span className={classNames.asinTypo}>{t(TranslationKey.SKU) + ': '}</span>{' '}
              {order.product.skusByClient?.length ? order.product.skusByClient.join(',') : t(TranslationKey.Missing)}
            </Typography>

            {order.product?.skusByClient.slice()[0] ? (
              <img
                className={classNames.copyImg}
                src="/assets/icons/copy-img.svg"
                alt=""
                onClick={e => {
                  e.stopPropagation()
                  copyValue(order.product.skusByClient.slice()[0])
                }}
              />
            ) : null}
          </div>
        </div>
      </div>

      <Button className={classNames.documentsButton} variant="outlined" endIcon={<CloudUploadIcon fontSize="small" />}>
        {t(TranslationKey.Documents)}
      </Button>

      <ProductParameters order={order} collapsed={collapsed} />

      <div className={classNames.collapsedWrapper} onClick={() => setCollapsed(!collapsed)}>
        <Typography className={classNames.containerTitle}>
          {!collapsed ? t(TranslationKey['All product parameters']) : t(TranslationKey.Collapse)}
        </Typography>
      </div>
      <Divider orientation={'horizontal'} className={classNames.divider} />
      {narrow && <Divider orientation={'horizontal'} className={classNames.lastDivider} />}
    </div>
  )
}
