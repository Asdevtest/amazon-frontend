import {cx} from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Grid} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {adminOrdersBtnsConfig} from '@constants/table/tables-filter-btns-configs'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {MainContent} from '@components/layout/main-content'
import {Button} from '@components/shared/buttons/button'
import {MemoDataGrid} from '@components/shared/memo-data-grid'
import {SearchInput} from '@components/shared/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {AdminOrdersAllViewModel} from './admin-orders-views.model'
import {styles} from './admin-orders-views.style'

@observer
class AdminOrdersViewsRaw extends Component {
  viewModel = new AdminOrdersAllViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getOrdersByStatus(this.viewModel.activeSubCategory)
  }

  render() {
    const {
      currentData,
      requestStatus,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      rowsPerPage,
      curPage,
      activeSubCategory,
      onChangeCurPage,
      onChangeRowsPerPage,
      onSelectionModel,
      onChangeSubCategory,

      setDataGridState,
      onChangeSortingModel,
      onClickTableRow,
      onChangeFilterModel,
      onSearchSubmit,
      changeColumnsModel,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <div className={classNames.topHeaderBtnsWrapper}>
            <SearchInput
              inputClasses={classNames.searchInput}
              placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
              onSubmit={onSearchSubmit}
            />
          </div>
          <Grid container spacing={1} className={classNames.filterBtnWrapper}>
            {adminOrdersBtnsConfig()?.map((buttonConfig, index) => (
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
              useResizeContainer
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
              rows={currentData}
              rowHeight={100}
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
          </div>
        </MainContent>
      </React.Fragment>
    )
  }
}

export const AdminOrdersViews = withStyles(AdminOrdersViewsRaw, styles)
