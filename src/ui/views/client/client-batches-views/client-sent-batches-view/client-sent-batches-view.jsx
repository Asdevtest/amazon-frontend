import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { ArchiveIcon } from '@components/shared/svg-icons'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { ClientSentBatchesViewModel } from './client-sent-batches-view.model'
import { styles } from './client-sent-batches-view.style'

export const ClientSentBatchesViewRaw = props => {
  const [viewModel] = useState(() => new ClientSentBatchesViewModel({ history: props.history }))
  const { classes: className } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div>
        <div className={className.btnsWrapper}>
          <Button
            // tooltipInfoContent={t(TranslationKey['Deleted product archive'])}
            variant="outlined"
            className={className.openArchiveBtn}
            onClick={viewModel.onTriggerArchive}
          >
            {viewModel.isArchive ? t(TranslationKey['Back to actual batches']) : t(TranslationKey['Open archive'])}
          </Button>

          <SearchInput
            key={'client_batches_awaiting-batch_search_input'}
            inputClasses={className.searchInput}
            value={viewModel.nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Title, Batch ID, Order ID'])}
            onSubmit={viewModel.onSearchSubmit}
          />

          <div className={className.simpleBtnsWrapper}>
            <Button
              // tooltipInfoContent={t(
              //   TranslationKey['Delete the selected product (the product is moved to the archive)'],
              // )}
              disabled={!viewModel.selectedBatches.length}
              variant="outlined"
              className={className.archiveAddBtn}
              sx={{
                '&.Mui-disabled': {
                  background: 'none',
                },
              }}
              onClick={viewModel.onClickTriggerArchOrResetProducts}
            >
              {viewModel.isArchive ? (
                t(TranslationKey['Relocate from archive'])
              ) : (
                <>
                  {t(TranslationKey['Move to archive'])}
                  {<ArchiveIcon />}
                </>
              )}
            </Button>
          </div>
        </div>

        <div className={className.boxesFiltersWrapper}>
          {viewModel.storekeepersData
            .slice()
            .sort((a, b) => a.name?.localeCompare(b.name))
            .filter(el => el.boxesCount > 0)
            .map(storekeeper => (
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
            ))}

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

        <div className={className.datagridWrapper}>
          <MemoDataGrid
            pagination
            useResizeContainer
            checkboxSelection
            propsToRerender={{ productViewMode: viewModel.productViewMode }}
            localeText={getLocalizationByLanguageTag()}
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
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.getCurrentData()}
            getRowHeight={() => 'auto'}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
              columnMenu: DataGridCustomColumnMenuComponent,
            }}
            slotProps={{
              columnMenu: viewModel.columnMenuSettings,

              baseTooltip: {
                title: t(TranslationKey.Filter),
              },
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
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
            onRowDoubleClick={e => viewModel.setCurrentOpenedBatch(e.row.originalData._id)}
          />
        </div>
      </div>

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
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        isWarning={viewModel.confirmModalSettings.isWarning}
        title={viewModel.confirmModalSettings.confirmTitle}
        message={viewModel.confirmModalSettings.confirmMessage}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.Cancel)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
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

export const ClientSentBatchesView = withStyles(observer(ClientSentBatchesViewRaw), styles)
