import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { Typography } from '@mui/material'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditDestinationForm } from '@components/forms/add-or-edit-destination-form'
import { AddOrEditLogisticTariffForm } from '@components/forms/add-or-edit-logistic-tariff-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useClassNames } from './logistics-tariffs.style'

import { LogisticsTariffsModel } from './logistics-tariffs.model'

export const LogisticsTariffs = observer(() => {
  const { classes: classNames } = useClassNames()
  const history = useHistory()
  const gpModel = useRef(new LogisticsTariffsModel({ history }))

  const {
    isArchive,
    storekeeperDestination,

    yuanToDollarRate,
    tariffToEdit,
    requestStatus,
    getCurrentData,
    sortModel,
    filterModel,
    densityModel,
    columnsModel,

    columnVisibilityModel,
    paginationModel,
    showAddOrEditLogisticTariffModal,
    showAddOrEditDestinationModal,
    confirmModalSettings,
    showConfirmModal,
    onTriggerOpenModal,
    onClickAddBtn,
    onClickCancelBtn,

    onChangeSortingModel,
    onChangeFilterModel,

    onSubmitCreateTariff,
    onSubmitEditTariff,
    onSubmitChangeDestination,
    onClickAddressBtn,
    onTriggerArchive,
    onColumnVisibilityModelChange,
    onChangePaginationModelChange,
  } = gpModel.current

  useEffect(() => {
    gpModel.current.loadData()
  }, [])

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.placeAddBtnWrapper}>
        <div className={classNames.addressMainWrapper}>
          {storekeeperDestination ? (
            <div className={classNames.addressSubWrapper}>
              <Typography className={classNames.address}>{t(TranslationKey['Warehouse address']) + ':'}</Typography>

              <Typography
                className={classNames.addressMain}
              >{`${storekeeperDestination.name} : ${storekeeperDestination.zipCode}, ${storekeeperDestination.country}, ${storekeeperDestination.state}, ${storekeeperDestination.city}, ${storekeeperDestination.address}`}</Typography>
            </div>
          ) : null}

          <Button onClick={() => onClickAddressBtn()}>
            {storekeeperDestination ? t(TranslationKey.Edit) : t(TranslationKey['Add Address'])}
          </Button>
        </div>

        {isArchive ? (
          <Button variant="outlined" className={classNames.openArchiveBtn} onClick={onTriggerArchive}>
            {t(TranslationKey['Current tariffs'])}
          </Button>
        ) : (
          <div className={classNames.btnsWrapper}>
            <Button variant="outlined" className={classNames.openArchiveBtn} onClick={onTriggerArchive}>
              {t(TranslationKey['Open archive'])}
            </Button>

            <Button
              success
              tooltipInfoContent={t(TranslationKey['Add a new rate'])}
              className={classNames.placeAddBtn}
              onClick={() => onClickAddBtn()}
            >
              {t(TranslationKey.Add)}
            </Button>
          </div>
        )}
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
        loading={requestStatus === loadingStatuses.IS_LOADING}
        onSortModelChange={onChangeSortingModel}
        onPaginationModelChange={onChangePaginationModelChange}
        onFilterModelChange={onChangeFilterModel}
      />

      <Modal
        openModal={showAddOrEditDestinationModal}
        setOpenModal={() => onTriggerOpenModal('showAddOrEditDestinationModal')}
      >
        <AddOrEditDestinationForm
          destinationToEdit={storekeeperDestination}
          onCloseModal={() => onTriggerOpenModal('showAddOrEditDestinationModal')}
          onCreateSubmit={onSubmitChangeDestination}
          onEditSubmit={onSubmitChangeDestination}
        />
      </Modal>

      <Modal
        openModal={showAddOrEditLogisticTariffModal}
        setOpenModal={() => onTriggerOpenModal('showAddOrEditLogisticTariffModal')}
      >
        <AddOrEditLogisticTariffForm
          sourceYuanToDollarRate={yuanToDollarRate}
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
