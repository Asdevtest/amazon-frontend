import { memo } from 'react'

import { Typography } from '@mui/material'

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

import { useStyles } from './right-side-comments.style'

import { ProductStatusButtons } from './product-status-buttons'

const withoutStatus = true

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

export const RightSideComments = memo(
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
    const { classes: styles, cx } = useStyles()
    const productStatusButtonsConfig =
      productStatusButtonsConfigs[curUserRole] && productStatusButtonsConfigs[curUserRole](productBase.status)

    return (
      <div className={styles.rightBoxCommentsWrapper}>
        <div className={styles.rightBoxComments}>
          <Typography className={styles.title}>{t(TranslationKey.Comments)}</Typography>

          <Field
            multiline
            disabled={!checkIsResearcher(curUserRole) || !showActionBtns}
            error={errorMessagesTranslate(formFieldsValidationErrors.icomment)}
            className={cx(styles.heightFieldAuto, {
              [styles.errorActive]: formFieldsValidationErrors.icomment,
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
            className={cx(styles.heightFieldAuto, {
              [styles.errorActive]: formFieldsValidationErrors.checkednotes,
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
                className={cx(styles.heightFieldAuto, {
                  [styles.errorActive]: formFieldsValidationErrors.buyersComment,
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
                className={cx(styles.heightFieldAuto, {
                  // [styles.errorActive]: formFieldsValidationErrors.icomment,
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
                <div className={styles.buttonsWrapper}>
                  {checkIsResearcher(curUserRole) || (checkIsClient(curUserRole) && !product.archive) ? (
                    <Button
                      tooltipInfoContent={translateTooltipDeleteBtnMessage(curUserRole)}
                      className={styles.buttonDelete}
                      variant="contained"
                      onClick={() => handleProductActionButtons('delete')}
                    >
                      {t(TranslationKey.Delete)}
                    </Button>
                  ) : undefined}

                  {product?.status ===
                    ProductStatusByKey[ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR] &&
                  checkIsBuyer(curUserRole) ? null : (
                    <Button
                      tooltipInfoContent={translateTooltipSaveBtnMessage(curUserRole)}
                      className={cx(styles.buttonNormal, styles.buttonAccept)}
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
                      className={styles.buttonNormal}
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
                    className={cx(styles.buttonClose, {
                      [styles.buttonNormalNoMargin]: !checkIsResearcher(curUserRole),
                    })}
                    variant="contained"
                    onClick={() => handleProductActionButtons('cancel')}
                  >
                    {checkIsClient(curUserRole) ? t(TranslationKey.Close) : t(TranslationKey.Cancel)}
                  </Button>

                  {checkIsClient(curUserRole) && product.archive && (
                    <Button
                      className={styles.restoreBtn}
                      color="primary"
                      variant="contained"
                      onClick={() => handleProductActionButtons('restore')}
                    >
                      {t(TranslationKey.Restore)}
                    </Button>
                  )}
                </div>
              ) : (
                <div className={styles.buttonWrapper}>
                  <Button
                    tooltipInfoContent={t(TranslationKey['Close product card'])}
                    className={cx(styles.buttonClose, {
                      [styles.buttonNormalNoMargin]: !checkIsResearcher(curUserRole),
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
              alertShieldWrapperStyle={styles.alertShieldWrapperStyle}
            />
          )}
        </div>
      </div>
    )
  },
)
