/* eslint-disable no-unused-vars */

import { Modal } from '@components/shared/modal'

import { useClassNames } from './product-card-modal.style'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { ProductWrapper } from '@components/product/product-wrapper'
import { ClientProductViewModel } from '@views/client/client-product-view/client-product-view.model'
import { useLocation } from 'react-router-dom'
import { Typography } from '@mui/material'
import { ShareLinkIcon } from '@components/shared/svg-icons'
import { t } from '@utils/translations'
import { TranslationKey } from '@constants/translations/translation-key'
import { ProductStatusButtons } from '@components/product/product-wrapper/top-card/right-side-comments/product-status-buttons'
import { Button } from '@components/shared/buttons/button'
import { checkIsBuyer, checkIsClient, checkIsResearcher, checkIsSupervisor } from '@utils/checks'
import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import { productStatusButtonsConfigs } from '@constants/product/product-status-buttons-configs'
import {
  translateTooltipCloseBtnMessage,
  translateTooltipDeleteBtnMessage,
  translateTooltipMessageByRole,
  translateTooltipSaveBtnMessage,
} from '@utils/translate-tooltip-message'
import { cx } from '@emotion/css'
import { UserRoleCodeMap } from '@constants/keys/user-roles'

export const ProductCardModal = observer(props => {
  const { classes: classNames } = useClassNames()

  const { openModal, setOpenModal, onClickShareIcon, history } = props

  const { search } = useLocation()
  const [viewModel] = useState(
    () =>
      new ClientProductViewModel({
        history,
        setOpenModal,
      }),
  )

  useEffect(() => {
    viewModel.loadData()
  }, [])

  useEffect(() => {
    const queries = new URLSearchParams(search)
    const productId = queries.get('product-id')

    viewModel.clearProduct()
    viewModel.clearReadyImages()

    if (productId) {
      viewModel.updateProductId(productId)
    }
  }, [search])

  const [show, setShow] = useState()

  const clientToEditStatuses = [
    ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
    ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
    ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
    ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
    ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
  ]

  const showActionBtns =
    (checkIsSupervisor(UserRoleCodeMap[viewModel.userInfo.role]) &&
      viewModel.productBase.status !== ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP] &&
      viewModel.productBase.status !== ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT] &&
      viewModel.productBase.status < ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]) ||
    (checkIsSupervisor(UserRoleCodeMap[viewModel.userInfo.role]) &&
      viewModel.productBase.status >= ProductStatusByKey[ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR] &&
      viewModel.productBase.status < ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS] &&
      viewModel.productBase.status !== ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT] &&
      viewModel.productBase.status !== ProductStatusByKey[ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH]) ||
    (checkIsClient(UserRoleCodeMap[viewModel.userInfo.role]) &&
      viewModel?.product?.isCreatedByClient &&
      clientToEditStatuses.includes(viewModel.productBase.status)) ||
    (checkIsResearcher(UserRoleCodeMap[viewModel.userInfo.role]) &&
      viewModel.productBase.status < ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR]) ||
    (checkIsBuyer(UserRoleCodeMap[viewModel.userInfo.role]) &&
      viewModel.productBase.status < ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]) ||
    (checkIsBuyer(UserRoleCodeMap[viewModel.userInfo.role]) &&
      viewModel.productBase.status > ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT] &&
      viewModel.productBase.status < ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS])

  const productStatusButtonsConfig =
    productStatusButtonsConfigs[UserRoleCodeMap[viewModel.userInfo.role]] &&
    productStatusButtonsConfigs[UserRoleCodeMap[viewModel.userInfo.role]](viewModel.productBase.status)

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.root}>
        {viewModel.product && (
          <ProductWrapper
            modal
            showTab={viewModel.showTab}
            user={viewModel.userInfo}
            userRole={viewModel.userInfo.role}
            imagesForLoad={viewModel.imagesForLoad}
            showProgress={viewModel.showProgress}
            progressValue={viewModel.progressValue}
            product={viewModel.getCurrentData()}
            shops={viewModel.shopsData}
            acceptMessage={viewModel.acceptMessage}
            actionStatus={viewModel.actionStatus}
            productBase={viewModel.productBase}
            selectedSupplier={viewModel.selectedSupplier}
            handleSupplierButtons={viewModel.onClickSupplierButtons}
            handleProductActionButtons={viewModel.handleProductActionButtons}
            formFieldsValidationErrors={viewModel.formFieldsValidationErrors}
            onClickSupplier={viewModel.onChangeSelectedSupplier}
            onChangeField={viewModel.onChangeProductFields}
            onChangeImagesForLoad={viewModel.onChangeImagesForLoad}
            onClickParseProductData={viewModel.onClickParseProductData}
          />
        )}
      </div>
      {viewModel.product && (
        <div className={classNames.footerWrapper}>
          <div className={classNames.shareWrapper} onClick={onClickShareIcon}>
            <ShareLinkIcon className={classNames.shareLinkIcon} />
            <Typography className={classNames.shareLinkText}>{t(TranslationKey['Open in a new tab'])}</Typography>
          </div>

          {showActionBtns && (
            <ProductStatusButtons
              product={viewModel.product}
              curUserRole={UserRoleCodeMap[viewModel.userInfo.role]}
              buttonsConfig={productStatusButtonsConfig}
              // onClickButton={onClickSetProductStatusBtn}
            />
          )}

          {showActionBtns ? (
            <div className={classNames.buttonsWrapper}>
              {viewModel.product.status ===
                ProductStatusByKey[ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR] &&
              checkIsBuyer(UserRoleCodeMap[viewModel.userInfo.role]) ? null : (
                <Button
                  className={cx(classNames.buttonNormal, classNames.buttonAccept)}
                  color="primary"
                  variant="contained"
                  onClick={() => viewModel.handleProductActionButtons('accept', false)}
                >
                  {checkIsClient(UserRoleCodeMap[viewModel.userInfo.role])
                    ? t(TranslationKey.Save)
                    : t(TranslationKey.Receive)}
                </Button>
              )}

              {checkIsResearcher(UserRoleCodeMap[viewModel.userInfo.role]) && (
                <Button
                  disabled={viewModel.product?.status === ProductStatusByKey[ProductStatus.PURCHASED_PRODUCT]}
                  className={classNames.buttonNormal}
                  variant="contained"
                  onClick={
                    checkIsResearcher(UserRoleCodeMap[viewModel.userInfo.role]) ||
                    checkIsSupervisor(UserRoleCodeMap[viewModel.userInfo.role])
                      ? () => viewModel.handleProductActionButtons('accept', true)
                      : undefined
                  }
                >
                  {t(TranslationKey['Save without status'])}
                </Button>
              )}

              <Button
                className={cx(classNames.buttonClose, {
                  [classNames.buttonNormalNoMargin]: !checkIsResearcher(UserRoleCodeMap[viewModel.userInfo.role]),
                })}
                variant="contained"
                onClick={() => viewModel.handleProductActionButtons('closeModal')}
              >
                {checkIsClient(UserRoleCodeMap[viewModel.userInfo.role])
                  ? t(TranslationKey.Close)
                  : t(TranslationKey.Cancel)}
              </Button>

              {checkIsResearcher(UserRoleCodeMap[viewModel.userInfo.role]) ||
              (checkIsClient(UserRoleCodeMap[viewModel.userInfo.role]) && !viewModel.product.archive) ? (
                <Button
                  className={classNames.buttonDelete}
                  variant="contained"
                  onClick={() => viewModel.handleProductActionButtons('delete')}
                >
                  {t(TranslationKey.Delete)}
                </Button>
              ) : undefined}

              {checkIsClient(UserRoleCodeMap[viewModel.userInfo.role]) && viewModel.product.archive && (
                <Button
                  className={classNames.restoreBtn}
                  color="primary"
                  variant="contained"
                  onClick={() => viewModel.handleProductActionButtons('restore')}
                >
                  {t(TranslationKey.Restore)}
                </Button>
              )}
            </div>
          ) : (
            <Button
              className={cx(classNames.buttonClose, {
                [classNames.buttonNormalNoMargin]: !checkIsResearcher(UserRoleCodeMap[viewModel.userInfo.role]),
              })}
              variant="contained"
              onClick={() => viewModel.handleProductActionButtons('closeModal')}
            >
              {t(TranslationKey.Close)}
            </Button>
          )}
        </div>
      )}
      {/* {isFileDownloading && <CircularProgressWithLabel />} */}
    </Modal>
  )
})
