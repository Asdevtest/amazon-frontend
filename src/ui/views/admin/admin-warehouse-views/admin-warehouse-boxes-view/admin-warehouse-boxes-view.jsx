import React, {Component} from 'react'

import {Button, TableCell, TableRow, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {adminUsername, clientWarehouseViewTable} from '@constants/mocks'
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
import {Table} from '@components/table'
import {WarehouseBodyRow} from '@components/table-rows/warehouse'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/adminAvatar.jpg'
import {AdminWarehouseBoxesViewModel} from './admin-warehouse-boxes-view.model'
import {styles} from './admin-warehouse-boxes-view.style'

const {headCells} = clientWarehouseViewTable

const textConsts = getLocalizedTexts(texts, 'en').adminWarehouseView

const activeCategory = 4
const activeSubCategory = 1

export class AdminWarehouseBoxesViewRaw extends Component {
  viewModel = new AdminWarehouseBoxesViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getBoxes()
  }

  render() {
    const {
      drawerOpen,
      curPage,
      rowsPerPage,
      boxes,
      history,
      selectedBoxes,
      modalSendOwnProduct,
      modalEditBox,
      showRedistributeBoxModal,
      showRedistributeBoxAddNewBoxModal,
      showRedistributeBoxSuccessModal,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerCheckbox,
      onRedistribute,
      onTriggerModal,
      onShowModalRedistributeBoxAddNewBox,
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
          curUserRole={UserRole.ADMIN}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            history={history}
            curUserRole={UserRole.ADMIN}
            handlerTriggerDrawer={onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={adminUsername}
          >
            <MainContent>
              <Typography paragraph variant="h5">
                {textConsts.mainTitle}
              </Typography>
              <Table
                buttons={this.renderButtons()}
                currentPage={curPage}
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
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={modalSendOwnProduct} setOpenModal={() => onTriggerModal('modalSendOwnProduct')}>
          <Typography variant="h5">{textConsts.modalSendOwnProductTitle}</Typography>
          <SendOwnProductForm />
        </Modal>
        <Modal openModal={modalEditBox} setOpenModal={() => onTriggerModal('modalEditBox')}>
          <Typography variant="h5">{textConsts.modalEditBoxTitle}</Typography>
          <EditBoxForm formItem={boxes.filter(box => selectedBoxes.includes(box.boxId))[0]} />
        </Modal>
        <Modal openModal={showRedistributeBoxModal} setOpenModal={() => onTriggerModal('showRedistributeBoxModal')}>
          <div className={classNames.redistributionWrapper}>
            <Typography paragraph variant="h5">
              {textConsts.modalRedistributionTitle}
            </Typography>
            <RedistributeBox
              addNewBoxModal={showRedistributeBoxAddNewBoxModal}
              setAddNewBoxModal={value => onShowModalRedistributeBoxAddNewBox(value)}
              selectedBox={boxes.filter(box => selectedBoxes.includes(box.boxId))[0]}
              notSelectedBoxes={boxes.filter(box => !selectedBoxes.includes(box.boxId))}
              onRedistribute={onRedistribute}
              onTriggerModal={onTriggerModal}
            />
          </div>
        </Modal>
        <Modal
          openModal={!!showRedistributeBoxAddNewBoxModal}
          setOpenModal={() => onTriggerModal('showRedistributeBoxAddNewBoxModal')}
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
              onClick={() => onTriggerModal('showRedistributeBoxAddNewBoxModal')}
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
              onClick={() => onTriggerModal('showRedistributeBoxSuccessModal')}
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
        onClick={() => this.viewModel.onTriggerModal('showRedistributeBoxModal')}
      >
        {textConsts.redistributeBtn}
      </Button>
      <Button
        disableElevation
        disabled={this.viewModel.selectedBoxes.length !== 1}
        color="primary"
        variant="contained"
        onClick={() => this.viewModel.onTriggerModal('modalEditBox')}
      >
        {textConsts.editBtn}
      </Button>
    </React.Fragment>
  )
}

export const AdminWarehouseBoxesView = withStyles(styles)(AdminWarehouseBoxesViewRaw)
