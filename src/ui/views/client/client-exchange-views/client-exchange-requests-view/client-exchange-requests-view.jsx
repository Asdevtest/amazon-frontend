import {Component} from 'react'

import {Button, TableCell, TableRow, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {clientExchangeRequestsViewTable, clientUsername} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

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
  state = {
    drawerOpen: false,
    paginationPage: 1,
    rowsPerPage: 5,
    modalNewRequest: false,
    modalEditRequest: false,
    modalCloseRequest: false,
    selectedIndex: null,
    selectedRequests: [],
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
    } = this.state
    const {classes: classNames} = this.props
    const rowsHandlers = {
      edit: () => this.onClickOpenModal('modalEditRequest'),
      close: () => this.onClickOpenModal('modalCloseRequest'),
      onSelectRequest: this.onSelectRequest,
    }

    return (
      <>
        <Navbar
          curUserRole={userRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
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
              <div className={classNames.titleWrapper}>
                <Typography paragraph variant="h6">
                  {textConsts.mainTitle}
                </Typography>
              </div>
              <div className={classNames.placeRequestBtnWrapper}>
                <SuccessButton onClick={() => this.onClickOpenModal('modalNewRequest')}>
                  {textConsts.placeOrderBtn}
                </SuccessButton>
              </div>
              <div className={classNames.tableWrapper}>
                <Table
                  buttons={this.renderButtons}
                  currentPage={paginationPage}
                  data={requestsList}
                  handlerPageChange={this.onChangePagination}
                  handlerRowsPerPage={this.onChangeRowsPerPage}
                  pageCount={Math.ceil(requestsList.length / rowsPerPage)}
                  BodyRow={ExchangeRequestsBodyRow}
                  renderHeadRow={this.renderHeadRow}
                  rowsPerPage={rowsPerPage}
                  rowsHandlers={rowsHandlers}
                  selectedRequests={selectedRequests}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={modalNewRequest} setOpenModal={() => this.onClickCloseModal('modalNewRequest')}>
          <Typography variant="h5">{textConsts.modalNewRequestTitle}</Typography>
          <RequestForm formFields={formFields} btnLabel={textConsts.modalBtnSendRequest} />
        </Modal>
        <Modal openModal={modalEditRequest} setOpenModal={() => this.onClickCloseModal('modalEditRequest')}>
          <Typography variant="h5">{textConsts.modalEditRequestTitle}</Typography>
          <RequestForm formFields={formFields} btnLabel={textConsts.modalBtnSaveRequest} />
        </Modal>
        <Modal openModal={modalCloseRequest} setOpenModal={() => this.onClickCloseModal('modalCloseRequest')}>
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
            onClick={() => this.onClickCloseModal('modalCloseRequest')}
          >
            {textConsts.modalBtnCloseRequest}
          </Button>
        </Modal>
      </>
    )
  }

  renderHeadRow = (
    <TableRow>
      <TableCell>#</TableCell>
      {headCells.map((item, index) => (
        <TableCell key={index}>{item.label}</TableCell>
      ))}
      <TableCell />
      <TableCell />
    </TableRow>
  )

  renderButtons = (
    <>
      <Button disableElevation variant="contained">
        {textConsts.myRequests}
      </Button>
    </>
  )

  onSelectRequest = (item, index) => {
    const {selectedRequests} = this.state
    const newSelectedRequests = [...selectedRequests]
    const findRequestIndex = selectedRequests.indexOf(index)
    if (findRequestIndex !== -1) {
      newSelectedRequests.splice(findRequestIndex, 1)
    } else {
      newSelectedRequests.push(index)
    }
    this.setState({selectedRequests: newSelectedRequests})
  }

  onChangeCategory = index => {
    this.setState({activeCategory: index})
  }

  onChangeSubCategory = index => {
    this.setState({activeSubCategory: index})
  }

  onClickPlaceRequestBtn = () => {
    const {drawerOpen} = this.state
    this.setState({drawerOpen: !drawerOpen})
  }

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

  onClickCloseModal = modalState => {
    this.setState({[modalState]: false})
  }
  onClickOpenModal = modalState => {
    this.setState({[modalState]: true})
  }
}

export const ClientExchangeRequestsView = withStyles(styles)(ClientExchangeRequestsViewRaw)
