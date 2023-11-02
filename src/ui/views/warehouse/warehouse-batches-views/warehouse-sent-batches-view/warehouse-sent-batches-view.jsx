import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './warehouse-sent-batches-view.style'

import { WarehouseSentBatchesViewModel } from './warehouse-sent-batches-view.model'

export const WarehouseSentBatchesViewRaw = props => {
  const [viewModel] = useState(() => new WarehouseSentBatchesViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div>
        {/* <div className={classNames.btnsWrapper}>
                <Button
                  disableElevation
                  disabled
                  color="primary"
                  variant="contained"
                  onClick={() => onTriggerOpenModal('showConfirmModal')}
                >
                  {'Сancel sending'}
                </Button>
              </div> */}

        <div className={classNames.headerWrapper}>
          {viewModel.isArchive ? (
            <Button variant="outlined" className={classNames.openArchiveBtn} onClick={viewModel.onTriggerArchive}>
              {t(TranslationKey['Actual batches'])}
            </Button>
          ) : (
            <Button variant="outlined" className={classNames.openArchiveBtn} onClick={viewModel.onTriggerArchive}>
              {t(TranslationKey['Open archive'])}
            </Button>
          )}

          <SearchInput
            inputClasses={classNames.searchInput}
            value={viewModel.nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Title, Batch ID, Order ID'])}
            onSubmit={viewModel.onSearchSubmit}
          />

          <div />
        </div>

        <div className={classNames.datagridWrapper}>
          <CustomDataGrid
            checkboxSelection
            useResizeContainer
            disableRowSelectionOnClick
            localeText={getLocalizationByLanguageTag()}
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
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
            onRowDoubleClick={e => viewModel.setCurrentOpenedBatch(e.row.originalData._id)}
          />
        </div>
      </div>

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
        isWarning={viewModel.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={t(TranslationKey.Send) + '*'}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.onClickConfirmSendToBatchBtn}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />

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

export const WarehouseSentBatchesView = withStyles(observer(WarehouseSentBatchesViewRaw), styles)
