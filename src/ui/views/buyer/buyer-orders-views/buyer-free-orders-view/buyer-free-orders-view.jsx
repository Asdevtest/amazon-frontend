import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { TwoVerticalChoicesModal } from '@components/modals/two-vertical-choices-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './buyer-free-orders-view.style'

import { BuyerFreeOrdersViewModel } from './buyer-free-orders-view.model'

export const BuyerFreeOrdersView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new BuyerFreeOrdersViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div className={styles.btnsWrapper}>
        <Button disabled={viewModel.selectedRowIds.length === 0} onClick={viewModel.onPickupSomeItems}>
          {t(TranslationKey['Take on the work of the selected'])}
        </Button>
      </div>

      <div className={styles.dataGridWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          sortingMode="client"
          paginationMode="client"
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
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
            },
          }}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
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
