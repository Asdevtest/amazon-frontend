import { History } from 'history'
import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { NotificationTypes } from '@constants/notifications/notification-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserModel } from '@models/user-model'

import { IdeaCardsModal } from '@components/modals/idea-cards-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher, ISwitcherSettings } from '@components/shared/custom-switcher/custom-switcher'
import { SearchInput } from '@components/shared/search-input'

import { checkIsBuyer, checkIsClient, checkIsFreelancer } from '@utils/checks'
import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './general-notifications-view.style'

import { GeneralNotificationsViewModel } from './general-notifications-view.model'

interface GeneralNotificationsViewProps {
  history: History
}

export const GeneralNotificationsView: FC<GeneralNotificationsViewProps> = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new GeneralNotificationsViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const currentUserRole = viewModel?.userInfo?.role || -1
  const isCurrentUserClient = checkIsClient(UserRoleCodeMap[currentUserRole])
  const isCurrentUserBuyer = checkIsBuyer(UserRoleCodeMap[currentUserRole])
  const isCurrentUserFreelancer = checkIsFreelancer(UserRoleCodeMap[currentUserRole])

  const searchPlaceholderText = isCurrentUserClient
    ? `, ${t(TranslationKey['Box ID'])}, ${t(TranslationKey['Request ID'])}`
    : isCurrentUserFreelancer
    ? `, ${t(TranslationKey['Request ID'])}`
    : ''
  const currentSwitcherSettings: ISwitcherSettings[] = isCurrentUserClient
    ? [
        { label: () => t(TranslationKey.Box), value: NotificationTypes.box },
        { label: () => t(TranslationKey.Idea), value: NotificationTypes.idea },
        { label: () => t(TranslationKey.Order), value: NotificationTypes.order },
        { label: () => t(TranslationKey.Proposal), value: NotificationTypes.proposal },
        { label: () => t(TranslationKey.Request), value: NotificationTypes.request },
        { label: () => t(TranslationKey.Shop), value: NotificationTypes.shop },
        { label: () => t(TranslationKey.All), value: undefined },
      ]
    : isCurrentUserBuyer
    ? [
        { label: () => t(TranslationKey.Idea), value: NotificationTypes.idea },
        { label: () => t(TranslationKey.Order), value: NotificationTypes.order },
        { label: () => t(TranslationKey.All), value: undefined },
      ]
    : [{ label: () => t(TranslationKey.All), value: undefined }]

  return (
    <div className={styles.root}>
      <div className={styles.actionPanelWrapper}>
        {!isCurrentUserFreelancer ? (
          <CustomSwitcher
            switchMode="medium"
            condition={viewModel.curNotificationType}
            switcherSettings={currentSwitcherSettings}
            changeConditionHandler={viewModel.onClickToChangeNotificationType}
          />
        ) : (
          <div />
        )}

        <SearchInput
          inputClasses={styles.searchInput}
          value={viewModel.searchValue}
          placeholder={`${t(TranslationKey['Search by ASIN, Title']) + searchPlaceholderText}`}
          onSubmit={viewModel.onSearchSubmit}
        />

        <div className={styles.buttonsWrapper}>
          <Button variant={ButtonVariant.OUTLINED} onClick={() => viewModel.toggleVariationHandler('isArchive')}>
            {viewModel.isArchive ? t(TranslationKey['To the actual']) : t(TranslationKey['Open archive'])}
          </Button>

          {!viewModel.isArchive && (
            <Button disabled={!viewModel.selectedRowIds.length} onClick={() => viewModel.onClickReadButton()}>
              {t(TranslationKey.Read)}
            </Button>
          )}
        </div>
      </div>

      <div className={styles.datagridWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          rowSelectionModel={viewModel.selectedRowIds}
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.notificationsData}
          columns={viewModel.columnsModel}
          getRowHeight={() => 'auto'}
          density="compact"
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
          onFilterModelChange={viewModel.onChangeFilterModel}
          onRowSelectionModelChange={viewModel.onSelectionModel}
        />
      </div>

      {viewModel.showIdeaModal ? (
        <IdeaCardsModal
          // @ts-ignore
          openModal={viewModel.showIdeaModal}
          setOpenModal={() => viewModel.toggleVariationHandler('showIdeaModal')}
          updateData={() => {
            viewModel.getUserNotifications()
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
