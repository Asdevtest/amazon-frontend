import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditTagForm } from '@components/forms/add-or-edit-tag-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './tab-tags.style'

import { AdminSettingsTagsModel } from './tab-tags.model'

export const TabTags = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new AdminSettingsTagsModel())

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <CustomButton
          danger
          type="primary"
          size="large"
          disabled={!viewModel.rowSelectionModel.length}
          onClick={viewModel.onClickRemoveTagsBtn}
        >
          {t(TranslationKey['Delete selected tags'])}
        </CustomButton>
        <SearchInput
          inputClasses={styles.searchInput}
          value={viewModel.nameSearchValue}
          placeholder={t(TranslationKey['Search by tags'])}
          onChange={e => viewModel.onChangeNameSearchValue(e)}
        />
        <CustomButton type="primary" size="large" onClick={viewModel.onClickAddBtn}>
          {t(TranslationKey['Add Tag'])}
        </CustomButton>
      </div>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          sortModel={viewModel.sortModel}
          sortingMode="client"
          paginationMode="client"
          filterModel={viewModel.filterModel}
          rowSelectionModel={viewModel.rowSelectionModel}
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
          onSortModelChange={viewModel.onChangeSortingModel}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onPaginationModelChange={viewModel.onPaginationModelChange}
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

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
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
      ) : null}
    </div>
  )
})
