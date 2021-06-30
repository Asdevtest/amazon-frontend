import React, {Component} from 'react'

import {Button, TableCell, TableRow, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {clientExchangeRequestsViewTable, clientUsername} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
import {RequestForm} from '@components/forms/request-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {ExchangeRequestsBodyRow} from '@components/table-rows/client/exchange-requests'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getRequiredListByKeys} from '@utils/get-required-list-by-keys'

import avatar from '../../assets/clientAvatar.jpg'
import {ClientExchangeRequestsViewModel} from './client-exchange-requests-view.model'
import {styles} from './client-exchange-requests-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientExchangeRequestsView

const {headCells, tableKeys, requestsListRaw} = clientExchangeRequestsViewTable

const requestsList = getRequiredListByKeys(requestsListRaw, tableKeys)

const formFields = {
  strategy: '',
  monthlySales: '',
  budget: '',
  amazonPrice: '',
  avgBSR: '',
  avgReviews: '',
  avgRevenue: '',
  notes: '',
  checkboxForbid: '',
  checkboxNoPay: '',
  deadline: Date.now(),
  checkboxNoCheck: '',
}

const navbarActiveCategory = 1
const navbarActiveSubCategory = 2

@observer
export class ClientExchangeRequestsViewRaw extends Component {
  viewModel = new ClientExchangeRequestsViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      paginationPage,
      rowsPerPage,
      modalNewRequest,
      modalEditRequest,
      modalCloseRequest,
      selectedRequests,
      onTriggerDrawer,
      onChangePagination,
      onChangeRowsPerPage,
      onClickCloseModal,
      onClickOpenModal,
    } = this.viewModel

    const {classes: classNames} = this.props
    const rowsHandlers = {
      edit: () => onClickOpenModal('modalEditRequest'),
      close: () => onClickOpenModal('modalCloseRequest'),
      onSelectRequest: this.onSelectRequest,
    }

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
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
              <div className={classNames.titleWrapper}>
                <Typography paragraph variant="h6">
                  {textConsts.mainTitle}
                </Typography>
              </div>
              <div className={classNames.placeRequestBtnWrapper}>
                <SuccessButton onClick={() => onClickOpenModal('modalNewRequest')}>
                  {textConsts.placeOrderBtn}
                </SuccessButton>
              </div>
              <div className={classNames.tableWrapper}>
                <Table
                  renderButtons={this.renderButtons}
                  currentPage={paginationPage}
                  data={requestsList}
                  handlerPageChange={onChangePagination}
                  handlerRowsPerPage={onChangeRowsPerPage}
                  pageCount={Math.ceil(requestsList.length / rowsPerPage)}
                  BodyRow={ExchangeRequestsBodyRow}
                  renderHeadRow={this.renderHeadRow()}
                  rowsPerPage={rowsPerPage}
                  rowsHandlers={rowsHandlers}
                  selectedRequests={selectedRequests}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={modalNewRequest} setOpenModal={() => onClickCloseModal('modalNewRequest')}>
          <Typography variant="h5">{textConsts.modalNewRequestTitle}</Typography>
          <RequestForm formFields={formFields} btnLabel={textConsts.modalBtnSendRequest} />
        </Modal>
        <Modal openModal={modalEditRequest} setOpenModal={() => onClickCloseModal('modalEditRequest')}>
          <Typography variant="h5">{textConsts.modalEditRequestTitle}</Typography>
          <RequestForm formFields={formFields} btnLabel={textConsts.modalBtnSaveRequest} />
        </Modal>
        <Modal openModal={modalCloseRequest} setOpenModal={() => onClickCloseModal('modalCloseRequest')}>
          <Typography variant="h5">{textConsts.modalCloseRequestTitle}</Typography>
          <Field
            multiline
            rows={4}
            rowsMax={6}
            className={classNames.multiline}
            containerClasses={classNames.field}
            label={textConsts.formCloseReasonLabel}
          />
          <Button
            disableElevation
            color="primary"
            variant="contained"
            onClick={() => onClickCloseModal('modalCloseRequest')}
          >
            {textConsts.modalBtnCloseRequest}
          </Button>
        </Modal>
      </React.Fragment>
    )
  }

  renderHeadRow = () => (
    <TableRow>
      <TableCell>#</TableCell>
      {headCells.map((item, index) => (
        <TableCell key={index}>{item.label}</TableCell>
      ))}
      <TableCell />
      <TableCell />
    </TableRow>
  )

  renderButtons = () => (
    <React.Fragment>
      <Button disableElevation variant="contained">
        {textConsts.myRequests}
      </Button>
    </React.Fragment>
  )
}

export const ClientExchangeRequestsView = withStyles(styles)(ClientExchangeRequestsViewRaw)
