import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {MemoDataGrid} from '@components/memo-data-grid'
import {WithSearchSelect} from '@components/selects/with-search-select'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
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
            <WithSearchSelect
              selectedItemName={
                (!currentShop?._id && t(TranslationKey['All shops'])) || (currentShop && currentShop.name)
              }
              data={shopsData.filter(shop => currentShop?.id !== shop._id)}
              searchFields={['name']}
              firstItems={
                <>
                  {currentShop?._id && (
                    <Button
                      disabled={!currentShop?._id}
                      // tooltipInfoContent={t(TranslationKey['Filter for sorting by store'])}
                      className={className.button}
                      variant="text"
                      color="primary"
                      onClick={onClickShopBtn}
                    >
                      {t(TranslationKey['All shops'])}
                    </Button>
                  )}
                </>
              }
              onClickSelect={shop => onClickShopBtn(shop)}
            />
          </div>

          <div className={className.dataGridWrapper}>
            <MemoDataGrid
              pagination
              useResizeContainer
              localeText={getLocalizationByLanguageTag()}
              classes={{
                row: className.row,
                root: className.root,
                footerContainer: className.footerContainer,
                footerCell: className.footerCell,
                toolbarContainer: className.toolbarContainer,
              }}
              sortModel={sortModel}
              filterModel={filterModel}
              page={curPage}
              pageSize={rowsPerPage}
              rowsPerPageOptions={[15, 25, 50, 100]}
              rows={getCurrentData()}
              // rowHeight={100}
              getRowHeight={() => 'auto'}
              components={{
                Toolbar: DataGridCustomToolbar,
                ColumnMenuIcon: FilterAltOutlinedIcon,
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

export const GoodsDaysReport = withStyles(GoodsDaysReportRaw, styles)
