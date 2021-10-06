/* eslint-disable no-unused-vars */
import React, {Component} from 'react'

import {Typography, Paper} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
import {EditBoxForm} from '@components/forms/edit-box-form'
import {SendOwnProductForm} from '@components/forms/send-own-product-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmWithCommentModal} from '@components/modals/confirmation-with-comment-modal/'
import {RequestToSendBatchModal} from '@components/modals/request-to-send-batch-modal/request-to-send-batch-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {TaskInfoModal} from '@components/modals/task-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {RedistributeBox} from '@components/screens/warehouse/reditstribute-box-modal'
import {WarehouseHistory} from '@components/screens/warehouse/warehouse-history'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/clientAvatar.jpg'
import {ClientWarehouseViewModel} from './client-warehouse-view.model'
import {styles} from './client-warehouse-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientWarehouseView

const activeCategory = 4
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
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      curOpenedTask,
      tasksMy,
      drawerOpen,
      curPage,
      rowsPerPage,
      boxesMy,
      selectedBoxes,
      showMergeBoxModal,
      showTaskInfoModal,
      showSendOwnProductModal,
      showEditBoxModal,
      showRedistributeBoxModal,
      showRedistributeBoxAddNewBoxModal,
      showRedistributeBoxSuccessModal,
      showRedistributeBoxFailModal,
      showRequestToSendBatchModal,
      boxesDeliveryCosts,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerCheckbox,
      onRedistribute,
      onTriggerOpenModal,
      onModalRedistributeBoxAddNewBox,
      onEditBoxSubmit,
      cancelMergeBoxes,
      cancelSplitBoxes,
      cancelEditBoxes,
      setCurrentOpenedTask,
      triggerRequestToSendBatchModal,
      onClickSendBoxesToBatch,
      onClickMerge,

      onChangeFilterModel,
      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          curUserRole={UserRole.CLIENT}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            setDrawerOpen={onTriggerDrawer}
            title={textConsts.appbarTitle}
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              <Typography paragraph variant="h5">
                {textConsts.mainTitle}
              </Typography>

              <div className={classNames.btnsWrapper}>
                <div className={classNames.leftBtnsWrapper}>{this.renderButtons()}</div>

                <SuccessButton onClick={() => onTriggerOpenModal('showSendOwnProductModal')}>
                  {textConsts.sendProductBtn}
                </SuccessButton>
              </div>

              <div className={classNames.tableWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  checkboxSelection
                  isRowSelectable={params => params.row.isDraft === false}
                  getRowClassName={params => params.getValue(params.id, 'isDraft') === true && classNames.isDraftRow}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  rows={getCurrentData()}
                  rowHeight={100}
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
                  onStateChange={e => e.state.rows.totalRowCount > 0 && setDataGridState(e.state)}
                />
              </div>

              <Paper>
                <WarehouseHistory
                  tasksData={tasksMy}
                  title={textConsts.warehouseHistoryTitle}
                  onCancelMergeBoxes={cancelMergeBoxes}
                  onCancelSplitBoxes={cancelSplitBoxes}
                  onCancelEditBoxes={cancelEditBoxes}
                  onClickTaskInfo={setCurrentOpenedTask}
                />
              </Paper>
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showSendOwnProductModal} setOpenModal={() => onTriggerOpenModal('showSendOwnProductModal')}>
          <Typography variant="h5">{textConsts.modalSendOwnProductTitle}</Typography>
          <SendOwnProductForm />
        </Modal>

        <Modal openModal={showEditBoxModal} setOpenModal={() => onTriggerOpenModal('showEditBoxModal')}>
          <Typography variant="h5">{textConsts.modalEditBoxTitle}</Typography>

          <EditBoxForm
            formItem={boxesMy.find(box => box._id === selectedBoxes[0])}
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
              addNewBoxModal={showRedistributeBoxAddNewBoxModal}
              setAddNewBoxModal={value => onModalRedistributeBoxAddNewBox(value)}
              selectedBox={selectedBoxes.length && boxesMy.find(box => box._id === selectedBoxes[0])}
              onRedistribute={onRedistribute}
              onTriggerOpenModal={onTriggerOpenModal}
            />
          </div>
        </Modal>

        <ConfirmWithCommentModal
          openModal={showMergeBoxModal}
          setOpenModal={() => onTriggerOpenModal('showMergeBoxModal')}
          titleText={textConsts.modalMergeTitle}
          commentLabelText={textConsts.modalMergeFieldLabel}
          okBtnText={textConsts.modalMergeMergeBtn}
          cancelBtnText={textConsts.modalMergeCancelBtn}
          onSubmit={onClickMerge}
        />

        <TaskInfoModal
          openModal={showTaskInfoModal}
          setOpenModal={() => onTriggerOpenModal('showTaskInfoModal')}
          task={curOpenedTask}
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
          openModal={showRedistributeBoxFailModal}
          setOpenModal={() => onTriggerOpenModal('showRedistributeBoxFailModal')}
          title={textConsts.modalRedistributionFailMessage}
          btnText={textConsts.closeBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showRedistributeBoxFailModal')
          }}
        />
        <RequestToSendBatchModal
          openModal={showRequestToSendBatchModal}
          setOpenModal={triggerRequestToSendBatchModal}
          boxesDeliveryCosts={boxesDeliveryCosts}
          selectedBoxes={selectedBoxes}
          boxesMy={boxesMy}
          onClickRemoveBoxFromBatch={onTriggerCheckbox}
          onClickSendBoxesToBatch={onClickSendBoxesToBatch}
        />
      </React.Fragment>
    )
  }

  renderButtons = () => {
    const {
      selectedBoxes,
      isMasterBoxSelected,
      onTriggerOpenModal,
      onClickRequestToSendBatch,
      triggerRequestToSendBatchModal,
    } = this.viewModel
    // console.log('selectedBoxes ', selectedBoxes)
    return (
      <React.Fragment>
        <Button
          disableElevation
          disabled={!selectedBoxes.length}
          color="primary"
          variant="contained"
          onClick={onClickRequestToSendBatch}
          // onClick={triggerRequestToSendBatchModal}
        >
          {textConsts.sendBatchBtn}
        </Button>

        <Button
          disableElevation
          disabled={selectedBoxes.length <= 1 || isMasterBoxSelected}
          color="primary"
          variant="contained"
          onClick={() => onTriggerOpenModal('showMergeBoxModal')}
        >
          {textConsts.mergeBtn}
        </Button>

        <Button
          disableElevation
          disabled={selectedBoxes.length !== 1}
          color="primary"
          variant="contained"
          onClick={() => onTriggerOpenModal('showRedistributeBoxModal')}
        >
          {textConsts.redistributeBtn}
        </Button>
        <Button
          disableElevation
          disabled={selectedBoxes.length !== 1}
          color="primary"
          variant="contained"
          onClick={() => onTriggerOpenModal('showEditBoxModal')}
        >
          {textConsts.editBtn}
        </Button>
      </React.Fragment>
    )
  }
}

export const ClientWarehouseView = withStyles(styles)(ClientWarehouseViewRaw)
