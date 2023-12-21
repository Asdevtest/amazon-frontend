import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { Checkbox, Typography } from '@mui/material'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditShopForm } from '@components/forms/add-or-edit-shop-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './shops-view.style'

import { ShopsViewModel } from './shops-view.model'

export const ShopsView = observer(props => {
  const { classes: styles, cx } = useStyles()
  const [viewModel] = useState(
    () =>
      new ShopsViewModel({
        history: props.history,
        onChangeTabIndex: props.onChangeTabIndex,
        tabsValues: props.tabsValues,
        onChangeCurShop: props.onChangeCurShop,
        openModal: props.openModal,
      }),
  )

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div className={styles.buttonBox}>
        <Button
          tooltipInfoContent={t(TranslationKey['Open the window to add a store'])}
          onClick={viewModel.onClickAddBtn}
        >
          {t(TranslationKey['Add shop'])}
        </Button>

        <Button
          disabled={!viewModel.rowSelectionModel.length || viewModel.requestStatus === loadingStatuses.isLoading}
          onClick={viewModel.updateShops}
        >
          {t(TranslationKey.Update)}
        </Button>

        <div className={styles.shopsSelect}>
          <WithSearchSelect
            checkbox
            notCloseOneClick
            firstItems={
              <Button className={styles.filterBtn} variant="text" onClick={viewModel.handleSelectAllShops}>
                <div className={cx(styles.fieldNamesWrapper, styles.fieldNamesWrapperWithCheckbox)}>
                  <Checkbox
                    checked={viewModel.selectedShopFilters.length === viewModel.shopsData.length}
                    color="primary"
                  />
                  <Typography className={styles.fieldName}>{t(TranslationKey['All shops'])}</Typography>
                </div>
              </Button>
            }
            currentShops={viewModel.selectedShopFilters}
            data={viewModel.shopsData}
            searchFields={['name']}
            selectedItemName={t(TranslationKey['All shops'])}
            onClickSelect={viewModel.onSelectShopFilter}
          />
        </div>
      </div>

      <div className={styles.tabledWrapper}>
        <CustomDataGrid
          useResizeContainer
          checkboxSelection
          disableRowSelectionOnClick
          sortingMode="client"
          paginationMode="client"
          localeText={getLocalizationByLanguageTag()}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.getCurrentData()}
          getRowHeight={() => 90}
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
          rowSelectionModel={viewModel.rowSelectionModel}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>

      <Modal
        openModal={viewModel.showAddOrEditShopModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditShopModal')}
      >
        <AddOrEditShopForm
          shopToEdit={viewModel.selectedShop}
          onCloseModal={() => viewModel.onTriggerOpenModal('showAddOrEditShopModal')}
          onSubmit={viewModel.onSubmitShopForm}
        />
      </Modal>

      <WarningInfoModal
        isWarning={viewModel.warningInfoModalSettings.isWarning}
        openModal={viewModel.showWarningModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningModal')}
        title={viewModel.warningInfoModalSettings.title}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showWarningModal')
        }}
      />

      <ConfirmationModal
        isWarning
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
