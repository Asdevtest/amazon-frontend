import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'
import { MainContent } from '@components/layout/main-content'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { SupervisorReadyToCheckByClientViewModel } from './supervisor-ready-to-check-by-client-view.model'
import { styles } from './supervisor-ready-to-check-by-client-view.style'

export const SupervisorReadyToCheckByClientViewRaw = props => {
  const [viewModel] = useState(() => new SupervisorReadyToCheckByClientViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <MainContent>
        <div className={classNames.btnsWrapper}>
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
        <div className={classNames.datagridWrapper}>
          <MemoDataGrid
            checkboxSelection
            pagination
            useResizeContainer
            classes={{
              root: classNames.root,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
            }}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
            }}
            slotProps={{
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
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.getCurrentData()}
            rowHeight={100}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          />
        </div>
      </MainContent>

      <WarningInfoModal
        openModal={viewModel.showInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showInfoModal')}
        title={t(TranslationKey['Taken to Work'])}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showInfoModal')
        }}
      />
    </React.Fragment>
  )
}

export const SupervisorReadyToCheckByClientView = withStyles(observer(SupervisorReadyToCheckByClientViewRaw), styles)
