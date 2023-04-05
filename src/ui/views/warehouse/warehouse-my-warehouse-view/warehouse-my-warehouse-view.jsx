import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {BoxStatus} from '@constants/box-status'
import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {DataGridCustomColumnMenuComponent} from '@components/data-grid-custom-components/data-grid-custom-column-component'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {AddOrEditBatchForm} from '@components/forms/add-or-edit-batch-form'
import {AddOrEditHsCodeInBox} from '@components/forms/add-or-edit-hs-code-in-box-form'
import {BoxViewForm} from '@components/forms/box-view-form'
import {EditBoxStorekeeperForm} from '@components/forms/edit-box-storekeeper-form'
import {EditMultipleBoxesForm} from '@components/forms/edit-multiple-boxes-form'
import {GroupingBoxesForm} from '@components/forms/grouping-boxes-form'
import {MoveBoxToBatchForm} from '@components/forms/move-box-to-batch-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {EditHSCodeModal} from '@components/modals/edit-hs-code-modal'
import {MergeBoxesModal} from '@components/modals/merge-boxes-modal'
import {StorekeeperRedistributeBox} from '@components/modals/storekeeper'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {EditBoxTasksModal} from '@components/screens/warehouse/edit-task-modal/edit-box-tasks-modal'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {WarehouseMyWarehouseViewModel} from './warehouse-my-warehouse-view.model'
import {styles} from './warehouse-my-warehouse-view.style'

const activeCategory = navBarActiveCategory.NAVBAR_WAREHOUSE
@observer
export class WarehouseMyWarehouseViewRaw extends Component {
  viewModel = new WarehouseMyWarehouseViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      showEditBoxModalR,
      onTriggerShowEditBoxModalR,
      boxesMy,
      showMergeBoxModal,
      showRedistributeBoxModal,
      showRedistributeBoxAddNewBoxModal,
      warningInfoModalSettings,
      showWarningInfoModal,
      showGroupingBoxesModal,
      destinationsFavourites,
      userInfo,
      rowCount,
      destinations,
      storekeepersData,
      modalEditSuccessMessage,

      showProgress,
      progressValue,
      sourceBoxForBatch,
      boxesData,
      curBoxToMove,
      batches,
      curBox,
      volumeWeightCoefficient,
      showBoxMoveToBatchModal,
      showAddOrEditHsCodeInBox,
      showFullEditBoxModal,
      showSuccessInfoModal,
      showEditMultipleBoxesModal,
      showAddBatchModal,
      showBoxViewModal,
      showEditBoxModal,
      requestStatus,
      currentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,
      drawerOpen,
      curPage,
      rowsPerPage,
      selectedBoxes,
      showEditHSCodeModal,
      hsCodeData,
      columnMenuSettings,
      onClickConfirmMerge,
      onRemoveBoxFromSelected,
      onModalRedistributeBoxAddNewBox,
      onClickSubmitGroupingBoxes,
      onClickConfirmSplit,
      onClickSaveHsCode,
      onClickHsCode,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,

      onChangeFilterModel,
      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onTriggerOpenModal,
      onTriggerShowEditBoxModal,
      setCurrentOpenedBox,
      onSubmitMoveBoxToBatch,
      onSubmitCreateBatch,
      onSubmitAddBatch,
      onSubmitAddOrEditHsCode,
      onSubmitEditBox,
      onSearchSubmit,
      onClickSubmitEditBox,
      onSubmitChangeBoxFields,
      onClickSubmitEditMultipleBoxes,
      onClickResetFilters,
      isSomeFilterOn,
      setDestinationsFavouritesItem,
      changeColumnsModel,
    } = this.viewModel

    const {classes: classNames} = this.props

    const getRowClassName = params => params.row.isDraft && classNames.isDraftRow

    const disableSelectionCells = ['prepId']

    return (
      <React.Fragment>
        <Navbar activeCategory={activeCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey['My warehouse'])}>
            <MainContent>
              <div className={classNames.headerWrapper}>
                <div className={classNames.leftBtnsWrapper}>{this.renderButtons()}</div>

                <SearchInput
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey['Search by SKU, ASIN, Title, Order, item, Prep Id, ID Box'])}
                  onSubmit={onSearchSubmit}
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
                  rowCount={rowCount}
                  selectionModel={selectedBoxes}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={currentData}
                  // rowHeight={225}
                  getRowHeight={() => 'auto'}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                    ColumnMenuIcon: FilterAltOutlinedIcon,
                    ColumnMenu: DataGridCustomColumnMenuComponent,
                  }}
                  componentsProps={{
                    columnMenu: columnMenuSettings,
                    toolbar: {
                      resetFiltersBtnSettings: {onClickResetFilters, isSomeFilterOn},
                      // columsBtnSettings: {columnsModel, changeColumnsModel},
                    },
                  }}
                  componentsProps={{
                    toolbar: {
                      columsBtnSettings: {columnsModel, changeColumnsModel},
                    },
                  }}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSelectionModelChange={onSelectionModel}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onFilterModelChange={onChangeFilterModel}
                  onStateChange={setDataGridState}
                  // onRowDoubleClick={e => setCurrentOpenedBox(e.row.originalData)}

                  onCellDoubleClick={params =>
                    !disableSelectionCells.includes(params.field) && setCurrentOpenedBox(params.row.originalData)
                  }
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showBoxViewModal} setOpenModal={() => onTriggerOpenModal('showBoxViewModal')}>
          <BoxViewForm
            userInfo={userInfo}
            box={curBox}
            volumeWeightCoefficient={volumeWeightCoefficient}
            setOpenModal={() => onTriggerOpenModal('showBoxViewModal')}
            onSubmitChangeFields={onSubmitChangeBoxFields}
            onClickHsCode={onClickHsCode}
          />
        </Modal>

        <Modal openModal={showBoxMoveToBatchModal} setOpenModal={() => onTriggerOpenModal('showBoxMoveToBatchModal')}>
          <MoveBoxToBatchForm
            box={curBoxToMove}
            batches={batches}
            volumeWeightCoefficient={volumeWeightCoefficient}
            setOpenModal={() => onTriggerOpenModal('showBoxMoveToBatchModal')}
            onSubmit={onSubmitMoveBoxToBatch}
            onSubmitCreateBatch={onSubmitCreateBatch}
          />
        </Modal>

        <Modal openModal={showAddBatchModal} setOpenModal={() => onTriggerOpenModal('showAddBatchModal')}>
          <AddOrEditBatchForm
            progressValue={progressValue}
            showProgress={showProgress}
            volumeWeightCoefficient={volumeWeightCoefficient}
            sourceBox={sourceBoxForBatch}
            boxesData={boxesData}
            onClose={() => onTriggerOpenModal('showAddBatchModal')}
            onSubmit={onSubmitAddBatch}
          />
        </Modal>

        <Modal
          missClickModalOn
          openModal={showFullEditBoxModal}
          setOpenModal={() => onTriggerOpenModal('showFullEditBoxModal')}
        >
          <EditBoxStorekeeperForm
            destinations={destinations}
            storekeepers={storekeepersData}
            volumeWeightCoefficient={volumeWeightCoefficient}
            requestStatus={requestStatus}
            formItem={curBox}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            onSubmit={onClickSubmitEditBox}
            onTriggerOpenModal={() => onTriggerOpenModal('showFullEditBoxModal')}
            onClickHsCode={onClickHsCode}
          />
        </Modal>

        <Modal openModal={showEditHSCodeModal} setOpenModal={() => onTriggerOpenModal('showEditHSCodeModal')}>
          <EditHSCodeModal
            hsCodeData={hsCodeData}
            onClickSaveHsCode={onClickSaveHsCode}
            onCloseModal={() => onTriggerOpenModal('showEditHSCodeModal')}
          />
        </Modal>

        <Modal
          missClickModalOn
          openModal={showEditMultipleBoxesModal}
          setOpenModal={() => onTriggerOpenModal('showEditMultipleBoxesModal')}
        >
          <EditMultipleBoxesForm
            userInfo={userInfo}
            destinations={destinations}
            storekeepers={storekeepersData}
            selectedBoxes={currentData.filter(el => selectedBoxes.includes(el._id)).map(box => box.originalData)}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            onSubmit={onClickSubmitEditMultipleBoxes}
            onCloseModal={() => onTriggerOpenModal('showEditMultipleBoxesModal')}
          />
        </Modal>

        <Modal openModal={showAddOrEditHsCodeInBox} setOpenModal={() => onTriggerOpenModal('showAddOrEditHsCodeInBox')}>
          <AddOrEditHsCodeInBox
            box={curBox}
            setOpenModal={() => onTriggerOpenModal('showAddOrEditHsCodeInBox')}
            onSubmit={onSubmitAddOrEditHsCode}
          />
        </Modal>
        <Modal openModal={showEditBoxModal} setOpenModal={onTriggerShowEditBoxModal}>
          <EditBoxTasksModal
            isInStorekeeperWarehouse
            volumeWeightCoefficient={volumeWeightCoefficient}
            setEditModal={onTriggerShowEditBoxModal}
            box={curBox}
            storekeeperWarehouseSubmit={onSubmitEditBox}
          />
        </Modal>

        <SuccessInfoModal
          openModal={showSuccessInfoModal}
          setOpenModal={() => onTriggerOpenModal('showSuccessInfoModal')}
          title={modalEditSuccessMessage}
          successBtnText={t(TranslationKey.Ok)}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showSuccessInfoModal')
          }}
        />

        <Modal
          missClickModalOn
          openModal={showMergeBoxModal}
          setOpenModal={() => onTriggerOpenModal('showMergeBoxModal')}
        >
          <MergeBoxesModal
            userInfo={userInfo}
            volumeWeightCoefficient={volumeWeightCoefficient}
            destinations={destinations}
            storekeepers={storekeepersData}
            selectedBoxes={
              (selectedBoxes.length &&
                toJS(boxesMy.filter(box => selectedBoxes.includes(box._id)))?.map(box => box.originalData)) ||
              []
            }
            requestStatus={requestStatus}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            setOpenModal={() => onTriggerOpenModal('showMergeBoxModal')}
            onRemoveBoxFromSelected={onRemoveBoxFromSelected}
            onSubmit={onClickConfirmMerge}
          />
        </Modal>

        <Modal
          missClickModalOn
          openModal={showRedistributeBoxModal}
          setOpenModal={() => onTriggerOpenModal('showRedistributeBoxModal')}
        >
          <StorekeeperRedistributeBox
            volumeWeightCoefficient={volumeWeightCoefficient}
            showEditBoxModalR={showEditBoxModalR}
            destinations={destinations}
            storekeepers={storekeepersData}
            requestStatus={requestStatus}
            addNewBoxModal={showRedistributeBoxAddNewBoxModal}
            setAddNewBoxModal={value => onModalRedistributeBoxAddNewBox(value)}
            selectedBox={
              selectedBoxes.length && boxesMy.find(box => box._id === selectedBoxes.slice()[0])?.originalData
            }
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            onRedistribute={onClickConfirmSplit}
            onTriggerOpenModal={onTriggerOpenModal}
            onEditBox={onTriggerShowEditBoxModalR}
            onTriggerShowEditBoxModalR={onTriggerShowEditBoxModalR}
          />
        </Modal>

        <Modal
          missClickModalOn
          openModal={showGroupingBoxesModal}
          setOpenModal={() => onTriggerOpenModal('showGroupingBoxesModal')}
        >
          <GroupingBoxesForm
            volumeWeightCoefficient={volumeWeightCoefficient}
            destinations={destinations}
            storekeepers={storekeepersData}
            selectedBoxes={boxesMy.filter(el => selectedBoxes.includes(el._id)).map(box => box.originalData)}
            onSubmit={onClickSubmitGroupingBoxes}
            onCloseModal={() => onTriggerOpenModal('showGroupingBoxesModal')}
          />
        </Modal>

        <WarningInfoModal
          isWarning={warningInfoModalSettings.isWarning}
          openModal={showWarningInfoModal}
          setOpenModal={() => onTriggerOpenModal('showWarningInfoModal')}
          title={warningInfoModalSettings.title}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningInfoModal')
          }}
        />
      </React.Fragment>
    )
  }

  renderButtons = () => {
    const {selectedBoxes, onClickMergeBtn, onClickSplitBtn, onClickGroupingBtn, onEditBox} = this.viewModel
    const {classes: classNames} = this.props
    return (
      <React.Fragment>
        <Button
          tooltipInfoContent={t(TranslationKey['Form for changing the box data'])}
          disabled={!selectedBoxes.length}
          className={classNames.editBtn}
          onClick={onEditBox}
        >
          {t(TranslationKey.Edit)}
        </Button>

        <Button
          tooltipInfoContent={t(TranslationKey['Form for merging several boxes'])}
          disabled={selectedBoxes.length <= 1 /* || isMasterBoxSelected*/}
          onClick={onClickMergeBtn}
        >
          {t(TranslationKey.Merge)}
        </Button>

        <Button
          disabled={selectedBoxes.length !== 1}
          tooltipInfoContent={t(TranslationKey['Form for distributing to multiple boxes'])}
          onClick={onClickSplitBtn}
        >
          {t(TranslationKey.Redistribute)}
        </Button>

        <Button disabled={!selectedBoxes.length} onClick={onClickGroupingBtn}>
          {t(TranslationKey.Grouping)}
        </Button>
      </React.Fragment>
    )
  }
}

export const WarehouseMyWarehouseView = withStyles(WarehouseMyWarehouseViewRaw, styles)
