import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { ArchiveIcon } from '@components/shared/svg-icons'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './client-sent-batches-view.style'

import { ClientSentBatchesViewModel } from './client-sent-batches-view.model'

export const ClientSentBatchesView = observer(({ history }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new ClientSentBatchesViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div>
        <div className={styles.btnsWrapper}>
          <Button
            variant={ButtonVariant.OUTLINED}
            className={styles.openArchiveBtn}
            onClick={viewModel.onTriggerArchive}
          >
            {viewModel.isArchive ? t(TranslationKey['Actual batches']) : t(TranslationKey['Open archive'])}
          </Button>

          <SearchInput
            key={'client_batches_awaiting-batch_search_input'}
            inputClasses={styles.searchInput}
            value={viewModel.nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Title, Batch ID, Order ID'])}
            onSubmit={viewModel.onSearchSubmit}
          />

          <Button
            disabled={!viewModel.selectedBatches.length}
            variant={ButtonVariant.OUTLINED}
            className={styles.archiveAddBtn}
            onClick={viewModel.onClickTriggerArchOrResetProducts}
          >
            {viewModel.isArchive ? (
              t(TranslationKey['Relocate from archive'])
            ) : (
              <>
                {t(TranslationKey['Move to archive'])}
                {<ArchiveIcon />}
              </>
            )}
          </Button>
        </div>

        <div className={styles.boxesFiltersWrapper}>
          <CustomSwitcher
            switchMode={'medium'}
            condition={viewModel.currentStorekeeperId}
            switcherSettings={[
              ...viewModel.storekeepersData
                .filter(storekeeper => storekeeper.boxesCount !== 0)
                .sort((a, b) => a.name?.localeCompare(b.name))
                .map(storekeeper => ({ label: () => storekeeper.name, value: storekeeper._id })),
              { label: () => t(TranslationKey['All warehouses']), value: undefined },
            ]}
            changeConditionHandler={viewModel.onClickStorekeeperBtn}
          />
        </div>

        <div className={styles.datagridWrapper}>
          <CustomDataGrid
            useResizeContainer
            checkboxSelection
            disableRowSelectionOnClick
            localeText={getLocalizationByLanguageTag()}
            rowCount={viewModel.rowCount}
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
              columnMenu: viewModel.columnMenuSettings,

              toolbar: {
                resetFiltersBtnSettings: {
                  onClickResetFilters: viewModel.onClickResetFilters,
                  isSomeFilterOn: viewModel.isSomeFilterOn,
                },
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
            onFilterModelChange={viewModel.onChangeFilterModel}
            onRowDoubleClick={e => viewModel.setCurrentOpenedBatch(e.row.originalData._id)}
          />
        </div>
      </div>

      {viewModel.showBatchInfoModal ? (
        <BatchInfoModal
          // @ts-ignore
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          openModal={viewModel.showBatchInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBatchInfoModal')}
          batch={viewModel.curBatch}
          userInfo={viewModel.userInfo}
          patchActualShippingCostBatch={viewModel.patchActualShippingCostBatch}
          onSubmitChangeBoxFields={viewModel.onSubmitChangeBoxFields}
          onClickHsCode={viewModel.onClickHsCode}
        />
      ) : null}

      <Modal
        openModal={viewModel.showEditHSCodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
      >
        <EditHSCodeModal
          hsCodeData={viewModel.hsCodeData}
          onClickSaveHsCode={viewModel.onClickSaveHsCode}
          onCloseModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          isWarning={viewModel.confirmModalSettings?.isWarning}
          title={viewModel.confirmModalSettings.confirmTitle}
          message={viewModel.confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      {viewModel.showWarningInfoModal ? (
        <WarningInfoModal
          // @ts-ignore
          isWarning={viewModel.warningInfoModalSettings.isWarning}
          openModal={viewModel.showWarningInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
          title={viewModel.warningInfoModalSettings.title}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
        />
      ) : null}
    </>
  )
})
