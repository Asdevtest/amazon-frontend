import { observer } from 'mobx-react'
import { useState } from 'react'

import { GridRowParams } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { BoxModal } from '@components/modals/box-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { SupplierApproximateCalculationsModal } from '@components/modals/supplier-approximate-calculations'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { TariffModal } from '@typings/enums/tariff-modal'
import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './client-boxes-tariffs-notifications-view.style'

import { ClientBoxesTariffsNotificationsViewModel } from './client-boxes-tariffs-notifications-view.model'

export const ClientBoxesTariffsNotificationsView = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ClientBoxesTariffsNotificationsViewModel())

  return (
    <>
      <div className={styles.tableWrapper}>
        <CustomDataGrid
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          pinnedColumns={viewModel.pinnedColumns}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          getRowId={(box: IBox) => box._id}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          rowSelectionModel={viewModel.selectedRows}
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
            },
          }}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onRowDoubleClick={(e: GridRowParams) => viewModel.setCurrentOpenedBox(e.row)}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onPinnedColumnsChange={viewModel.handlePinColumn}
        />
      </div>

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
          onClickCancelBtn={viewModel.confirmModalSettings.onCancel}
        />
      ) : null}

      {viewModel.showSelectionStorekeeperAndTariffModal ? (
        <SupplierApproximateCalculationsModal
          isTariffsSelect
          tariffModalType={TariffModal.WAREHOUSE}
          openModal={viewModel.showSelectionStorekeeperAndTariffModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')}
          box={viewModel.curBox || undefined}
          onClickSubmit={viewModel.onClickConfirmTarrifChangeBtn}
        />
      ) : null}

      <Modal
        openModal={viewModel.showBoxViewModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
      >
        <BoxModal boxId={viewModel.curBoxId} onToggleModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')} />
      </Modal>
    </>
  )
})
