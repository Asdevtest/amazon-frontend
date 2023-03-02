/* eslint-disable no-unused-vars */
import InboxIcon from '@mui/icons-material/Inbox'
import {Typography, Paper, Alert} from '@mui/material'

import React, {Component, createRef} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {MyServicesInfo} from '@components/my-services/my-services-info'
import {Navbar} from '@components/navbar'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ServiceDetailsViewModel} from './services-detail-view.model'
import {styles} from './services-detail-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_MY_REQUESTS
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
      rowCount,
      drawerOpen,
      announcementData,

      onTriggerDrawerOpen,
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
          <Appbar title={t(TranslationKey['My request'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <MyServicesInfo announcementData={announcementData} />

              <div className={classNames.dataGridWrapper}>
                {/* <MemoDataGrid
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
                  }}
                  rowCount={rowCount}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={currentData}
                  // rowHeight={100}
                  getRowHeight={() => 'auto'}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                    ColumnMenuIcon: FilterAltOutlinedIcon,
                    ColumnMenu: DataGridCustomColumnMenuComponent,
                  }}
                  columnVisibilityModel={columnVisibilityModel}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onFilterModelChange={onChangeFilterModel}
                  onColumnVisibilityModelChange={onColumnVisibilityModelChange}
                  onStateChange={setFirstRowId}
                  onRowDoubleClick={e => onClickOrder(e.row.originalData._id)}
                /> */}
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ServiceDetailsView = withStyles(ServiceDetailsViewRaw, styles)
