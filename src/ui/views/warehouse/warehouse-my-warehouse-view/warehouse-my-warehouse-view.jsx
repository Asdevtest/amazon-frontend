import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, { useEffect, useState } from 'react'

import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { BoxStatus } from '@constants/statuses/box-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { AddOrEditBatchForm } from '@components/forms/add-or-edit-batch-form'
import { AddOrEditHsCodeInBox } from '@components/forms/add-or-edit-hs-code-in-box-form'
import { BoxViewForm } from '@components/forms/box-view-form'
import { EditBoxStorekeeperForm } from '@components/forms/edit-box-storekeeper-form'
import { EditMultipleBoxesForm } from '@components/forms/edit-multiple-boxes-form'
import { GroupingBoxesForm } from '@components/forms/grouping-boxes-form'
import { MoveBoxToBatchForm } from '@components/forms/move-box-to-batch-form'
import { MainContent } from '@components/layout/main-content'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { MergeBoxesModal } from '@components/modals/merge-boxes-modal'
import { StorekeeperRedistributeBox } from '@components/modals/storekeeper'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { EditBoxTasksModal } from '@components/warehouse/edit-task-modal/edit-box-tasks-modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { WarehouseMyWarehouseViewModel } from './warehouse-my-warehouse-view.model'
import { styles } from './warehouse-my-warehouse-view.style'

export const WarehouseMyWarehouseViewRaw = props => {
  const [viewModel] = useState(() => new WarehouseMyWarehouseViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const renderButtons = () => (
    <React.Fragment>
      <Button
        tooltipInfoContent={t(TranslationKey['Form for changing the box data'])}
        disabled={!viewModel.selectedBoxes.length}
        className={classNames.editBtn}
        onClick={viewModel.onEditBox}
      >
        {t(TranslationKey.Edit)}
      </Button>

      <Button
        tooltipInfoContent={t(TranslationKey['Form for merging several boxes'])}
        disabled={viewModel.selectedBoxes.length <= 1 /* || isMasterBoxSelected*/}
        onClick={viewModel.onClickMergeBtn}
      >
        {t(TranslationKey.Merge)}
      </Button>

      <Button
        disabled={viewModel.selectedBoxes.length !== 1}
        tooltipInfoContent={t(TranslationKey['Form for distributing to multiple boxes'])}
        onClick={viewModel.onClickSplitBtn}
      >
        {t(TranslationKey.Redistribute)}
      </Button>

      <Button disabled={!viewModel.selectedBoxes.length} onClick={viewModel.onClickGroupingBtn}>
        {t(TranslationKey.Grouping)}
      </Button>
    </React.Fragment>
  )

  const getRowClassName = params => params.row.isDraft && classNames.isDraftRow

  const disableSelectionCells = ['prepId']

  return (
    <React.Fragment>
      <MainContent>
        <div className={classNames.headerWrapper}>
          <div className={classNames.leftBtnsWrapper}>{renderButtons()}</div>

          <SearchInput
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey['Search by SKU, ASIN, Title, Order, item, Prep Id, ID Box'])}
            onSubmit={viewModel.onSearchSubmit}
          />

          <div />
        </div>
        <div className={classNames.datagridWrapper}>
          <MemoDataGrid
            // disableVirtualization
            checkboxSelection
            pagination
            localeText={getLocalizationByLanguageTag()}
            classes={{
              row: classNames.row,
              root: classNames.root,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
              filterForm: classNames.filterForm,
            }}
            isRowSelectable={params =>
              params.row.isDraft === false &&
              params.row.originalData.status !== BoxStatus.REQUESTED_SEND_TO_BATCH &&
              params.row.originalData.status !== BoxStatus.IN_BATCH
            }
            getRowClassName={getRowClassName}
            sortingMode="server"
            paginationMode="server"
            rowCount={viewModel.rowCount}
            rowSelectionModel={viewModel.selectedBoxes}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.currentData}
            // rowHeight={225}
            getRowHeight={() => 'auto'}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
              columnMenu: DataGridCustomColumnMenuComponent,
            }}
            slotProps={{
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
              },
            }}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
            // onRowDoubleClick={e => setCurrentOpenedBox(e.row.originalData)}

            onCellDoubleClick={params =>
              !disableSelectionCells.includes(params.field) && viewModel.setCurrentOpenedBox(params.row.originalData)
            }
          />
        </div>
      </MainContent>

      <Modal
        openModal={viewModel.showBoxViewModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
      >
        <BoxViewForm
          userInfo={viewModel.userInfo}
          box={viewModel.curBox}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
          onSubmitChangeFields={viewModel.onSubmitChangeBoxFields}
          onClickHsCode={viewModel.onClickHsCode}
        />
      </Modal>

      <Modal
        openModal={viewModel.showBoxMoveToBatchModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBoxMoveToBatchModal')}
      >
        <MoveBoxToBatchForm
          box={viewModel.curBoxToMove}
          batches={viewModel.batches}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBoxMoveToBatchModal')}
          onSubmit={viewModel.onSubmitMoveBoxToBatch}
          onSubmitCreateBatch={viewModel.onSubmitCreateBatch}
        />
      </Modal>

      <Modal
        openModal={viewModel.showAddBatchModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddBatchModal')}
      >
        <AddOrEditBatchForm
          progressValue={viewModel.progressValue}
          showProgress={viewModel.showProgress}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          sourceBox={viewModel.sourceBoxForBatch}
          boxesData={viewModel.boxesData}
          onClose={() => viewModel.onTriggerOpenModal('showAddBatchModal')}
          onSubmit={viewModel.onSubmitAddBatch}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showFullEditBoxModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showFullEditBoxModal')}
      >
        <EditBoxStorekeeperForm
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          requestStatus={viewModel.requestStatus}
          formItem={viewModel.curBox}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          onSubmit={viewModel.onClickSubmitEditBox}
          onTriggerOpenModal={() => viewModel.onTriggerOpenModal('showFullEditBoxModal')}
          onClickHsCode={viewModel.onClickHsCode}
        />
      </Modal>

      <Modal
        openModal={viewModel.showEditHSCodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
      >
        <EditHSCodeModal
          hsCodeData={viewModel.hsCodeData}
          onClickSaveHsCode={viewModel.onClickSaveHsCode}
          onCloseModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showEditMultipleBoxesModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditMultipleBoxesModal')}
      >
        <EditMultipleBoxesForm
          userInfo={viewModel.userInfo}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
          selectedBoxes={viewModel.currentData
            .filter(el => viewModel.selectedBoxes.includes(el._id))
            .map(box => box.originalData)}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          onSubmit={viewModel.onClickSubmitEditMultipleBoxes}
          onCloseModal={() => viewModel.onTriggerOpenModal('showEditMultipleBoxesModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showAddOrEditHsCodeInBox}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditHsCodeInBox')}
      >
        <AddOrEditHsCodeInBox
          box={viewModel.curBox}
          setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditHsCodeInBox')}
          onSubmit={viewModel.onSubmitAddOrEditHsCode}
        />
      </Modal>
      <Modal openModal={viewModel.showEditBoxModal} setOpenModal={viewModel.onTriggerShowEditBoxModal}>
        <EditBoxTasksModal
          isInStorekeeperWarehouse
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          setEditModal={viewModel.onTriggerShowEditBoxModal}
          box={viewModel.curBox}
          storekeeperWarehouseSubmit={viewModel.onSubmitEditBox}
        />
      </Modal>

      <SuccessInfoModal
        openModal={viewModel.showSuccessInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessInfoModal')}
        title={viewModel.modalEditSuccessMessage}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => {
          viewModel.onTriggerOpenModal('showSuccessInfoModal')
        }}
      />

      <Modal
        missClickModalOn
        openModal={viewModel.showMergeBoxModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showMergeBoxModal')}
      >
        <MergeBoxesModal
          userInfo={viewModel.userInfo}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
          selectedBoxes={
            (viewModel.selectedBoxes.length &&
              toJS(viewModel.boxesMy.filter(box => viewModel.selectedBoxes.includes(box._id)))?.map(
                box => box.originalData,
              )) ||
            []
          }
          requestStatus={viewModel.requestStatus}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          setOpenModal={() => viewModel.onTriggerOpenModal('showMergeBoxModal')}
          onRemoveBoxFromSelected={viewModel.onRemoveBoxFromSelected}
          onSubmit={viewModel.onClickConfirmMerge}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showRedistributeBoxModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showRedistributeBoxModal')}
      >
        <StorekeeperRedistributeBox
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          showEditBoxModalR={viewModel.showEditBoxModalR}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
          requestStatus={viewModel.requestStatus}
          addNewBoxModal={viewModel.showRedistributeBoxAddNewBoxModal}
          setAddNewBoxModal={value => viewModel.onModalRedistributeBoxAddNewBox(value)}
          selectedBox={
            viewModel.selectedBoxes.length &&
            viewModel.boxesMy.find(box => box._id === viewModel.selectedBoxes.slice()[0])?.originalData
          }
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          onRedistribute={viewModel.onClickConfirmSplit}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onEditBox={viewModel.onTriggerShowEditBoxModalR}
          onTriggerShowEditBoxModalR={viewModel.onTriggerShowEditBoxModalR}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showGroupingBoxesModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showGroupingBoxesModal')}
      >
        <GroupingBoxesForm
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
          selectedBoxes={viewModel.boxesMy
            .filter(el => viewModel.selectedBoxes.includes(el._id))
            .map(box => box.originalData)}
          onSubmit={viewModel.onClickSubmitGroupingBoxes}
          onCloseModal={() => viewModel.onTriggerOpenModal('showGroupingBoxesModal')}
        />
      </Modal>

      <WarningInfoModal
        isWarning={viewModel.warningInfoModalSettings.isWarning}
        openModal={viewModel.showWarningInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
        title={viewModel.warningInfoModalSettings.title}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showWarningInfoModal')
        }}
      />
    </React.Fragment>
  )
}

export const WarehouseMyWarehouseView = withStyles(observer(WarehouseMyWarehouseViewRaw), styles)
