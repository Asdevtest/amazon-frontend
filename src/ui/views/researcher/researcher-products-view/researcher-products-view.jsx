import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Paper} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {ResearcherAddProductForm} from '@components/forms/reasearcher-add-product-form'
import {MainContent} from '@components/layout/main-content'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {MemoDataGrid} from '@components/shared/memo-data-grid'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ResearcherProductsViewModel} from './researcher-products-view.model'
import {styles} from './researcher-products-view.style'

export const ResearcherProductsViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new ResearcherProductsViewModel({
        history: props.history,
        location: props.location,
      }),
  )
  const {classes: classNames} = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <MainContent>
        <Paper className={classNames.card}>
          <div className={classNames.formWrapper}>
            <ResearcherAddProductForm
              user={viewModel.user}
              formFields={viewModel.formFields}
              errorMsg={viewModel.error}
              reasonErrorMsg={viewModel.reasonError}
              chekedCode={viewModel.chekedCode}
              actionStatus={viewModel.actionStatus}
              onChangeFormFields={viewModel.onChangeFormFields}
              onClickCheckAndAddProductBtn={viewModel.onClickCheckAndAddProductBtn}
            />
          </div>
        </Paper>
        <div className={classNames.tableWrapper}>
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
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            page={viewModel.curPage}
            pageSize={viewModel.rowsPerPage}
            rowsPerPageOptions={[15, 25, 50, 100]}
            rows={viewModel.getCurrentData()}
            rowHeight={60}
            components={{
              Toolbar: DataGridCustomToolbar,
              ColumnMenuIcon: FilterAltOutlinedIcon,
            }}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            componentsProps={{
              toolbar: {
                columsBtnSettings: {
                  columnsModel: viewModel.columnsModel,
                  changeColumnsModel: viewModel.changeColumnsModel,
                },
              },
            }}
            onSelectionModelChange={newSelection => {
              viewModel.onSelectionModel(newSelection[0])
            }}
            onSortModelChange={viewModel.onChangeSortingModel}
            onPageSizeChange={viewModel.onChangeRowsPerPage}
            onPageChange={viewModel.onChangeCurPage}
            onStateChange={viewModel.setDataGridState}
            onRowDoubleClick={e => viewModel.onClickTableRow(e.row)}
            onFilterModelChange={model => viewModel.onChangeFilterModel(model)}
          />
        </div>
      </MainContent>

      <WarningInfoModal
        isWarning={viewModel.warningInfoModalSettings.isWarning}
        openModal={viewModel.showWarningInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
        title={viewModel.warningInfoModalSettings.title}
        btnText={t(TranslationKey.Close)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showWarningInfoModal')
        }}
      />
    </React.Fragment>
  )
}

export const ResearcherProductsView = withStyles(observer(ResearcherProductsViewRaw), styles)
