import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { SourceFilesViewModel } from './source-files-view.model'
import { styles } from './source-files-view.style.js'

export const SourceFilesViewRaw = ({ classes: classNames, history, location }) => {
  const [viewModel] = useState(() => new SourceFilesViewModel({ history, location }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div className={classNames.tablePanelWrapper}>
        <SearchInput
          placeholder={`${t(TranslationKey['Search by'])} ${t(TranslationKey.Title)}, ${t(TranslationKey.ASIN)}`}
          inputClasses={classNames.searchInput}
          value={viewModel.nameSearchValue}
          onChange={viewModel.onChangeNameSearchValue}
        />
      </div>

      <div className={classNames.dataGridWrapper}>
        <MemoDataGrid
          useResizeContainer
          localeText={getLocalizationByLanguageTag()}
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          pageSizeOptions={[15, 25, 50, 100]}
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
          loading={viewModel.requestStatus === loadingStatuses.isLoading}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onChangePaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
          // onRowDoubleClick={e => onClickViewMore(e.row._id)}
        />
      </div>

      <ConfirmationModal
        isWarning={viewModel.confirmModalSettings?.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={viewModel.confirmModalSettings.title}
        message={viewModel.confirmModalSettings.message}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onClickSuccess}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />
    </>
  )
}

export const SourceFilesView = withStyles(observer(SourceFilesViewRaw), styles)
