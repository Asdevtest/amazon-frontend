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
    checkIsClient(curUserRole) && product.isCreatedByClient && clientToEditStatuses.includes(productBase.status)

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
                )
              }
              inputProps={{maxLength: 200}}
              label={textConsts.category}
              value={product.category || ''}
              onChange={onChangeField('category')}
            />
            <Field
              disabled={defaultFieldDisable}
              error={formFieldsValidationErrors.bsr}
              label={textConsts.bsr}
              value={product.bsr || 0}
              onChange={onChangeField('bsr')}
            />
            <Field
              disabled={defaultFieldDisable}
              label={textConsts.amazonPrice}
              error={formFieldsValidationErrors.amazon}
              value={product.amazon || ''}
              onChange={onChangeField('amazon')}
            />
            <Field
              disabled={defaultFieldDisable}
              error={formFieldsValidationErrors.width}
              label={textConsts.fieldWidth}
              value={toFixed(product.width, 2) || ''}
              onChange={onChangeField('width')}
            />
            <Field
              disabled={defaultFieldDisable}
              error={formFieldsValidationErrors.height}
              label={textConsts.fieldHeight}
              value={toFixed(product.height, 2) || ''}
              onChange={onChangeField('height')}
            />
            <Field
              disabled={defaultFieldDisable}
              error={formFieldsValidationErrors.length}
              label={textConsts.fieldLength}
              value={toFixed(product.length, 2) || ''}
              onChange={onChangeField('length')}
            />
            <Field
              disabled={defaultFieldDisable}
              error={formFieldsValidationErrors.weight}
              label={textConsts.fieldWeight}
              value={toFixed(product.weight, 2) || ''}
              onChange={onChangeField('weight')}
            />

            <Field
              disabled
              error={formFieldsValidationErrors.minpurchase}
              label={textConsts.minpurchase}
              value={toFixed(product.minpurchase, 2) || ''}
              onChange={onChangeField('minpurchase')}
            />
            <Field
              disabled
              error={formFieldsValidationErrors.maxDelivery}
              label={textConsts.maxDeliveryPrice}
              value={toFixed(product.maxDelivery, 2) || 0}
              onChange={onChangeField('maxDelivery')}
            />
            <Field
              disabled
              error={formFieldsValidationErrors.reffee}
              label={textConsts.refferalFee}
              value={toFixed(product.reffee, 2) || ''}
              onChange={onChangeField('reffee')}
            />
            <Field
              disabled={defaultFieldDisable}
              error={formFieldsValidationErrors.fbafee}
              label={textConsts.fbaFee}
              value={toFixed(product.fbafee, 2) || ''}
              onChange={onChangeField('fbafee')}
            />
            <Field
              disabled
              error={formFieldsValidationErrors.totalFba}
              label={textConsts.totalFba}
              value={toFixed(product.totalFba, 2) || ''}
              onChange={onChangeField('totalFba')}
            />
            <Field
              disabled={defaultFieldDisable}
              error={formFieldsValidationErrors.fbaamount}
              label={textConsts.recommendedBatch}
              value={product.fbaamount || ''}
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
