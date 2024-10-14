import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'

import { ideaStatusByKey } from '@constants/statuses/idea-status'
import { MAX_DEFAULT_INPUT_VALUE } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserModel } from '@models/user-model'

import { BindIdeaToRequestForm } from '@components/forms/bind-idea-to-request-form'
import { ProductLaunchForm } from '@components/forms/product-launch-form'
import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { CommentsModal } from '@components/modals/comments-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { IdeaCardsModal } from '@components/modals/idea-cards-modal'
import { MainRequestResultModal } from '@components/modals/main-request-result-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { RequestResultModal } from '@components/modals/request-result-modal'
import { SelectionSupplierModal } from '@components/modals/selection-supplier-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { ShowBarOrHscodeModal } from '@components/modals/show-bar-or-hs-code-modal'
import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { useStyles } from '@views/client/client-ideas-view/client-ideas-view.style'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { ClientIdeasViewModel } from './client-ideas-view.model'

export const ClientIdeasView = observer(({ history }) => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new ClientIdeasViewModel({ history }), [])

  const getRowClassName = params => {
    if (params.row.status === ideaStatusByKey.SUPPLIER_NOT_FOUND) {
      return [styles.deadlineBorder, styles.redBorder]
    } else if (params.row.status === ideaStatusByKey.SUPPLIER_FOUND) {
      return [styles.deadlineBorder, styles.yellowBorder]
    }
  }

  return (
    <div className="viewWrapper">
      <div className={styles.controls}>
        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by SKU, ASIN, Title, ID"
          onSearch={viewModel.onSearchSubmit}
        />

        {['/client/ideas/new', '/client/ideas/all'].includes(viewModel.history.location.pathname) && (
          <CustomButton type="primary" size="large" icon={<FiPlus />} onClick={viewModel.onClickProductLaunch}>
            {t(TranslationKey['Create idea'])}
          </CustomButton>
        )}
      </div>

      <CustomDataGrid
        rowCount={viewModel.rowCount}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        pinnedColumns={viewModel.pinnedColumns}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        density={viewModel.densityModel}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        getRowId={({ _id }) => _id}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
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

            sortSettings: {
              sortModel: viewModel.sortModel,
              columnsModel: viewModel.columnsModel,
              onSortModelChange: viewModel.onChangeSortingModel,
            },

            tablePresets: {
              showPresetsSelect: viewModel.showPresetsSelect,
              presetsTableData: viewModel.presetsTableData,
              handleChangeSelectState: viewModel.onChangeShowPresetsSelect,
              handleSetPresetActive: viewModel.handleSetPresetActive,
              handleCreateTableSettingsPreset: viewModel.handleCreateTableSettingsPreset,
              handleDeleteTableSettingsPreset: viewModel.handleDeleteTableSettingsPreset,
              handleUpdateTableSettingsPreset: viewModel.handleUpdateTableSettingsPreset,
              onClickAddQuickAccess: viewModel.onClickAddQuickAccess,
              onClickSaveRenamedPreset: viewModel.onClickSaveRenamedPreset,
            },
          },
        }}
        getRowClassName={getRowClassName}
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onRowDoubleClick={params => viewModel.getDataForIdeaModal(params.row)}
      />

      <Modal
        openModal={viewModel.showProductLaunch}
        setOpenModal={() => viewModel.onTriggerOpenModal('showProductLaunch')}
      >
        <ProductLaunchForm
          onSubmit={viewModel.onClickNextButton}
          onClose={() => viewModel.onTriggerOpenModal('showProductLaunch')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showSelectionSupplierModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSelectionSupplierModal')}
      >
        <SelectionSupplierModal
          product={viewModel.currentProduct}
          title={t(TranslationKey['Send product card for supplier search'])}
          onSubmitSeekSupplier={viewModel.onSubmitCalculateSeekSupplier}
          onCloseModal={() => viewModel.onTriggerOpenModal('showSelectionSupplierModal')}
        />
      </Modal>

      {viewModel.showIdeaModal ? (
        <IdeaCardsModal
          // @ts-ignore
          isCreate={viewModel.isIdeaCreate}
          openModal={viewModel.showIdeaModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showIdeaModal')}
          updateData={() => {
            viewModel.getCurrentData()
            UserModel.getUsersInfoCounters()
          }}
          product={viewModel.currentProduct}
          productId={viewModel.productId}
          currentIdeaId={viewModel.currentIdeaId}
        />
      ) : null}

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
          history={history}
          openModal={viewModel.productCardModal}
          setOpenModal={() => viewModel.onClickProductModal()}
          onClickOpenNewTab={row => viewModel.onClickShowProduct(row)}
        />
      )}

      <Modal
        openModal={viewModel.showBindingModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBindingModal')}
      >
        <BindIdeaToRequestForm
          requests={viewModel.requestsForProduct}
          onClickBindButton={viewModel.onClickBindButton}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={viewModel.confirmModalSettings?.isWarning}
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      <Modal
        openModal={viewModel.showRequestDesignerResultModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultModal')}
      >
        <RequestDesignerResultClientForm
          onlyRead
          userInfo={viewModel.userInfo}
          request={{ request: viewModel.currentRequest }}
          proposal={viewModel.currentProposal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultModal')}
        />
      </Modal>

      {viewModel.showMainRequestResultModal ? (
        <MainRequestResultModal
          readOnly
          customProposal={viewModel.currentProposal}
          userInfo={viewModel.userInfo}
          openModal={viewModel.showMainRequestResultModal}
          onOpenModal={() => viewModel.onTriggerOpenModal('showMainRequestResultModal')}
        />
      ) : null}

      {viewModel.showRequestBloggerResultModal ? (
        <RequestResultModal
          // @ts-ignore
          proposal={viewModel.currentProposal}
          openModal={viewModel.showRequestBloggerResultModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestBloggerResultModal')}
        />
      ) : null}

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

      {viewModel.showCommentsModal ? (
        <CommentsModal
          required
          readOnly={false}
          maxLength={MAX_DEFAULT_INPUT_VALUE}
          title={t(TranslationKey['Reason for rejection'])}
          openModal={viewModel.showCommentsModal}
          onOpenModal={() => viewModel.onTriggerOpenModal('showCommentsModal')}
          onChangeField={viewModel.setRejectStatusHandler}
        />
      ) : null}

      <Modal
        openModal={viewModel.showAddOrEditSupplierModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditSupplierModal')}
      >
        <AddOrEditSupplierModalContent
          // @ts-ignore
          paymentMethods={viewModel.paymentMethods}
          requestStatus={viewModel.requestStatus}
          platformSettings={viewModel.platformSettings}
          title={t(TranslationKey['Adding and editing a supplier'])}
          onClickSaveBtn={viewModel.onClickSaveSupplierBtn}
          onTriggerShowModal={() => viewModel.onTriggerOpenModal('showAddOrEditSupplierModal')}
        />
      </Modal>
    </div>
  )
})
