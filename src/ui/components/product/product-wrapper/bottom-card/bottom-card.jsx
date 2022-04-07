import React from 'react'

import {Grid, Typography, Paper} from '@material-ui/core'
import {observer} from 'mobx-react'

import {ProductStatus, ProductStatusByCode, ProductStatusByKey} from '@constants/product-status'
import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {checkIsClient, checkIsResearcher, checkIsSupervisor} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixed} from '@utils/text'

import {useClassNames} from './bottom-card.style'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

export const BottomCard = observer(({curUserRole, product, productBase, onChangeField, formFieldsValidationErrors}) => {
  const classNames = useClassNames()

  const clientCanEdit =
    checkIsClient(curUserRole) &&
    product.isCreatedByClient &&
    clientToEditStatuses.includes(productBase.status) &&
    !product.archive

  const defaultFieldDisable = !(checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole) || clientCanEdit)

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item sm={7} xs={12}>
          <Paper className={classNames.cardPadding}>
            <Field
              disabled={
                !(
                  checkIsClient(curUserRole) &&
                  product.isCreatedByClient &&
                  clientToEditStatuses.includes(productBase.status)
                ) || product.archive
              }
              inputProps={{maxLength: 50}}
              label={textConsts.category}
              value={product.category || ''}
              onChange={onChangeField('category')}
            />
            <Field
              disabled={defaultFieldDisable}
              error={formFieldsValidationErrors.bsr}
              label={textConsts.bsr}
              inputProps={{maxLength: 15}}
              value={product.bsr || 0}
              onChange={onChangeField('bsr')}
            />
            <Field
              disabled={defaultFieldDisable}
              inputProps={{maxLength: 12}}
              label={textConsts.amazonPrice}
              error={formFieldsValidationErrors.amazon}
              value={product.amazon === 0 ? 0 : product.amazon || ''}
              onChange={onChangeField('amazon')}
            />
            <Field
              disabled={defaultFieldDisable}
              error={formFieldsValidationErrors.width}
              inputProps={{maxLength: 15}}
              label={textConsts.fieldWidth}
              value={product.width === 0 ? 0 : toFixed(product.width, 5) || ''}
              onChange={onChangeField('width')}
            />
            <Field
              disabled={defaultFieldDisable}
              error={formFieldsValidationErrors.height}
              inputProps={{maxLength: 15}}
              label={textConsts.fieldHeight}
              value={product.height === 0 ? 0 : toFixed(product.height, 5) || ''}
              onChange={onChangeField('height')}
            />
            <Field
              disabled={defaultFieldDisable}
              error={formFieldsValidationErrors.length}
              inputProps={{maxLength: 15}}
              label={textConsts.fieldLength}
              value={product.length === 0 ? 0 : toFixed(product.length, 5) || ''}
              onChange={onChangeField('length')}
            />
            <Field
              disabled={defaultFieldDisable}
              error={formFieldsValidationErrors.weight}
              inputProps={{maxLength: 15}}
              label={textConsts.fieldWeight}
              value={product.weight === 0 ? 0 : toFixed(product.weight, 5) || ''}
              onChange={onChangeField('weight')}
            />

            <Field
              disabled
              error={formFieldsValidationErrors.minpurchase}
              inputProps={{maxLength: 15}}
              label={textConsts.minpurchase}
              value={product.minpurchase === 0 ? 0 : toFixed(product.minpurchase, 2) || ''}
              onChange={onChangeField('minpurchase')}
            />
            <Field
              disabled
              error={formFieldsValidationErrors.maxDelivery}
              label={textConsts.maxDeliveryPrice}
              value={product.maxDelivery === 0 ? 0 : toFixed(product.maxDelivery, 2) || 0}
              onChange={onChangeField('maxDelivery')}
            />
            <Field
              disabled
              error={formFieldsValidationErrors.reffee}
              label={textConsts.refferalFee}
              value={product.reffee === 0 ? 0 : toFixed(product.reffee, 2) || ''}
              onChange={onChangeField('reffee')}
            />
            <Field
              disabled={defaultFieldDisable}
              error={formFieldsValidationErrors.fbafee}
              inputProps={{maxLength: 15}}
              label={textConsts.fbaFee}
              value={product.fbafee === 0 ? 0 : toFixed(product.fbafee, 2) || ''}
              onChange={onChangeField('fbafee')}
            />
            <Field
              disabled
              error={formFieldsValidationErrors.totalFba}
              label={textConsts.totalFba}
              value={product.totalFba === 0 ? 0 : toFixed(product.totalFba, 2) || ''}
              onChange={onChangeField('totalFba')}
            />
            <Field
              disabled={defaultFieldDisable}
              error={formFieldsValidationErrors.fbaamount}
              inputProps={{maxLength: 15}}
              label={textConsts.recommendedBatch}
              value={product.fbaamount === 0 ? 0 : product.fbaamount || ''}
              onChange={onChangeField('fbaamount')}
            />
            <Field
              disabled
              error={formFieldsValidationErrors.profit}
              label={textConsts.revenue}
              value={toFixed(product.profit, 2) || 0}
              onChange={onChangeField('profit')}
            />
            <Field
              disabled
              error={formFieldsValidationErrors.margin}
              label={textConsts.fieldMargin}
              value={toFixed(product.margin, 2) || 0}
              onChange={onChangeField('margin')}
            />
            <Field
              disabled
              error={formFieldsValidationErrors.status}
              label={textConsts.fieldStatus}
              value={ProductStatusByCode[product.status]}
              onChange={onChangeField('status')}
            />
          </Paper>
        </Grid>
        <Grid item sm={5} xs={12}>
          <Paper className={classNames.cardPadding}>
            <Typography className={classNames.title}>{textConsts.descriptionOFGoods}</Typography>
            <Field
              disabled={!clientCanEdit}
              label={textConsts.csCode}
              value={product.amazonTitle || ''}
              onChange={onChangeField('amazonTitle')}
            />

            <Field
              multiline
              disabled={!clientCanEdit}
              className={classNames.heightFieldAuto}
              rows={4}
              rowsMax={6}
              label={textConsts.summary}
              value={product.amazonDescription || ''}
              onChange={onChangeField('amazonDescription')}
            />

            <Field
              multiline
              disabled={!clientCanEdit}
              className={classNames.heightFieldAuto}
              rows={4}
              rowsMax={6}
              label={textConsts.description}
              value={product.amazonDetail || ''}
              onChange={onChangeField('amazonDetail')}
            />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
})
