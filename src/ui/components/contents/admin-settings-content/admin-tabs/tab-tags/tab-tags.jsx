import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditTagForm } from '@components/forms/add-or-edit-tag-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './tab-tags.style'

import { AdminSettingsTagsModel } from './tab-tags.model'

export const TabTags = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new AdminSettingsTagsModel())

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <Button
          styleType={ButtonType.DANGER}
          disabled={!viewModel.rowSelectionModel.length}
          className={styles.deleteButton}
          onClick={viewModel.onClickRemoveTagsBtn}
        >
          {t(TranslationKey['Delete selected tags'])}
        </Button>
        <SearchInput
          inputClasses={styles.searchInput}
          value={viewModel.nameSearchValue}
          placeholder={t(TranslationKey['Search by tags'])}
          onChange={e => viewModel.onChangeNameSearchValue(e)}
        />
        <Button styleType={ButtonType.SUCCESS} className={styles.saveButton} onClick={() => viewModel.onClickAddBtn()}>
          {t(TranslationKey['Add Tag'])}
        </Button>
      </div>

      <div className={styles.datagridWrapper}>
        <CustomDataGrid
          checkboxSelection
          useResizeContainer
          disableRowSelectionOnClick
          localeText={getLocalizationByLanguageTag()}
          sortModel={viewModel.sortModel}
          sortingMode="client"
          paginationMode="client"
          filterModel={viewModel.filterModel}
          rowSelectionModel={viewModel.rowSelectionModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          rowHeight={70}
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
          loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
          onSortModelChange={viewModel.onChangeSortingModel}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onPaginationModelChange={viewModel.onChangePaginationModel}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>

      <Modal openModal={viewModel.showAddOrEditTagModal} setOpenModal={viewModel.onClickToggleAddOrEditModal}>
        <AddOrEditTagForm
          tags={viewModel.tags}
          tagToEdit={viewModel.tagToEdit}
          onCloseModal={viewModel.onClickCancelBtn}
          onCreateSubmit={viewModel.onCreateTag}
          onEditSubmit={viewModel.onEditTag}
        />
      </Modal>

      <ConfirmationModal
        isWarning={viewModel.confirmModalSettings?.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={viewModel.onClickToggleConfirmModal}
        title={t(TranslationKey.Attention)}
        message={viewModel.confirmModalSettings.message}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onClickSuccess}
        onClickCancelBtn={viewModel.onClickToggleConfirmModal}
      />
    </div>
  )
})
