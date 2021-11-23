import React, {useState} from 'react'

import {Paper, Typography, Checkbox} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Input} from '@components/input'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './task-info-box-item-card.style'

const textConsts = getLocalizedTexts(texts, 'ru').taskInfoBoxItemCard

export const TaskInfoBoxItemCard = ({item, superCount, box}) => {
  const classNames = useClassNames()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Paper className={classNames.root}>
      <div className={classNames.mainWrapper}>
        <div>
          <img className={classNames.img} src={item.product.images[0] && getAmazonImageUrl(item.product.images[0])} />

          <Typography className={classNames.title}>{item.product.amazonTitle}</Typography>

          <Button className={classNames.moreBtn} onClick={() => setCollapsed(!collapsed)}>
            {!collapsed ? textConsts.allParameters : textConsts.close}
          </Button>

          {collapsed && (
            <div className={classNames.fieldsWrapper}>
              <div>
                <Field disabled label={textConsts.material} value={item.product.material || ''} />
                <Field disabled label={textConsts.category} value={item.product.category || ''} />
                <Field disabled label={textConsts.bsr} value={item.product.bsr || ''} />
                <Field disabled label={textConsts.amazonPrice} value={item.product.amazon || ''} />
                <Field disabled label={textConsts.fieldWidth} value={item.product.width || ''} />
                <Field disabled label={textConsts.fieldHeight} value={item.product.height || ''} />
                <Field disabled label={textConsts.fieldLength} value={item.product.length || ''} />
                <Field disabled label={textConsts.fieldWeight} value={item.product.weight || ''} />
              </div>
              <div>
                <Field disabled label={textConsts.minpurchase} value={item.product.minpurchase || ''} />
                <Field disabled label={textConsts.maxDeliveryPrice} value={item.product.maxDelivery || 0} />
                <Field disabled label={textConsts.refferalFee} value={item.product.reffee || ''} />
                <Field disabled label={textConsts.fbaFee} value={item.product.fbafee || ''} />
                <Field disabled label={textConsts.totalFba} value={item.product.totalFba || ''} />
                <Field disabled label={textConsts.recommendedBatch} value={item.product.fbaamount || ''} />
                <Field disabled label={textConsts.revenue} value={item.product.profit || 0} />
                <Field disabled label={textConsts.fieldMargin} value={item.product.margin || 0} />
              </div>
            </div>
          )}
        </div>

        <div className={classNames.attributeWrapper}>
          <div className={classNames.countWrapper}>
            <Typography className={classNames.subTitle}>{textConsts.count}</Typography>
            <Input readOnly classes={{root: classNames.inputWrapper, input: classNames.input}} value={item.amount} />
            {superCount > 1 && <Typography className={classNames.superCount}>{`x ${superCount}`}</Typography>}
          </div>

          <div className={classNames.chipWrapper}>
            <Typography className={classNames.subTitle}>{textConsts.barCode}</Typography>
            <Typography className={classNames.barCodeField}>{item.product.barCode || 'N/A'}</Typography>
          </div>

          {box.isBarCodeAttachedByTheStorekeeper ? (
            <Field
              oneLine
              label={textConsts.isBarCodeAttachedByTheStorekeeper}
              inputComponent={<Checkbox disabled checked={box.isBarCodeAttachedByTheStorekeeper} />}
            />
          ) : (
            <Field
              oneLine
              label={textConsts.codeCheck}
              inputComponent={<Checkbox disabled checked={item.order.isBarCodeAlreadyAttachedByTheSupplier} />}
            />
          )}
        </div>
      </div>
    </Paper>
  )
}
