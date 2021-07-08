import React, {Component} from 'react'

import {Button, TableCell, TableRow, Typography, Paper} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {clientUsername} from '@constants/mocks'
import {operationTypes} from '@constants/operation-types'
import {CLIENT_WAREHOUSE_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {SuccessButton} from '@components/buttons/success-button'
import {CreateOrEditBoxForm} from '@components/forms/create-or-edit-box-form'
import {SendOwnProductForm} from '@components/forms/send-own-product-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {RedistributeBox} from '@components/screens/warehouse/reditstribute-box-modal'
import {WarehouseHistory} from '@components/screens/warehouse/warehouse-history'
import {Table} from '@components/table'
import {WarehouseBodyRow} from '@components/table-rows/warehouse'

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
  }

  render() {
    const {
      tasksMy,
      drawerOpen,
      curPage,
      rowsPerPage,
      boxesMy,
      selectedBoxes,
      showSendOwnProductModal,
      showEditBoxModal,
      showRedistributeBoxModal,
      showRedistributeBoxAddNewBoxModal,
      showRedistributeBoxSuccessModal,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerCheckbox,
      onRedistribute,
      onTriggerOpenModal,
      onModalRedistributeBoxAddNewBox,
      onEditBoxSubmit,
      approveBoxesOperation,
      cancelMergeBoxes,
      cancelSplitBoxes,
      // postTask
      // removeBox
      //  выше методы для тестов
    } = this.viewModel

    const {classes: classNames} = this.props
    const rowsHandlers = {
      checkbox: id => onTriggerCheckbox(id),
    }
    const rowsDatas = {
      selectedBoxes,
    }

    // postTask({ idsData: [ '60ddb841638c0d3917ec772d' ], type: 'merge' });
    // cancelMergeBoxes('60ddc0c3638c0d3917ec7752');
    // approveBoxesOperation('60dd8ecb638c0d3917ec76ff');

    // removeBox('60d491695382b25eea73e076');
    //  выше методы для тестов

    // console.log(boxesMy, 'BOXES DATA') для проверки

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          curUserRole={UserRole.CLIENT}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            handlerTriggerDrawer={onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={clientUsername}
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              <Typography paragraph variant="h5">
                {textConsts.mainTitle}
              </Typography>

              <div className={classNames.addProductBtnWrapper}>
                <SuccessButton onClick={() => onTriggerOpenModal('showSendOwnProductModal')}>
                  {textConsts.sendProductBtn}
                </SuccessButton>
              </div>

              <Table
                renderButtons={this.renderButtons}
                currentPage={curPage}
                data={boxesMy}
                handlerPageChange={onChangeCurPage}
                handlerRowsPerPage={onChangeRowsPerPage}
                pageCount={Math.ceil(boxesMy.length / rowsPerPage)}
                BodyRow={WarehouseBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={rowsPerPage}
                rowsHandlers={rowsHandlers}
                rowsDatas={rowsDatas}
              />
              <Paper>
                <WarehouseHistory
                  tasksData={tasksMy}
                  title={textConsts.warehouseHistoryTitle}
                  onApproveMergeAndSplitBoxes={approveBoxesOperation}
                  onCancelMergeBoxes={cancelMergeBoxes}
                  onCancelSplitBoxes={cancelSplitBoxes}
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
          <CreateOrEditBoxForm
            box={boxesMy.find(box => box._id === selectedBoxes[0])}
            onSubmit={onEditBoxSubmit}
            onTriggerOpenModal={onTriggerOpenModal}
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

        <Modal
          openModal={showRedistributeBoxAddNewBoxModal}
          setOpenModal={() => onTriggerOpenModal('showRedistributeBoxAddNewBoxModal')}
        >
          <div className={classNames.modalMessageWrapper}>
            <Typography paragraph variant="h5">
              {textConsts.modalRedistributionAddNewBoxTitle}
            </Typography>
            <Typography paragraph className={classNames.modalMessage}>
              {textConsts.modalRedistributionAddNewBoxMessage}
            </Typography>
            <Button
              className={classNames.modalMessageBtn}
              color="primary"
              onClick={() => onTriggerOpenModal('showRedistributeBoxAddNewBoxModal')}
            >
              {textConsts.closeBtn}
            </Button>
          </div>
        </Modal>

        <Modal
          openModal={showRedistributeBoxSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showRedistributeBoxSuccessModal')}
        >
          <div className={classNames.modalMessageWrapper}>
            <Typography paragraph variant="h5">
              {textConsts.modalRedistributionSuccessTitle}
            </Typography>
            <Typography paragraph className={classNames.modalMessage}>
              {textConsts.modalRedistributionSuccessMessage}
            </Typography>
            <Button
              className={classNames.modalMessageBtn}
              color="primary"
              onClick={() => onTriggerOpenModal('showRedistributeBoxSuccessModal')}
            >
              {textConsts.closeBtn}
            </Button>
          </div>
        </Modal>
      </React.Fragment>
    )
  }

  renderHeadRow = (
    <TableRow>
      {CLIENT_WAREHOUSE_HEAD_CELLS.map((item, index) => (
        <TableCell key={index}>{item.label}</TableCell>
      ))}
    </TableRow>
  )

  renderButtons = () => {
    const {selectedBoxes, isMasterBoxSelected, onTriggerOpenModal, onClickMerge} = this.viewModel
    return (
      <React.Fragment>
        <Button disableElevation color="primary" variant="contained">
          {textConsts.sendBatchBtn}
        </Button>

        <Button
          disableElevation
          disabled={selectedBoxes.length <= 1 || isMasterBoxSelected}
          color="primary"
          variant="contained"
          onClick={() => onClickMerge(operationTypes.MERGE)}
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
          disabled={selectedBoxes.length !== 1 || isMasterBoxSelected}
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
