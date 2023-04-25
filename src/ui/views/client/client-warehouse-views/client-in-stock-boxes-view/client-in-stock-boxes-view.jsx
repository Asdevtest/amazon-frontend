/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {BoxStatus} from '@constants/box-status'
import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {DataGridCustomColumnMenuComponent} from '@components/data-grid-custom-components/data-grid-custom-column-component'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {BoxViewForm} from '@components/forms/box-view-form'
import {EditBoxForm} from '@components/forms/edit-box-form'
import {EditMultipleBoxesForm} from '@components/forms/edit-multiple-boxes-form'
import {GroupingBoxesForm} from '@components/forms/grouping-boxes-form'
import {RequestToSendBatchForm} from '@components/forms/request-to-send-batch-form'
import {SelectStorekeeperAndTariffForm} from '@components/forms/select-storkeeper-and-tariff-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {EditHSCodeModal} from '@components/modals/edit-hs-code-modal'
import {MergeBoxesModal} from '@components/modals/merge-boxes-modal'
import {SetChipValueModal} from '@components/modals/set-chip-value-modal'
import {SetShippingLabelModal} from '@components/modals/set-shipping-label-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {EditTaskModal} from '@components/screens/warehouse/edit-task-modal'
import {RedistributeBox} from '@components/screens/warehouse/reditstribute-box-modal'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ClientInStockBoxesViewModel} from './client-in-stock-boxes-view.model'
import {styles} from './client-in-stock-boxes-view.style'

const activeCategory = navBarActiveCategory.NAVBAR_WAREHOUSE
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_BOXES
@observer
export class ClientInStockBoxesViewRaw extends Component {
  viewModel = new ClientInStockBoxesViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      isSomeFilterOn,
      columnMenuSettings,
      nameSearchValue,
      changeItem,
      clientDestinations,
      curDestination,
      rowCount,
      userInfo,

      confirmModalSettings,
      selectedBox,
      curBox,
      hsCodeData,
      showEditHSCodeModal,
      showBoxViewModal,
      volumeWeightCoefficient,
      currentStorekeeper,
      storekeepersData,
      destinations,

      requestStatus,
      currentData,
      getCurrentTaskData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      drawerOpen,
      curPage,
      rowsPerPage,
      boxesMy,
      selectedBoxes,
      showMergeBoxModal,
      showConfirmModal,
      showEditBoxModal,
      showRedistributeBoxModal,
      showRedistributeBoxAddNewBoxModal,
      showGroupingBoxesModal,
      showProgress,
      showEditMultipleBoxesModal,
      showSetShippingLabelModal,
      showSetChipValueModal,
      showWarningInfoModal,
      showRequestToSendBatchModal,
      showSuccessInfoModal,
      showSelectionStorekeeperAndTariffModal,
      boxesDeliveryCosts,
      modalEditSuccessMessage,
      warningInfoModalSettings,
      destinationsFavourites,
      openModalAndClear,
      onClickHsCode,
      onClickSaveHsCode,
      setDestinationsFavouritesItem,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickConfirmCreateSplitTasks,

      onClickConfirmCreateChangeTasks,
      onTriggerOpenModal,
      onModalRedistributeBoxAddNewBox,

      triggerRequestToSendBatchModal,
      onClickSendBoxesToBatch,
      onClickConfirmCreateMergeTasks,
      // onClickMerge,
      onRemoveBoxFromSelected,

      onChangeFilterModel,
      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,

      onClickStorekeeperBtn,
      setCurrentOpenedBox,
      onClickSaveFbaShipment,
      onClickSaveShippingLabel,
      onClickCancelAfterConfirm,
      onClickSubmitEditMultipleBoxes,
      onClickFilterBtn,

      onClickRemoveBoxFromBatch,
      onSearchSubmit,
      onClickSubmitGroupingBoxes,

      onSubmitChangeBoxFields,
      onClickDestinationBtn,
      onChangeIsFormed,
      editTariff,
      onClickShopBtn,
      onCloseShippingLabelModal,
      getBoxesMy,
      onLeaveColumnField,
      onHoverColumnField,
      onClickResetFilters,
      changeColumnsModel,
    } = this.viewModel

    const {classes: classNames} = this.props

    const getRowClassName = params => params.row.isDraft === true && classNames.isDraftRow

    const disableSelectionCells = ['prepId']

    // console.log('columnMenuSettings', columnMenuSettings)

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey['Boxes in stock'])}>
            <MainContent>
              <div className={classNames.topHeaderBtnsWrapper}>
                <div className={classNames.boxesFiltersWrapper}>
                  {storekeepersData
                    .slice()
                    .sort((a, b) => a.name?.localeCompare(b.name))
                    .map(storekeeper =>
                      storekeeper.boxesCount !== 0 ? (
                        <Button
                          key={storekeeper._id}
                          disabled={currentStorekeeper?._id === storekeeper._id}
                          className={cx(classNames.button, {
                            [classNames.selectedBoxesBtn]: currentStorekeeper?._id === storekeeper._id,
                          })}
                          variant="text"
                          onClick={() => onClickStorekeeperBtn(storekeeper)}
                        >
                          {storekeeper.name}
                        </Button>
                      ) : null,
                    )}

                  <Button
                    disabled={!currentStorekeeper?._id}
                    tooltipInfoContent={t(TranslationKey['Filter for sorting boxes by prep centers'])}
                    className={cx(classNames.button, {[classNames.selectedBoxesBtn]: !currentStorekeeper?._id})}
                    variant="text"
                    onClick={onClickStorekeeperBtn}
                  >
                    {t(TranslationKey['All warehouses'])}
                  </Button>
                </div>

                <SearchInput
                  key={'client_warehouse_search_input'}
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey['Search by SKU, ASIN, Title, Order, item, Prep Id, ID Box'])}
                  startText={nameSearchValue}
                  onSubmit={onSearchSubmit}
                />
              </div>

              <div className={classNames.boxesFiltersWrapper}>
                {clientDestinations
                  .slice()
                  .sort((a, b) => a.name?.localeCompare(b.name))
                  .map(destination =>
                    destination.boxesCount !== 0 ? (
                      <Button
                        key={destination._id}
                        disabled={curDestination?._id === destination._id}
                        className={cx(classNames.button, {
                          [classNames.selectedBoxesBtn]: curDestination?._id === destination._id,
                        })}
                        variant="text"
                        onClick={() => onClickDestinationBtn(destination)}
                      >
                        {destination.name}
                      </Button>
                    ) : null,
                  )}

                <Button
                  disabled={curDestination?._id === 'null'}
                  className={cx(classNames.button, {[classNames.selectedBoxesBtn]: curDestination?._id === 'null'})}
                  variant="text"
                  onClick={() => onClickDestinationBtn({_id: 'null'})}
                >
                  {t(TranslationKey.Undistributed)}
                </Button>

                <Button
                  disabled={!curDestination?._id}
                  tooltipInfoContent={t(TranslationKey['Filter for sorting boxes by prep centers'])}
                  className={cx(classNames.button, {[classNames.selectedBoxesBtn]: !curDestination?._id})}
                  variant="text"
                  onClick={onClickDestinationBtn}
                >
                  {t(TranslationKey.All)}
                </Button>
              </div>

              <div className={classNames.btnsWrapper}>
                <div className={classNames.leftBtnsWrapper}>{this.renderButtons()}</div>
                <Button
                  disabled={!storekeepersData}
                  onClick={() => onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')}
                >
                  {t(TranslationKey['Current tariffs'])}
                </Button>
              </div>

              <MemoDataGrid
                // disableVirtualization
                pagination
                checkboxSelection
                localeText={getLocalizationByLanguageTag()}
                isRowSelectable={params => params.row.isDraft === false}
                classes={{
                  row: classNames.row,
                  virtualScrollerContent: classNames.virtualScrollerContent,
                  root: classNames.root,
                  footerContainer: classNames.footerContainer,
                  footerCell: classNames.footerCell,
                  toolbarContainer: classNames.toolbarContainer,

                  columnHeaderDraggableContainer: classNames.columnHeaderDraggableContainer,
                  columnHeaderTitleContainer: classNames.columnHeaderTitleContainer,
                  columnHeader: classNames.columnHeader,
                  menuIconButton: classNames.menuIconButton,
                  iconButtonContainer: classNames.iconButtonContainer,
                  iconSeparator: classNames.iconSeparator,
                }}
                sx={{
                  '.MuiDataGrid-sortIcon': {
                    width: 14,
                    height: 14,
                    // color: '#fff',
                    // opacity: 1,
                    // display: 'none',
                    '& > active': {
                      display: 'none',
                    },
                  },
                }}
                headerHeight={65}
                getRowClassName={getRowClassName}
                selectionModel={selectedBoxes}
                sortingMode="server"
                paginationMode="server"
                rowCount={rowCount}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={currentData || []}
                getRowHeight={() => 'auto'}
                components={{
                  Toolbar: DataGridCustomToolbar,
                  ColumnMenu: DataGridCustomColumnMenuComponent,
                  ColumnMenuIcon: FilterAltOutlinedIcon,
                }}
                componentsProps={{
                  columnMenu: columnMenuSettings,
                  toolbar: {
                    resetFiltersBtnSettings: {onClickResetFilters, isSomeFilterOn},
                    columsBtnSettings: {columnsModel, changeColumnsModel},
                  },
                }}
                density={densityModel}
                columns={columnsModel}
                loading={requestStatus === loadingStatuses.isLoading}
                onColumnHeaderEnter={params => {
                  onHoverColumnField(params.field)
                }}
                onColumnHeaderLeave={onLeaveColumnField}
                onSelectionModelChange={onSelectionModel}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onFilterModelChange={onChangeFilterModel}
                onStateChange={setDataGridState}
                // onRowDoubleClick={e => setCurrentOpenedBox(e.row.originalData)}
                // onCellDoubleClick={e => setCurrentOpenedBox(e.row.originalData)}
                onCellDoubleClick={params =>
                  !disableSelectionCells.includes(params.field) && setCurrentOpenedBox(params.row.originalData)
                }
              />

              {/* <div className={classNames.tasksWrapper}>
                <MemoDataGrid
                  // disableVirtualization
                  pagination
                  checkboxSelection
                  localeText={getLocalizationByLanguageTag()}
                  isRowSelectable={params => params.row.isDraft === false && params.row.status === BoxStatus.IN_STOCK}
                  classes={{
                    row: classNames.row,
                    virtualScrollerContent: classNames.virtualScrollerContent,
                    root: classNames.root,
                    footerContainer: classNames.footerContainer,
                    footerCell: classNames.footerCell,
                    toolbarContainer: classNames.toolbarContainer,

                    columnHeaderDraggableContainer: classNames.columnHeaderDraggableContainer,
                    columnHeaderTitleContainer: classNames.columnHeaderTitleContainer,
                    columnHeader: classNames.columnHeader,
                    menuIconButton: classNames.menuIconButton,
                    iconButtonContainer: classNames.iconButtonContainer,
                    iconSeparator: classNames.iconSeparator,
                  }}
                  sx={{
                    '.MuiDataGrid-sortIcon': {
                      width: 14,
                      height: 14,
                      // color: '#fff',
                      // opacity: 1,
                      // display: 'none',
                      '& > active': {
                        display: 'none',
                      },
                    },
                  }}
                  headerHeight={65}
                  getRowClassName={getRowClassName}
                  selectionModel={selectedBoxes}
                  sortingMode="server"
                  paginationMode="server"
                  rowCount={rowCount}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={currentData || []}
                  getRowHeight={() => 'auto'}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                    ColumnMenu: DataGridCustomColumnMenuComponent,
                    ColumnMenuIcon: FilterAltOutlinedIcon,
                  }}
                  componentsProps={{
                    columnMenu: columnMenuSettings,
                    toolbar: {
                      resetFiltersBtnSettings: {onClickResetFilters, isSomeFilterOn},
                      columsBtnSettings: {columnsModel, changeColumnsModel},
                    },
                  }}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onColumnHeaderEnter={params => {
                    onHoverColumnField(params.field)
                  }}
                  onColumnHeaderLeave={onLeaveColumnField}
                  onSelectionModelChange={onSelectionModel}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onFilterModelChange={onChangeFilterModel}
                  onStateChange={setDataGridState}
                  onRowDoubleClick={e => setCurrentOpenedBox(e.row.originalData)}
                />
              </div> */}
            </MainContent>
          </Appbar>
        </Main>

        <Modal
          missClickModalOn
          openModal={showEditBoxModal}
          setOpenModal={() => onTriggerOpenModal('showEditBoxModal')}
        >
          <EditBoxForm
            destinations={destinations}
            storekeepers={storekeepersData}
            volumeWeightCoefficient={volumeWeightCoefficient}
            requestStatus={requestStatus}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            formItem={boxesMy.find(box => box._id === selectedBoxes.slice()[0])?.originalData}
            onSubmit={onClickConfirmCreateChangeTasks}
            onTriggerOpenModal={() => onTriggerOpenModal('showEditBoxModal')}
          />
        </Modal>

        <Modal
          missClickModalOn
          openModal={showRedistributeBoxModal}
          setOpenModal={() => onTriggerOpenModal('showRedistributeBoxModal')}
        >
          <RedistributeBox
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
            onRedistribute={onClickConfirmCreateSplitTasks}
            onTriggerOpenModal={onTriggerOpenModal}
          />
        </Modal>

        <Modal
          missClickModalOn
          openModal={showEditMultipleBoxesModal}
          setOpenModal={() => onTriggerOpenModal('showEditMultipleBoxesModal')}
        >
          <EditMultipleBoxesForm
            destinations={destinations}
            storekeepers={storekeepersData}
            selectedBoxes={boxesMy.filter(el => selectedBoxes.includes(el._id)).map(box => box.originalData)}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            onSubmit={onClickSubmitEditMultipleBoxes}
            onCloseModal={() => onTriggerOpenModal('showEditMultipleBoxesModal')}
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

        <Modal
          missClickModalOn
          openModal={showMergeBoxModal}
          setOpenModal={() => onTriggerOpenModal('showMergeBoxModal')}
        >
          <MergeBoxesModal
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
            onSubmit={onClickConfirmCreateMergeTasks}
          />
        </Modal>

        <Modal missClickModalOn openModal={showRequestToSendBatchModal} setOpenModal={triggerRequestToSendBatchModal}>
          <RequestToSendBatchForm
            userInfo={userInfo}
            storekeepersData={storekeepersData}
            closeModal={triggerRequestToSendBatchModal}
            boxesDeliveryCosts={boxesDeliveryCosts}
            selectedBoxes={selectedBoxes}
            volumeWeightCoefficient={volumeWeightCoefficient}
            boxesMy={boxesMy.map(box => box.originalData)}
            onClickSendBoxesToBatch={onClickSendBoxesToBatch}
            onClickRemoveBoxFromBatch={onClickRemoveBoxFromBatch}
            onSubmitChangeBoxFields={onSubmitChangeBoxFields}
            onClickHsCode={onClickHsCode}
          />
        </Modal>

        <ConfirmationModal
          isWarning={confirmModalSettings.isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />

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

        <Modal
          openModal={showSetShippingLabelModal}
          setOpenModal={() => onTriggerOpenModal('showSetShippingLabelModal')}
        >
          <SetShippingLabelModal
            item={selectedBox}
            onClickSaveShippingLabel={onClickSaveShippingLabel}
            onCloseModal={() => onTriggerOpenModal('showSetShippingLabelModal')}
          />
        </Modal>

        <Modal openModal={showEditHSCodeModal} setOpenModal={() => onTriggerOpenModal('showEditHSCodeModal')}>
          <EditHSCodeModal
            hsCodeData={hsCodeData}
            onClickSaveHsCode={onClickSaveHsCode}
            onCloseModal={() => onTriggerOpenModal('showEditHSCodeModal')}
          />
        </Modal>

        <Modal openModal={showSelectionStorekeeperAndTariffModal} setOpenModal={openModalAndClear}>
          <SelectStorekeeperAndTariffForm
            inNotifications={!changeItem}
            total={!changeItem}
            storekeepers={
              changeItem ? storekeepersData.filter(el => el._id === changeItem?.storekeeper._id) : storekeepersData
            }
            curStorekeeperId={changeItem?.storekeeper?._id}
            curTariffId={changeItem?.logicsTariff?._id}
            onSubmit={(storekeeperId, tariffId) =>
              editTariff(changeItem?._id, {logicsTariffId: tariffId, storekeeperId})
            }
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
          openModal={showSetChipValueModal}
          setOpenModal={() => {
            onTriggerOpenModal('showSetChipValueModal')
            onCloseShippingLabelModal()
          }}
        >
          <SetChipValueModal
            title={t(TranslationKey['Set FBA shipment'])}
            sourceValue={selectedBox?.fbaShipment}
            onSubmit={onClickSaveFbaShipment}
            onCloseModal={() => {
              onTriggerOpenModal('showSetChipValueModal')
              onCloseShippingLabelModal()
            }}
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

        {showProgress && <CircularProgressWithLabel />}
      </React.Fragment>
    )
  }

  renderButtons = () => {
    const {
      selectedBoxes,
      // isMasterBoxSelected,
      isChoosenOnlySendToBatchBoxes,
      onClickRequestToSendBatch,
      onClickEditBtn,
      onClickMergeBtn,
      onClickSplitBtn,
      onClickGroupingBtn,
      onClickReturnBoxesToStockBtn,
    } = this.viewModel
    return (
      <React.Fragment>
        <Button
          tooltipInfoContent={t(TranslationKey['Form for requesting the shipment of boxes in a batch'])}
          disabled={!selectedBoxes.length}
          onClick={onClickRequestToSendBatch}
        >
          {t(TranslationKey['Send batch'])}
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
        <Button
          tooltipInfoContent={t(TranslationKey['Form for changing the box data'])}
          disabled={!selectedBoxes.length}
          onClick={onClickEditBtn}
        >
          {t(TranslationKey.Edit)}
        </Button>

        <Button disabled={!selectedBoxes.length} onClick={onClickGroupingBtn}>
          {t(TranslationKey.Grouping)}
        </Button>

        <Button
          disabled={!selectedBoxes.length || !isChoosenOnlySendToBatchBoxes}
          // className={classNames.returnButton}
          // variant="contained"
          onClick={onClickReturnBoxesToStockBtn}
        >
          {t(TranslationKey['Return to stock'])}
        </Button>
      </React.Fragment>
    )
  }
}

export const ClientInStockBoxesView = withStyles(ClientInStockBoxesViewRaw, styles)
