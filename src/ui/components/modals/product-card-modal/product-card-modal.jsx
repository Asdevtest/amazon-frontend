import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import { productStatusButtonsConfigs } from '@constants/product/product-status-buttons-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'

import { ProductWrapper } from '@components/product/product-wrapper'
import { getTab } from '@components/product/product-wrapper/product-wrapper'
import { ProductStatusButtons } from '@components/product/product-wrapper/top-card/right-side-comments/product-status-buttons'
import { Button } from '@components/shared/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Modal } from '@components/shared/modal'
import { OpenInNewTab } from '@components/shared/open-in-new-tab'

import { BuyerProductViewModel } from '@views/buyer/buyer-product-view/buyer-product-view.model'
import { ClientProductViewModel } from '@views/client/client-product-view/client-product-view.model'
import { SupervisorProductViewModel } from '@views/supervisor/supervisor-product-view/supervisor-product-view.model'

import { checkIsBuyer, checkIsClient, checkIsResearcher, checkIsSupervisor } from '@utils/checks'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'
import { ProductVariation } from '@typings/enums/product/product-variation'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { useStyles } from './product-card-modal.style'

import { ConfirmationModal } from '../confirmation-modal'
import { EditHSCodeModal } from '../edit-hs-code-modal'
import { SuccessInfoModal } from '../success-info-modal'
import { WarningInfoModal } from '../warning-info-modal'

export const ProductCardModal = observer(props => {
  const { openModal, setOpenModal, history, onClickOpenNewTab, role, updateDataHandler } = props

  const { classes: styles, cx } = useStyles()

  const setCurrentModel = () => {
    if (checkIsBuyer(UserRoleCodeMap[role])) {
      return () =>
        new BuyerProductViewModel({
          history,
          setOpenModal,
          updateDataHandler,
        })
    } else if (checkIsSupervisor(UserRoleCodeMap[role])) {
      return () =>
        new SupervisorProductViewModel({
          history,
          setOpenModal,
          updateDataHandler,
        })
    } else {
      return () =>
        new ClientProductViewModel({
          history,
          setOpenModal,
          updateDataHandler,
        })
    }
  }

  const [viewModel] = useState(setCurrentModel())
  const [useProductsPermissions] = useState(() => new UseProductsPermissions(ClientModel.getProductPermissionsData))

  const [currentTab, setCurrentTab] = useState(getTab(viewModel.showTab))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const clientToEditStatuses = [
    ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
    ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
    ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
    ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
    ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
  ]

  const showActionBtns =
    (checkIsSupervisor(UserRoleCodeMap[viewModel?.userInfo.role]) &&
      viewModel?.productBase?.status !== ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP] &&
      viewModel?.productBase?.status !== ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT] &&
      viewModel?.productBase?.status < ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]) ||
    (checkIsSupervisor(UserRoleCodeMap[viewModel?.userInfo.role]) &&
      viewModel?.productBase?.status >=
        ProductStatusByKey[ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR] &&
      viewModel?.productBase?.status < ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS] &&
      viewModel?.productBase?.status !== ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT] &&
      viewModel?.productBase?.status !== ProductStatusByKey[ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH]) ||
    (checkIsClient(UserRoleCodeMap[viewModel?.userInfo.role]) &&
      viewModel?.product?.isCreatedByClient &&
      clientToEditStatuses.includes(viewModel?.productBase?.status)) ||
    (checkIsResearcher(UserRoleCodeMap[viewModel?.userInfo.role]) &&
      viewModel?.productBase?.status < ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR]) ||
    (checkIsBuyer(UserRoleCodeMap[viewModel?.userInfo.role]) &&
      viewModel?.productBase?.status < ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]) ||
    (checkIsBuyer(UserRoleCodeMap[viewModel?.userInfo.role]) &&
      viewModel?.productBase?.status > ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT] &&
      viewModel?.productBase?.status < ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS])

  const productStatusButtonsConfig =
    productStatusButtonsConfigs[UserRoleCodeMap[viewModel?.userInfo.role]] &&
    productStatusButtonsConfigs[UserRoleCodeMap[viewModel?.userInfo.role]](viewModel?.productBase?.status)

  return (
    <Modal missClickModalOn openModal={openModal} setOpenModal={setOpenModal}>
      <div className={cx(styles.root, { [styles.clippedRoot]: viewModel?.product && currentTab === 'MAIN_INFO' })}>
        {viewModel?.product && (
          <ProductWrapper
            modal
            showTab={viewModel?.showTab}
            user={viewModel?.userInfo}
            userRole={viewModel?.userInfo.role}
            imagesForLoad={viewModel?.imagesForLoad}
            showProgress={viewModel?.showProgress}
            progressValue={viewModel?.progressValue}
            product={viewModel?.currentData}
            shops={viewModel?.shopsData}
            productBase={viewModel?.productBase}
            handleProductActionButtons={viewModel?.handleProductActionButtons}
            formFieldsValidationErrors={viewModel?.formFieldsValidationErrors}
            setCurrentTab={tab => setCurrentTab(tab)}
            productVariations={viewModel.productVariations}
            navigateToProduct={viewModel.navigateToProduct}
            unbindProductHandler={viewModel.unbindProductHandler}
            showBindProductModal={viewModel.showBindProductModal}
            loadMorePermissionsDataHadler={() => useProductsPermissions.loadMoreDataHadler()}
            productsToBind={useProductsPermissions.currentPermissionsData}
            onTriggerOpenModal={viewModel.onTriggerOpenModal}
            onChangeField={viewModel?.onChangeProductFields}
            onChangeImagesForLoad={viewModel?.onChangeImagesForLoad}
            onClickParseProductData={viewModel?.onClickParseProductData}
            onClickSetProductStatusBtn={viewModel?.onClickSetProductStatusBtn}
            onClickHsCode={viewModel?.onClickHsCode}
            onClickNextButton={viewModel.bindUnbindProducts}
            onClickSubmitSearch={value => useProductsPermissions.onClickSubmitSearch(value)}
            onClickGetProductsToBind={option =>
              useProductsPermissions.getPermissionsData(
                option === ProductVariation.PARENT
                  ? { isChild: false, offset: 0, filters: '' }
                  : {
                      isChild: false,
                      isParent: false,
                      shopId: viewModel.product?.shopId,
                      offset: 0,
                      filters: '',
                    },
              )
            }
            onClickSaveSupplierBtn={viewModel?.onClickSaveSupplierBtn}
            onRemoveSupplier={viewModel?.onRemoveSupplier}
          />
        )}

        {viewModel?.requestStatus === loadingStatus.IS_LOADING && <CircularProgressWithLabel />}
      </div>

      {viewModel?.product && currentTab === 'MAIN_INFO' && (
        <div className={styles.footerWrapper}>
          <OpenInNewTab onClickOpenNewTab={() => onClickOpenNewTab(viewModel.productId)} />

          {showActionBtns && (
            <ProductStatusButtons
              product={viewModel?.product}
              curUserRole={UserRoleCodeMap[viewModel?.userInfo.role]}
              buttonsConfig={productStatusButtonsConfig}
              onClickButton={viewModel?.onClickSetProductStatusBtn}
            />
          )}

          {showActionBtns ? (
            <div className={styles.buttonsWrapper}>
              {checkIsResearcher(UserRoleCodeMap[viewModel?.userInfo.role]) ||
              (checkIsClient(UserRoleCodeMap[viewModel?.userInfo.role]) && !viewModel?.product.archive) ? (
                <Button
                  styleType={ButtonStyle.DANGER}
                  onClick={() => viewModel?.handleProductActionButtons('delete', undefined, true, updateDataHandler)}
                >
                  {t(TranslationKey.Delete)}
                </Button>
              ) : null}

              {viewModel?.product?.status ===
                ProductStatusByKey[ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR] &&
              checkIsBuyer(UserRoleCodeMap[viewModel?.userInfo.role]) ? null : (
                <Button
                  styleType={ButtonStyle.SUCCESS}
                  onClick={() => viewModel?.handleProductActionButtons('accept', undefined, true, updateDataHandler)}
                >
                  {checkIsClient(UserRoleCodeMap[viewModel?.userInfo.role])
                    ? t(TranslationKey.Save)
                    : t(TranslationKey.Receive)}
                </Button>
              )}

              {checkIsResearcher(UserRoleCodeMap[viewModel?.userInfo.role]) && (
                <Button
                  disabled={viewModel?.product?.status === ProductStatusByKey[ProductStatus.PURCHASED_PRODUCT]}
                  onClick={
                    checkIsResearcher(UserRoleCodeMap[viewModel?.userInfo.role]) ||
                    checkIsSupervisor(UserRoleCodeMap[viewModel?.userInfo.role])
                      ? () => viewModel?.handleProductActionButtons('accept', true, true, updateDataHandler)
                      : undefined
                  }
                >
                  {t(TranslationKey['Save without status'])}
                </Button>
              )}

              <Button
                styleType={
                  checkIsClient(UserRoleCodeMap[viewModel?.userInfo.role]) ? ButtonStyle.PRIMARY : ButtonStyle.DANGER
                }
                onClick={() => viewModel?.handleProductActionButtons('closeModal')}
              >
                {checkIsClient(UserRoleCodeMap[viewModel?.userInfo.role])
                  ? t(TranslationKey.Close)
                  : t(TranslationKey.Cancel)}
              </Button>

              {checkIsClient(UserRoleCodeMap[viewModel?.userInfo.role]) && viewModel?.product.archive && (
                <Button
                  onClick={() => viewModel?.handleProductActionButtons('restore', undefined, true, updateDataHandler)}
                >
                  {t(TranslationKey.Restore)}
                </Button>
              )}
            </div>
          ) : (
            <Button onClick={() => viewModel?.handleProductActionButtons('closeModal')}>
              {t(TranslationKey.Close)}
            </Button>
          )}
        </div>
      )}

      {viewModel?.showWarningModal ? (
        <WarningInfoModal
          // @ts-ignore
          openModal={viewModel?.showWarningModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showWarningModal')}
          title={viewModel?.warningModalTitle}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => viewModel.onTriggerOpenModal('showWarningModal')}
        />
      ) : null}

      {viewModel?.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={viewModel?.confirmModalSettings?.isWarning}
          openModal={viewModel?.showConfirmModal}
          setOpenModal={() => viewModel?.onTriggerOpenModal('showConfirmModal')}
          title={viewModel?.confirmModalSettings?.title}
          message={viewModel?.confirmModalSettings?.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onClickSuccessBtn={() => {
            viewModel?.confirmModalSettings?.onClickOkBtn()
            viewModel?.onTriggerOpenModal('showConfirmModal')
          }}
          onClickCancelBtn={() => viewModel?.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      {viewModel.showSuccessModal ? (
        <SuccessInfoModal
          // @ts-ignore
          openModal={viewModel.showSuccessModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessModal')}
          title={viewModel.successModalTitle}
          successBtnText={t(TranslationKey.Ok)}
          onClickSuccessBtn={() => viewModel.onTriggerOpenModal('showSuccessModal')}
        />
      ) : null}

      <Modal
        openModal={viewModel.showEditHSCodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
      >
        <EditHSCodeModal
          hsCodeData={viewModel.hsCodeData}
          onClickSaveHsCode={viewModel.onClickSaveHsCode}
          onCloseModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
        />
      </Modal>
    </Modal>
  )
})
