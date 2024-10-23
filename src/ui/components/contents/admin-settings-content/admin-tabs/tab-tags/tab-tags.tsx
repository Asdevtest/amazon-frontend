import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditTagForm } from '@components/forms/add-or-edit-tag-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { ITag } from '@typings/shared/tag'

import { useStyles } from './tab-tags.style'

import { AdminSettingsTagsModel } from './tab-tags.model'

export const TabTags = observer(() => {
  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new AdminSettingsTagsModel(), [])

  return (
    <div className="viewWrapper">
      <div className={styles.buttons}>
        <CustomButton
          danger
          type="primary"
          size="large"
          disabled={!viewModel.selectedRows.length}
          onClick={viewModel.onClickRemoveTagsBtn}
        >
          {t(TranslationKey['Delete selected tags'])}
        </CustomButton>

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by tags"
          onSearch={viewModel.onSearchSubmit}
        />

        <CustomButton type="primary" size="large" onClick={viewModel.onClickAddBtn}>
          {t(TranslationKey['Add Tag'])}
        </CustomButton>
      </div>

      <CustomDataGrid
        checkboxSelection
        rowCount={viewModel.rowCount}
        className={styles.tableWrapper}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        rowSelectionModel={viewModel.selectedRows}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        pinnedColumns={viewModel.pinnedColumns}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        density={viewModel.densityModel}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
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
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onRowSelectionModelChange={viewModel.onSelectionModel}
      />

      <Modal openModal={viewModel.showAddOrEditTagModal} setOpenModal={viewModel.onClickToggleAddOrEditModal}>
        <AddOrEditTagForm
          tags={viewModel.currentData}
          tagToEdit={viewModel.tagToEdit as ITag}
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
          onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
          onClickCancelBtn={viewModel.onClickToggleConfirmModal}
        />
      ) : null}
    </div>
  )
})
