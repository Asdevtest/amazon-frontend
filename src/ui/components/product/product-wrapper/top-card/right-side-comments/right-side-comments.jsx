/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React from 'react'

import { Box, Grid, Typography } from '@mui/material'

import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import { productStatusButtonsConfigs } from '@constants/product/product-status-buttons-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { AlertShield } from '@components/shared/alert-shield'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'

import { checkIsBuyer, checkIsClient, checkIsResearcher, checkIsSupervisor } from '@utils/checks'
import {
  translateTooltipCloseBtnMessage,
  translateTooltipDeleteBtnMessage,
  translateTooltipMessageByRole,
  translateTooltipSaveBtnMessage,
} from '@utils/translate-tooltip-message'
import { t } from '@utils/translations'
import { errorMessagesTranslate } from '@utils/validation'

import { useClassNames } from './right-side-comments.style'

import { ProductStatusButtons } from './product-status-buttons'

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
    modal,
    showActionBtns,
    curUserRole,
    onChangeField,
    product,
    productBase,
    onClickSetProductStatusBtn,
    handleProductActionButtons,
    formFieldsValidationErrors,
    acceptMessage,
    showAcceptMessage,
  }) => {
    const { classes: classNames } = useClassNames()
    const productStatusButtonsConfig =
      productStatusButtonsConfigs[curUserRole] && productStatusButtonsConfigs[curUserRole](productBase.status)

    return (
      <div className={classNames.rightBoxCommentsWrapper}>
        <div className={classNames.rightBoxComments}>
          <Typography className={classNames.title}>{t(TranslationKey.Comments)}</Typography>
          <Field
            multiline
            disabled={!checkIsResearcher(curUserRole) || !showActionBtns}
            error={errorMessagesTranslate(formFieldsValidationErrors.icomment)}
            className={cx(classNames.heightFieldAuto, {
              [classNames.errorActive]: formFieldsValidationErrors.icomment,
            })}
            inputProps={{ maxLength: 1000 }}
            minRows={4}
            maxRows={6}
            label={t(TranslationKey.Researcher)}
            value={product.icomment}
            onChange={onChangeField('icomment')}
          />

          <Field
            multiline
            disabled={!checkIsSupervisor(curUserRole) || !showActionBtns}
            error={errorMessagesTranslate(formFieldsValidationErrors.checkednotes)}
            className={cx(classNames.heightFieldAuto, {
              [classNames.errorActive]: formFieldsValidationErrors.checkednotes,
            })}
            inputProps={{ maxLength: 1000 }}
            minRows={4}
            maxRows={6}
            label={t(TranslationKey.Supervisor)}
            value={product.checkednotes}
            onChange={onChangeField('checkednotes')}
          />

          {!checkIsResearcher(curUserRole) && (
            <>
              <Field
                multiline
                disabled={!checkIsBuyer(curUserRole) || !showActionBtns}
                error={errorMessagesTranslate(formFieldsValidationErrors.buyersComment)}
                className={cx(classNames.heightFieldAuto, {
                  [classNames.errorActive]: formFieldsValidationErrors.buyersComment,
                })}
                inputProps={{ maxLength: 1000 }}
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
                inputProps={{ maxLength: 1000 }}
                minRows={4}
                maxRows={6}
                label={t(TranslationKey.Client)}
                value={product.clientComment}
                onChange={onChangeField('clientComment')}
              />
            </>
          )}

          {!modal && (
            <>
              {showActionBtns && (
                <ProductStatusButtons
                  product={product}
                  curUserRole={curUserRole}
                  buttonsConfig={productStatusButtonsConfig}
                  onClickButton={onClickSetProductStatusBtn}
                />
              )}

              {showActionBtns ? (
                <div className={classNames.buttonsWrapper}>
                  {product?.status ===
                    ProductStatusByKey[ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR] &&
                  checkIsBuyer(curUserRole) ? null : (
                    <Button
                      tooltipInfoContent={translateTooltipSaveBtnMessage(curUserRole)}
                      className={cx(classNames.buttonNormal, classNames.buttonAccept)}
                      color="primary"
                      variant="contained"
                      onClick={() => handleProductActionButtons('accept', false)}
                    >
                      {checkIsClient(curUserRole) ? t(TranslationKey.Save) : t(TranslationKey.Receive)}
                    </Button>
                  )}

                  {checkIsResearcher(curUserRole) && (
                    <Button
                      tooltipInfoContent={translateTooltipMessageByRole(
                        t(TranslationKey['Save without status']),
                        curUserRole,
                      )}
                      disabled={product?.status === ProductStatusByKey[ProductStatus.PURCHASED_PRODUCT]}
                      className={classNames.buttonNormal}
                      variant="contained"
                      onClick={
                        checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole)
                          ? () => handleProductActionButtons('accept', withoutStatus)
                          : undefined
                      }
                    >
                      {t(TranslationKey['Save without status'])}
                    </Button>
                  )}

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
            </>
          )}

          {acceptMessage && (
            <AlertShield
              showAcceptMessage={showAcceptMessage}
              acceptMessage={acceptMessage}
              alertShieldWrapperStyle={classNames.alertShieldWrapperStyle}
            />
          )}
        </div>
      </div>
    )
  },
)
