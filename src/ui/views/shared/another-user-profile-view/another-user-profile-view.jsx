import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {mapUserRoleEnumToKey, UserRole} from '@constants/keys/user-roles'
import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {MainContent} from '@components/layout/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {OrderProductModal} from '@components/modals/order-product-modal'
import {SelectShopsModal} from '@components/modals/select-shops-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {MemoDataGrid} from '@components/shared/memo-data-grid'
import {Modal} from '@components/shared/modal'
import {UserProfile} from '@components/user/users-views/user-profile-view/user-profile'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {AnotherProfileViewModel} from './another-user-profile-view.model'
import {styles} from './another-user-profile-view.style'

@observer
class AnotherUserProfileViewRaw extends Component {
  viewModel = new AnotherProfileViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      platformSettings,
      destinations,
      storekeepers,
      selectedProduct,
      showOrderModal,
      showConfirmModal,
      confirmModalSettings,
      showWarningModal,
      showSuccessModal,
      showWarningModalText,
      showSelectShopsModal,
      sortModel,
      filterModel,
      curPage,
      rowsPerPage,
      densityModel,
      columnsModel,
      requestStatus,
      tabHistory,
      tabReview,
      user,
      curUser,
      headerInfoData,
      shopsData,

      getCurrentData,
      setDataGridState,
      onChangeFilterModel,
      onChangeCurPage,
      onChangeRowsPerPage,
      onChangeSortingModel,

      onTriggerOpenModal,
      onDoubleClickBarcode,
      onClickOrderNowBtn,
      onClickCancelBtn,
      onClickBuyProductBtn,
      onClickWriteBtn,
    } = this.viewModel
    const {classes: classNames} = this.props
    return (
      <>
        <MainContent>
          {!user && (requestStatus === loadingStatuses.success || requestStatus === loadingStatuses.failed) && (
            <Typography variant="h4" className={classNames.noDataText}>
              {t(TranslationKey['No data']) + '...'}
            </Typography>
          )}

          {user && (
            <UserProfile
              isAnotherUser
              user={user}
              curUser={curUser}
              headerInfoData={headerInfoData}
              tabReview={tabReview}
              tabHistory={tabHistory}
              onClickWriteBtn={onClickWriteBtn}
            />
          )}

          {user &&
          [
            mapUserRoleEnumToKey[UserRole.RESEARCHER],
            mapUserRoleEnumToKey[UserRole.SUPERVISOR],
            mapUserRoleEnumToKey[UserRole.BUYER],
          ].includes(user.role) ? (
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
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={getCurrentData()}
                rowHeight={100}
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
            </>
          ) : null}
        </MainContent>

        <Modal openModal={showOrderModal} setOpenModal={() => onTriggerOpenModal('showOrderModal')}>
          <OrderProductModal
            // volumeWeightCoefficient={volumeWeightCoefficient}
            platformSettings={platformSettings}
            destinations={destinations}
            storekeepers={storekeepers}
            requestStatus={requestStatus}
            selectedProductsData={[selectedProduct]}
            onTriggerOpenModal={onTriggerOpenModal}
            onDoubleClickBarcode={onDoubleClickBarcode}
            onSubmit={onClickOrderNowBtn}
            onClickCancel={onClickCancelBtn}
          />
        </Modal>

        <Modal openModal={showSelectShopsModal} setOpenModal={() => onTriggerOpenModal('showSelectShopsModal')}>
          <SelectShopsModal
            title={confirmModalSettings.confirmTitle}
            message={confirmModalSettings.confirmMessage}
            shops={shopsData}
            onClickSuccessBtn={onClickBuyProductBtn}
            onClickCancelBtn={() => onTriggerOpenModal('showSelectShopsModal')}
          />
        </Modal>

        <ConfirmationModal
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          isWarning={confirmModalSettings.isWarning}
          title={confirmModalSettings.confirmTitle}
          message={confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onClickSuccessBtn={confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />

        <WarningInfoModal
          openModal={showWarningModal}
          setOpenModal={() => onTriggerOpenModal('showWarningModal')}
          title={showWarningModalText}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningModal')
          }}
        />

        <SuccessInfoModal
          openModal={showSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
          title={t(TranslationKey['Order successfully created!'])}
          successBtnText={t(TranslationKey.Ok)}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showSuccessModal')
          }}
        />
      </>
    )
  }
}

export const AnotherUserProfileView = withStyles(AnotherUserProfileViewRaw, styles)
