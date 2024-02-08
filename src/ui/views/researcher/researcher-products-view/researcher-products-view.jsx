import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ResearcherAddProductForm } from '@components/forms/reasearcher-add-product-form'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { useStyles } from './researcher-products-view.style'

import { ResearcherProductsViewModel } from './researcher-products-view.model'

export const ResearcherProductsView = observer(props => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(
    () =>
      new ResearcherProductsViewModel({
        history: props.history,
        location: props.location,
      }),
  )

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div className={styles.card}>
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
      <div className={styles.tableWrapper}>
        <CustomDataGrid
          sortingMode="client"
          paginationMode="client"
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          rowHeight={60}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
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
    </>
  )
})
