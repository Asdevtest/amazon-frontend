import { observer } from 'mobx-react'
import React from 'react'

import { Grid, Paper, Typography } from '@mui/material'

import {
  ProductStatus,
  ProductStatusByCode,
  ProductStatusByKey,
  colorByProductStatus,
  productStatusTranslateKey,
} from '@constants/product/product-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'

import { checkIsClient, checkIsResearcher, checkIsSupervisor } from '@utils/checks'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { errorMessagesTranslate } from '@utils/validation'

import { useClassNames } from './bottom-card.style'

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

export const BottomCard = observer(
  ({ curUserRole, product, productBase, onChangeField, formFieldsValidationErrors }) => {
    const { classes: classNames } = useClassNames()

    const clientCanEdit =
      checkIsClient(curUserRole) &&
      product.isCreatedByClient &&
      clientToEditStatuses.includes(productBase.status) &&
      !product.archive

    const defaultFieldDisable = !(checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole) || clientCanEdit)

    return (
      <>
        <Grid container spacing={2}>
          <Grid item sm={7} xs={12}>
            <Paper className={classNames.cardPadding}>
              <Typography className={classNames.title}>
                {t(TranslationKey['Product information']).toUpperCase()}
              </Typography>

              <div className={classNames.infoWrapper}>
                <div className={classNames.infoSubWrapper}>
                  <Field
                    disabled={defaultFieldDisable}
                    inputProps={{ maxLength: 12 }}
                    containerClasses={classNames.infoContainer}
                    inputClasses={classNames.infoInput}
                    label={t(TranslationKey['Amazon price']) + '*'}
                    error={errorMessagesTranslate(formFieldsValidationErrors.amazon)}
                    value={product.amazon === 0 ? 0 : product.amazon || ''}
                    onChange={onChangeField('amazon')}
                  />

                  <Field
                    disabled={defaultFieldDisable}
                    error={errorMessagesTranslate(formFieldsValidationErrors.weight)}
                    containerClasses={classNames.infoContainer}
                    inputClasses={classNames.infoInput}
                    inputProps={{ maxLength: 15 }}
                    label={t(TranslationKey['Weight, kg']) + '*'}
                    value={product.weight === 0 ? 0 : toFixed(product.weight, 5) || ''}
                    onChange={onChangeField('weight')}
                  />
                </div>
                <div className={classNames.infoSubWrapper}>
                  <Field
                    disabled
                    tooltipInfoContent={t(TranslationKey['Amazon Fee'])}
                    error={formFieldsValidationErrors.totalFba}
                    containerClasses={classNames.infoContainer}
                    inputClasses={classNames.infoInput}
                    label={t(TranslationKey['Total FBA, $'])}
                    value={product.totalFba === 0 ? 0 : toFixed(product.totalFba, 2) || ''}
                    onChange={onChangeField('totalFba')}
                  />

                  <Field
                    tooltipInfoContent={t(TranslationKey['Recommended amount of products for purchase'])}
                    disabled={defaultFieldDisable}
                    error={errorMessagesTranslate(formFieldsValidationErrors.fbaamount)}
                    containerClasses={classNames.infoContainer}
                    inputClasses={classNames.infoInput}
                    inputProps={{ maxLength: 15 }}
                    label={t(TranslationKey['Recommended batch']) + ', FBA*'}
                    value={product.fbaamount === 0 ? 0 : product.fbaamount || ''}
                    onChange={onChangeField('fbaamount')}
                  />
                </div>
              </div>

              <div className={classNames.infoWrapper}>
                <div className={classNames.infoSubWrapper}>
                  <Field
                    tooltipInfoContent={t(TranslationKey['Category the product is in on Amazon'])}
                    disabled={defaultFieldDisable}
                    containerClasses={classNames.infoContainer}
                    inputClasses={classNames.infoInput}
                    inputProps={{ maxLength: 50 }}
                    label={t(TranslationKey.Category)}
                    value={product.category || ''}
                    onChange={onChangeField('category')}
                  />
                </div>
                <div className={classNames.infoSubWrapper}>
                  <Field
                    tooltipInfoContent={t(TranslationKey["Amazon's bestseller rating"])}
                    disabled={defaultFieldDisable}
                    error={formFieldsValidationErrors.bsr}
                    containerClasses={classNames.infoContainer}
                    inputClasses={classNames.infoInput}
                    label={t(TranslationKey.BSR)}
                    inputProps={{ maxLength: 15 }}
                    value={product.bsr || 0}
                    onChange={onChangeField('bsr')}
                  />
                </div>
              </div>

              <div className={classNames.infoWrapper}>
                <div className={classNames.infoSubWrapper}>
                  <Field
                    disabled={defaultFieldDisable}
                    error={errorMessagesTranslate(formFieldsValidationErrors.width)}
                    containerClasses={classNames.infoContainer}
                    inputClasses={classNames.infoInput}
                    inputProps={{ maxLength: 15 }}
                    label={t(TranslationKey['Width, inches']) + '*'}
                    value={product.width === 0 ? 0 : toFixed(product.width, 5) || ''}
                    onChange={onChangeField('width')}
                  />
                  <Field
                    disabled={defaultFieldDisable}
                    error={errorMessagesTranslate(formFieldsValidationErrors.height)}
                    containerClasses={classNames.infoContainer}
                    inputClasses={classNames.infoInput}
                    inputProps={{ maxLength: 15 }}
                    label={t(TranslationKey['Height, inches']) + '*'}
                    value={product.height === 0 ? 0 : toFixed(product.height, 5) || ''}
                    onChange={onChangeField('height')}
                  />
                </div>

                <div className={classNames.infoSubWrapper}>
                  <Field
                    disabled={defaultFieldDisable}
                    error={errorMessagesTranslate(formFieldsValidationErrors.length)}
                    containerClasses={classNames.infoContainer}
                    inputClasses={classNames.infoInput}
                    inputProps={{ maxLength: 15 }}
                    label={t(TranslationKey['Length, inches']) + '*'}
                    value={product.length === 0 ? 0 : toFixed(product.length, 5) || ''}
                    onChange={onChangeField('length')}
                  />
                </div>
              </div>

              <div className={classNames.infoWrapper}>
                <div className={classNames.infoSubWrapper}>
                  <Field
                    disabled
                    error={formFieldsValidationErrors.maxDelivery}
                    containerClasses={classNames.infoContainer}
                    inputClasses={classNames.infoInput}
                    label={t(TranslationKey['Max delivery price, $'])}
                    value={product.maxDelivery === 0 ? 0 : toFixed(product.maxDelivery, 2) || 0}
                    onChange={onChangeField('maxDelivery')}
                  />
                  <Field
                    tooltipInfoContent={t(TranslationKey['Amazon Fee'])}
                    disabled={defaultFieldDisable}
                    error={errorMessagesTranslate(formFieldsValidationErrors.fbafee)}
                    containerClasses={classNames.infoContainer}
                    inputClasses={classNames.infoInput}
                    inputProps={{ maxLength: 15 }}
                    label={'FBA fees'}
                    value={product.fbafee === 0 ? 0 : toFixed(product.fbafee, 2) || ''}
                    onChange={onChangeField('fbafee')}
                  />

                  <Field
                    disabled
                    tooltipInfoContent={t(
                      TranslationKey[
                        'Calculated from the price of the product, fees and the total price of the supplier'
                      ],
                    )}
                    error={formFieldsValidationErrors.profit}
                    containerClasses={classNames.infoContainer}
                    inputClasses={classNames.infoInput}
                    label={t(TranslationKey['Profit, $'])}
                    value={toFixed(product.profit, 2) || 0}
                    onChange={onChangeField('profit')}
                  />
                </div>

                <div className={classNames.infoSubWrapper}>
                  <Field
                    disabled
                    error={errorMessagesTranslate(formFieldsValidationErrors.minpurchase)}
                    containerClasses={classNames.infoContainer}
                    inputClasses={classNames.infoInput}
                    inputProps={{ maxLength: 10 }}
                    label={t(TranslationKey['Min purchase price, $'])}
                    value={product.minpurchase === 0 ? '' : toFixed(product.minpurchase, 2) || ''}
                    onChange={onChangeField('minpurchase')}
                  />
                  <Field
                    disabled={defaultFieldDisable}
                    tooltipInfoContent={t(TranslationKey['Amazon Fee'])}
                    error={errorMessagesTranslate(formFieldsValidationErrors.reffee)}
                    containerClasses={classNames.infoContainer}
                    inputClasses={classNames.infoInput}
                    inputProps={{ maxLength: 10 }}
                    label={t(TranslationKey['Referral fee, $'])}
                    value={product.reffee === 0 ? 0 : toFixed(product.reffee, 2) || ''}
                    onChange={onChangeField('reffee')}
                  />
                  <Field
                    disabled
                    tooltipInfoContent={t(
                      TranslationKey[
                        'Calculated from the price of the product, fees and the total price of the supplier'
                      ],
                    )}
                    error={formFieldsValidationErrors.margin}
                    containerClasses={classNames.infoContainer}
                    inputClasses={classNames.infoInput}
                    label={t(TranslationKey['Margin, %'])}
                    value={toFixed(product.margin, 2) || 0}
                    onChange={onChangeField('margin')}
                  />
                </div>
              </div>

              <Field
                disabled
                tooltipInfoContent={t(TranslationKey['The status in which the product card is at the moment'])}
                inputProps={{
                  style: { color: colorByProductStatus(ProductStatusByCode[product.status]) },
                }}
                sx={{
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: colorByProductStatus(ProductStatusByCode[product.status]),
                  },
                }}
                error={formFieldsValidationErrors.status}
                label={t(TranslationKey.Status)}
                value={t(productStatusTranslateKey(ProductStatusByCode[product.status]))}
                // onChange={onChangeField('status')}
              />
            </Paper>
          </Grid>
          <Grid item sm={5} xs={12}>
            <Paper className={classNames.cardPadding}>
              <Typography className={classNames.title}>
                {t(TranslationKey['Product description']).toUpperCase()}
              </Typography>
              <Field
                // key={'amazonTitle'}
                disabled={defaultFieldDisable}
                label={t(TranslationKey['Product header on Amazon'])}
                value={product.amazonTitle || ''}
                onChange={onChangeField('amazonTitle')}
              />

              <Field
                multiline
                disabled={defaultFieldDisable}
                className={classNames.heightFieldAuto}
                minRows={4}
                maxRows={6}
                label={t(TranslationKey['Amazon Brief Description'])}
                value={product.amazonDescription || ''}
                onChange={onChangeField('amazonDescription')}
              />

              <Field
                multiline
                disabled={defaultFieldDisable}
                className={classNames.heightFieldAuto}
                minRows={4}
                maxRows={6}
                label={t(TranslationKey.Details)}
                value={product.amazonDetail || ''}
                onChange={onChangeField('amazonDetail')}
              />
            </Paper>
          </Grid>
        </Grid>
      </>
    )
  },
)
