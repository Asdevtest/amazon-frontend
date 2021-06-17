import React, {Component} from 'react'

import {Button, TableCell, TableRow, Typography, Paper} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {clientUsername, HISTORY_DATA} from '@constants/mocks'
import {CLIENT_WAREHOUSE_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {EditBoxForm} from '@components/forms/edit-box-form'
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

import {ClientWarehouseViewModel} from './client-warehouse-view.model'
import {styles} from './client-warehouse-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientWarehouseView

const activeCategory = 4
const activeSubCategory = null

export class ClientWarehouseViewRaw extends Component {
  viewModel = new ClientWarehouseViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      paginationPage,
      rowsPerPage,
      boxes,
      selectedBoxes,
      showSendOwnProductModal,
      showEditBoxModal,
      showRedistributeBoxModal,
      showRedistributeBoxAddNewBoxModal,
      showRedistributeBoxSuccessModal,
      modalRedistributeBoxAddNewBox,
      onChangeCurPage,
      onChangeRowsPerPage,
      onRedistributeBoxAddNewBox,
      onTriggerModal,
      onTriggerCheckbox,
      onTriggerDrawer,
    } = this.viewModel
    const {classes: classNames} = this.props
    const rowsHandlers = {
      checkbox: id => onTriggerCheckbox(id),
    }
    const rowsDatas = {
      selectedBoxes,
    }

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
            avatarSrc={''}
            handlerTriggerDrawer={onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={clientUsername}
          >
            <MainContent>
              <Typography paragraph variant="h5">
                {textConsts.mainTitle}
              </Typography>
              <Button
                disableElevation
                className={classNames.sendOwnProductBtn}
                color="primary"
                variant="contained"
                onClick={() => onTriggerModal('showSendOwnProductModal')}
              >
                {textConsts.sendProductBtn}
              </Button>
              <Table
                renderButtons={this.renderButtons}
                currentPage={paginationPage}
                data={boxes}
                handlerPageChange={onChangeCurPage}
                handlerRowsPerPage={onChangeRowsPerPage}
                pageCount={Math.ceil(boxes.length / rowsPerPage)}
                BodyRow={WarehouseBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={rowsPerPage}
                rowsHandlers={rowsHandlers}
                rowsDatas={rowsDatas}
              />
              <Paper>
                <WarehouseHistory historyData={HISTORY_DATA} title={textConsts.warehouseHistoryTitle} />
              </Paper>
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showSendOwnProductModal} setOpenModal={() => onTriggerModal('modalSendOwnProduct')}>
          <Typography variant="h5">{textConsts.modalSendOwnProductTitle}</Typography>
          <SendOwnProductForm />
        </Modal>
        <Modal openModal={showEditBoxModal} setOpenModal={() => onTriggerModal('modalEditBox')}>
          <Typography variant="h5">{textConsts.modalEditBoxTitle}</Typography>
          <EditBoxForm formFields={boxes.filter(box => selectedBoxes.includes(box.boxId))[0]} />
        </Modal>
        <Modal openModal={showRedistributeBoxModal} setOpenModal={() => onTriggerModal('modalRedistributeBox')}>
          <div className={classNames.redistributionWrapper}>
            <Typography paragraph variant="h5">
              {textConsts.modalRedistributionTitle}
            </Typography>
            <RedistributeBox
              addNewBoxModal={showRedistributeBoxAddNewBoxModal}
              setAddNewBoxModal={onRedistributeBoxAddNewBox}
              selectedBox={boxes.filter(box => selectedBoxes.includes(box.boxId))[0]}
              notSelectedBoxes={boxes.filter(box => !selectedBoxes.includes(box.boxId))}
              onRedistribute={onRedistributeBoxAddNewBox}
              onClickCloseModal={onTriggerModal}
              onClickOpenModal={onTriggerModal}
            />
          </div>
        </Modal>
        <Modal
          openModal={!!modalRedistributeBoxAddNewBox}
          setOpenModal={() => onTriggerModal('modalRedistributeBoxAddNewBox')}
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
              onClick={() => onTriggerModal('modalRedistributeBoxAddNewBox')}
            >
              {textConsts.closeBtn}
            </Button>
          </div>
        </Modal>
        <Modal
          openModal={showRedistributeBoxSuccessModal}
          setOpenModal={() => onTriggerModal('showRedistributeBoxSuccessModal')}
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
              onClick={() => onTriggerModal('modalRedistributeBoxSuccess')}
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
    const {selectedBoxes, onClickMerge, onTriggerModal} = this.viewModel
    return (
      <>
        <Button disableElevation color="primary" variant="contained">
          {textConsts.sendBatchBtn}
        </Button>
        <Button
          disableElevation
          disabled={selectedBoxes.length <= 1}
          color="primary"
          variant="contained"
          onClick={() => onClickMerge()}
        >
          {textConsts.mergeBtn}
        </Button>
        <Button
          disableElevation
          disabled={selectedBoxes.length !== 1}
          color="primary"
          variant="contained"
          onClick={() => onTriggerModal('modalRedistributeBox')}
        >
          {textConsts.redistributeBtn}
        </Button>
        <Button
          disableElevation
          disabled={selectedBoxes.length !== 1}
          color="primary"
          variant="contained"
          onClick={() => onTriggerModal('modalEditBox')}
        >
          {textConsts.editBtn}
        </Button>
      </>
    )
  }
}

export const ClientWarehouseView = withStyles(styles)(ClientWarehouseViewRaw)
