import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'
import {mapUserRoleEnumToKey, UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SelectShopsModal} from '@components/modals/select-shops-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {OrderProductModal} from '@components/screens/client/order-product-modal'
import {UserProfile} from '@components/screens/users-views/user-profile-view/user-profile'

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
      volumeWeightCoefficient,
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
      drawerOpen,
      tabHistory,
      tabReview,
      user,
      curUser,
      headerInfoData,
      shopsData,
      onTriggerDrawerOpen,

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
        <Navbar drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.User)} setDrawerOpen={onTriggerDrawerOpen}>
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
          </Appbar>

          <Modal openModal={showOrderModal} setOpenModal={() => onTriggerOpenModal('showOrderModal')}>
            <OrderProductModal
              volumeWeightCoefficient={volumeWeightCoefficient}
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
        </Main>
      </>
    )
  }
}

export const AnotherUserProfileView = withStyles(AnotherUserProfileViewRaw, styles)
