import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditWarehouseTariffForm } from '@components/forms/add-or-edit-warehouse-tariff-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './warehouse-tariffs.style'

import { WarehouseTariffModel } from './warehouse-tariffs.model'

export const WarehouseTariffs = observer(() => {
  const { classes: styles } = useStyles()
  const history = useHistory()
  const spModel = useRef(new WarehouseTariffModel({ history }))

  useEffect(() => {
    spModel.current.loadData()
  }, [])

  const {
    tariffToEdit,
    requestStatus,
    getCurrentData,
    sortModel,
    filterModel,
    densityModel,
    columnsModel,

    columnVisibilityModel,
    paginationModel,
    confirmModalSettings,
    showAddOrEditWarehouseTariffModal,
    showConfirmModal,
    onTriggerOpenModal,
    onClickCancelBtn,

    onChangeSortingModel,
    onChangeFilterModel,
    onSubmitCreateTariff,
    onSubmitEditTariff,
    onColumnVisibilityModelChange,
    onPaginationModelChange,
  } = spModel.current

  return (
    <div className={styles.mainWrapper}>
      <CustomDataGrid
        useResizeContainer
        localeText={getLocalizationByLanguageTag()}
        sortModel={sortModel}
        filterModel={filterModel}
        columnVisibilityModel={columnVisibilityModel}
        paginationModel={paginationModel}
        rows={getCurrentData()}
        sortingMode="client"
        paginationMode="client"
        getRowHeight={() => 'auto'}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
          toolbar: {
            columsBtnSettings: {
              columnsModel,
              columnVisibilityModel,
              onColumnVisibilityModelChange,
            },
          },
        }}
        density={densityModel}
        columns={columnsModel}
        loading={requestStatus === loadingStatuses.IS_LOADING}
        onSortModelChange={onChangeSortingModel}
        onPaginationModelChange={onPaginationModelChange}
        onFilterModelChange={onChangeFilterModel}
      />
      <Modal
        openModal={showAddOrEditWarehouseTariffModal}
        setOpenModal={() => onTriggerOpenModal('showAddOrEditWarehouseTariffModal')}
      >
        <AddOrEditWarehouseTariffForm
          tariffToEdit={tariffToEdit}
          onCloseModal={() => onClickCancelBtn()}
          onCreateSubmit={onSubmitCreateTariff}
          onEditSubmit={onSubmitEditTariff}
        />
      </Modal>

      {showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={confirmModalSettings?.isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={confirmModalSettings.onClickSuccess}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}
    </div>
  )
})
