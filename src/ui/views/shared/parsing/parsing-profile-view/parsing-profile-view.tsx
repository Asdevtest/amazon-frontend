import { observer } from 'mobx-react'
import { FC, useState } from 'react'
import { FaPlay, FaPlus } from 'react-icons/fa'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './parsing-profile-view.style'

import { ParsingProfileForm } from './parsing-profile-form'
import { ParsingProdileViewModel } from './parsing-profile-view.model'

export const ParsingProdileView: FC = observer(() => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new ParsingProdileViewModel())

  return (
    <>
      <div className={styles.flexRow}>
        <CustomButton disabled size="large" type="primary" icon={<FaPlay size="12" />}>
          {t(TranslationKey['Force start'])}
        </CustomButton>

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by name, email"
          onSearch={viewModel.onSearchSubmit}
        />

        <CustomButton size="large" type="primary" icon={<FaPlus size="12" />} onClick={viewModel.onAddProfileModal}>
          {t(TranslationKey['Add profile'])}
        </CustomButton>
      </div>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          pinnedColumns={viewModel.pinnedColumns}
          rowSelectionModel={viewModel.selectedRows}
          paginationModel={viewModel.paginationModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          getRowId={({ _id }: GridRowModel) => _id}
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
          rowCount={viewModel.rowCount}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          onPinnedColumnsChange={viewModel.handlePinColumn}
          onSortModelChange={viewModel.onChangeSortingModel}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        />
      </div>

      <Modal missClickModalOn openModal={viewModel.showToggleProfileModal} setOpenModal={viewModel.onAddProfileModal}>
        <ParsingProfileForm profile={viewModel.editProfile} onClose={viewModel.onAddProfileModal} />
      </Modal>
    </>
  )
})
