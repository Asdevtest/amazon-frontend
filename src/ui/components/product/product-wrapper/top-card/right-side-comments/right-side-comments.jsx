import React from 'react'

import {Box, Grid, Typography, Button} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {ProductStatus, ProductStatusByKey} from '@constants/product-status'
import {productStatusButtonsConfigs} from '@constants/product-status-buttons-configs'
import {TranslationKey} from '@constants/translations/translation-key'

import {ErrorButton} from '@components/buttons/error-button'
import {Field} from '@components/field'

import {checkIsBuyer, checkIsClient, checkIsResearcher, checkIsSupervisor} from '@utils/checks'
import {t} from '@utils/translations'

import {ProductStatusButtons} from './product-status-buttons'
import {useClassNames} from './right-side-comments.style'

const withoutStatus = true

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

export const RightSideComments = observer(
  ({
    showActionBtns,
    curUserRole,
    onChangeField,
    product,
    productBase,
    onClickSetProductStatusBtn,
    handleProductActionButtons,
    formFieldsValidationErrors,
  }) => {
    const classNames = useClassNames()
    const productStatusButtonsConfig =
      productStatusButtonsConfigs[curUserRole] && productStatusButtonsConfigs[curUserRole](productBase.status)

    return (
      <Grid item sm={5} xs={12}>
        <Box className={classNames.rightBoxComments}>
          <Typography className={classNames.title}>{t(TranslationKey.Comments)}</Typography>
          <Field
            multiline
            disabled={!checkIsResearcher(curUserRole) || !showActionBtns}
            error={formFieldsValidationErrors.icomment}
            className={clsx(classNames.heightFieldAuto, {
              [classNames.errorActive]: formFieldsValidationErrors.icomment,
            })}
            inputProps={{maxLength: 1000}}
            rows={4}
            rowsMax={6}
            label={t(TranslationKey.Researcher)}
            value={product.icomment}
            onChange={onChangeField('icomment')}
          />
          {showActionBtns && (
            <ProductStatusButtons
              product={product}
              productStatus={product?.status}
              buttonsConfig={productStatusButtonsConfig}
              onClickButton={onClickSetProductStatusBtn}
              onClickSaveWithoutStatusChange={
                checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole)
                  ? () => handleProductActionButtons('accept', withoutStatus)
                  : undefined
              }
            />
          )}
          <Field
            multiline
            disabled={!checkIsSupervisor(curUserRole) || !showActionBtns}
            error={formFieldsValidationErrors.checkednotes}
            className={clsx(classNames.heightFieldAuto, {
              [classNames.errorActive]: formFieldsValidationErrors.checkednotes,
            })}
            inputProps={{maxLength: 1000}}
            rows={4}
            rowsMax={6}
            label={t(TranslationKey.Supervisor)}
            value={product.checkednotes}
            onChange={onChangeField('checkednotes')}
          />
          <Field
            multiline
            disabled={!checkIsBuyer(curUserRole) || !showActionBtns}
            error={formFieldsValidationErrors.buyersComment}
            className={clsx(classNames.heightFieldAuto, {
              [classNames.errorActive]: formFieldsValidationErrors.buyersComment,
            })}
            inputProps={{maxLength: 1000}}
            rows={4}
            rowsMax={6}
            label={t(TranslationKey.Buyer)}
            value={product.buyersComment}
            onChange={onChangeField('buyersComment')}
          />

          <Field
            multiline
            disabled={!checkIsClient(curUserRole) || !clientToEditStatuses.includes(productBase.status)}
            className={clsx(classNames.heightFieldAuto, {
              // [classNames.errorActive]: formFieldsValidationErrors.icomment,
            })}
            inputProps={{maxLength: 1000}}
            rows={4}
            rowsMax={6}
            label={t(TranslationKey.Client)}
            value={product.clientComment}
            onChange={onChangeField('clientComment')}
          />

          {showActionBtns ? (
            <div className={classNames.buttonsWrapper}>
              <Button
                className={classNames.buttonNormal}
                color="primary"
                variant="contained"
                onClick={() => handleProductActionButtons('accept', false)}
              >
                {checkIsClient(curUserRole) ? t(TranslationKey.Save) : t(TranslationKey.Receive)}
              </Button>
              <ErrorButton
                className={clsx(classNames.buttonNormal, {
                  [classNames.buttonNormalNoMargin]: !checkIsResearcher(curUserRole),
                })}
                variant="contained"
                onClick={() => handleProductActionButtons('cancel')}
              >
                {checkIsClient(curUserRole) ? t(TranslationKey.Close) : t(TranslationKey.Cancel)}
              </ErrorButton>

              {checkIsResearcher(curUserRole) || (checkIsClient(curUserRole) && !product.archive) ? (
                <ErrorButton
                  className={classNames.buttonDelete}
                  variant="contained"
                  onClick={() => handleProductActionButtons('delete')}
                >
                  {t(TranslationKey.Delete)}
                </ErrorButton>
              ) : undefined}

              {checkIsClient(curUserRole) && product.archive && (
                <Button
                  className={classNames.restoreBtn}
                  color="primary"
                  variant="contained"
                  onClick={() => handleProductActionButtons('restore')}
                >
                  {t(TranslationKey.Restore)}
                </Button>
              )}
            </div>
          ) : (
            <div className={classNames.buttonsWrapper}>
              <ErrorButton
                className={clsx(classNames.buttonNormal, {
                  [classNames.buttonNormalNoMargin]: !checkIsResearcher(curUserRole),
                })}
                variant="contained"
                onClick={() => handleProductActionButtons('cancel')}
              >
                {t(TranslationKey.Close)}
              </ErrorButton>
            </div>
          )}
        </Box>
      </Grid>
    )
  },
)
