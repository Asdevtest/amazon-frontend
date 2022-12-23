import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'
import {AdminContentModal} from '@components/screens/users-views/sub-users-view/admin-content-modal'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {AdminUsersViewModel} from './admin-users-view.model'
import {styles} from './admin-users-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_USERS

@observer
class AdminUsersViewRaw extends Component {
  viewModel = new AdminUsersViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      nameSearchValue,

      groupPermissions,
      singlePermissions,

      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      requestStatus,
      drawerOpen,
      curPage,
      rowsPerPage,
      editUserFormFields,
      showEditUserModal,
      checkValidationNameOrEmail,
      changeNameAndEmail,
      showConfirmModal,
      finalStepSubmitEditUserForm,
      submitEditUserForm,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,

      onTriggerOpenModal,
      onChangeNameSearchValue,
    } = this.viewModel
    const {classes: classNames} = this.props
    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey.Users)}>
            <MainContent>
              <SearchInput
                inputClasses={classNames.searchInput}
                value={nameSearchValue}
                placeholder={t(TranslationKey.search)}
                onChange={onChangeNameSearchValue}
              />

              <div className={classNames.datagridWrapper}>
                <MemoDataGrid
                  pagination
                  // autoHeight
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
                  rowHeight={80}
                  rows={getCurrentData()}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                  }}
                  onSelectionModelChange={newSelection => {
                    onSelectionModel(newSelection[0])
                  }}
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
        <Modal openModal={showEditUserModal} setOpenModal={() => onTriggerOpenModal('showEditUserModal')}>
          <AdminContentModal
            checkValidationNameOrEmail={checkValidationNameOrEmail}
            changeNameAndEmail={changeNameAndEmail}
            singlePermissions={singlePermissions}
            groupPermissions={groupPermissions}
            editUserFormFields={editUserFormFields}
            title={t(TranslationKey['Edit user'])}
            buttonLabel={t(TranslationKey.Save)}
            onSubmit={submitEditUserForm}
            onCloseModal={() => onTriggerOpenModal('showEditUserModal')}
          />
        </Modal>

        <ConfirmationModal
          isWarning
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['This user has sub-users - they will be deactivated! Are you sure?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => {
            finalStepSubmitEditUserForm()
            onTriggerOpenModal('showConfirmModal')
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const AdminUsersView = withStyles(AdminUsersViewRaw, styles)
