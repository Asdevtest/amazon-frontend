import {DataGrid} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {ProductStatus} from '@constants/product-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {BuyerMyProductsViewModel} from './buyer-my-products-view.model'
import {styles} from './buyer-my-products-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MY_PRODUCTS

const attentionStatuses = [
  ProductStatus.TO_BUYER_FOR_RESEARCH,
  ProductStatus.BUYER_PICKED_PRODUCT,
  ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH,
  ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT,
]
@observer
export class BuyerMyProductsViewRaw extends Component {
  viewModel = new BuyerMyProductsViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      rowCount,
      requestStatus,
      currentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      drawerOpen,
      curPage,
      rowsPerPage,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerDrawerOpen,
      onClickTableRow,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      onSearchSubmit,
    } = this.viewModel
    const {classes: classNames} = this.props

    const getRowClassName = params =>
      attentionStatuses.includes(params.row.statusForAttention) && classNames.attentionRow

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey['My products'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.headerWrapper}>
                <SearchInput placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])} onSubmit={onSearchSubmit} />
              </div>

              <DataGrid
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
                getRowClassName={getRowClassName}
                sortingMode="server"
                paginationMode="server"
                rowCount={rowCount}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={currentData}
                rowHeight={100}
                components={{
                  Toolbar: DataGridCustomToolbar,
                }}
                density={densityModel}
                columns={columnsModel}
                loading={requestStatus === loadingStatuses.isLoading}
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

export const BuyerMyProductsView = withStyles(BuyerMyProductsViewRaw, styles)
