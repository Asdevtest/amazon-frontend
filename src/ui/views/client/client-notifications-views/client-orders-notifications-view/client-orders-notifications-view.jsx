import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './client-orders-notifications-view.style'

import { ClientOrdersNotificationsViewModel } from './client-orders-notifications-view.model'

export const ClientOrdersNotificationsView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ClientOrdersNotificationsViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div className={styles.tableWrapper}>
        <CustomDataGrid
          useResizeContainer
          localeText={getLocalizationByLanguageTag()}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rowCount={viewModel.rowCount}
          rows={viewModel.currentData}
          sortingMode="client"
          paginationMode="client"
          rowHeight={140}
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
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onRowDoubleClick={e => viewModel.onClickTableRow(e.row)}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>

      <ConfirmationModal
        // @ts-ignore
        isWarning={viewModel.confirmModalSettings?.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={viewModel.confirmModalSettings.message}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={() => viewModel.confirmModalSettings.onClickOkBtn()}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />
    </>
  )
})
