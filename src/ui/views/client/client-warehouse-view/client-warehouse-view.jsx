import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {EditBoxForm} from '@components/forms/edit-box-form'
import {RequestToSendBatchForm} from '@components/forms/request-to-send-batch-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {MergeBoxesModal} from '@components/modals/merge-boxes-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {TaskInfoModal} from '@components/modals/task-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {RedistributeBox} from '@components/screens/warehouse/reditstribute-box-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {ClientWarehouseViewModel} from './client-warehouse-view.model'
import {styles} from './client-warehouse-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientWarehouseView

const activeCategory = navBarActiveCategory.NAVBAR_WAREHOUSE
const activeSubCategory = null
@observer
export class ClientWarehouseViewRaw extends Component {
  viewModel = new ClientWarehouseViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      volumeWeightCoefficient,
      taskColumnsModel,
      currentStorekeeper,
      storekeepersData,
      destinations,

      requestStatus,
      getCurrentData,
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
      showRedistributeBoxSuccessModal,
      showRedistributeBoxFailModal,
      showRequestToSendBatchModal,
      showEditBoxSuccessModal,
      showMergeBoxSuccessModal,
      boxesDeliveryCosts,
      showMergeBoxFailModal,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerCheckbox,
      onRedistribute,
      onTriggerOpenModal,
      onModalRedistributeBoxAddNewBox,
      onEditBoxSubmit,
      triggerRequestToSendBatchModal,
      onClickSendBoxesToBatch,
      onClickMerge,
      onRemoveBoxFromSelected,
      onClickCancelAfterConfirm,

      onChangeFilterModel,
      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,

      onClickStorekeeperBtn,
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
          <Appbar setDrawerOpen={onTriggerDrawer} title={textConsts.appbarTitle}>
            <MainContent>
              <div className={classNames.boxesFiltersWrapper}>
                <Button
                  disabled={!currentStorekeeper?._id}
                  className={clsx(classNames.button, {[classNames.selectedBoxesBtn]: !currentStorekeeper?._id})}
                  variant="text"
                  color="primary"
                  onClick={onClickStorekeeperBtn}
                >
                  {`Все склады`}
                </Button>

                {storekeepersData
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(storekeeper =>
                    storekeeper.boxesCount !== 0 ? (
                      <Button
                        key={storekeeper._id}
                        disabled={currentStorekeeper?._id === storekeeper._id}
                        className={clsx(classNames.button, {
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

              <div className={classNames.btnsWrapper}>
                <div className={classNames.leftBtnsWrapper}>{this.renderButtons()}</div>
              </div>

              <DataGrid
                pagination
                useResizeContainer
                checkboxSelection
                isRowSelectable={params => params.row.isDraft === false}
                getRowClassName={getRowClassName}
                selectionModel={selectedBoxes}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={getCurrentData()}
                rowHeight={150}
                components={{
                  Toolbar: GridToolbar,
                }}
                density={densityModel}
                columns={columnsModel}
                loading={requestStatus === loadingStatuses.isLoading}
                onSelectionModelChange={newSelection => onSelectionModel(newSelection)}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onFilterModelChange={model => onChangeFilterModel(model)}
                onStateChange={setDataGridState}
              />

              <div className={classNames.tasksWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={getCurrentTaskData()}
                  rowHeight={150}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  columns={taskColumnsModel}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showEditBoxModal} setOpenModal={() => onTriggerOpenModal('showEditBoxModal')}>
          <Typography variant="h5">{textConsts.modalEditBoxTitle}</Typography>

          <EditBoxForm
            destinations={destinations}
            storekeepers={storekeepersData}
            volumeWeightCoefficient={volumeWeightCoefficient}
            requestStatus={requestStatus}
            formItem={boxesMy.find(box => box._id === selectedBoxes[0])?.originalData}
            onSubmit={onEditBoxSubmit}
            onTriggerOpenModal={() => onTriggerOpenModal('showEditBoxModal')}
          />
        </Modal>

        <Modal openModal={showRedistributeBoxModal} setOpenModal={() => onTriggerOpenModal('showRedistributeBoxModal')}>
          <div className={classNames.redistributionWrapper}>
            <Typography paragraph variant="h5">
              {textConsts.modalRedistributionTitle}
            </Typography>
            <RedistributeBox
              destinations={destinations}
              storekeepers={storekeepersData}
              requestStatus={requestStatus}
              addNewBoxModal={showRedistributeBoxAddNewBoxModal}
              setAddNewBoxModal={value => onModalRedistributeBoxAddNewBox(value)}
              selectedBox={selectedBoxes.length && boxesMy.find(box => box._id === selectedBoxes[0])?.originalData}
              onRedistribute={onRedistribute}
              onTriggerOpenModal={onTriggerOpenModal}
            />
          </div>
        </Modal>

        <MergeBoxesModal
          destinations={destinations}
          storekeepers={storekeepersData}
          selectedBoxes={
            (selectedBoxes.length &&
              toJS(boxesMy.filter(box => selectedBoxes.includes(box._id)))?.map(box => box.originalData)) ||
            []
          }
          requestStatus={requestStatus}
          openModal={showMergeBoxModal}
          setOpenModal={() => onTriggerOpenModal('showMergeBoxModal')}
          onRemoveBoxFromSelected={onRemoveBoxFromSelected}
          onSubmit={onClickMerge}
        />

        <TaskInfoModal
          openModal={showTaskInfoModal}
          setOpenModal={() => onTriggerOpenModal('showTaskInfoModal')}
          task={curOpenedTask}
          volumeWeightCoefficient={volumeWeightCoefficient}
        />

        <SuccessInfoModal
          openModal={showEditBoxSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showEditBoxSuccessModal')}
          title={textConsts.modalEditSuccessMessage}
          successBtnText={textConsts.closeBtn}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showEditBoxSuccessModal')
          }}
        />

        <SuccessInfoModal
          openModal={showMergeBoxSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showMergeBoxSuccessModal')}
          title={textConsts.modalMergeSuccessMessage}
          successBtnText={textConsts.closeBtn}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showMergeBoxSuccessModal')
          }}
        />

        <SuccessInfoModal
          openModal={showRedistributeBoxSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showRedistributeBoxSuccessModal')}
          title={textConsts.modalRedistributionSuccessMessage}
          successBtnText={textConsts.closeBtn}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showRedistributeBoxSuccessModal')
          }}
        />

        <WarningInfoModal
          openModal={showRedistributeBoxAddNewBoxModal}
          setOpenModal={() => onTriggerOpenModal('showRedistributeBoxAddNewBoxModal')}
          title={textConsts.modalRedistributionAddNewBoxMessage}
          btnText={textConsts.closeBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showRedistributeBoxAddNewBoxModal')
          }}
        />

        <WarningInfoModal
          openModal={showMergeBoxFailModal}
          setOpenModal={() => onTriggerOpenModal('showMergeBoxFailModal')}
          title={textConsts.modalMergeFailMessage}
          btnText={textConsts.closeBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showMergeBoxFailModal')
          }}
        />

        <WarningInfoModal
          openModal={showRedistributeBoxFailModal}
          setOpenModal={() => onTriggerOpenModal('showRedistributeBoxFailModal')}
          title={textConsts.modalRedistributionFailMessage}
          btnText={textConsts.closeBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showRedistributeBoxFailModal')
          }}
        />

        <Modal openModal={showRequestToSendBatchModal} setOpenModal={triggerRequestToSendBatchModal}>
          <RequestToSendBatchForm
            closeModal={triggerRequestToSendBatchModal}
            boxesDeliveryCosts={boxesDeliveryCosts}
            selectedBoxes={selectedBoxes}
            volumeWeightCoefficient={volumeWeightCoefficient}
            boxesMy={boxesMy.map(box => box.originalData)}
            onClickRemoveBoxFromBatch={onTriggerCheckbox}
            onClickSendBoxesToBatch={onClickSendBoxesToBatch}
          />
        </Modal>

        <ConfirmationModal
          isWarning
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={textConsts.confirmTitle}
          message={textConsts.confirmMessage}
          successBtnText={textConsts.yesBtn}
          cancelBtnText={textConsts.noBtn}
          onClickSuccessBtn={() => {
            onClickCancelAfterConfirm()
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }

  renderButtons = () => {
    const {
      selectedBoxes,
      isMasterBoxSelected,
      isOneItemInBox,
      onClickRequestToSendBatch,
      onClickEditBtn,
      onClickMergeBtn,
      onClickSplitBtn,
    } = this.viewModel
    return (
      <React.Fragment>
        <Button
          disableElevation
          disabled={!selectedBoxes.length}
          color="primary"
          variant="contained"
          onClick={onClickRequestToSendBatch}
        >
          {textConsts.sendBatchBtn}
        </Button>

        <Button
          disableElevation
          disabled={selectedBoxes.length <= 1 || isMasterBoxSelected}
          color="primary"
          variant="contained"
          onClick={onClickMergeBtn}
        >
          {textConsts.mergeBtn}
        </Button>

        <Button
          disableElevation
          disabled={selectedBoxes.length !== 1 || isOneItemInBox}
          color="primary"
          variant="contained"
          onClick={onClickSplitBtn}
        >
          {textConsts.redistributeBtn}
        </Button>
        <Button
          disableElevation
          disabled={selectedBoxes.length !== 1}
          color="primary"
          variant="contained"
          onClick={onClickEditBtn}
        >
          {textConsts.editBtn}
        </Button>
      </React.Fragment>
    )
  }
}

export const ClientWarehouseView = withStyles(styles)(ClientWarehouseViewRaw)
