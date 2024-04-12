import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './warehouse-sent-batches-view.style'

import { WarehouseSentBatchesViewModel } from './warehouse-sent-batches-view.model'

export const WarehouseSentBatchesView = observer(() => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new WarehouseSentBatchesViewModel())

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div className={styles.headerWrapper}>
        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onTriggerArchive}>
          {viewModel.isArchive ? t(TranslationKey['Actual batches']) : t(TranslationKey['Open archive'])}
        </Button>

        <SearchInput
          inputClasses={styles.searchInput}
          value={viewModel.nameSearchValue}
          placeholder={t(TranslationKey['Search by ASIN, Title, Batch ID, Order ID'])}
          onSubmit={viewModel.onSearchSubmit}
        />

        <div />
      </div>

      <div className={styles.datagridWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
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
            },
          }}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onRowDoubleClick={e => viewModel.setCurrentOpenedBatch(e.row.originalData._id)}
        />
      </div>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
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
      ) : null}

      {viewModel.showBatchInfoModal ? (
        <BatchInfoModal
          // @ts-ignore
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          openModal={viewModel.showBatchInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBatchInfoModal')}
          batch={viewModel.curBatch}
          userInfo={viewModel.userInfo}
          patchActualShippingCostBatch={viewModel.patchActualShippingCostBatch}
          onSubmitChangeBoxFields={viewModel.onSubmitChangeBoxFields}
          onClickHsCode={viewModel.onClickHsCode}
        />
      ) : null}
    </>
  )
})
