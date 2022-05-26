import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'

import {t} from '@utils/translations'

import {GoodsDaysReportModel} from './goods-days-report.model'
import {styles} from './goods-days-report.style'

@observer
class GoodsDaysReportRaw extends Component {
  viewModel = new GoodsDaysReportModel({history: this.props.history, curShop: this.props.curShop})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      currentShop,
      shopsData,
      getCurrentData,
      sortModel,
      filterModel,
      requestStatus,
      densityModel,
      columnsModel,

      curPage,
      rowsPerPage,
      onChangeCurPage,
      onChangeRowsPerPage,

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      onClickShopBtn,
    } = this.viewModel
    const {classes: className} = this.props

    return (
      <React.Fragment>
        <div>
          <div className={className.shopsFiltersWrapper}>
            <Button
              disabled={!currentShop?._id}
              className={clsx({[className.selectedShopBtn]: !currentShop?._id})}
              variant="text"
              color="primary"
              onClick={onClickShopBtn}
            >
              {t(TranslationKey['All shops'])}
            </Button>

            {shopsData.map(shop => (
              <Button
                key={shop._id}
                disabled={currentShop?._id === shop._id}
                className={clsx(className.button, {[className.selectedShopBtn]: currentShop?._id === shop._id})}
                variant="text"
                color="primary"
                onClick={() => onClickShopBtn(shop)}
              >
                {shop.name}
              </Button>
            ))}
          </div>

          <div className={className.dataGridWrapper}>
            <DataGrid
              pagination
              useResizeContainer
              classes={{
                row: className.row,
              }}
              sortModel={sortModel}
              filterModel={filterModel}
              page={curPage}
              pageSize={rowsPerPage}
              rowsPerPageOptions={[15, 25, 50, 100]}
              rows={getCurrentData()}
              rowHeight={100}
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
              onFilterModelChange={model => onChangeFilterModel(model)}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export const GoodsDaysReport = withStyles(styles)(GoodsDaysReportRaw)
