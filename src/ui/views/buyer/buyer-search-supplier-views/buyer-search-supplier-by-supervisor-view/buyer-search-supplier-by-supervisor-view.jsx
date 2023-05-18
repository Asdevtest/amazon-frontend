import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { MainContent } from '@components/layout/main-content'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { BuyerSearchSupplierBySupervisorModel } from './buyer-search-supplier-by-supervisor-view.model'
import { styles } from './buyer-search-supplier-by-supervisor-view.style'

export const BuyerSearchSupplierBySupervisorViewRaw = props => {
  const [viewModel] = useState(() => new BuyerSearchSupplierBySupervisorModel({ history: props.history }))
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
            disabled={viewModel.selectedRowIds.length === 0}
            tooltipInfoContent={t(TranslationKey['Assign several supplier search tasks to a Buyer'])}
            onClick={viewModel.onPickupSomeItems}
          >
            {t(TranslationKey['Take on the work of the selected'])}
          </Button>
        </div>
        <div className={classNames.datagridWrapper}>
          <MemoDataGrid
            disableVirtualization
            checkboxSelection
            pagination
            useResizeContainer
            classes={{
              root: classNames.root,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
            }}
            components={{
              Toolbar: DataGridCustomToolbar,
              ColumnMenuIcon: FilterAltOutlinedIcon,
            }}
            componentsProps={{
              toolbar: {
                columsBtnSettings: {
                  columnsModel: viewModel.columnsModel,
                  changeColumnsModel: viewModel.changeColumnsModel,
                },
              },
            }}
            localeText={getLocalizationByLanguageTag()}
            rowsPerPageOptions={[15, 25, 50, 100]}
            rows={viewModel.getCurrentData()}
            rowHeight={100}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onSelectionModelChange={newSelection => viewModel.onSelectionModel(newSelection)}
            onStateChange={viewModel.setDataGridState}
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

export const BuyerSearchSupplierBySupervisorView = withStyles(observer(BuyerSearchSupplierBySupervisorViewRaw), styles)
