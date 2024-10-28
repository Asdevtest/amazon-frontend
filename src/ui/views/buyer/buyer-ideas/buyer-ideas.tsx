import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { GridRowClassNameParams, GridRowModel } from '@mui/x-data-grid-premium'

import { ideaStatusByKey } from '@constants/statuses/idea-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserModel } from '@models/user-model'

import { IdeaCardsModal } from '@components/modals/idea-cards-modal'
import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './buyer-ideas.style'

import { BuyerIdeasViewModel } from './buyer-ideas.model'

export const BuyerIdeas = observer(() => {
  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new BuyerIdeasViewModel(), [])

  const getRowClassName = (params: GridRowClassNameParams) => {
    if (params.row.status === ideaStatusByKey.SUPPLIER_NOT_FOUND) {
      return [styles.deadlineBorder, styles.redBorder]
    } else if (params.row.status === ideaStatusByKey.SUPPLIER_FOUND) {
      return [styles.deadlineBorder, styles.yellowBorder]
    }
  }

  return (
    <div className="viewWrapper">
      <CustomInputSearch
        enterButton
        allowClear
        size="large"
        placeholder="Search by SKU, ASIN, Title, ID"
        onSearch={viewModel.onSearchSubmit}
      />

      <CustomDataGrid
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

            tablePresets: {
              showPresetsSelect: viewModel.showPresetsSelect,
              presetsTableData: viewModel.presetsTableData,
              handleChangeSelectState: viewModel.onChangeShowPresetsSelect,
              handleSetPresetActive: viewModel.handleSetPresetActive,
              handleCreateTableSettingsPreset: viewModel.handleCreateTableSettingsPreset,
              handleDeleteTableSettingsPreset: viewModel.handleDeleteTableSettingsPreset,
              handleUpdateTableSettingsPreset: viewModel.handleUpdateTableSettingsPreset,
              onClickAddQuickAccess: viewModel.onClickAddQuickAccess,
              onClickSaveRenamedPreset: viewModel.onClickSaveRenamedPreset,
            },
          },
        }}
        getRowClassName={getRowClassName}
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onRowDoubleClick={(params: GridRowModel) => viewModel.getDataForIdeaModal(params.row)}
      />

      {viewModel.showIdeaModal ? (
        <IdeaCardsModal
          // @ts-ignore
          openModal={viewModel.showIdeaModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showIdeaModal')}
          updateData={() => {
            viewModel.getCurrentData()
            UserModel.getUsersInfoCounters()
          }}
          productId={viewModel.productId}
          product={viewModel.currentProduct as IProduct}
          currentIdeaId={viewModel.currentIdeaId}
        />
      ) : null}

      <Modal
        openModal={viewModel.showAddOrEditSupplierModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditSupplierModal')}
      >
        <AddOrEditSupplierModalContent
          // @ts-ignore
          paymentMethods={viewModel.paymentMethods}
          requestStatus={viewModel.requestStatus}
          platformSettings={viewModel.platformSettings}
          title={t(TranslationKey['Adding and editing a supplier'])}
          onClickSaveBtn={viewModel.onClickSaveSupplierBtn}
          onTriggerShowModal={() => viewModel.onTriggerOpenModal('showAddOrEditSupplierModal')}
        />
      </Modal>
    </div>
  )
})
