import {Alert, Typography} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'
import {CustomSearchRequestForm} from '@components/requests-and-request-proposals/requests/create-or-edit-forms/custom-search-request-form'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {MyRequestsViewModel} from './my-requests-view.model'
import {styles} from './my-requests-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_MY_REQUESTS

@observer
class MyRequestsViewRaw extends Component {
  viewModel = new MyRequestsViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
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

      acceptMessage,
      showAcceptMessage,
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
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey['My requests'])}>
            <MainContent>
              <div className={classNames.placeRequestBtnWrapper}>
                <Button
                  success
                  tooltipInfoContent={t(TranslationKey['Opens the form to create a request'])}
                  onClick={() => onClickAddBtn()}
                >
                  {t(TranslationKey['Create a request'])}
                </Button>
              </div>
              <div className={classNames.datagridWrapper}>
                <DataGrid
                  disableVirtualization
                  pagination
                  localeText={getLocalizationByLanguageTag()}
                  classes={{
                    row: classNames.row,
                    root: classNames.root,
                    footerContainer: classNames.footerContainer,
                    footerCell: classNames.footerCell,
                    toolbarContainer: classNames.toolbarContainer,
                  }}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={getCurrentData()}
                  rowHeight={100}
                  components={{
                    Toolbar: DataGridCustomToolbar,
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
          <Typography variant="h5">{t(TranslationKey['New request'])}</Typography>
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
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Are you sure you want to cancel the search request?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => {
            removeCustomSearchRequest()
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
        {acceptMessage && showAcceptMessage ? (
          <div className={classNames.acceptMessageWrapper}>
            <Alert elevation={5} severity="success">
              {acceptMessage}
            </Alert>
          </div>
        ) : null}
      </React.Fragment>
    )
  }
}

export const MyRequestsView = withStyles(MyRequestsViewRaw, styles)
