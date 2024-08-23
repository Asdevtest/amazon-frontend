import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { styles } from './buyer-ideas-notifications-view.style'

import { BuyerIdeasNotificationsViewModel } from './buyer-ideas-notifications-view.model'

export const BuyerIdeasNotificationsViewRaw = props => {
  const [viewModel] = useState(() => new BuyerIdeasNotificationsViewModel({ history: props.history }))
  const { classes: styles } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.handleArchive}>
        {viewModel.isArchived ? t(TranslationKey['New notifications']) : t(TranslationKey['Open archive'])}
      </Button>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.getCurrentData()}
          rowHeight={120}
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
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onRowDoubleClick={e => viewModel.setCurrentOpenedBox(e.row.originalData)}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>
    </>
  )
}

export const BuyerIdeasNotificationsView = withStyles(observer(BuyerIdeasNotificationsViewRaw), styles)
