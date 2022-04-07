import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {useEffect, useRef} from 'react'

import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'

import {SuccessButton} from '@components/buttons/success-button/success-button'
import {AddOrEditLogisticTariffForm} from '@components/forms/add-or-edit-logistic-tariff-form'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {LogisticsTariffsModel} from './logistics-tariffs.model'
import {useClassNames} from './logistics-tariffs.style'

const textConsts = getLocalizedTexts(texts, 'ru').groupPermissions

export const LogisticsTariffs = observer(() => {
  const classNames = useClassNames()
  const history = useHistory()
  const gpModel = useRef(new LogisticsTariffsModel({history}))

  useEffect(() => {
    gpModel.current.loadData()
  }, [])

  const {
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
  } = gpModel.current

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.placeAddBtnWrapper}>
        <SuccessButton onClick={() => onClickAddBtn()}>{textConsts.addBtn}</SuccessButton>
      </div>

      <DataGrid
        pagination
        useResizeContainer
        sortModel={sortModel}
        filterModel={filterModel}
        page={curPage}
        pageSize={rowsPerPage}
        rowsPerPageOptions={[15, 25, 50, 100]}
        rows={getCurrentData()}
        rowHeight={120}
        components={{
          Toolbar: GridToolbar,
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
        openModal={showAddOrEditLogisticTariffModal}
        setOpenModal={() => onTriggerOpenModal('showAddOrEditLogisticTariffModal')}
      >
        <AddOrEditLogisticTariffForm
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
        title={textConsts.confirmTitle}
        message={confirmModalSettings.message}
        successBtnText={textConsts.yesBtn}
        cancelBtnText={textConsts.noBtn}
        onClickSuccessBtn={confirmModalSettings.onClickSuccess}
        onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
      />
    </div>
  )
})
