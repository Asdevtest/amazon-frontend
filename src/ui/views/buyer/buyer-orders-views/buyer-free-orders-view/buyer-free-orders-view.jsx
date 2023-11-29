import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { TwoVerticalChoicesModal } from '@components/modals/two-vertical-choices-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './buyer-free-orders-view.style'

import { BuyerFreeOrdersViewModel } from './buyer-free-orders-view.model'

export const BuyerFreeOrdersView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new BuyerFreeOrdersViewModel({ history }))

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
            disabled={viewModel.selectedRowIds.length === 0}
            onClick={viewModel.onPickupSomeItems}
          >
            {t(TranslationKey['Take on the work of the selected'])}
          </Button>
        </div>

        <div className={styles.dataGridWrapper}>
          <CustomDataGrid
            checkboxSelection
            useResizeContainer
            disableRowSelectionOnClick
            sortingMode="client"
            paginationMode="client"
            localeText={getLocalizationByLanguageTag()}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            rows={viewModel.currentData}
            getRowHeight={() => 'auto'}
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
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onPaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
            onRowSelectionModelChange={viewModel.onSelectionModel}
          />
        </div>
      </div>

      <TwoVerticalChoicesModal
        tooltipFirstButton={t(TranslationKey['Go to the order and open the "Edit order" window'])}
        tooltipSecondButton={t(TranslationKey['Stay in "Free Orders"'])}
        openModal={viewModel.showTwoVerticalChoicesModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showTwoVerticalChoicesModal')}
        title={t(TranslationKey['Order picked up'])}
        topBtnText={t(TranslationKey['Go to order'])}
        bottomBtnText={t(TranslationKey['Continue to work with free orders'])}
        onClickTopBtn={() => viewModel.goToMyOrders()}
        onClickBottomBtn={viewModel.onClickContinueWorkButton}
      />

      <WarningInfoModal
        openModal={viewModel.showWarningModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningModal')}
        title={viewModel.warningTitle}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => viewModel.onTriggerOpenModal('showWarningModal')}
      />
    </React.Fragment>
  )
})
