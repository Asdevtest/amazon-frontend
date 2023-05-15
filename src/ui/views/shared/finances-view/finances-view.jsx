import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/statuses/loading-statuses'

import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {MainContent} from '@components/layout/main-content'
import {MemoDataGrid} from '@components/shared/memo-data-grid'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'

import {FinancesViewModel} from './finances-view.model'
import {styles} from './finances-view.style'

@observer
class FinancesViewRaw extends Component {
  viewModel = new FinancesViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.getPayments(this.viewModel.activeSubCategory)
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,
      rowsPerPage,
      curPage,
      onChangeCurPage,
      onChangeRowsPerPage,
      onSelectionModel,

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      changeColumnsModel,
    } = this.viewModel
    const {classes: classNames} = this.props

    const getRowClassName = params =>
      params.row.sum < 0 ? classNames.redRow : params.row.sum > 0 && classNames.greenRow

    return (
      <React.Fragment>
        <MainContent>
          <MemoDataGrid
            pagination
            useResizeContainer
            classes={{
              root: classNames.root,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
              filterForm: classNames.filterForm,
            }}
            localeText={getLocalizationByLanguageTag()}
            getRowClassName={getRowClassName}
            sortModel={sortModel}
            filterModel={filterModel}
            page={curPage}
            pageSize={rowsPerPage}
            rowsPerPageOptions={[15, 25, 50, 100]}
            rows={getCurrentData()}
            rowHeight={75}
            components={{
              Toolbar: DataGridCustomToolbar,
              ColumnMenuIcon: FilterAltOutlinedIcon,
            }}
            density={densityModel}
            columns={columnsModel}
            loading={requestStatus === loadingStatuses.isLoading}
            componentsProps={{
              toolbar: {
                columsBtnSettings: {columnsModel, changeColumnsModel},
              },
            }}
            onSelectionModelChange={newSelection => {
              onSelectionModel(newSelection[0])
            }}
            onSortModelChange={onChangeSortingModel}
            onPageSizeChange={onChangeRowsPerPage}
            onPageChange={onChangeCurPage}
            onStateChange={setDataGridState}
            onFilterModelChange={model => onChangeFilterModel(model)}
          />
        </MainContent>
      </React.Fragment>
    )
  }
}

export const FinancesView = withStyles(FinancesViewRaw, styles)
