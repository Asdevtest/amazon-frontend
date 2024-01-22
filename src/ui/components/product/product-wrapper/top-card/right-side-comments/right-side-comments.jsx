import { memo } from 'react'

import { Typography } from '@mui/material'

import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import { productStatusButtonsConfigs } from '@constants/product/product-status-buttons-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { AlertShield } from '@components/shared/alert-shield'
import { Button } from '@components/shared/buttons/button'
import { CustomTextEditor } from '@components/shared/custom-text-editor'

import { checkIsBuyer, checkIsClient, checkIsResearcher, checkIsSupervisor } from '@utils/checks'
import {
  translateTooltipCloseBtnMessage,
  translateTooltipDeleteBtnMessage,
  translateTooltipMessageByRole,
  translateTooltipSaveBtnMessage,
} from '@utils/translate-tooltip-message'
import { t } from '@utils/translations'

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
    // formFieldsValidationErrors,
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

          <div>
            <p>{t(TranslationKey.Researcher)}</p>
            <CustomTextEditor
              readOnly={!checkIsResearcher(curUserRole) || !showActionBtns}
              conditions={product.icomment}
              maxLength={1000}
              editorClassName={styles.editorWrapper}
              onChangeConditions={onChangeField('icomment')}
            />
          </div>

          <div>
            <p>{t(TranslationKey.Supervisor)}</p>
            <CustomTextEditor
              readOnly={!checkIsSupervisor(curUserRole) || !showActionBtns}
              conditions={product.checkednotes}
              maxLength={1000}
              editorClassName={styles.editorWrapper}
              onChangeConditions={onChangeField('checkednotes')}
            />
          </div>

          {!checkIsResearcher(curUserRole) && (
            <>
              <div>
                <p>{t(TranslationKey.Buyer)}</p>
                <CustomTextEditor
                  readOnly={!checkIsBuyer(curUserRole) || !showActionBtns}
                  conditions={product.buyersComment}
                  maxLength={1000}
                  editorClassName={styles.editorWrapper}
                  onChangeConditions={onChangeField('buyersComment')}
                />
              </div>

              <div>
                <p>{t(TranslationKey.Client)}</p>
                <CustomTextEditor
                  readOnly={!checkIsClient(curUserRole) || !clientToEditStatuses.includes(productBase.status)}
                  conditions={product.clientComment}
                  maxLength={1000}
                  editorClassName={styles.editorWrapper}
                  onChangeConditions={onChangeField('clientComment')}
                />
              </div>
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
