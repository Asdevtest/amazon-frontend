import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {SuccessButton} from '@components/buttons/success-button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'
import {CustomSearchRequestForm} from '@components/requests-and-request-proposals/requests/create-or-edit-forms/custom-search-request-form'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {FreelancerСustomRequestsViewModel} from './freelancer-custom-requests-view.model'
import {styles} from './freelancer-custom-requests-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').freelancerExchangeRequestsView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = 0

@observer
class FreelancerСustomRequestsViewRaw extends Component {
  viewModel = new FreelancerСustomRequestsViewModel({history: this.props.history})

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
      onTriggerDrawer,
      onClickAddBtn,

      drawerOpen,
      curPage,
      rowsPerPage,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerOpenModal,
      onClickTableRow,
      removeCustomSearchRequest,

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.FREELANCER}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={textConsts.appbarTitle} curUserRole={UserRole.FREELANCER}>
            <MainContent>
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
                  rowsPerPageOptions={[15, 25, 50, 100]}
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
                  onStateChange={setDataGridState}
                  onFilterModelChange={model => onChangeFilterModel(model)}
                  onRowDoubleClick={e => onClickTableRow(e.row)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showRequestForm} setOpenModal={() => onTriggerOpenModal('showRequestForm')}>
          <Typography variant="h5">{textConsts.modalNewRequestTitle}</Typography>
          <CustomSearchRequestForm
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
            removeCustomSearchRequest()
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const FreelancerСustomRequestsView = withStyles(styles)(FreelancerСustomRequestsViewRaw)
