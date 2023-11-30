import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Paper } from '@mui/material'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ResearcherAddProductForm } from '@components/forms/reasearcher-add-product-form'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './researcher-products-view.style'

import { ResearcherProductsViewModel } from './researcher-products-view.model'

export const ResearcherProductsViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new ResearcherProductsViewModel({
        history: props.history,
        location: props.location,
      }),
  )
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div>
        <Paper className={classNames.card}>
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
        </Paper>
        <div className={classNames.tableWrapper}>
          <CustomDataGrid
            useResizeContainer
            sortingMode="client"
            paginationMode="client"
            localeText={getLocalizationByLanguageTag()}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            rows={viewModel.getCurrentData()}
            rowHeight={60}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            slotProps={{
              baseTooltip: {
                title: t(TranslationKey.Filter),
              },
              toolbar: {
                columsBtnSettings: {
                  columnsModel: viewModel.columnsModel,
                  columnVisibilityModel: viewModel.columnVisibilityModel,
                  onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
                },
              },
            }}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onRowDoubleClick={e => viewModel.onClickTableRow(e.row)}
            onFilterModelChange={viewModel.onChangeFilterModel}
          />
        </div>
      </div>

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
