import React, {Component} from 'react'

import {Button, Typography} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'
import {ProductSearchRequestForm} from '@components/requests/create-or-edit-forms/product-search-request-form'

import {onStateChangeHandler} from '@utils/for-data-grid'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/clientAvatar.jpg'
import {ClientRequestsProductsViewModel} from './client-requests-products-view.model'
import {styles} from './client-requests-products-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientExchangeRequestsView

const navbarActiveCategory = 3
const navbarActiveSubCategory = 0

@observer
export class ClientRequestsProductsViewRaw extends Component {
  viewModel = new ClientRequestsProductsViewModel({history: this.props.history})

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

      showConfirmModal,
      showRequestForm,
      requestFormSettings,
      modalCloseRequest,
      onTriggerDrawer,
      onClickCloseModal,
      onClickAddBtn,

      drawerOpen,
      curPage,
      rowsPerPage,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerOpenModal,
      onClickTableRow,
      removeProductSearchRequest,

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
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
              <div className={classNames.titleWrapper}>
                <Typography paragraph variant="h6">
                  {textConsts.mainTitle}
                </Typography>
              </div>
              <div className={classNames.placeRequestBtnWrapper}>
                <SuccessButton onClick={() => onClickAddBtn()}>{textConsts.placeOrderBtn}</SuccessButton>
              </div>
              <div className={classNames.tableWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  autoHeight
                  classes={{
                    row: classNames.row,
                  }}
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
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onStateChange={e => onStateChangeHandler(e, setDataGridState)}
                  onFilterModelChange={model => onChangeFilterModel(model)}
                  onRowDoubleClick={e => onClickTableRow(e.row)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showRequestForm} setOpenModal={() => onTriggerOpenModal('showRequestForm')}>
          <Typography variant="h5">{textConsts.modalNewRequestTitle}</Typography>
          <ProductSearchRequestForm
            setOpenModal={() => onTriggerOpenModal('showRequestForm')}
            requestToEdit={requestFormSettings.request}
            isEdit={requestFormSettings.isEdit}
            onSubmit={requestFormSettings.onSubmit}
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
            removeProductSearchRequest()
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />

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
}

export const ClientRequestsProductsView = withStyles(styles)(ClientRequestsProductsViewRaw)
