import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { GridRowModel } from '@mui/x-data-grid'

import { UserRole, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestProposalAcceptOrRejectResultForm } from '@components/forms/request-proposal-accept-or-reject-result-form'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { UserProfile } from '@components/user/users-views/user-profile-view/user-profile'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { HistoryType } from '@typings/types/history'

import { useStyles } from './another-user-profile-view.style'

import { AnotherProfileViewModel } from './another-user-profile-view.model'

export const AnotherUserProfileView = observer(({ history }: { history: HistoryType }) => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new AnotherProfileViewModel(history), [])

  return (
    <div className="viewWrapper">
      {viewModel.user ? (
        <UserProfile
          // @ts-ignore
          isAnotherUser
          reviews={viewModel.reviews}
          user={viewModel.user}
          curUser={viewModel.userInfo}
          headerInfoData={viewModel.headerInfoData}
          tabReview={viewModel.tabReview}
          tabHistory={viewModel.tabHistory}
          onClickWriteBtn={viewModel.onClickWriteBtn}
          onClickReview={() => viewModel.onTriggerOpenModal('showConfirmWorkResultFormModal')}
        />
      ) : (
        <p className={styles.title}>{t(TranslationKey['No data']) + '...'}</p>
      )}

      {viewModel.user &&
      [
        mapUserRoleEnumToKey[UserRole.RESEARCHER],
        mapUserRoleEnumToKey[UserRole.SUPERVISOR],
        mapUserRoleEnumToKey[UserRole.BUYER],
      ].includes(viewModel.user?.role) ? (
        <>
          <p className={styles.title}>{t(TranslationKey['Active offers on the commodity exchange'])}</p>

          <div className={styles.tableWrapper}>
            <CustomDataGrid
              sortModel={viewModel.sortModel}
              filterModel={viewModel.filterModel}
              pinnedColumns={viewModel.pinnedColumns}
              paginationModel={viewModel.paginationModel}
              columnVisibilityModel={viewModel.columnVisibilityModel}
              rows={viewModel.currentData}
              getRowHeight={() => 'auto'}
              getRowId={({ _id }: GridRowModel) => _id}
              slotProps={{
                baseTooltip: {
                  title: t(TranslationKey.Filter),
                },
                toolbar: {
                  resetFiltersBtnSettings: {
                    onClickResetFilters: viewModel.onClickResetFilters,
                    isSomeFilterOn: viewModel.isSomeFilterOn,
                  },
                  columsBtnSettings: {
                    columnsModel: viewModel.columnsModel,
                    columnVisibilityModel: viewModel.columnVisibilityModel,
                    onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
                  },
                  sortSettings: {
                    sortModel: viewModel.sortModel,
                    columnsModel: viewModel.columnsModel,
                    onSortModelChange: viewModel.onChangeSortingModel,
                  },
                },
              }}
              rowCount={viewModel.rowCount}
              columns={viewModel.columnsModel}
              loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
              onPinnedColumnsChange={viewModel.handlePinColumn}
              onSortModelChange={viewModel.onChangeSortingModel}
              onFilterModelChange={viewModel.onChangeFilterModel}
              onPaginationModelChange={viewModel.onPaginationModelChange}
              onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            />
          </div>
        </>
      ) : null}

      {viewModel.showConfirmWorkResultFormModal ? (
        <RequestProposalAcceptOrRejectResultForm
          // @ts-ignore
          openModal={viewModel.showConfirmWorkResultFormModal}
          title={t(TranslationKey['Leave a review'])}
          rateLabel={t(TranslationKey['Rate the user'])}
          reviewLabel={t(TranslationKey['Leave a user review'])}
          confirmButtonText={t(TranslationKey.Confirm)}
          cancelBtnText={t(TranslationKey.Close)}
          onSubmit={viewModel.onAcceptReview}
          onClose={() => viewModel.onTriggerOpenModal('showConfirmWorkResultFormModal')}
        />
      ) : null}
    </div>
  )
})
