import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditWarehouseTariffForm } from '@components/forms/add-or-edit-warehouse-tariff-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useClassNames } from './warehouse-tariffs.style'

import { WarehouseTariffModel } from './warehouse-tariffs.model'

export const WarehouseTariffs = observer(() => {
  const { classes: classNames } = useClassNames()
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
    onClickAddBtn,
    onClickCancelBtn,

    onChangeSortingModel,
    onChangeFilterModel,
    onSubmitCreateTariff,
    onSubmitEditTariff,
    onColumnVisibilityModelChange,
    onChangePaginationModelChange,
  } = spModel.current

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.placeAddBtnWrapper}>
        <Button success className={classNames.placeAddBtn} onClick={() => onClickAddBtn()}>
          {t(TranslationKey.Add)}
        </Button>
      </div>

      <CustomDataGrid
        useResizeContainer
        localeText={getLocalizationByLanguageTag()}
        sortModel={sortModel}
        filterModel={filterModel}
        columnVisibilityModel={columnVisibilityModel}
        paginationModel={paginationModel}
        rows={getCurrentData()}
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
        loading={requestStatus === loadingStatuses.isLoading}
        onSortModelChange={onChangeSortingModel}
        onPaginationModelChange={onChangePaginationModelChange}
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

      <ConfirmationModal
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
    </div>
  )
})
