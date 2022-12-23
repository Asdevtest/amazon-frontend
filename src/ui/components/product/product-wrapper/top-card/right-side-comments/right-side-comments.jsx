/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {Box, Grid, Typography, Alert} from '@mui/material'

import React from 'react'

import {observer} from 'mobx-react'

import {ProductStatus, ProductStatusByKey} from '@constants/product-status'
import {productStatusButtonsConfigs} from '@constants/product-status-buttons-configs'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {checkIsBuyer, checkIsClient, checkIsResearcher, checkIsSupervisor} from '@utils/checks'
import {
  translateTooltipCloseBtnMessage,
  translateTooltipDeleteBtnMessage,
  translateTooltipSaveBtnMessage,
} from '@utils/translate-tooltip-message'
import {t} from '@utils/translations'
import {errorMessagesTranslate} from '@utils/validation'

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
    acceptMessage,
  }) => {
    const {classes: classNames} = useClassNames()
    const productStatusButtonsConfig =
      productStatusButtonsConfigs[curUserRole] && productStatusButtonsConfigs[curUserRole](productBase.status)

    return (
      <Grid item sm={5} xs={12}>
        <Box className={classNames.rightBoxComments}>
          <Typography className={classNames.title}>{t(TranslationKey.Comments)}</Typography>
          <Field
            multiline
            disabled={!checkIsResearcher(curUserRole) || !showActionBtns}
            error={errorMessagesTranslate(formFieldsValidationErrors.icomment)}
            className={cx(classNames.heightFieldAuto, {
              [classNames.errorActive]: formFieldsValidationErrors.icomment,
            })}
            inputProps={{maxLength: 1000}}
            minRows={4}
            maxRows={6}
            label={t(TranslationKey.Researcher)}
            value={product.icomment}
            onChange={onChangeField('icomment')}
          />
          {showActionBtns && (
            <ProductStatusButtons
              product={product}
              curUserRole={curUserRole}
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
            error={errorMessagesTranslate(formFieldsValidationErrors.checkednotes)}
            className={cx(classNames.heightFieldAuto, {
              [classNames.errorActive]: formFieldsValidationErrors.checkednotes,
            })}
            inputProps={{maxLength: 1000}}
            minRows={4}
            maxRows={6}
            label={t(TranslationKey.Supervisor)}
            value={product.checkednotes}
            onChange={onChangeField('checkednotes')}
          />
          <Field
            multiline
            disabled={!checkIsBuyer(curUserRole) || !showActionBtns}
            error={errorMessagesTranslate(formFieldsValidationErrors.buyersComment)}
            className={cx(classNames.heightFieldAuto, {
              [classNames.errorActive]: formFieldsValidationErrors.buyersComment,
            })}
            inputProps={{maxLength: 1000}}
            minRows={4}
            maxRows={6}
            label={t(TranslationKey.Buyer)}
            value={product.buyersComment}
            onChange={onChangeField('buyersComment')}
          />

          <Field
            multiline
            disabled={!checkIsClient(curUserRole) || !clientToEditStatuses.includes(productBase.status)}
            className={cx(classNames.heightFieldAuto, {
              // [classNames.errorActive]: formFieldsValidationErrors.icomment,
            })}
            inputProps={{maxLength: 1000}}
            minRows={4}
            maxRows={6}
            label={t(TranslationKey.Client)}
            value={product.clientComment}
            onChange={onChangeField('clientComment')}
          />

          {showActionBtns ? (
            <div className={classNames.buttonsWrapper}>
              <Button
                tooltipInfoContent={translateTooltipSaveBtnMessage(curUserRole)}
                className={classNames.buttonNormal}
                color="primary"
                variant="contained"
                onClick={() => handleProductActionButtons('accept', false)}
              >
                {checkIsClient(curUserRole) ? t(TranslationKey.Save) : t(TranslationKey.Receive)}
              </Button>
              <Button
                tooltipInfoContent={translateTooltipCloseBtnMessage(curUserRole)}
                className={cx(classNames.buttonClose, {
                  [classNames.buttonNormalNoMargin]: !checkIsResearcher(curUserRole),
                })}
                variant="contained"
                onClick={() => handleProductActionButtons('cancel')}
              >
                {checkIsClient(curUserRole) ? t(TranslationKey.Close) : t(TranslationKey.Cancel)}
              </Button>

              {checkIsResearcher(curUserRole) || (checkIsClient(curUserRole) && !product.archive) ? (
                <Button
                  tooltipInfoContent={translateTooltipDeleteBtnMessage(curUserRole)}
                  className={classNames.buttonDelete}
                  variant="contained"
                  onClick={() => handleProductActionButtons('delete')}
                >
                  {t(TranslationKey.Delete)}
                </Button>
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
            <div className={classNames.buttonWrapper}>
              <Button
                tooltipInfoContent={t(TranslationKey['Close product card'])}
                className={cx(classNames.buttonClose, {
                  [classNames.buttonNormalNoMargin]: !checkIsResearcher(curUserRole),
                })}
                variant="contained"
                onClick={() => handleProductActionButtons('cancel')}
              >
                {t(TranslationKey.Close)}
              </Button>
            </div>
          )}
          {acceptMessage ? (
            <div className={classNames.acceptMessageWrapper}>
              <Alert elevation={5} severity="success">
                {acceptMessage}
              </Alert>
            </div>
          ) : null}
        </Box>
      </Grid>
    )
  },
)
