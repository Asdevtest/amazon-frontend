/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navigation/navbar-active-category'
import {BoxStatus} from '@constants/statuses/box-status'
import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomColumnMenuComponent} from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {BoxViewForm} from '@components/forms/box-view-form'
import {EditBoxForm} from '@components/forms/edit-box-form'
import {EditMultipleBoxesForm} from '@components/forms/edit-multiple-boxes-form'
import {GroupingBoxesForm} from '@components/forms/grouping-boxes-form'
import {RequestToSendBatchForm} from '@components/forms/request-to-send-batch-form'
import {SelectStorekeeperAndTariffForm} from '@components/forms/select-storkeeper-and-tariff-form'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {EditHSCodeModal} from '@components/modals/edit-hs-code-modal'
import {MergeBoxesModal} from '@components/modals/merge-boxes-modal'
import {SetChipValueModal} from '@components/modals/set-chip-value-modal'
import {SetShippingLabelModal} from '@components/modals/set-shipping-label-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Button} from '@components/shared/buttons/button'
import {CircularProgressWithLabel} from '@components/shared/circular-progress-with-label'
import {MemoDataGrid} from '@components/shared/memo-data-grid'
import {Modal} from '@components/shared/modal'
import {SearchInput} from '@components/shared/search-input'
import {EditTaskPriorityModal} from '@components/warehouse/edit-task-priority-modal'
import {RedistributeBox} from '@components/warehouse/reditstribute-box-modal'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ClientInStockBoxesViewModel} from './client-in-stock-boxes-view.model'
import {styles} from './client-in-stock-boxes-view.style'

const activeCategory = navBarActiveCategory.NAVBAR_WAREHOUSE
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_BOXES

@observer
export class ClientInStockBoxesViewRaw extends Component {
  viewModel = new ClientInStockBoxesViewModel({history: this.props.history})
  topHeaderBtnsWrapperRef = React.createRef()
  boxesFiltersWrapperRef = React.createRef()
  btnsWrapperRef = React.createRef()

  topHeaderBtnsWrapperHeight = undefined
  boxesFiltersWrapperHeight = undefined
  btnsWrapperHeight = undefined

  heightSum = undefined

  componentDidMount() {
    this.viewModel.loadData()

    this.topHeaderBtnsWrapperHeight = this.topHeaderBtnsWrapperRef?.current?.offsetHeight
    this.boxesFiltersWrapperHeight = this.boxesFiltersWrapperRef?.current?.offsetHeight
    this.btnsWrapperHeight = this.btnsWrapperRef?.current?.offsetHeight

    this.heightSum = this.topHeaderBtnsWrapperHeight + this.boxesFiltersWrapperHeight + this.btnsWrapperHeight
  }

  componentDidUpdate() {
    this.topHeaderBtnsWrapperHeight = this.topHeaderBtnsWrapperRef?.current?.offsetHeight
    this.boxesFiltersWrapperHeight = this.boxesFiltersWrapperRef?.current?.offsetHeight
    this.btnsWrapperHeight = this.btnsWrapperRef?.current?.offsetHeight

    this.heightSum = this.topHeaderBtnsWrapperHeight + this.boxesFiltersWrapperHeight + this.btnsWrapperHeight
  }

  render() {
    const {
      editPriorityData,
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
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      drawerOpen,
      curPage,
      rowsPerPage,
      boxesMy,
      selectedBoxes,
      showEditPriorityData,
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
      onClickSubmitEditMultipleBoxes,

      onClickRemoveBoxFromBatch,
      onSearchSubmit,
      onClickSubmitGroupingBoxes,

      onSubmitChangeBoxFields,
      onClickDestinationBtn,
      editTariff,
      onCloseShippingLabelModal,
      onLeaveColumnField,
      onHoverColumnField,
      onClickResetFilters,
      changeColumnsModel,
      updateTaskPriority,
    } = this.viewModel

    const {classes: classNames} = this.props

    const getRowClassName = params =>
      (params.row.isDraft === true ||
        params.row.status === BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE ||
        params.row.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF) &&
      classNames.isDraftRow

    const disableSelectionCells = ['prepId']

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
              <div ref={this.topHeaderBtnsWrapperRef} className={classNames.topHeaderBtnsWrapper}>
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

              <div ref={this.boxesFiltersWrapperRef} className={classNames.boxesFiltersWrapper}>
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

              <div ref={this.btnsWrapperRef} className={classNames.btnsWrapper}>
                <div className={classNames.leftBtnsWrapper}>{this.renderButtons()}</div>
                <Button
                  disabled={!storekeepersData}
                  onClick={() => onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')}
                >
                  {t(TranslationKey['Current tariffs'])}
                </Button>
              </div>

              <div className={classNames.tasksWrapper} style={{height: `calc(100vh - ${this.heightSum + 170}px)`}}>
                <MemoDataGrid
                  // disableVirtualization
                  pagination
                  checkboxSelection
                  localeText={getLocalizationByLanguageTag()}
                  isRowSelectable={params =>
                    params.row.isDraft === false &&
                    params.row.status !== BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE &&
                    params.row.status !== BoxStatus.NEED_TO_UPDATE_THE_TARIFF
                  }
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
              </div>
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

        <Modal openModal={showEditPriorityData} setOpenModal={() => onTriggerOpenModal('showEditPriorityData')}>
          <EditTaskPriorityModal
            withSelect
            data={editPriorityData}
            handleClose={() => onTriggerOpenModal('showEditPriorityData')}
            onSubmitHandler={updateTaskPriority}
          />
        </Modal>

        {showProgress && <CircularProgressWithLabel />}
      </React.Fragment>
    )
  }

  renderButtons = () => {
    const {
      selectedBoxes,
      // isMasterBoxSelected,
      isChoosenOnlySendToBatchBoxes,
      isHaveRequestSendToBatch,
      selectedRows,
      onClickRequestToSendBatch,
      onClickEditBtn,
      onClickMergeBtn,
      onClickSplitBtn,
      onClickGroupingBtn,
      onClickReturnBoxesToStockBtn,
    } = this.viewModel

    const disable = selectedRows.some(row => row.status === BoxStatus.REQUESTED_SEND_TO_BATCH)

    return (
      <React.Fragment>
        <Button
          tooltipInfoContent={t(TranslationKey['Form for requesting the shipment of boxes in a batch'])}
          disabled={!selectedBoxes.length || disable}
          onClick={onClickRequestToSendBatch}
        >
          {t(TranslationKey['Send batch'])}
        </Button>

        <Button
          tooltipInfoContent={t(TranslationKey['Form for merging several boxes'])}
          disabled={selectedBoxes.length <= 1 /* || isMasterBoxSelected*/ || isHaveRequestSendToBatch}
          onClick={onClickMergeBtn}
        >
          {t(TranslationKey.Merge)}
        </Button>

        <Button
          disabled={selectedBoxes.length !== 1 || isHaveRequestSendToBatch}
          tooltipInfoContent={t(TranslationKey['Form for distributing to multiple boxes'])}
          onClick={onClickSplitBtn}
        >
          {t(TranslationKey.Redistribute)}
        </Button>
        <Button
          tooltipInfoContent={t(TranslationKey['Form for changing the box data'])}
          disabled={!selectedBoxes.length || isHaveRequestSendToBatch}
          onClick={onClickEditBtn}
        >
          {t(TranslationKey.Edit)}
        </Button>

        <Button disabled={!selectedBoxes.length || isHaveRequestSendToBatch} onClick={onClickGroupingBtn}>
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
