import React, {Component} from 'react'

import {Button, TableCell, TableRow, Typography, Paper} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {buyerUsername, buyerWarehouseViewTable, HISTORY_DATA} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

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

import avatar from '../assets/buyerAvatar.jpg'
import {BuyerWarehouseViewModel} from './buyer-warehouse-view.model'
import {styles} from './buyer-warehouse-view.style'

const {headCells} = buyerWarehouseViewTable

const textConsts = getLocalizedTexts(texts, 'en').buyerWarehouseView

const activeCategory = 3
const activeSubCategory = null

export class BuyerWarehouseViewRaw extends Component {
  viewModel = new BuyerWarehouseViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getBoxes()
  }

  render() {
    const {
      drawerOpen,
      paginationPage,
      rowsPerPage,
      boxes,
      selectedBoxes,
      modalSendOwnProduct,
      modalEditBox,
      modalRedistributeBox,
      modalRedistributeBoxAddNewBox,
      modalRedistributeBoxSuccess,
      onTriggerDrawer,
      onChangePagination,
      onChangeRowsPerPage,
      onTriggerCheckbox,
      onRedistribute,
      onClickCloseModal,
      onClickOpenModal,
      onModalRedistributeBoxAddNewBox,
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
          curUserRole={userRole.BUYER}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            handlerTriggerDrawer={onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={buyerUsername}
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
                onClick={() => onClickOpenModal('modalSendOwnProduct')}
              >
                {textConsts.sendProductBtn}
              </Button>
              <Table
                buttons={this.renderButtons()}
                currentPage={paginationPage}
                data={boxes}
                handlerPageChange={onChangePagination}
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
        <Modal openModal={modalSendOwnProduct} setOpenModal={() => onClickCloseModal('modalSendOwnProduct')}>
          <Typography variant="h5">{textConsts.modalSendOwnProductTitle}</Typography>
          <SendOwnProductForm />
        </Modal>
        <Modal openModal={modalEditBox} setOpenModal={() => onClickCloseModal('modalEditBox')}>
          <Typography variant="h5">{textConsts.modalEditBoxTitle}</Typography>
          <EditBoxForm formFields={boxes.filter(box => selectedBoxes.includes(box.boxId))[0]} />
        </Modal>
        <Modal openModal={modalRedistributeBox} setOpenModal={() => onClickCloseModal('modalRedistributeBox')}>
          <div className={classNames.redistributionWrapper}>
            <Typography paragraph variant="h5">
              {textConsts.modalRedistributionTitle}
            </Typography>
            <RedistributeBox
              addNewBoxModal={modalRedistributeBoxAddNewBox}
              setAddNewBoxModal={value => onModalRedistributeBoxAddNewBox(value)}
              selectedBox={boxes.filter(box => selectedBoxes.includes(box.boxId))[0]}
              notSelectedBoxes={boxes.filter(box => !selectedBoxes.includes(box.boxId))}
              onRedistribute={onRedistribute}
              onClickCloseModal={onClickCloseModal}
              onClickOpenModal={onClickOpenModal}
            />
          </div>
        </Modal>
        <Modal
          openModal={!!modalRedistributeBoxAddNewBox}
          setOpenModal={() => onClickCloseModal('modalRedistributeBoxAddNewBox')}
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
              onClick={() => onClickCloseModal('modalRedistributeBoxAddNewBox')}
            >
              {textConsts.closeBtn}
            </Button>
          </div>
        </Modal>
        <Modal
          openModal={modalRedistributeBoxSuccess}
          setOpenModal={() => onClickCloseModal('modalRedistributeBoxSuccess')}
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
              onClick={() => onClickCloseModal('modalRedistributeBoxSuccess')}
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
      {headCells.map((item, index) => (
        <TableCell key={index}>{item.label}</TableCell>
      ))}
    </TableRow>
  )

  renderButtons = () => (
    <React.Fragment>
      <Button disableElevation color="primary" variant="contained">
        {textConsts.sendBatchBtn}
      </Button>
      <Button
        disableElevation
        disabled={this.viewModel.selectedBoxes.length <= 1}
        color="primary"
        variant="contained"
        onClick={() => this.viewModel.onClickMerge()}
      >
        {textConsts.mergeBtn}
      </Button>
      <Button
        disableElevation
        disabled={this.viewModel.selectedBoxes.length !== 1}
        color="primary"
        variant="contained"
        onClick={() => this.viewModel.onClickOpenModal('modalRedistributeBox')}
      >
        {textConsts.redistributeBtn}
      </Button>
      <Button
        disableElevation
        disabled={this.viewModel.selectedBoxes.length !== 1}
        color="primary"
        variant="contained"
        onClick={() => this.viewModel.onClickOpenModal('modalEditBox')}
      >
        {textConsts.editBtn}
      </Button>
    </React.Fragment>
  )
}

export const BuyerWarehouseView = withStyles(styles)(BuyerWarehouseViewRaw)
