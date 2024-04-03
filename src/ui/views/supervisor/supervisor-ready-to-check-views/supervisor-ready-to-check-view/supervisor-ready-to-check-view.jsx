import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './supervisor-ready-to-check-view.style'

import { SupervisorReadyToCheckViewModel } from './supervisor-ready-to-check-view.model'

export const SupervisorReadyToCheckView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new SupervisorReadyToCheckViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div>
        <div className={styles.btnsWrapper}>
          <Button
            tooltipInfoContent={t(TranslationKey['Assign several product cards to a Supervisor'])}
            disabled={viewModel.selectedRowIds.length === 0}
            onClick={viewModel.onPickupSomeItems}
          >
            {t(TranslationKey['Take on the work of the selected'])}
          </Button>
        </div>
        <div className={styles.datagridWrapper}>
          <CustomDataGrid
            checkboxSelection
            disableRowSelectionOnClick
            sortingMode="client"
            paginationMode="client"
            paginationModel={viewModel.paginationModel}
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
            rows={viewModel.currentData}
            rowHeight={100}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
            onPaginationModelChange={viewModel.onPaginationModelChange}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
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
