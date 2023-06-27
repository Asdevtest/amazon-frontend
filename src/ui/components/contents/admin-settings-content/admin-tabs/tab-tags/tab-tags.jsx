import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditTagForm } from '@components/forms/add-or-edit-tag-form'
import { Button } from '@components/shared/buttons/button'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { AdminSettingsTagsModel } from './tab-tags.model'

import { useClassNames } from './tab-tags.style'

export const TabTags = observer(() => {
  const { classes: classNames } = useClassNames()

  const [viewModel] = useState(() => new AdminSettingsTagsModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <div className={classNames.wrapper}>
      <div className={classNames.buttons}>
        <Button
          danger
          disabled={!viewModel.rowSelectionModel.length}
          className={classNames.deleteButton}
          // onClick={viewModel.removeTags}
        >
          {t(TranslationKey['Delete selected tags'])}
        </Button>
        <SearchInput
          inputClasses={classNames.searchInput}
          value={viewModel.nameSearchValue}
          placeholder={t(TranslationKey['Search by tags'])}
          onChange={e => viewModel.onChangeNameSearchValue(e)}
        />
        <Button success className={classNames.saveButton} onClick={() => viewModel.onClickAddBtn()}>
          {t(TranslationKey['Add Tag'])}
        </Button>
      </div>

      <div className={classNames.datagridWrapper}>
        <MemoDataGrid
          checkboxSelection
          pagination
          useResizeContainer
          classes={{
            footerContainer: classNames.footerContainer,
            footerCell: classNames.footerCell,
            toolbarContainer: classNames.toolbarContainer,
          }}
          localeText={getLocalizationByLanguageTag()}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          rowSelectionModel={viewModel.rowSelectionModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel?.paginationModel}
          pageSizeOptions={[15, 25, 50, 100]}
          rows={viewModel.getCurrentData()}
          rowHeight={70}
          slots={{
            toolbar: DataGridCustomToolbar,
            columnMenuIcon: FilterAltOutlinedIcon,
          }}
          slotProps={{
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
          onSortModelChange={viewModel.onChangeSortingModel}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onPaginationModelChange={viewModel.onChangePaginationModel}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>

      <Modal
        openModal={viewModel?.showAddOrEditTagModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditTagModal')}
      >
        <AddOrEditTagForm
          tagToEdit={viewModel.tagToEdit}
          onCloseModal={() => viewModel.onClickCancelBtn()}
          onCreateSubmit={viewModel.createTag}
          // onEditSubmit={viewModel.editTag}
        />
      </Modal>

      <ConfirmationModal
        isWarning={viewModel.confirmModalSettings.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={viewModel.confirmModalSettings.message}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onClickSuccess}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />
    </div>
  )
})
