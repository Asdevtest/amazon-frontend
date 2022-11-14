import {cx} from '@emotion/css'
import {Typography} from '@mui/material'
import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {BoxViewForm} from '@components/forms/box-view-form'
import {EditBoxForm} from '@components/forms/edit-box-form'
import {EditMultipleBoxesForm} from '@components/forms/edit-multiple-boxes-form'
import {RequestToSendBatchForm} from '@components/forms/request-to-send-batch-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {ConfirmWithCommentModal} from '@components/modals/confirmation-with-comment-modal'
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

import {ClientWarehouseViewModel} from './client-warehouse-view.model'
import {styles} from './client-warehouse-view.style'

const activeCategory = navBarActiveCategory.NAVBAR_WAREHOUSE
const activeSubCategory = null
@observer
export class ClientWarehouseViewRaw extends Component {
  viewModel = new ClientWarehouseViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      nameSearchValue,
      confirmModalSettings,
      selectedBox,
      curBox,
      showBoxViewModal,
      volumeWeightCoefficient,
      taskColumnsModel,
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

      curOpenedTask,
      drawerOpen,
      curPage,
      rowsPerPage,
      boxesMy,
      selectedBoxes,
      showMergeBoxModal,
      showConfirmModal,
      showTaskInfoModal,
      showEditBoxModal,
      showRedistributeBoxModal,
      showRedistributeBoxAddNewBoxModal,
      showProgress,
      showEditMultipleBoxesModal,
      showConfirmWithCommentModal,
      showSetShippingLabelModal,
      showSetChipValueModal,
      showWarningInfoModal,
      showRequestToSendBatchModal,
      showSuccessInfoModal,
      boxesDeliveryCosts,
      modalEditSuccessMessage,
      warningInfoModalSettings,
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
      onChangeNameSearchValue,
      onClickSubmitEditMultipleBoxes,

      onClickRemoveBoxFromBatch,
    } = this.viewModel

    const {classes: classNames} = this.props

    const getRowClassName = params => params.getValue(params.id, 'isDraft') === true && classNames.isDraftRow

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey['My warehouse'])}>
            <MainContent>
              <div className={classNames.topHeaderBtnsWrapper}>
                <div className={classNames.boxesFiltersWrapper}>
                  <Button
                    disabled={!currentStorekeeper?._id}
                    tooltipInfoContent={t(TranslationKey['Filter for sorting boxes by prep centers'])}
                    className={cx(classNames.button, {[classNames.selectedBoxesBtn]: !currentStorekeeper?._id})}
                    variant="text"
                    color="primary"
                    onClick={onClickStorekeeperBtn}
                  >
                    {t(TranslationKey['All warehouses'])}
                  </Button>

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
                          color="primary"
                          onClick={() => onClickStorekeeperBtn(storekeeper)}
                        >
                          {storekeeper.name}
                        </Button>
                      ) : null,
                    )}
                </div>

                <SearchInput
                  inputClasses={classNames.searchInput}
                  value={nameSearchValue}
                  placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
                  onChange={onChangeNameSearchValue}
                />
              </div>

              <div className={classNames.btnsWrapper}>
                <div className={classNames.leftBtnsWrapper}>{this.renderButtons()}</div>
              </div>

              <DataGrid
                // autoHeight
                disableVirtualization
                pagination
                useResizeContainer
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
                }}
                getRowClassName={getRowClassName}
                selectionModel={selectedBoxes}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                // rows={getCurrentData()}
                rows={currentData}
                getRowHeight={() => 'auto'}
                // rowHeight={170}
                components={{
                  Toolbar: GridToolbar,
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
                onRowDoubleClick={e => setCurrentOpenedBox(e.row.originalData)}
              />

              <div className={classNames.tasksWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  classes={{
                    root: classNames.root,
                    footerContainer: classNames.footerContainer,
                    footerCell: classNames.footerCell,
                    toolbarContainer: classNames.toolbarContainer,
                  }}
                  localeText={getLocalizationByLanguageTag()}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={getCurrentTaskData()}
                  getRowHeight={() => 'auto'}
                  // rowHeight={150}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  columns={taskColumnsModel}
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
            onSubmit={onClickSubmitEditMultipleBoxes}
            onCloseModal={() => onTriggerOpenModal('showEditMultipleBoxesModal')}
          />
        </Modal>

        <Modal
          missClickModalOn
          openModal={showMergeBoxModal}
          setOpenModal={() => onTriggerOpenModal('showMergeBoxModal')}
        >
          <div className={classNames.modalTitleWrapper}>
            <Typography className={classNames.modalTitle}>{t(TranslationKey['Merging boxes'])}</Typography>
            <img src="/assets/img/merge.png" />
          </div>
          <MergeBoxesModal
            destinations={destinations}
            storekeepers={storekeepersData}
            selectedBoxes={
              (selectedBoxes.length &&
                toJS(boxesMy.filter(box => selectedBoxes.includes(box._id)))?.map(box => box.originalData)) ||
              []
            }
            requestStatus={requestStatus}
            setOpenModal={() => onTriggerOpenModal('showMergeBoxModal')}
            onRemoveBoxFromSelected={onRemoveBoxFromSelected}
            onSubmit={onClickConfirmCreateMergeTasks}
          />
        </Modal>

        <Modal openModal={showTaskInfoModal} setOpenModal={() => onTriggerOpenModal('showTaskInfoModal')}>
          <EditTaskModal
            readOnly
            volumeWeightCoefficient={volumeWeightCoefficient}
            task={curOpenedTask}
            onClickOpenCloseModal={() => onTriggerOpenModal('showTaskInfoModal')}
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

        <Modal missClickModalOn openModal={showRequestToSendBatchModal} setOpenModal={triggerRequestToSendBatchModal}>
          <RequestToSendBatchForm
            storekeepersData={storekeepersData}
            closeModal={triggerRequestToSendBatchModal}
            boxesDeliveryCosts={boxesDeliveryCosts}
            selectedBoxes={selectedBoxes}
            volumeWeightCoefficient={volumeWeightCoefficient}
            boxesMy={boxesMy.map(box => box.originalData)}
            onClickSendBoxesToBatch={onClickSendBoxesToBatch}
            onClickRemoveBoxFromBatch={onClickRemoveBoxFromBatch}
          />
        </Modal>

        <ConfirmWithCommentModal
          openModal={showConfirmWithCommentModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmWithCommentModal')}
          titleText={t(TranslationKey.Attention)}
          commentLabelText={t(TranslationKey['Are you sure you want to cancel the task?'])}
          okBtnText={t(TranslationKey.Ok)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onSubmit={onClickCancelAfterConfirm}
        />

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
            box={curBox}
            volumeWeightCoefficient={volumeWeightCoefficient}
            setOpenModal={() => onTriggerOpenModal('showBoxViewModal')}
          />
        </Modal>

        <Modal openModal={showSetChipValueModal} setOpenModal={() => onTriggerOpenModal('showSetChipValueModal')}>
          <SetChipValueModal
            title={t(TranslationKey['Set FBA shipment'])}
            sourceValue={selectedBox?.fbaShipment}
            onSubmit={onClickSaveFbaShipment}
            onCloseModal={() => onTriggerOpenModal('showSetChipValueModal')}
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

        {showProgress && <CircularProgressWithLabel />}
      </React.Fragment>
    )
  }

  renderButtons = () => {
    const {
      selectedBoxes,
      // isMasterBoxSelected,
      onClickRequestToSendBatch,
      onClickEditBtn,
      onClickMergeBtn,
      onClickSplitBtn,
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
      </React.Fragment>
    )
  }
}

export const ClientWarehouseView = withStyles(ClientWarehouseViewRaw, styles)
