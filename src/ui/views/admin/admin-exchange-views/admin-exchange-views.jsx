import {cx} from '@emotion/css'
import {Grid} from '@mui/material'
import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {adminExchangeBtnsConfig} from '@constants/tables-filter-btns-configs'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {AdminExchangeViewModel} from './admin-exchange-views.model'
import {styles} from './admin-exchange-views.style'

const activeCategory = navBarActiveCategory.NAVBAR_EXCHANGE

@observer
class AdminExchangeViewsRaw extends Component {
  viewModel = new AdminExchangeViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      activeSubCategory,
      drawerOpen,
      curPage,
      rowsPerPage,
      requestStatus,
      onChangeCurPage,
      onChangeRowsPerPage,
      onChangeSubCategory,
      onTriggerDrawer,
      setDataGridState,
      onChangeSortingModel,
      onClickTableRow,
      onChangeFilterModel,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
          onChangeSubCategory={onChangeSubCategory}
        />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey['Commodity exchange'])}>
            <MainContent>
              <Grid container spacing={2} className={classNames.filterBtnWrapper}>
                {adminExchangeBtnsConfig()?.map((buttonConfig, index) => (
                  <Grid key={buttonConfig.status} item>
                    <Button
                      key={index}
                      variant={'text'}
                      className={cx(classNames.filterBtn, {
                        [classNames.currentFilterBtn]: activeSubCategory === index,
                      })}
                      onClick={() => onChangeSubCategory(index)}
                    >
                      {buttonConfig.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <div className={classNames.datagridWrapper}>
                <DataGrid
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
                  rowHeight={100}
                  rows={getCurrentData()}
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
                  onRowDoubleClick={e => onClickTableRow(e.row)}
                  onFilterModelChange={model => onChangeFilterModel(model)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const AdminExchangeViews = withStyles(AdminExchangeViewsRaw, styles)
