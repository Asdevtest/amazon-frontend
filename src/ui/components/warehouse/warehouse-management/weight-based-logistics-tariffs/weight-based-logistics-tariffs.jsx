import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditDestinationForm } from '@components/forms/add-or-edit-destination-form'
import { AddOrEditWeightBasedLogisticsTariffForm } from '@components/forms/add-or-edit-weight-based-logistics-tariff-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './weight-based-logistics-tariffs.style'

import { LogisticsTariffsModel } from './weight-based-logistics-tariffs.model'

export const WeightBasedLogisticsTariffs = observer(() => {
  const { classes: styles } = useStyles()
  const history = useNavigate()
  const gpModel = useRef(new LogisticsTariffsModel({ history }))

  const {
    isArchive,
    storekeeperDestination,
    platformSettings,
    tariffToEdit,
    requestStatus,
    sortModel,
    filterModel,
    densityModel,
    columnsModel,
    destinationData,
    columnVisibilityModel,
    paginationModel,
    showAddOrEditLogisticTariffModal,
    showAddOrEditDestinationModal,
    confirmModalSettings,
    showConfirmModal,
    currentData,
    destinationsFavourites,
    logisticsTariffs,
    setDestinationsFavouritesItem,
    onTriggerOpenModal,
    onClickAddBtn,
    onChangeSortingModel,
    onChangeFilterModel,
    onSubmitCreateTariff,
    onSubmitEditTariff,
    onSubmitChangeDestination,
    onClickAddressBtn,
    onTriggerArchive,
    onColumnVisibilityModelChange,
    onPaginationModelChange,
  } = gpModel.current

  useEffect(() => {
    gpModel.current.loadData()
  }, [])

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.placeAddBtnWrapper}>
        <div className={styles.addressMainWrapper}>
          {storekeeperDestination ? (
            <div className={styles.addressSubWrapper}>
              <Typography className={styles.address}>{t(TranslationKey['Warehouse address']) + ':'}</Typography>

              <Typography
                className={styles.addressMain}
              >{`${storekeeperDestination.name} : ${storekeeperDestination.zipCode}, ${storekeeperDestination.country}, ${storekeeperDestination.state}, ${storekeeperDestination.city}, ${storekeeperDestination.address}`}</Typography>
            </div>
          ) : null}

          <Button onClick={() => onClickAddressBtn()}>
            {storekeeperDestination ? t(TranslationKey.Edit) : t(TranslationKey['Add Address'])}
          </Button>
        </div>

        {isArchive ? (
          <Button variant={ButtonVariant.OUTLINED} className={styles.openArchiveBtn} onClick={onTriggerArchive}>
            {t(TranslationKey['Current tariffs'])}
          </Button>
        ) : (
          <div className={styles.btnsWrapper}>
            <Button variant={ButtonVariant.OUTLINED} className={styles.openArchiveBtn} onClick={onTriggerArchive}>
              {t(TranslationKey['Open archive'])}
            </Button>
          </div>
        )}
      </div>

      <CustomDataGrid
        sortModel={sortModel}
        sortingMode="client"
        paginationMode="client"
        filterModel={filterModel}
        paginationModel={paginationModel}
        rows={currentData}
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
        columnVisibilityModel={columnVisibilityModel}
        loading={requestStatus === loadingStatus.IS_LOADING}
        onSortModelChange={onChangeSortingModel}
        onPaginationModelChange={onPaginationModelChange}
        onFilterModelChange={onChangeFilterModel}
        onColumnVisibilityModelChange={onColumnVisibilityModelChange}
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
          onClickAddBtn={onClickAddBtn}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={showAddOrEditLogisticTariffModal}
        setOpenModal={() => onTriggerOpenModal('showAddOrEditLogisticTariffModal')}
      >
        <AddOrEditWeightBasedLogisticsTariffForm
          sourceYuanToDollarRate={platformSettings?.yuanToDollarRate}
          tariffToEdit={tariffToEdit}
          logisticsTariffsData={logisticsTariffs}
          destinationData={destinationData}
          setDestinationsFavouritesItem={setDestinationsFavouritesItem}
          destinationsFavourites={destinationsFavourites}
          onCreateSubmit={onSubmitCreateTariff}
          onEditSubmit={onSubmitEditTariff}
          onClickClose={() => onTriggerOpenModal('showAddOrEditLogisticTariffModal')}
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
