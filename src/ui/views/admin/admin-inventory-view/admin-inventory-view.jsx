import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Navbar} from '@components/navbar'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {AdminInventoryViewModel} from './admin-inventory-view.model'
import {styles} from './admin-inventory-view.style'

@observer
export class AdminInventoryViewRaw extends Component {
  viewModel = new AdminInventoryViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getDataGridState()
    this.viewModel.getProducts()
  }

  render() {
    const {
      // getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      requestStatus,
      drawerOpen,
      curPage,
      rowsPerPage,
      currentData,
      onChangeCurPage,
      onChangeRowsPerPage,
      onSelectionModel,
      onTriggerDrawer,
      setDataGridState,
      onChangeSortingModel,
      onClickTableRow,
      onChangeFilterModel,
      onSearchSubmit,
    } = this.viewModel

    const activeCategory = navBarActiveCategory.NAVBAR_INVENTORY
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar activeCategory={activeCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey.Inventory)}>
            <MainContent>
              <div className={classNames.topHeaderBtnsWrapper}>
                <SearchInput
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
                  onSubmit={onSearchSubmit}
                />
              </div>
              <MemoDataGrid
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
                density={densityModel}
                columns={columnsModel}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowHeight={100}
                rowsPerPageOptions={[15, 25, 50, 100]}
                loading={requestStatus === loadingStatuses.isLoading}
                components={{
                  Toolbar: DataGridCustomToolbar,
                  ColumnMenuIcon: FilterAltOutlinedIcon,
                }}
                rows={currentData}
                onSelectionModelChange={newSelection => {
                  onSelectionModel(newSelection[0])
                }}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onStateChange={setDataGridState}
                onRowDoubleClick={e => onClickTableRow(e.row)}
                onFilterModelChange={model => onChangeFilterModel(model)}
              />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const AdminInventoryView = withStyles(AdminInventoryViewRaw, styles)
