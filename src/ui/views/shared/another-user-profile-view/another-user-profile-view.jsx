import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { mapUserRoleEnumToKey, UserRole } from '@constants/keys/user-roles'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { MainContent } from '@components/layout/main-content'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { SelectShopsModal } from '@components/modals/select-shops-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { UserProfile } from '@components/user/users-views/user-profile-view/user-profile'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { AnotherProfileViewModel } from './another-user-profile-view.model'
import { styles } from './another-user-profile-view.style'

export const AnotherUserProfileViewRaw = props => {
  const [viewModel] = useState(() => new AnotherProfileViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <MainContent>
        {!viewModel.user &&
          (viewModel.requestStatus === loadingStatuses.success ||
            viewModel.requestStatus === loadingStatuses.failed) && (
            <Typography variant="h4" className={classNames.noDataText}>
              {t(TranslationKey['No data']) + '...'}
            </Typography>
          )}

        {viewModel.user && (
          <UserProfile
            isAnotherUser
            user={viewModel.user}
            curUser={viewModel.curUser}
            headerInfoData={viewModel.headerInfoData}
            tabReview={viewModel.tabReview}
            tabHistory={viewModel.tabHistory}
            onClickWriteBtn={viewModel.onClickWriteBtn}
          />
        )}

        {viewModel.user &&
        [
          mapUserRoleEnumToKey[UserRole.RESEARCHER],
          mapUserRoleEnumToKey[UserRole.SUPERVISOR],
          mapUserRoleEnumToKey[UserRole.BUYER],
        ].includes(viewModel.user.role) ? (
          <>
            <Typography variant="h6" className={classNames.title}>
              {t(TranslationKey['Active offers on the commodity exchange'])}
            </Typography>

            <MemoDataGrid
              pagination
              useResizeContainer
              classes={{
                root: classNames.root,
                footerContainer: classNames.footerContainer,
                footerCell: classNames.footerCell,
                toolbarContainer: classNames.toolbarContainer,
              }}
              localeText={getLocalizationByLanguageTag()}
              sortModel={viewModel.sortModel}
              filterModel={viewModel.filterModel}
              page={viewModel.curPage}
              pageSize={viewModel.rowsPerPage}
              rowsPerPageOptions={[15, 25, 50, 100]}
              rows={viewModel.getCurrentData()}
              rowHeight={100}
              components={{
                Toolbar: DataGridCustomToolbar,
                ColumnMenuIcon: FilterAltOutlinedIcon,
              }}
              density={viewModel.densityModel}
              columns={viewModel.columnsModel}
              loading={viewModel.requestStatus === loadingStatuses.isLoading}
              onSortModelChange={viewModel.onChangeSortingModel}
              onPageSizeChange={viewModel.onChangeRowsPerPage}
              onPageChange={viewModel.onChangeCurPage}
              onStateChange={viewModel.setDataGridState}
              onFilterModelChange={model => viewModel.onChangeFilterModel(model)}
            />
          </>
        ) : null}
      </MainContent>

      <Modal openModal={viewModel.showOrderModal} setOpenModal={() => viewModel.onTriggerOpenModal('showOrderModal')}>
        <OrderProductModal
          // volumeWeightCoefficient={volumeWeightCoefficient}
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
          title={viewModel.confirmModalSettings.confirmTitle}
          message={viewModel.confirmModalSettings.confirmMessage}
          shops={viewModel.shopsData}
          onClickSuccessBtn={viewModel.onClickBuyProductBtn}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showSelectShopsModal')}
        />
      </Modal>

      <ConfirmationModal
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        isWarning={viewModel.confirmModalSettings.isWarning}
        title={viewModel.confirmModalSettings.confirmTitle}
        message={viewModel.confirmModalSettings.confirmMessage}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.Cancel)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />

      <WarningInfoModal
        openModal={viewModel.showWarningModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningModal')}
        title={viewModel.showWarningModalText}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showWarningModal')
        }}
      />

      <SuccessInfoModal
        openModal={viewModel.showSuccessModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessModal')}
        title={t(TranslationKey['Order successfully created!'])}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => {
          viewModel.onTriggerOpenModal('showSuccessModal')
        }}
      />
    </>
  )
}
export const AnotherUserProfileView = withStyles(observer(AnotherUserProfileViewRaw), styles)
