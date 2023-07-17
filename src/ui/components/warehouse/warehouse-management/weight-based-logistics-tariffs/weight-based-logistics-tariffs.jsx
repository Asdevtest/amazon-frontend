import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Typography } from '@mui/material'

import React, { useEffect, useRef } from 'react'

import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { AddOrEditDestinationForm } from '@components/forms/add-or-edit-destination-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { LogisticsTariffsModel } from './weight-based-logistics-tariffs.model'
import { useClassNames } from './weight-based-logistics-tariffs.style'
import { AddOrEditWeightBasedLogisticsTariffForm } from '@components/forms/add-or-edit-weight-based-logistics-tariff-form'

export const WeightBasedLogisticsTariffs = observer(() => {
  const { classes: classNames } = useClassNames()
  const history = useHistory()
  const gpModel = useRef(new LogisticsTariffsModel({ history }))

  const {
    isArchive,
    storekeeperDestination,

    yuanToDollarRate,
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

      <MemoDataGrid
        disableVirtualization
        pagination
        useResizeContainer
        propsToRerender={{ isArchive }}
        classes={{
          root: classNames.root,
          footerContainer: classNames.footerContainer,
          footerCell: classNames.footerCell,
          toolbarContainer: classNames.toolbarContainer,
          filterForm: classNames.filterForm,
        }}
        localeText={getLocalizationByLanguageTag()}
        sortModel={sortModel}
        filterModel={filterModel}
        paginationModel={paginationModel}
        pageSizeOptions={[15, 25, 50, 100]}
        rows={currentData}
        getRowHeight={() => 'auto'}
        slots={{
          toolbar: DataGridCustomToolbar,
          columnMenuIcon: FilterAltOutlinedIcon,
        }}
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
        loading={requestStatus === loadingStatuses.isLoading}
        onSortModelChange={onChangeSortingModel}
        onPaginationModelChange={onChangePaginationModelChange}
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
        />
      </Modal>

      <Modal
        openModal={showAddOrEditLogisticTariffModal}
        setOpenModal={() => onTriggerOpenModal('showAddOrEditLogisticTariffModal')}
      >
        <AddOrEditWeightBasedLogisticsTariffForm
          sourceYuanToDollarRate={yuanToDollarRate}
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
      <ConfirmationModal
        isWarning={confirmModalSettings.isWarning}
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
