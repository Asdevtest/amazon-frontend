import React, {useState} from 'react'

import {Paper, Typography, Checkbox, Link} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Input} from '@components/input'

import {calcMaxDeliveryForProduct, calcTotalFbaForProduct} from '@utils/calculation'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {checkAndMakeAbsoluteUrl, toFixed} from '@utils/text'

import {useClassNames} from './task-info-box-item-card.style'

const textConsts = getLocalizedTexts(texts, 'ru').taskInfoBoxItemCard

export const TaskInfoBoxItemCard = ({item, superCount}) => {
  const classNames = useClassNames()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Paper className={classNames.root}>
      <div className={classNames.mainWrapper}>
        <div className={classNames.subWrapper}>
          <div>
            <img className={classNames.img} src={item.product.images[0] && getAmazonImageUrl(item.product.images[0])} />

            <Typography className={classNames.title}>{item.product.amazonTitle}</Typography>

            <Button className={classNames.moreBtn} onClick={() => setCollapsed(!collapsed)}>
              {!collapsed ? textConsts.allParameters : textConsts.close}
            </Button>
          </div>

          <div className={classNames.attributeWrapper}>
            <div className={classNames.countWrapper}>
              <Typography className={classNames.subTitle}>{textConsts.count}</Typography>
              <Input readOnly classes={{root: classNames.inputWrapper, input: classNames.input}} value={item.amount} />
              {superCount > 1 && <Typography className={classNames.superCount}>{`x ${superCount}`}</Typography>}
            </div>

            <div className={classNames.chipWrapper}>
              <Typography className={classNames.subTitle}>{textConsts.barCode}</Typography>

              {item.barCode ? (
                <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(item.barCode)}>
                  <Typography className={classNames.barCodeField}>{item.barCode}</Typography>
                </Link>
              ) : (
                <Typography className={classNames.barCodeField}>{'N/A'}</Typography>
              )}
            </div>

            {item.isBarCodeAttachedByTheStorekeeper ? (
              <Field
                oneLine
                label={textConsts.isBarCodeAttachedByTheStorekeeper}
                inputComponent={<Checkbox disabled checked={item.isBarCodeAttachedByTheStorekeeper} />}
              />
            ) : (
              <Field
                oneLine
                label={textConsts.codeCheck}
                inputComponent={<Checkbox disabled checked={item.isBarCodeAlreadyAttachedByTheSupplier} />}
              />
            )}
          </div>
        </div>

        {collapsed && (
          <div className={classNames.fieldsWrapper}>
            <div>
              <Field
                disabled
                className={classNames.field}
                label={textConsts.material}
                value={item.product.material || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={textConsts.category}
                value={item.product.category || ''}
              />
              <Field disabled className={classNames.field} label={textConsts.bsr} value={item.product.bsr || ''} />
              <Field
                disabled
                className={classNames.field}
                label={textConsts.amazonPrice}
                value={toFixed(item.product.amazon, 2) || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={textConsts.fieldWidth}
                value={toFixed(item.product.width, 2) || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={textConsts.fieldHeight}
                value={toFixed(item.product.height, 2) || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={textConsts.fieldLength}
                value={toFixed(item.product.length, 2) || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={textConsts.fieldWeight}
                value={toFixed(item.product.weight, 2) || ''}
              />
            </div>
            <div>
              <Field
                disabled
                className={classNames.field}
                label={textConsts.minpurchase}
                value={toFixed(item.product.minpurchase, 2) || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={textConsts.maxDeliveryPrice}
                value={toFixed(calcMaxDeliveryForProduct(item.product), 2)}
              />
              <Field
                disabled
                className={classNames.field}
                label={textConsts.refferalFee}
                value={toFixed(item.product.reffee, 2) || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={textConsts.fbaFee}
                value={toFixed(item.product.fbafee, 2) || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={textConsts.totalFba}
                value={toFixed(calcTotalFbaForProduct(item.product), 2)}
              />
              <Field
                disabled
                className={classNames.field}
                label={textConsts.recommendedBatch}
                value={item.product.fbaamount || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={textConsts.revenue}
                value={toFixed(item.product.profit, 2) || 0}
              />
              <Field
                disabled
                className={classNames.field}
                label={textConsts.fieldMargin}
                value={toFixed(item.product.margin, 2) || 0}
              />
            </div>
          </div>
        )}
      </div>
    </Paper>
  )
}
