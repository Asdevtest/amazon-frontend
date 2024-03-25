import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { loadingStatuses } from '@typings/enums/loading-status'

import { useStyles } from './buyer-search-supplier-by-supervisor-view.style'

import { BuyerSearchSupplierBySupervisorModel } from './buyer-search-supplier-by-supervisor-view.model'

export const BuyerSearchSupplierBySupervisorView = observer(props => {
  const [viewModel] = useState(() => new BuyerSearchSupplierBySupervisorModel({ history: props.history }))
  const { classes: styles } = useStyles()

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div>
        <div className={styles.btnsWrapper}>
          <Button
            disabled={viewModel.selectedRowIds.length === 0}
            tooltipInfoContent={t(TranslationKey['Assign several supplier search tasks to a Buyer'])}
            onClick={viewModel.onPickupSomeItems}
          >
            {t(TranslationKey['Take on the work of the selected'])}
          </Button>
        </div>
        <div className={styles.datagridWrapper}>
          <CustomDataGrid
            checkboxSelection
            useResizeContainer
            disableRowSelectionOnClick
            sortingMode="client"
            paginationMode="client"
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
            columnVisibilityModel={viewModel.columnVisibilityModel}
            localeText={getLocalizationByLanguageTag()}
            paginationModel={viewModel.paginationModel}
            rows={viewModel.getCurrentData()}
            rowHeight={80}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onPaginationModelChange}
          />
        </div>
      </div>

      {viewModel.showInfoModal ? (
        <WarningInfoModal
          // @ts-ignore
          openModal={viewModel.showInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showInfoModal')}
          title={t(TranslationKey['Taken to Work'])}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => viewModel.onTriggerOpenModal('showInfoModal')}
        />
      ) : null}
    </>
  )
})
