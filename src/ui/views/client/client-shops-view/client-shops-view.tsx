import { observer } from 'mobx-react'
import { useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './client-shops-view.style'

import { ShopsViewModel } from './client-shops-view.model'
import { ShopCascader } from './components/shop-cascader'
import { ShopForm } from './components/shop-form'

export const ClientShopsView = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ShopsViewModel())

  return (
    <>
      <div className={styles.flexRow}>
        <CustomButton type="primary" size="large" onClick={viewModel.onAddShop}>
          {t(TranslationKey['Add shop'])}
        </CustomButton>

        <CustomButton
          type="primary"
          size="large"
          disabled={viewModel.disableUpdateButton}
          onClick={viewModel.onUpdateShops}
        >
          {t(TranslationKey.Update)}
        </CustomButton>

        {viewModel.filteredData.length ? <ShopCascader data={viewModel.filteredData} /> : null}

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by Title"
          onSearch={viewModel.onSearchSubmit}
        />
      </div>

      <div className={styles.tabledWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          pinnedColumns={viewModel.pinnedColumns}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          getRowId={({ _id }: GridRowModel) => _id}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            columnMenu: viewModel.columnMenuSettings,
            toolbar: {
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
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          rowSelectionModel={viewModel.selectedRows}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onPinnedColumnsChange={viewModel.handlePinColumn}
        />
      </div>

      <Modal openModal={viewModel.shopModal} setOpenModal={() => viewModel.onTriggerOpenModal('shopModal')}>
        <ShopForm
          shop={viewModel.selectedShop}
          onClose={() => viewModel.onTriggerOpenModal('shopModal')}
          onUpdateData={viewModel.getCurrentData}
        />
      </Modal>
    </>
  )
})
