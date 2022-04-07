import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {useEffect, useRef} from 'react'

import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'

import {SuccessButton} from '@components/buttons/success-button/success-button'
import {AddOrEditWarehouseTariffForm} from '@components/forms/add-or-edit-warehouse-tariff-form'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {WarehouseTariffModel} from './warehouse-tariffs.model'
import {useClassNames} from './warehouse-tariffs.style'

const textConsts = getLocalizedTexts(texts, 'ru').singlePermissions

export const WarehouseTariffs = observer(() => {
  const classNames = useClassNames()
  const history = useHistory()
  const spModel = useRef(new WarehouseTariffModel({history}))

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

    curPage,
    rowsPerPage,
    confirmModalSettings,
    showAddOrEditWarehouseTariffModal,
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
  } = spModel.current

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
        rowHeight={70}
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
