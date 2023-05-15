import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {MainContent} from '@components/layout/main-content'
import {Button} from '@components/shared/buttons/button'
import {MemoDataGrid} from '@components/shared/memo-data-grid'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {BuyerIdeasNotificationsViewModel} from './buyer-ideas-notifications-view.model'
import {styles} from './buyer-ideas-notifications-view.style'

@observer
class BuyerIdeasNotificationsViewRaw extends Component {
  viewModel = new BuyerIdeasNotificationsViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      requestStatus,
      getCurrentData,
      sortModel,
      isArchived,
      filterModel,
      densityModel,
      columnsModel,
      rowsPerPage,
      curPage,
      onChangeCurPage,
      onChangeRowsPerPage,
      setCurrentOpenedBox,
      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      handleArchive,
      changeColumnsModel,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <Button variant="outlined" className={classNames.archiveHandler} onClick={handleArchive}>
            {isArchived ? t(TranslationKey['New notifications']) : t(TranslationKey['Open archive'])}
          </Button>

          <div className={classNames.tableWrapper}>
            <MemoDataGrid
              pagination
              useResizeContainer
              disableVirtualization
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
              rows={getCurrentData()}
              // getRowHeight={() => 'auto'}
              rowHeight={120}
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
              onSelectionModelChange={onSelectionModel}
              onSortModelChange={onChangeSortingModel}
              onPageSizeChange={onChangeRowsPerPage}
              onPageChange={onChangeCurPage}
              onStateChange={setDataGridState}
              onRowDoubleClick={e => setCurrentOpenedBox(e.row.originalData)}
              onFilterModelChange={model => onChangeFilterModel(model)}
            />
          </div>
        </MainContent>
      </React.Fragment>
    )
  }
}

export const BuyerIdeasNotificationsView = withStyles(BuyerIdeasNotificationsViewRaw, styles)
