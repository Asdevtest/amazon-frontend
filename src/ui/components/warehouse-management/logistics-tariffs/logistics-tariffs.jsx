import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Typography} from '@mui/material'

import React, {useEffect, useRef} from 'react'

import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {AddOrEditDestinationForm} from '@components/forms/add-or-edit-destination-form'
import {AddOrEditLogisticTariffForm} from '@components/forms/add-or-edit-logistic-tariff-form'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {LogisticsTariffsModel} from './logistics-tariffs.model'
import {useClassNames} from './logistics-tariffs.style'

export const LogisticsTariffs = observer(() => {
  const {classes: classNames} = useClassNames()
  const history = useHistory()
  const gpModel = useRef(new LogisticsTariffsModel({history}))

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

    curPage,
    rowsPerPage,
    showAddOrEditLogisticTariffModal,
    showAddOrEditDestinationModal,
    confirmModalSettings,
    showConfirmModal,
    onChangeCurPage,
    onChangeRowsPerPage,
    onTriggerOpenModal,
    onClickAddBtn,
    onClickCancelBtn,

    setDataGridState,
    onChangeSortingModel,
    onChangeFilterModel,

    onSubmitCreateTariff,
    onSubmitEditTariff,
    onSubmitChangeDestination,
    onClickAddressBtn,
    onTriggerArchive,
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
        page={curPage}
        pageSize={rowsPerPage}
        rowsPerPageOptions={[15, 25, 50, 100]}
        rows={getCurrentData()}
        getRowHeight={() => 'auto'}
        components={{
          Toolbar: DataGridCustomToolbar,
          ColumnMenuIcon: FilterAltOutlinedIcon,
        }}
        density={densityModel}
        columns={columnsModel}
        loading={requestStatus === loadingStatuses.isLoading}
        onSortModelChange={onChangeSortingModel}
        onPageSizeChange={onChangeRowsPerPage}
        onPageChange={onChangeCurPage}
        onStateChange={setDataGridState}
        onFilterModelChange={model => onChangeFilterModel(model)}
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
