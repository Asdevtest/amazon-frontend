import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './goods-days-report.style'

import { GoodsDaysReportModel } from './goods-days-report.model'

export const GoodsDaysReport = observer(({ history, curShop }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new GoodsDaysReportModel({ history, curShop }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div className={styles.shopsFiltersWrapper}>
        <WithSearchSelect
          selectedItemName={
            (!viewModel.currentShop?._id && t(TranslationKey['All shops'])) ||
            (viewModel.currentShop && viewModel.currentShop.name)
          }
          data={viewModel.shopsData.filter(shop => viewModel.currentShop?.id !== shop._id)}
          searchFields={['name']}
          firstItems={
            viewModel.currentShop?._id && (
              <Button
                disabled={!viewModel.currentShop?._id}
                className={styles.button}
                variant="text"
                color="primary"
                onClick={viewModel.onClickShopBtn}
              >
                {t(TranslationKey['All shops'])}
              </Button>
            )
          }
          onClickSelect={shop => viewModel.onClickShopBtn(shop)}
        />
      </div>

      <div className={styles.btnsWrapper}>
        <Button
          danger
          disabled={!viewModel.selectedRows.length || viewModel.selectedRows.length > 1}
          variant="contained"
          onClick={viewModel.onClickDeleteBtn}
        >
          {t(TranslationKey.Remove)}
        </Button>
      </div>

      <div className={styles.dataGridWrapper}>
        <CustomDataGrid
          useResizeContainer
          checkboxSelection
          disableRowSelectionOnClick
          sortingMode="client"
          paginationMode="client"
          localeText={getLocalizationByLanguageTag()}
          rowSelectionModel={viewModel.selectedRows}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.getCurrentData()}
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
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>

      <SuccessInfoModal
        openModal={viewModel.showSuccessModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessModal')}
        title={viewModel.successModalText}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => {
          viewModel.onTriggerOpenModal('showSuccessModal')
        }}
      />

      <ConfirmationModal
        isWarning={viewModel.confirmModalSettings?.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={viewModel.confirmModalSettings.title}
        message={viewModel.confirmModalSettings.message}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
        onClickCancelBtn={viewModel.confirmModalSettings.onCancel}
      />
    </React.Fragment>
  )
})
