import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Typography } from '@mui/material'

import { UserRole, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestProposalAcceptOrRejectResultForm } from '@components/forms/request-proposal-accept-or-reject-result-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { SelectShopsModal } from '@components/modals/select-shops-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { UserProfile } from '@components/user/users-views/user-profile-view/user-profile'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { styles } from './another-user-profile-view.style'

import { AnotherProfileViewModel } from './another-user-profile-view.model'

export const AnotherUserProfileViewRaw = props => {
  const [viewModel] = useState(() => new AnotherProfileViewModel({ history: props.history }))
  const { classes: styles } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div>
        {!viewModel.user &&
          (viewModel.requestStatus === loadingStatus.SUCCESS || viewModel.requestStatus === loadingStatus.FAILED) && (
            <Typography variant="h4" className={styles.noDataText}>
              {t(TranslationKey['No data']) + '...'}
            </Typography>
          )}

        {viewModel.user && (
          <UserProfile
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
        )}

        {viewModel.user &&
        [
          mapUserRoleEnumToKey[UserRole.RESEARCHER],
          mapUserRoleEnumToKey[UserRole.SUPERVISOR],
          mapUserRoleEnumToKey[UserRole.BUYER],
        ].includes(viewModel.user.role) ? (
          <>
            <Typography variant="h6" className={styles.title}>
              {t(TranslationKey['Active offers on the commodity exchange'])}
            </Typography>

            <CustomDataGrid
              sortModel={viewModel.sortModel}
              filterModel={viewModel.filterModel}
              columnVisibilityModel={viewModel.columnVisibilityModel}
              paginationModel={viewModel.paginationModel}
              rows={viewModel.currentData}
              rowHeight={100}
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
              density={viewModel.densityModel}
              columns={viewModel.columnsModel}
              loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
              onSortModelChange={viewModel.onChangeSortingModel}
              onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
              onPaginationModelChange={viewModel.onPaginationModelChange}
              onFilterModelChange={viewModel.onChangeFilterModel}
            />
          </>
        ) : null}
      </div>

      <Modal openModal={viewModel.showOrderModal} setOpenModal={() => viewModel.onTriggerOpenModal('showOrderModal')}>
        <OrderProductModal
          platformSettings={viewModel.platformSettings}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepers}
          requestStatus={viewModel.requestStatus}
          selectedProductsData={[viewModel.selectedProduct]}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onDoubleClickBarcode={viewModel.onDoubleClickBarcode}
          onSubmit={viewModel.onClickOrderNowBtn}
          onClickCancel={viewModel.onClickCancelBtn}
        />
      </Modal>

      <Modal
        openModal={viewModel.showSelectShopsModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSelectShopsModal')}
      >
        <SelectShopsModal
          isNotDisabled
          title={viewModel.confirmModalSettings.confirmTitle}
          message={viewModel.confirmModalSettings.confirmMessage}
          shops={viewModel.shopsData}
          onClickSuccessBtn={viewModel.onClickBuyProductBtn}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showSelectShopsModal')}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          isWarning={viewModel.confirmModalSettings?.isWarning}
          title={viewModel.confirmModalSettings.confirmTitle}
          message={viewModel.confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      {viewModel.showSuccessModal ? (
        <SuccessInfoModal
          // @ts-ignore
          openModal={viewModel.showSuccessModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessModal')}
          title={t(TranslationKey['Order successfully created!'])}
          successBtnText={t(TranslationKey.Ok)}
          onClickSuccessBtn={() => viewModel.onTriggerOpenModal('showSuccessModal')}
        />
      ) : null}

      {viewModel.showConfirmWorkResultFormModal ? (
        <RequestProposalAcceptOrRejectResultForm
          // @ts-ignore
          openModal={viewModel.showConfirmWorkResultFormModal}
          title={t(TranslationKey['Leave a review'])}
          rateLabel={t(TranslationKey['Rate the user'])}
          reviewLabel={t(TranslationKey['Leave a user review'])}
          confirmButtonText={t(TranslationKey.Confirm)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onSubmit={viewModel.onAcceptReview}
          onClose={() => viewModel.onTriggerOpenModal('showConfirmWorkResultFormModal')}
        />
      ) : null}
    </>
  )
}
export const AnotherUserProfileView = withStyles(observer(AnotherUserProfileViewRaw), styles)
