import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'
import { BindIdeaToRequestForm } from '@components/forms/bind-idea-to-request-form'
import { MainContent } from '@components/layout/main-content'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { IdeaCardsModal } from '@components/modals/idea-cards-modal'
import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { ShowBarOrHscodeModal } from '@components/modals/show-bar-or-hs-code-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { PlusIcon } from '@components/shared/svg-icons'

import { ClientIdeasViewModel } from '@views/client/client-ideas-view/client-ideas-view.model'
import { useClientIdeasViewStyles } from '@views/client/client-ideas-view/client-ideas-view.styles'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

export const ClientIdeasView = observer(props => {
  const [viewModel] = useState(() => new ClientIdeasViewModel({ history: props.history }))
  const { classes: styles } = useClientIdeasViewStyles()

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <MainContent>
      <div className={styles.controls}>
        <div />
        <SearchInput
          value={viewModel.currentSearchValue}
          placeholder={t(TranslationKey['Search by ASIN, Title, Batch ID, Order ID'])}
          onSubmit={viewModel.onChangeSearchValue}
        />

        <div>
          {['/client/ideas/new', '/client/ideas/all'].includes(viewModel.history.location.pathname) && (
            <Button success className={styles.createRequest}>
              <PlusIcon /> {t(TranslationKey['Create idea'])}
            </Button>
          )}
        </div>
      </div>

      <div className={styles.datagridWrapper}>
        <MemoDataGrid
          pagination
          useResizeContainer
          localeText={getLocalizationByLanguageTag()}
          classes={{
            row: styles.row,
            root: styles.root,
            footerContainer: styles.footerContainer,
            footerCell: styles.footerCell,
            toolbarContainer: styles.toolbarContainer,
          }}
          sortingMode="server"
          paginationMode="server"
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          pageSizeOptions={[15, 25, 50, 100]}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.isLoading}
          slots={{
            toolbar: DataGridCustomToolbar,
            columnMenuIcon: FilterAltOutlinedIcon,
          }}
          slotProps={{
            toolbar: {
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
              },
            },
          }}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onChangePaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onRowDoubleClick={params => viewModel.getDataForIdeaModal(params.row)}
        />
      </div>

      {viewModel.showIdeaModal && (
        <IdeaCardsModal
          openModal={viewModel.showIdeaModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showIdeaModal')}
          productId={viewModel.currentProduct?._id}
          product={viewModel.currentProduct}
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
          item={viewModel.selectedProduct}
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
        isWarning={viewModel.confirmModalSettings.isWarning}
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
    </MainContent>
  )
})
