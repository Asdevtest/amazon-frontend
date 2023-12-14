import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './supervisor-ready-to-check-for-idea.style'

import { SupervisorReadyToCheckForIdeaViewModel } from './supervisor-ready-to-check-for-idea.model'

export const SupervisorReadyToCheckForIdeaView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new SupervisorReadyToCheckForIdeaViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div>
        <div className={styles.btnsWrapper}>
          <Button
            color="primary"
            variant="contained"
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
            useResizeContainer
            disableRowSelectionOnClick
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
            rows={viewModel.currentData}
            rowHeight={100}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          />
        </div>
      </div>

      <WarningInfoModal
        openModal={viewModel.showInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showInfoModal')}
        title={t(TranslationKey['Taken to Work'])}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => viewModel.onTriggerOpenModal('showInfoModal')}
      />
    </React.Fragment>
  )
})
