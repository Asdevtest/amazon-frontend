import SearchIcon from '@mui/icons-material/Search'
import {InputAdornment} from '@mui/material'
import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'
import {UserRoleCodeMap} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {LinkSubUserForm} from '@components/forms/link-sub-user-form'
import {NewAddOrEditUserPermissionsForm} from '@components/forms/new-add-or-edit-user-permissions-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'

import {checkIsClient, checkIsStorekeeper} from '@utils/checks'
import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {SubUsersViewModel} from './sub-users-view.model'
import {styles} from './sub-users-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_USERS

@observer
class SubUsersViewRaw extends Component {
  viewModel = new SubUsersViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      userInfo,
      curUserProductPermissions,
      nameSearchValue,
      showConfirmModal,
      showAddSubUserModal,
      showWarningModal,
      showPermissionModal,
      warningInfoModalSettings,
      singlePermissions,
      groupPermissions,
      selectedSubUser,

      requestStatus,
      getCurrentData,

      shopsData,
      productsMy,
      onClickShop,

      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      drawerOpen,
      rowsPerPage,
      curPage,
      activeSubCategory,
      onChangeDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onChangeSubCategory,

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,

      onTriggerOpenModal,
      onSubmitlinkSubUser,
      onSubmitUserPermissionsForm,
      onSubmitUnlinkSubUser,

      onChangeNameSearchValue,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeDrawerOpen}
          onChangeSubCategory={onChangeSubCategory}
        />
        <Main>
          <Appbar title={t(TranslationKey['My users'])} setDrawerOpen={onChangeDrawerOpen}>
            <MainContent>
              <div className={classNames.subUserHeader}>
                <Field
                  containerClasses={classNames.searchContainer}
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey['Search by name, email'])}
                  value={nameSearchValue}
                  endAdornment={
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  }
                  onChange={onChangeNameSearchValue}
                />
                <div className={classNames.buttonWrapper}>
                  <Button
                    success
                    tooltipInfoContent={t(TranslationKey['Add your own sub-user'])}
                    className={classNames.addUserButton}
                    onClick={() => onTriggerOpenModal('showAddSubUserModal')}
                  >
                    {t(TranslationKey['Add a user'])}
                  </Button>
                </div>
              </div>
              <div className={classNames.datagridWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  sx={{
                    border: 0,
                    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
                    backgroundColor: '#fff',
                  }}
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
                  rowHeight={220}
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
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showAddSubUserModal} setOpenModal={() => onTriggerOpenModal('showAddSubUserModal')}>
          <LinkSubUserForm
            closeModal={() => onTriggerOpenModal('showAddSubUserModal')}
            onSubmit={onSubmitlinkSubUser}
          />
        </Modal>

        <Modal openModal={showPermissionModal} setOpenModal={() => onTriggerOpenModal('showPermissionModal')}>
          <NewAddOrEditUserPermissionsForm
            isWithoutProductPermissions={checkIsStorekeeper(UserRoleCodeMap[userInfo.role])}
            isWithoutShopsDepends={!checkIsClient(UserRoleCodeMap[userInfo.role])}
            curUserProductPermissions={curUserProductPermissions}
            permissionsToSelect={singlePermissions}
            permissionGroupsToSelect={groupPermissions}
            sourceData={selectedSubUser}
            shops={shopsData}
            products={productsMy}
            onClickShop={onClickShop}
            onCloseModal={() => onTriggerOpenModal('showPermissionModal')}
            onSubmit={onSubmitUserPermissionsForm}
          />
        </Modal>

        <WarningInfoModal
          isWarning={warningInfoModalSettings.isWarning}
          openModal={showWarningModal}
          setOpenModal={() => onTriggerOpenModal('showWarningModal')}
          title={warningInfoModalSettings.title}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningModal')
          }}
        />

        <ConfirmationModal
          isWarning
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Are you sure you want to unbind the sub-user?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={onSubmitUnlinkSubUser}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const SubUsersView = withStyles(SubUsersViewRaw, styles)
