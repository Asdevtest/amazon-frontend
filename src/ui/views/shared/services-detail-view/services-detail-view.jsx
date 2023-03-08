/* eslint-disable no-unused-vars */
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import InboxIcon from '@mui/icons-material/Inbox'
import {Typography, Paper, Alert} from '@mui/material'

import React, {Component, createRef} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {DataGridCustomColumnMenuComponent} from '@components/data-grid-custom-components/data-grid-custom-column-component'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {MyServicesInfo} from '@components/my-services/my-services-info'
import {Navbar} from '@components/navbar'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ServiceDetailsViewModel} from './services-detail-view.model'
import {styles} from './services-detail-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_MY_SERVICES
@observer
export class ServiceDetailsViewRaw extends Component {
  chatRef = createRef()
  viewModel = new ServiceDetailsViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      curPage,
      rowCount,
      rowsPerPage,
      drawerOpen,
      announcementData,
      currentData,
      filterModel,
      sortModel,
      columnVisibilityModel,
      densityModel,
      columnsModel,
      requestStatus,
      showConfirmModal,
      confirmModalSettings,

      onChangeFilterModel,
      onChangeCurPage,
      onChangeRowsPerPage,
      onChangeSortingModel,
      onTriggerDrawerOpen,
      onClickBackBtn,
      onClickEditBtn,
      onTriggerOpenModal,
      onClickCloseAnnouncementBtn,
      // onClickNeedCont,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          drawerOpen={drawerOpen}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey['My services'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <MyServicesInfo
                announcementData={announcementData}
                onClickEditBtn={onClickEditBtn}
                onClickBackBtn={onClickBackBtn}
                onClickCloseAnnouncementBtn={onClickCloseAnnouncementBtn}
              />

              <div className={classNames.dataGridWrapper}>
                <MemoDataGrid
                  disableVirtualization
                  pagination
                  useResizeContainer
                  localeText={getLocalizationByLanguageTag()}
                  classes={{
                    row: classNames.row,
                    root: classNames.root,
                    footerContainer: classNames.footerContainer,
                    footerCell: classNames.footerCell,
                    toolbarContainer: classNames.toolbarContainer,

                    iconSeparator: classNames.iconSeparator,
                    columnHeaderDraggableContainer: classNames.columnHeaderDraggableContainer,
                    columnHeaderTitleContainer: classNames.columnHeaderTitleContainer,
                  }}
                  rowCount={rowCount}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={currentData}
                  rowHeight={75}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                    ColumnMenuIcon: FilterAltOutlinedIcon,
                    ColumnMenu: DataGridCustomColumnMenuComponent,
                  }}
                  columnVisibilityModel={columnVisibilityModel}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onPageChange={onChangeCurPage}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onFilterModelChange={onChangeFilterModel}
                  // onStateChange={setFirstRowId}
                  // onRowDoubleClick={e => onClickOrder(e.row.originalData._id)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
        <ConfirmationModal
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          isWarning={confirmModalSettings.isWarning}
          title={confirmModalSettings.confirmTitle}
          message={confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onClickSuccessBtn={confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const ServiceDetailsView = withStyles(ServiceDetailsViewRaw, styles)
