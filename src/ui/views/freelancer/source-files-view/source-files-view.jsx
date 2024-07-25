import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { SourceFilesViewModel } from './source-files-view.model'
import { useStyles } from './source-files-view.style.js'

export const SourceFilesView = observer(() => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new SourceFilesViewModel())

  return (
    <>
      <div className={styles.searchContainer}>
        <SearchInput
          placeholder={`${t(TranslationKey['Search by'])} ${t(TranslationKey.Title)}, ${t(TranslationKey.ASIN)}`}
          value={viewModel.nameSearchValue}
          onChange={viewModel.onChangeNameSearchValue}
        />
      </div>

      <div className={styles.dataGridWrapper}>
        <CustomDataGrid
          rowCount={viewModel.rowCount}
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
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
              },
            },
          }}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>
    </>
  )
})
