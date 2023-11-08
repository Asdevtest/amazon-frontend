import { History } from 'history'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { NotificationTypes } from '@constants/notifications/notification-type'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserModel } from '@models/user-model'

import { IdeaCardsModal } from '@components/modals/idea-cards-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher, ISwitcherSettings } from '@components/shared/custom-switcher/custom-switcher'
import { SearchInput } from '@components/shared/search-input'

import { checkIsBuyer, checkIsClient, checkIsFreelancer } from '@utils/checks'
import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useClassNames } from './general-notifications-view.styles'

import { GeneralNotificationsViewModel } from './general-notifications-view.model'

export const GeneralNotificationsView = observer(({ history }: { history: History }) => {
  const { classes: classNames, cx } = useClassNames()
  const [viewModel] = useState(
    () =>
      new GeneralNotificationsViewModel({
        history,
      }),
  )

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const currentUserRole = viewModel?.currentUser?.role || -1
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
    viewModel.languageTag && (
      <div className={classNames.root}>
        <div className={classNames.actionPanelWrapper}>
          {!isCurrentUserFreelancer ? (
            <CustomSwitcher
              switchMode={'medium'}
              condition={viewModel.curNotificationType}
              switcherSettings={currentSwitcherSettings}
              changeConditionHandler={viewModel.onClickToChangeNotificationType}
            />
          ) : (
            <div />
          )}

          <SearchInput
            inputClasses={cx(classNames.searchInput, {
              [classNames.searchInputClient]: isCurrentUserClient,
              [classNames.searchInputFreelancer]: isCurrentUserFreelancer,
            })}
            value={viewModel.searchValue}
            placeholder={`${t(TranslationKey['Search by ASIN, Title']) + searchPlaceholderText}`}
            onSubmit={viewModel.onSearchSubmit}
          />

          <div className={classNames.buttonsWrapper}>
            <Button
              className={cx(classNames.button, classNames.archiveButton)}
              variant="outlined"
              onClick={() => viewModel.toggleVariationHandler('isArchive')}
            >
              {viewModel.isArchive ? t(TranslationKey['To the actual']) : t(TranslationKey['Open archive'])}
            </Button>

            {!viewModel.isArchive && (
              <Button
                disabled={!viewModel.selectedRowIds.length}
                className={classNames.button}
                color="primary"
                onClick={() => viewModel.onClickReadButton()}
              >
                {t(TranslationKey.Read)}
              </Button>
            )}
          </div>
        </div>

        <div className={classNames.datagridWrapper}>
          <CustomDataGrid
            checkboxSelection
            useResizeContainer
            disableRowSelectionOnClick
            localeText={getLocalizationByLanguageTag()}
            rowSelectionModel={viewModel.selectedRowIds}
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.currentData}
            columns={viewModel.columnsModel}
            getRowHeight={() => 'auto'}
            density="compact"
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            slotProps={{
              // columnMenu: viewModel.columnMenuSettings,
              toolbar: {
                // resetFiltersBtnSettings: {
                //   onClickResetFilters: viewModel.onClickResetFilters,
                //   isSomeFilterOn: viewModel.isSomeFilterOn,
                // },
                columsBtnSettings: {
                  columnsModel: viewModel.columnsModel,
                  columnVisibilityModel: viewModel.columnVisibilityModel,
                  onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
                },
              },
            }}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
            // onRowDoubleClick={e => viewModel.setCurrentOpenedBatch(e.row.originalData._id)}
            onRowSelectionModelChange={viewModel.onSelectionModel}
          />
        </div>

        {viewModel.showIdeaModal && (
          <IdeaCardsModal
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
        )}
      </div>
    )
  )
})
