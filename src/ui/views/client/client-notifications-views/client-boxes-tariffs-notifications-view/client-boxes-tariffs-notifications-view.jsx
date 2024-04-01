import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { BoxViewForm } from '@components/forms/box-view-form'
import { SelectStorekeeperAndTariffForm } from '@components/forms/select-storkeeper-and-tariff-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { styles } from './client-boxes-tariffs-notifications-view.style'

import { ClientBoxesTariffsNotificationsViewModel } from './client-boxes-tariffs-notifications-view.model'

export const ClientBoxesTariffsNotificationsViewRaw = props => {
  const [viewModel] = useState(() => new ClientBoxesTariffsNotificationsViewModel({ history: props.history }))
  const { classes: styles } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div className={styles.tableWrapper}>
        <CustomDataGrid
          useResizeContainer
          localeText={getLocalizationByLanguageTag()}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.getCurrentData()}
          getRowHeight={() => 'auto'}
          density={viewModel.densityModel}
          sortingMode="client"
          paginationMode="client"
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
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
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onRowDoubleClick={e => viewModel.setCurrentOpenedBox(e.row.originalData)}
          onFilterModelChange={viewModel.onChangeFilterModel}
        />
      </div>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={viewModel.confirmModalSettings?.isWarning}
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => viewModel.confirmModalSettings.onClickOkBtn()}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      <Modal
        openModal={viewModel.showSelectionStorekeeperAndTariffModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')}
      >
        <SelectStorekeeperAndTariffForm
          inNotifications
          showCheckbox
          storekeepers={viewModel.storekeepersData.filter(el => el._id === viewModel.curBox?.storekeeper._id)}
          curStorekeeperId={viewModel.curBox?.storekeeperId}
          curTariffId={viewModel.curBox?.logicsTariffId}
          currentDestinationId={viewModel.curBox?.destination?._id}
          currentVariationTariffId={viewModel.curBox?.variationTariff?._id}
          onSubmit={viewModel.onClickConfirmTarrifChangeBtn}
        />
      </Modal>

      <Modal
        openModal={viewModel.showBoxViewModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
      >
        <BoxViewForm
          userInfo={viewModel.userInfo}
          box={viewModel.curBox}
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
          onSubmitChangeFields={viewModel.onSubmitChangeBoxFields}
          onClickHsCode={viewModel.onClickHsCode}
        />
      </Modal>

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
}

export const ClientBoxesTariffsNotificationsView = withStyles(observer(ClientBoxesTariffsNotificationsViewRaw), styles)
