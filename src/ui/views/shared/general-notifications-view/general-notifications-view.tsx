import { History } from 'history'
import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { NotificationTypes } from '@constants/notifications/notification-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserModel } from '@models/user-model'

import { IdeaCardsModal } from '@components/modals/idea-cards-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { checkIsBuyer, checkIsClient, checkIsFreelancer } from '@utils/checks'
import { throttle } from '@utils/throttle'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './general-notifications-view.style'

import { GeneralNotificationsViewModel } from './general-notifications-view.model'

interface GeneralNotificationsViewProps {
  history: History
}

export const GeneralNotificationsView: FC<GeneralNotificationsViewProps> = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new GeneralNotificationsViewModel({ history }), [])

  const currentUserRole = viewModel?.userInfo?.role || -1
  const isCurrentUserClient = checkIsClient(UserRoleCodeMap[currentUserRole])
  const isCurrentUserBuyer = checkIsBuyer(UserRoleCodeMap[currentUserRole])
  const isCurrentUserFreelancer = checkIsFreelancer(UserRoleCodeMap[currentUserRole])
  const currentSwitcherSettings = isCurrentUserClient
    ? [
        { label: t(TranslationKey.Box), value: NotificationTypes.box },
        { label: t(TranslationKey.Idea), value: NotificationTypes.idea },
        { label: t(TranslationKey.Order), value: NotificationTypes.order },
        { label: t(TranslationKey.Proposal), value: NotificationTypes.proposal },
        { label: t(TranslationKey.Request), value: NotificationTypes.request },
        { label: t(TranslationKey.Shop), value: NotificationTypes.shop },
        { label: t(TranslationKey.Launches), value: NotificationTypes.launch },
        { label: t(TranslationKey.All), value: undefined },
      ]
    : isCurrentUserBuyer
    ? [
        { label: t(TranslationKey.Idea), value: NotificationTypes.idea },
        { label: t(TranslationKey.Order), value: NotificationTypes.order },
        { label: t(TranslationKey.All), value: undefined },
      ]
    : [{ label: t(TranslationKey.All), value: undefined }]

  return (
    <div className="viewWrapper">
      <div className={styles.actionPanelWrapper}>
        {!isCurrentUserFreelancer ? (
          <CustomRadioButton
            size="large"
            buttonStyle="solid"
            options={currentSwitcherSettings}
            defaultValue={viewModel.curNotificationType}
            onChange={viewModel.onClickToChangeNotificationType}
          />
        ) : (
          <div />
        )}

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by ASIN, Title"
          onSearch={viewModel.onSearchSubmit}
        />

        <div className={styles.buttonsWrapper}>
          <CustomButton size="large" onClick={() => viewModel.toggleVariationHandler('isArchive')}>
            {viewModel.isArchive ? t(TranslationKey['To the actual']) : t(TranslationKey['Open archive'])}
          </CustomButton>

          {!viewModel.isArchive && (
            <CustomButton
              type="primary"
              size="large"
              disabled={!viewModel.selectedRows.length}
              onClick={throttle(() => viewModel.onClickReadButton())}
            >
              {t(TranslationKey.Read)}
            </CustomButton>
          )}
        </div>
      </div>

      <CustomDataGrid
        checkboxSelection
        disableRowSelectionOnClick
        rowSelectionModel={viewModel.selectedRows}
        rowCount={viewModel.rowCount}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        rows={viewModel.currentConvertedData}
        columns={viewModel.columnsModel}
        getRowHeight={() => 'auto'}
        density={viewModel.densityModel}
        pinnedColumns={viewModel.pinnedColumns}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
          columnMenu: viewModel.columnMenuSettings,
          toolbar: {
            columsBtnSettings: {
              columnsModel: viewModel.columnsModel,
              columnVisibilityModel: viewModel.columnVisibilityModel,
              onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
            },

            resetFiltersBtnSettings: {
              onClickResetFilters: viewModel.onClickResetFilters,
              isSomeFilterOn: viewModel.isSomeFilterOn,
            },

            sortSettings: {
              sortModel: viewModel.sortModel,
              columnsModel: viewModel.sortFields(),
              onSortModelChange: viewModel.onChangeSortingModel,
            },

            tablePresets: {
              showPresetsSelect: viewModel.showPresetsSelect,
              presetsTableData: viewModel.presetsTableData,
              handleChangeSelectState: viewModel.onChangeShowPresetsSelect,
              handleSetPresetActive: viewModel.handleSetPresetActive,
              handleCreateTableSettingsPreset: viewModel.handleCreateTableSettingsPreset,
              handleDeleteTableSettingsPreset: viewModel.handleDeleteTableSettingsPreset,
              handleUpdateTableSettingsPreset: viewModel.handleUpdateTableSettingsPreset,
              onClickAddQuickAccess: viewModel.onClickAddQuickAccess,
              onClickSaveRenamedPreset: viewModel.onClickSaveRenamedPreset,
            },
          },
        }}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onPinnedColumnsChange={viewModel.handlePinColumn}
      />

      {viewModel.showIdeaModal ? (
        <IdeaCardsModal
          // @ts-ignore
          openModal={viewModel.showIdeaModal}
          setOpenModal={() => viewModel.toggleVariationHandler('showIdeaModal')}
          updateData={() => {
            viewModel.getCurrentData()
            UserModel.getUserInfo()
          }}
          product={viewModel.currentProduct}
          productId={viewModel.currentProduct?._id}
          currentIdeaId={viewModel.currentIdeaId}
        />
      ) : null}
    </div>
  )
})
