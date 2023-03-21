import {cx} from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Button} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {
  ProductStatus,
  ProductStatusByCode,
  ProductStatusByKey,
  productStatusTranslateKey,
} from '@constants/product-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Navbar} from '@components/navbar'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'

import {SupervisorProductsViewModel} from './supervisor-products-view.model'
import {styles} from './supervisor-products-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MY_PRODUCTS

const allowProductStatuses = [
  `${ProductStatusByKey[ProductStatus.DEFAULT]}`,
  `${ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT]}`,
  `${ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]}`,
  `${ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH]}`,
  `${ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER]}`,
  `${ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT]}`,
  `${ProductStatusByKey[ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR]}`,
  `${ProductStatusByKey[ProductStatus.RESEARCHER_FOUND_SUPPLIER]}`,
  `${ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE]}`,
  `${ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND]}`,
]

const attentionStatuses = [
  ProductStatus.BUYER_FOUND_SUPPLIER,
  ProductStatus.NEW_PRODUCT,
  ProductStatus.RESEARCHER_FOUND_SUPPLIER,
  ProductStatus.CHECKED_BY_SUPERVISOR,

  ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
  ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,

  ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR,
  ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER,
  ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
  ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
  ProductStatus.RESEARCHER_CREATED_PRODUCT,
]

@observer
class SupervisorProductsViewRaw extends Component {
  viewModel = new SupervisorProductsViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      nameSearchValue,
      requestStatus,
      currentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      drawerOpen,
      curPage,
      rowsPerPage,

      currentFilterStatus,

      onTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickTableRow,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      onChangeNameSearchValue,
      onClickStatusFilterButton,
    } = this.viewModel
    const {classes: classNames} = this.props

    const getRowClassName = params =>
      attentionStatuses.includes(params.row.statusForAttention) && classNames.attentionRow
    // attentionStatuses.includes(params.row.originalData.status) && classNames.attentionRow

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey['My products'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.headerWrapper}>
                {Object.keys({
                  ...getObjectFilteredByKeyArrayWhiteList(ProductStatusByCode, allowProductStatuses),
                }).map((status, statusIndex) => (
                  <Button
                    key={statusIndex}
                    variant="text"
                    // disabled={Number(statusIndex) === Number(currentFilterStatus)}
                    className={cx(classNames.selectStatusFilterButton, {
                      [classNames.selectedStatusFilterButton]: Number(status) === Number(currentFilterStatus),
                    })}
                    onClick={() => onClickStatusFilterButton(status)}
                  >
                    {t(productStatusTranslateKey(ProductStatusByCode[status]))}
                  </Button>
                ))}

                <div className={classNames.searchInputWrapper}>
                  <SearchInput
                    inputClasses={classNames.searchInput}
                    value={nameSearchValue}
                    placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
                    onChange={onChangeNameSearchValue}
                  />
                </div>
              </div>
              <div className={classNames.dataGridWrapper}>
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
                  getRowClassName={getRowClassName}
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
                  onSelectionModelChange={newSelection => {
                    onSelectionModel(newSelection[0])
                  }}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onStateChange={setDataGridState}
                  onRowDoubleClick={e => onClickTableRow(e.row)}
                  onFilterModelChange={onChangeFilterModel}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const SupervisorProductsView = withStyles(SupervisorProductsViewRaw, styles)
