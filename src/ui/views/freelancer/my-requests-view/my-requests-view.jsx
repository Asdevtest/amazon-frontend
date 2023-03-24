/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Alert, Typography} from '@mui/material'

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
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'
import {CustomSearchRequestForm} from '@components/requests-and-request-proposals/requests/create-or-edit-forms/custom-search-request-form'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {getDistanceBetweenDatesInSeconds} from '@utils/date-time'
import {t} from '@utils/translations'

import {MyRequestsViewModel} from './my-requests-view.model'
import {styles} from './my-requests-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_MY_REQUESTS

@observer
class MyRequestsViewRaw extends Component {
  viewModel = new MyRequestsViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      requestStatus,
      currentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      showConfirmModal,
      showRequestForm,
      requestFormSettings,

      acceptMessage,
      showAcceptMessage,
      curPage,
      rowsPerPage,
      nameSearchValue,
      isRequestsAtWork,
      drawerOpen,

      onClickAddBtn,
      onTriggerDrawerOpen,
      onChangeNameSearchValue,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerOpenModal,
      onClickTableRow,
      removeCustomSearchRequest,
      onClickChangeCatigory,

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
    } = this.viewModel

    const {classes: classNames} = this.props

    const getCellClassName = params =>
      params.row.originalData.countProposalsByStatuses.waitedProposals &&
      params.field === 'waitedProposals' &&
      classNames.waitingCheckedBacklighting

    const getRowClassName = params => {
      if (getDistanceBetweenDatesInSeconds(params.row.originalData.timeoutAt) <= 86400 && isRequestsAtWork) {
        return classNames.redBorder
      } else if (getDistanceBetweenDatesInSeconds(params.row.originalData.timeoutAt) <= 172800 && isRequestsAtWork) {
        return classNames.yellowBorder
      }
    }

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey['My requests'])} history={history} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.placeRequestBtnWrapper}>
                <div />

                <SearchInput
                  inputClasses={classNames.searchInput}
                  placeholder={`${t(TranslationKey['Search by'])} ${t(TranslationKey.Title)}, ${t(
                    TranslationKey.ASIN,
                  )}`}
                  value={nameSearchValue}
                  onChange={onChangeNameSearchValue}
                />

                <Button
                  success
                  tooltipInfoContent={t(TranslationKey['Opens the form to create a request'])}
                  onClick={() => onClickAddBtn()}
                >
                  {t(TranslationKey['Create a request'])}
                </Button>
              </div>

              <div className={classNames.switchButtonWrapper}>
                <Button
                  variant={'text'}
                  className={cx(classNames.switchButton, {
                    [classNames.switchButtonBorder]: isRequestsAtWork,
                    [classNames.selectedSwitchButton]: isRequestsAtWork,
                  })}
                  onClick={() => onClickChangeCatigory(true)}
                >
                  {t(TranslationKey['Requests in progress'])}
                </Button>
                <Button
                  variant={'text'}
                  className={cx(classNames.switchButton, {
                    [classNames.switchButtonBorder]: !isRequestsAtWork,
                    [classNames.selectedSwitchButton]: !isRequestsAtWork,
                  })}
                  onClick={() => onClickChangeCatigory(false)}
                >
                  {t(TranslationKey['Completed requests'])}
                </Button>
              </div>

              <div className={classNames.datagridWrapper}>
                <MemoDataGrid
                  disableVirtualization
                  pagination
                  localeText={getLocalizationByLanguageTag()}
                  getCellClassName={getCellClassName}
                  getRowClassName={getRowClassName}
                  classes={{
                    row: classNames.row,
                    root: classNames.root,
                    footerContainer: classNames.footerContainer,
                    footerCell: classNames.footerCell,
                    toolbarContainer: classNames.toolbarContainer,

                    columnHeaderDraggableContainer: classNames.columnHeaderDraggableContainer,
                    columnHeaderTitleContainer: classNames.columnHeaderTitleContainer,
                  }}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={currentData}
                  rowHeight={100}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                    ColumnMenuIcon: FilterAltOutlinedIcon,
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
