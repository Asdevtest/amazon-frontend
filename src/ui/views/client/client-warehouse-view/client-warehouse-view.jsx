/* eslint-disable arrow-body-style */
import {Component} from 'react'

import {Button, TableCell, TableRow, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {clientUsername, clientWarehouseViewTable} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {EditBoxForm} from '@components/forms/edit-box-form'
import {SendOwnProductForm} from '@components/forms/send-own-product-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {WarehouseBodyRow} from '@components/table-rows/client/warehouse'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './client-warehouse-view.style'
import {RedistributeBox} from './reditstribute-box-modal'

const {boxesListRaw, headCells} = clientWarehouseViewTable

const textConsts = getLocalizedTexts(texts, 'en').clientWarehouseView

export class ClientWarehouseViewRaw extends Component {
  state = {
    drawerOpen: false,
    paginationPage: 1,
    rowsPerPage: 5,
    boxes: boxesListRaw,
    selectedBoxes: ['2096c_box'],
    modalSendOwnProduct: false,
    modalEditBox: false,
    modalRedistributeBox: false,
    modalRedistributeBoxAddNewBox: null,
    modalRedistributeBoxSuccess: false,
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
    } = this.state
    const activeCategory = 4
    const activeSubCategory = null
    const {classes: classNames} = this.props
    const rowsHandlers = {
      checkbox: id => this.onTriggerCheckbox(id),
    }
    const rowsDatas = {
      selectedBoxes,
    }

    return (
      <>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          curUserRole={userRole.CLIENT}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={this.onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc=""
            handlerTriggerDrawer={this.onTriggerDrawer}
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
                onClick={() => this.onClickOpenModal('modalSendOwnProduct')}
              >
                {textConsts.sendProductBtn}
              </Button>
              <Table
                buttons={this.renderButtons()}
                currentPage={paginationPage}
                data={boxes}
                handlerPageChange={this.onChangePagination}
                handlerRowsPerPage={this.onChangeRowsPerPage}
                pageCount={Math.ceil(boxes.length / rowsPerPage)}
                BodyRow={WarehouseBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={rowsPerPage}
                rowsHandlers={rowsHandlers}
                rowsDatas={rowsDatas}
              />
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={modalSendOwnProduct} setOpenModal={() => this.onClickCloseModal('modalSendOwnProduct')}>
          <Typography variant="h5">{textConsts.modalSendOwnProductTitle}</Typography>
          <SendOwnProductForm />
        </Modal>
        <Modal openModal={modalEditBox} setOpenModal={() => this.onClickCloseModal('modalEditBox')}>
          <Typography variant="h5">{textConsts.modalEditBoxTitle}</Typography>
          <EditBoxForm formFields={boxes.filter(box => selectedBoxes.includes(box.boxId))[0]} />
        </Modal>
        <Modal openModal={modalRedistributeBox} setOpenModal={() => this.onClickCloseModal('modalRedistributeBox')}>
          <div className={classNames.redistributionWrapper}>
            <Typography paragraph variant="h5">
              {textConsts.modalRedistributionTitle}
            </Typography>
            <RedistributeBox
              addNewBoxModal={modalRedistributeBoxAddNewBox}
              setAddNewBoxModal={value => this.setState({modalRedistributeBoxAddNewBox: value})}
              selectedBox={boxes.filter(box => selectedBoxes.includes(box.boxId))[0]}
              notSelectedBoxes={boxes.filter(box => !selectedBoxes.includes(box.boxId))}
              onRedistribute={this.onRedistribute}
              onClickCloseModal={this.onClickCloseModal}
              onClickOpenModal={this.onClickOpenModal}
            />
          </div>
        </Modal>
        <Modal
          openModal={!!modalRedistributeBoxAddNewBox}
          setOpenModal={() => this.onClickCloseModal('modalRedistributeBoxAddNewBox')}
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
              onClick={() => this.onClickCloseModal('modalRedistributeBoxAddNewBox')}
            >
              {textConsts.closeBtn}
            </Button>
          </div>
        </Modal>
        <Modal
          openModal={modalRedistributeBoxSuccess}
          setOpenModal={() => this.onClickCloseModal('modalRedistributeBoxSuccess')}
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
              onClick={() => this.onClickCloseModal('modalRedistributeBoxSuccess')}
            >
              {textConsts.closeBtn}
            </Button>
          </div>
        </Modal>
      </>
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
    <>
      <Button disableElevation color="primary" variant="contained">
        {textConsts.sendBatchBtn}
      </Button>
      <Button
        disableElevation
        disabled={this.state.selectedBoxes.length <= 1}
        color="primary"
        variant="contained"
        onClick={() => this.onClickMerge()}
      >
        {textConsts.mergeBtn}
      </Button>
      <Button
        disableElevation
        disabled={this.state.selectedBoxes.length !== 1}
        color="primary"
        variant="contained"
        onClick={() => this.onClickOpenModal('modalRedistributeBox')}
      >
        {textConsts.redistributeBtn}
      </Button>
      <Button
        disableElevation
        disabled={this.state.selectedBoxes.length !== 1}
        color="primary"
        variant="contained"
        onClick={() => this.onClickOpenModal('modalEditBox')}
      >
        {textConsts.editBtn}
      </Button>
    </>
  )

  onTriggerDrawer = () => {
    const {drawerOpen} = this.state
    this.setState({drawerOpen: !drawerOpen})
  }

  onChangePagination = (e, value) => {
    this.setState({paginationPage: value})
  }

  onChangeRowsPerPage = e => {
    this.setState({rowsPerPage: Number(e.target.value), paginationPage: 1})
  }

  onTriggerCheckbox = boxId => {
    const {selectedBoxes} = this.state

    const updatedselectedBoxes = selectedBoxes.includes(boxId)
      ? selectedBoxes.filter(id => id !== boxId)
      : selectedBoxes.concat(boxId)
    this.setState({selectedBoxes: updatedselectedBoxes})
  }

  onRedistribute = updatedBoxes => {
    this.setState({boxes: updatedBoxes, selectedBoxes: []})
  }

  onClickMerge = () => {
    alert('Box merging')
  }

  onClickCloseModal = modalState => {
    this.setState({[modalState]: false})
  }

  onClickOpenModal = modalState => {
    this.setState({[modalState]: true})
  }
}

export const ClientWarehouseView = withStyles(styles)(ClientWarehouseViewRaw)
