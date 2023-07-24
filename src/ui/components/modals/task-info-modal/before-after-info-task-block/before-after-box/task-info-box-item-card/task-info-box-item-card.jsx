import React, { useState } from 'react'

import { Checkbox, Link, Paper, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'

import { calcMaxDeliveryForProduct, calcTotalFbaForProduct } from '@utils/calculation'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { checkAndMakeAbsoluteUrl, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './task-info-box-item-card.style'

export const TaskInfoBoxItemCard = ({ item, superCount }) => {
  const { classes: classNames } = useClassNames()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Paper className={classNames.root}>
      <div className={classNames.mainWrapper}>
        <div className={classNames.subWrapper}>
          <div>
            <img className={classNames.img} src={item.product.images[0] && getAmazonImageUrl(item.product.images[0])} />

            <Typography className={classNames.title}>{item.product.amazonTitle}</Typography>

            <Button className={classNames.moreBtn} onClick={() => setCollapsed(!collapsed)}>
              {!collapsed ? t(TranslationKey['All parameters']) : t(TranslationKey.Close)}
            </Button>
          </div>

          <div className={classNames.attributeWrapper}>
            <div className={classNames.countWrapper}>
              <Typography className={classNames.subTitle}>{t(TranslationKey.Quantity) + ':'}</Typography>
              <Input
                readOnly
                classes={{ root: classNames.inputWrapper, input: classNames.input }}
                value={item.amount}
              />
              {superCount > 1 && <Typography className={classNames.superCount}>{`x ${superCount}`}</Typography>}
            </div>

            <div className={classNames.chipWrapper}>
              <Typography className={classNames.subTitle}>{t(TranslationKey.BarCode) + ':'}</Typography>

              {item.barCode ? (
                <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(item.barCode)}>
                  <Typography className={classNames.barCodeField}>{item.barCode}</Typography>
                </Link>
              ) : (
                <Typography className={classNames.barCodeField}>{t(TranslationKey['Not available'])}</Typography>
              )}
            </div>

            {item.isBarCodeAttachedByTheStorekeeper ? (
              <Field
                oneLine
                label={t(TranslationKey['BarCode is glued by storekeeper'])}
                inputComponent={<Checkbox disabled checked={item.isBarCodeAttachedByTheStorekeeper} />}
              />
            ) : (
              <Field
                oneLine
                label={t(TranslationKey['BarCode is glued by supplier'])}
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
                label={t(TranslationKey.Material)}
                value={item.product.material || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={t(TranslationKey.Category)}
                value={item.product.category || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={t(TranslationKey.BSR)}
                value={item.product.bsr || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={t(TranslationKey['Amazon price'])}
                value={toFixed(item.product.amazon, 2) || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={t(TranslationKey['Width, inches'])}
                value={toFixed(item.product.width, 2) || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={t(TranslationKey['Height, inches'])}
                value={toFixed(item.product.height, 2) || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={t(TranslationKey['Length, inches'])}
                value={toFixed(item.product.length, 2) || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={t(TranslationKey['Weight, kg'])}
                value={toFixed(item.product.weight, 2) || ''}
              />
            </div>
            <div>
              <Field
                disabled
                className={classNames.field}
                label={t(TranslationKey['Min purchase price, $'])}
                value={toFixed(item.product.minpurchase, 2) || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={t(TranslationKey['Max delivery price, $'])}
                value={toFixed(calcMaxDeliveryForProduct(item.product), 2)}
              />
              <Field
                disabled
                className={classNames.field}
                label={t(TranslationKey['Referral fee, $'])}
                value={toFixed(item.product.reffee, 2) || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={t(TranslationKey['FBA fee , $'])}
                value={toFixed(item.product.fbafee, 2) || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={t(TranslationKey['Total FBA, $'])}
                value={toFixed(calcTotalFbaForProduct(item.product), 2)}
              />
              <Field
                disabled
                className={classNames.field}
                label={t(TranslationKey['Recommended batch'])}
                value={item.product.fbaamount || ''}
              />
              <Field
                disabled
                className={classNames.field}
                label={t(TranslationKey['Profit, $'])}
                value={toFixed(item.product.profit, 2) || 0}
              />
              <Field
                disabled
                className={classNames.field}
                label={t(TranslationKey['Margin, %'])}
                value={toFixed(item.product.margin, 2) || 0}
              />
            </div>
          </div>
        )}
      </div>
    </Paper>
  )
}
