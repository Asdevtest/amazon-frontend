import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { AddOrEditBatchForm } from '@components/forms/add-or-edit-batch-form'
import { MainContent } from '@components/layout/main-content'
import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './client-awaiting-batches-view.style'

import { ClientAwaitingBatchesViewModel } from './client-awaiting-batches-view.model'

export const ClientAwaitingBatchesViewRaw = props => {
  const [viewModel] = useState(() => new ClientAwaitingBatchesViewModel({ history: props.history }))
  const { classes: className } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <MainContent>
        <div className={className.btnsWrapper}>
          <div className={className.btnsSubWrapper}>
            <Button
              disabled={!viewModel.selectedBatches.length}
              tooltipInfoContent={t(
                TranslationKey['Returns all boxes from the selected batch to the "Boxes ready to send" section'],
              )}
              className={className.cancelBtn}
              color="primary"
              variant="contained"
              onClick={() => viewModel.onTriggerOpenModal('showConfirmModal')}
            >
              {t(TranslationKey['Cancel Send'])}
            </Button>

            <div className={className.boxesFiltersWrapper}>
              {viewModel.storekeepersData
                .slice()
                .sort((a, b) => a.name?.localeCompare(b.name))
                .map(storekeeper =>
                  storekeeper.boxesCount !== 0 ? (
                    <Button
                      key={storekeeper._id}
                      disabled={viewModel.currentStorekeeper?._id === storekeeper._id}
                      className={cx(className.storekeeperButton, {
                        [className.selectedBoxesBtn]: viewModel.currentStorekeeper?._id === storekeeper._id,
                      })}
                      variant="text"
                      onClick={() => viewModel.onClickStorekeeperBtn(storekeeper)}
                    >
                      {storekeeper.name}
                    </Button>
                  ) : null,
                )}

              <Button
                disabled={!viewModel.currentStorekeeper?._id}
                className={cx(className.storekeeperButton, {
                  [className.selectedBoxesBtn]: !viewModel.currentStorekeeper?._id,
                })}
                variant="text"
                onClick={viewModel.onClickStorekeeperBtn}
              >
                {t(TranslationKey['All warehouses'])}
              </Button>
            </div>
          </div>

          <div className={className.rightSideWrapper}>
            <SearchInput
              key={'client_batches_awaiting-batch_search_input'}
              inputClasses={className.searchInput}
              value={viewModel.nameSearchValue}
              placeholder={t(TranslationKey['Search by ASIN, Title, Batch ID, Order ID'])}
              onSubmit={viewModel.onSearchSubmit}
            />

            <div className={className.rightSideButtonsWrapper}>
              <Button
                disabled={viewModel.selectedBatches.length !== 1}
                variant="contained"
                className={className.rightSideButton}
                onClick={() => viewModel.onClickAddOrEditBatch({ isAdding: false })}
              >
                {t(TranslationKey['Edit batch'])}
              </Button>
              <Button
                success
                className={className.rightSideButton}
                variant="contained"
                onClick={() => viewModel.onClickAddOrEditBatch({ isAdding: true })}
              >
                {t(TranslationKey['Create a batch'])}
              </Button>
            </div>
          </div>
        </div>
        <div className={className.datagridWrapper}>
          <MemoDataGrid
            pagination
            useResizeContainer
            checkboxSelection
            localeText={getLocalizationByLanguageTag()}
            propsToRerender={{ productViewMode: viewModel.productViewMode }}
            classes={{
              row: className.row,
              root: className.root,
              footerContainer: className.footerContainer,
              footerCell: className.footerCell,
              toolbarContainer: className.toolbarContainer,
            }}
            sortingMode="server"
            paginationMode="server"
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            rowSelectionModel={viewModel.selectedBatches}
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
              baseTooltip: {
                title: t(TranslationKey.Filter),
              },
              toolbar: {
                columsBtnSettings: {
                  columnsModel: viewModel.columnsModel,
                  columnVisibilityModel: viewModel.columnVisibilityModel,
                  onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
                },
              },
            }}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
            onRowDoubleClick={e => viewModel.setCurrentOpenedBatch(e.row.originalData._id)}
          />
        </div>
      </MainContent>

      <Modal
        openModal={viewModel.showAddOrEditBatchModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditBatchModal')}
      >
        <AddOrEditBatchForm
          userRole={viewModel.userInfo.role}
          progressValue={viewModel.progressValue}
          showProgress={viewModel.showProgress}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          batchToEdit={viewModel.currentData.find(batch => batch.id === viewModel.selectedBatches.slice()[0])}
          boxesData={viewModel.boxesData}
          onClose={() => viewModel.onTriggerOpenModal('showAddOrEditBatchModal')}
          onSubmit={viewModel.onSubmitAddOrEditBatch}
        />
      </Modal>

      <BatchInfoModal
        volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
        openModal={viewModel.showBatchInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBatchInfoModal')}
        batch={viewModel.curBatch}
        userInfo={viewModel.userInfo}
        patchActualShippingCostBatch={viewModel.patchActualShippingCostBatch}
        onSubmitChangeBoxFields={viewModel.onSubmitChangeBoxFields}
        onClickHsCode={viewModel.onClickHsCode}
      />

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

      <ConfirmationModal
        isWarning
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={t(TranslationKey['Are you sure you want to cancel the send?'])}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.onClickCancelSendToBatchBtn}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />

      <WarningInfoModal
        isWarning={viewModel.warningInfoModalSettings.isWarning}
        openModal={viewModel.showWarningInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
        title={viewModel.warningInfoModalSettings.title}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showWarningInfoModal')
        }}
      />
    </React.Fragment>
  )
}

export const ClientAwaitingBatchesView = withStyles(observer(ClientAwaitingBatchesViewRaw), styles)
