import { memo } from 'react'

import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import { productStatusButtonsConfigs } from '@constants/product/product-status-buttons-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
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

import { ButtonStyle } from '@typings/enums/button-style'

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
  }) => {
    const { classes: styles, cx } = useStyles()
    const productStatusButtonsConfig =
      productStatusButtonsConfigs[curUserRole] && productStatusButtonsConfigs[curUserRole](productBase.status)

    return (
      <div className={styles.wrapper}>
        <p className={styles.title}>{t(TranslationKey.Comments)}</p>

        <Field
          multiline
          disabled={!checkIsResearcher(curUserRole) || !showActionBtns}
          error={errorMessagesTranslate(formFieldsValidationErrors.icomment)}
          className={cx(styles.heightFieldAuto, {
            [styles.errorActive]: formFieldsValidationErrors.icomment,
          })}
          inputProps={{ maxLength: 1000 }}
          minRows={4}
          maxRows={4}
          label={t(TranslationKey.Researcher)}
          value={product?.icomment}
          onChange={onChangeField?.('icomment')}
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
          maxRows={4}
          label={t(TranslationKey.Supervisor)}
          value={product?.checkednotes}
          onChange={onChangeField?.('checkednotes')}
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
              maxRows={4}
              label={t(TranslationKey.Buyer)}
              value={product?.buyersComment}
              onChange={onChangeField?.('buyersComment')}
            />

            <Field
              multiline
              disabled={!checkIsClient(curUserRole) || !clientToEditStatuses.includes(productBase.status)}
              className={cx(styles.heightFieldAuto, {
                [styles.errorActive]: formFieldsValidationErrors.icomment,
              })}
              inputProps={{ maxLength: 1000 }}
              minRows={4}
              maxRows={4}
              label={t(TranslationKey.Client)}
              value={product?.clientComment}
              onChange={onChangeField?.('clientComment')}
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

            <div className={styles.buttonsWrapper}>
              {showActionBtns ? (
                <>
                  {checkIsResearcher(curUserRole) || (checkIsClient(curUserRole) && !product?.archive) ? (
                    <Button
                      styleType={ButtonStyle.DANGER}
                      tooltipInfoContent={translateTooltipDeleteBtnMessage(curUserRole)}
                      onClick={() => handleProductActionButtons('delete')}
                    >
                      {t(TranslationKey.Delete)}
                    </Button>
                  ) : null}

                  {product?.status ===
                    ProductStatusByKey[ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR] &&
                  checkIsBuyer(curUserRole) ? null : (
                    <Button
                      styleType={ButtonStyle.SUCCESS}
                      tooltipInfoContent={translateTooltipSaveBtnMessage(curUserRole)}
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
                    styleType={ButtonStyle.CASUAL}
                    tooltipInfoContent={translateTooltipCloseBtnMessage(curUserRole)}
                    onClick={() => handleProductActionButtons('cancel')}
                  >
                    {t(TranslationKey.Close)}
                  </Button>

                  {checkIsClient(curUserRole) && product?.archive && (
                    <Button onClick={() => handleProductActionButtons('restore')}>{t(TranslationKey.Restore)}</Button>
                  )}
                </>
              ) : (
                <Button
                  styleType={ButtonStyle.CASUAL}
                  tooltipInfoContent={t(TranslationKey['Close product card'])}
                  onClick={() => handleProductActionButtons('cancel')}
                >
                  {t(TranslationKey.Close)}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    )
  },
)
