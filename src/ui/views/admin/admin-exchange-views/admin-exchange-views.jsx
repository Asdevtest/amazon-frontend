import {cx} from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Grid} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {adminExchangeBtnsConfig} from '@constants/table/tables-filter-btns-configs'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {Button} from '@components/shared/buttons/button'
import {MemoDataGrid} from '@components/shared/memo-data-grid'

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
      changeColumnsModel,
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
                  <Grid key={index} item>
                    <Button
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
                <MemoDataGrid
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
                    Toolbar: DataGridCustomToolbar,
                    ColumnMenuIcon: FilterAltOutlinedIcon,
                  }}
                  componentsProps={{
                    toolbar: {
                      columsBtnSettings: {columnsModel, changeColumnsModel},
                    },
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
