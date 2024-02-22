import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { SelectedButtonValueConfig } from '@constants/configs/buttons'
import { ideaStatusByKey } from '@constants/statuses/idea-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { MAX_DEFAULT_INPUT_VALUE } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { UserModel } from '@models/user-model'

import { BindIdeaToRequestForm } from '@components/forms/bind-idea-to-request-form'
import { ProductLaunchForm } from '@components/forms/product-launch-form'
import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { RequestStandartResultForm } from '@components/forms/request-standart-result-form'
import { CommentsModal } from '@components/modals/comments-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { IdeaCardsModal } from '@components/modals/idea-cards-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { RequestResultModal } from '@components/modals/request-result-modal'
import { SelectionSupplierModal } from '@components/modals/selection-supplier-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { ShowBarOrHscodeModal } from '@components/modals/show-bar-or-hs-code-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content'
import { AlertShield } from '@components/shared/alert-shield'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { PlusIcon } from '@components/shared/svg-icons'

import { ClientIdeasViewModel } from '@views/client/client-ideas-view/client-ideas-view.model'
import { useStyles } from '@views/client/client-ideas-view/client-ideas-view.style'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

export const ClientIdeasView = observer(({ history }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new ClientIdeasViewModel({ history }))

  const [useProductsPermissions] = useState(
    () =>
      new UseProductsPermissions(ClientModel.getProductPermissionsData, {
        isChild: false,
      }),
  )

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getRowClassName = params => {
    if (params.row.status === ideaStatusByKey.SUPPLIER_NOT_FOUND) {
      return [styles.deadlineBorder, styles.redBorder]
    } else if (params.row.status === ideaStatusByKey.SUPPLIER_FOUND) {
      return [styles.deadlineBorder, styles.yellowBorder]
    }
  }

  return (
    <div>
      <div className={styles.controls}>
        <div />

        <SearchInput
          inputClasses={styles.searchInput}
          value={viewModel.currentSearchValue}
          placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
          onSubmit={viewModel.onChangeSearchValue}
        />

        <div>
          {['/client/ideas/new', '/client/ideas/all'].includes(viewModel.history.location.pathname) && (
            <Button
              styleType={ButtonType.SUCCESS}
              className={styles.createRequest}
              onClick={viewModel.onClickProductLaunch}
            >
              <PlusIcon /> {t(TranslationKey['Create idea'])}
            </Button>
          )}
        </div>
      </div>

      <div className={styles.datagridWrapper}>
        <CustomDataGrid
          useResizeContainer
          localeText={getLocalizationByLanguageTag()}
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
          slotProps={{
            columnMenu: viewModel.columnMenuSettings,
            toolbar: {
              resetFiltersBtnSettings: {
                onClickResetFilters: viewModel.onClickResetFilters,
                isSomeFilterOn: viewModel.isSomeFilterOn,
              },
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
              },
            },
          }}
          getRowClassName={getRowClassName}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onChangePaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onRowDoubleClick={params => viewModel.getDataForIdeaModal(params.row.originalData)}
        />
      </div>

      <Modal
        dialogClassName={styles.modalDialogContext}
        openModal={viewModel.showProductLaunch}
        setOpenModal={() => viewModel.onTriggerOpenModal('showProductLaunch')}
      >
        <ProductLaunchForm
          productsToLaunch={useProductsPermissions.currentPermissionsData}
          loadMorePermissionsDataHadler={() => useProductsPermissions.loadMoreDataHadler()}
          onClickVariationRadioButton={() => useProductsPermissions.getPermissionsData()}
          onClickSubmitSearch={value => useProductsPermissions.onClickSubmitSearch(value)}
          onClickNextButton={viewModel.onClickNextButton}
          onClickCancelButton={() => viewModel.onTriggerOpenModal('showProductLaunch')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showSelectionSupplierModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSelectionSupplierModal')}
      >
        <SelectionSupplierModal
          product={viewModel.currentProduct}
          title={t(TranslationKey['Send product card for supplier search'])}
          buttonValue={SelectedButtonValueConfig.SEND_REQUEST}
          onSubmitSeekSupplier={viewModel.onSubmitCalculateSeekSupplier}
          onCloseModal={() => viewModel.onTriggerOpenModal('showSelectionSupplierModal')}
        />
      </Modal>

      {viewModel.showIdeaModal && (
        <IdeaCardsModal
          isCreate={viewModel.isIdeaCreate}
          openModal={viewModel.showIdeaModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showIdeaModal')}
          updateData={() => {
            viewModel.getIdeaList()
            UserModel.getUsersInfoCounters()
          }}
          product={viewModel.currentProduct}
          productId={viewModel.productId}
          currentIdeaId={viewModel.currentIdeaId}
        />
      )}

      <Modal
        openModal={viewModel.showBarcodeOrHscodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBarcodeOrHscodeModal')}
      >
        <ShowBarOrHscodeModal
          barcode={viewModel.currentBarcode}
          hscode={viewModel.currentHscode}
          onCloseModal={() => viewModel.onTriggerOpenModal('showBarcodeOrHscodeModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showSetBarcodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSetBarcodeModal')}
      >
        <SetBarcodeModal
          barCode={viewModel.selectedProduct?.barCode}
          onClickSaveBarcode={viewModel.onClickSaveBarcode}
          onCloseModal={() => viewModel.onTriggerOpenModal('showSetBarcodeModal')}
        />
      </Modal>

      {viewModel.productCardModal && (
        <ProductCardModal
          history={viewModel.history}
          openModal={viewModel.productCardModal}
          setOpenModal={() => viewModel.onClickProductModal()}
          onClickOpenNewTab={row => viewModel.onClickShowProduct(row)}
        />
      )}

      {viewModel.showBindingModal && (
        <Modal
          openModal={viewModel.showBindingModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBindingModal')}
        >
          <BindIdeaToRequestForm
            requests={viewModel.requestsForProduct}
            onClickBindButton={viewModel.onClickBindButton}
          />
        </Modal>
      )}

      <ConfirmationModal
        isWarning={viewModel.confirmModalSettings?.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={viewModel.confirmModalSettings.confirmMessage}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />

      <SuccessInfoModal
        openModal={viewModel.showSuccessModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessModal')}
        title={viewModel.successModalTitle}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => viewModel.onTriggerOpenModal('showSuccessModal')}
      />

      {viewModel.showRequestDesignerResultModal && (
        <Modal
          openModal={viewModel.showRequestDesignerResultModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultModal')}
        >
          <RequestDesignerResultClientForm
            onlyRead
            userInfo={viewModel.userInfo}
            request={{ request: viewModel.currentRequest }}
            // request={viewModel.currentProposal}
            proposal={viewModel.currentProposal}
            setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultModal')}
          />
        </Modal>
      )}

      {viewModel.showRequestStandartResultModal && (
        <Modal
          openModal={viewModel.showRequestStandartResultModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestStandartResultModal')}
        >
          <RequestStandartResultForm
            request={{ request: viewModel.currentRequest }}
            proposal={viewModel.currentProposal}
            setOpenModal={() => viewModel.onTriggerOpenModal('showRequestStandartResultModal')}
          />
        </Modal>
      )}

      {viewModel.showRequestBloggerResultModal && (
        <RequestResultModal
          request={viewModel.currentRequest}
          proposal={viewModel.currentProposal}
          openModal={viewModel.showRequestBloggerResultModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestBloggerResultModal')}
        />
      )}

      <Modal
        missClickModalOn
        openModal={viewModel.showOrderModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showOrderModal')}
      >
        <OrderProductModal
          platformSettings={viewModel.platformSettings}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepers}
          selectedProductsData={[viewModel.currentProduct]}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          destinationsFavourites={viewModel.destinationsFavourites}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onDoubleClickBarcode={viewModel.onDoubleClickBarcode}
          onSubmit={viewModel.onConfirmSubmitOrderProductModal}
        />
      </Modal>

      <Modal openModal={viewModel.showAddOrEditSupplierModal} setOpenModal={viewModel.onTriggerAddOrEditSupplierModal}>
        <AddOrEditSupplierModalContent
          paymentMethods={viewModel.paymentMethods}
          product={viewModel.currentProduct}
          storekeepersData={viewModel.storekeepers}
          requestStatus={viewModel.requestStatus}
          sourceYuanToDollarRate={viewModel.yuanToDollarRate}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          title={t(TranslationKey['Adding and editing a supplier'])}
          showProgress={viewModel.showProgress}
          progressValue={viewModel.progressValue}
          onClickSaveBtn={viewModel.onClickSaveSupplierBtn}
          onTriggerShowModal={viewModel.onTriggerAddOrEditSupplierModal}
        />
      </Modal>

      {viewModel.showCommentsModal ? (
        <CommentsModal
          readOnly={false}
          maxLength={MAX_DEFAULT_INPUT_VALUE}
          title={t(TranslationKey['Reason for rejection'])}
          isOpenModal={viewModel.showCommentsModal}
          onOpenModal={() => viewModel.onTriggerOpenModal('showCommentsModal')}
          onChangeField={viewModel.setRejectStatusHandler}
        />
      ) : null}

      {viewModel.alertShieldSettings.alertShieldMessage && (
        <AlertShield
          showAcceptMessage={viewModel?.alertShieldSettings?.showAlertShield}
          acceptMessage={viewModel?.alertShieldSettings?.alertShieldMessage}
        />
      )}
    </div>
  )
})
