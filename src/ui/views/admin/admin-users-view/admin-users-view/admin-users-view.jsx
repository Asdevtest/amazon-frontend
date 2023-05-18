import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {useEffect, useState} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {MainContent} from '@components/layout/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {MemoDataGrid} from '@components/shared/memo-data-grid'
import {Modal} from '@components/shared/modal'
import {SearchInput} from '@components/shared/search-input'
import {AdminContentModal} from '@components/user/users-views/sub-users-view/admin-content-modal'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {AdminUsersViewModel} from './admin-users-view.model'
import {styles} from './admin-users-view.style'

export const AdminUsersViewRaw = props => {
  const [viewModel] = useState(() => new AdminUsersViewModel({history: props.history}))
  const {classes: classNames} = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <MainContent>
        <SearchInput
          inputClasses={classNames.searchInput}
          value={viewModel.nameSearchValue}
          placeholder={t(TranslationKey.search)}
          onChange={viewModel.onChangeNameSearchValue}
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
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            page={viewModel.curPage}
            pageSize={viewModel.rowsPerPage}
            rowsPerPageOptions={[15, 25, 50, 100]}
            rowHeight={80}
            rows={viewModel.getCurrentData()}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            components={{
              Toolbar: DataGridCustomToolbar,
              ColumnMenuIcon: FilterAltOutlinedIcon,
            }}
            componentsProps={{
              toolbar: {
                columsBtnSettings: {
                  columnsModel: viewModel.columnsModel,
                  changeColumnsModel: viewModel.changeColumnsModel,
                },
              },
            }}
            onSelectionModelChange={newSelection => {
              viewModel.onSelectionModel(newSelection[0])
            }}
            onSortModelChange={viewModel.onChangeSortingModel}
            onPageSizeChange={viewModel.onChangeRowsPerPage}
            onPageChange={viewModel.onChangeCurPage}
            onStateChange={viewModel.setDataGridState}
            onFilterModelChange={model => viewModel.onChangeFilterModel(model)}
          />
        </div>
      </MainContent>
      <Modal
        openModal={viewModel.showEditUserModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditUserModal')}
      >
        <AdminContentModal
          checkValidationNameOrEmail={viewModel.checkValidationNameOrEmail}
          changeNameAndEmail={viewModel.changeNameAndEmail}
          singlePermissions={viewModel.singlePermissions}
          groupPermissions={viewModel.groupPermissions}
          editUserFormFields={viewModel.editUserFormFields}
          title={t(TranslationKey['Edit user'])}
          buttonLabel={t(TranslationKey.Save)}
          onSubmit={viewModel.submitEditUserForm}
          onCloseModal={() => viewModel.onTriggerOpenModal('showEditUserModal')}
        />
      </Modal>

      <ConfirmationModal
        isWarning
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={t(TranslationKey['This user has sub-users - they will be deactivated! Are you sure?'])}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={() => {
          viewModel.finalStepSubmitEditUserForm()
          viewModel.onTriggerOpenModal('showConfirmModal')
        }}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />
    </React.Fragment>
  )
}

export const AdminUsersView = withStyles(observer(AdminUsersViewRaw), styles)
