import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { TwoVerticalChoicesModal } from '@components/modals/two-vertical-choices-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IOrder } from '@typings/models/orders/order'

import { useStyles } from './buyer-free-orders-view.style'

import { BuyerFreeOrdersViewModel } from './buyer-free-orders-view.model'

export const BuyerFreeOrdersView = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new BuyerFreeOrdersViewModel())

  return (
    <>
      <Button disabled={viewModel.selectedRows.length === 0} onClick={viewModel.onPickupSomeItems}>
        {t(TranslationKey['Take on the work of the selected'])}
      </Button>

      <div className={styles.dataGridWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          sortingMode="client"
          paginationMode="client"
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
          getRowId={(row: IOrder) => row._id}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            toolbar: {
              resetFiltersBtnSettings: {
                isSomeFilterOn: viewModel.isSomeFilterOn,
                onClickResetFilters: viewModel.onClickResetFilters,
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
          onPinnedColumnsChange={viewModel.handlePinColumn}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onRowSelectionModelChange={viewModel.onSelectionModel}
        />
      </div>

      {viewModel.showTwoVerticalChoicesModal ? (
        <TwoVerticalChoicesModal
          // @ts-ignore
          tooltipFirstButton={t(TranslationKey['Go to the order and open the "Edit order" window'])}
          tooltipSecondButton={t(TranslationKey['Stay in "Free Orders"'])}
          openModal={viewModel.showTwoVerticalChoicesModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showTwoVerticalChoicesModal')}
          title={t(TranslationKey['Order picked up'])}
          topBtnText={t(TranslationKey['Go to order'])}
          bottomBtnText={t(TranslationKey['Continue to work with free orders'])}
          onClickTopBtn={() => viewModel.goToMyOrders()}
          onClickBottomBtn={viewModel.onClickContinueWorkButton}
        />
      ) : null}
    </>
  )
})
