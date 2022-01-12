import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'
import {mapUserRoleEnumToKey, UserRole} from '@constants/user-roles'

import {PermissionsModel} from '@models/permissions-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {subUsersColumns} from '@components/table-columns/sub-users-columns/sub-users-columns'

import {addIdDataConverter} from '@utils/data-grid-data-converters'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

const textConsts = getLocalizedTexts(texts, 'en').researcherSubUsersView
export class ResearcherSubUsersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  subUsersData = []

  drawerOpen = false

  modalPermission = false
  showAddSubUserModal = false
  showWarningModal = false
  showPermissionModal = false
  showConfirmModal = false

  selectionModel = undefined

  activeSubCategory = 0
  drawerOpen = false

  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  columnsModel = subUsersColumns(this.rowHandlers)

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.RESEARCHER_SUB_USERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.RESEARCHER_SUB_USERS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = subUsersColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  getCurrentData() {
    return toJS(this.subUsersData)
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  onChangeDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage = e => {
    this.curPage = e
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getUsers()

      this.getDataGridState()

      await this.getGroupPermissions()
      await this.getSinglePermissions()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getUsers() {
    try {
      const result = await UserModel.getMySubUsers()
      runInAction(() => {
        this.subUsersData = addIdDataConverter(result)
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getGroupPermissions() {
    try {
      const result = await PermissionsModel.getGroupPermissions(mapUserRoleEnumToKey[UserRole.RESEARCHER])

      runInAction(() => {
        this.groupPermissions = result.sort((a, b) => a.role - b.role)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getSinglePermissions() {
    try {
      const result = await PermissionsModel.getSinglePermissions(mapUserRoleEnumToKey[UserRole.RESEARCHER])

      runInAction(() => {
        this.singlePermissions = result.sort((a, b) => a.role - b.role)
      })
    } catch (error) {
      console.log(error)
    }
  }

  onClickEditBtn(row) {
    this.selectedSubUser = row
    this.onTriggerOpenModal('showPermissionModal')
  }

  onClickRemoveBtn(row) {
    this.selectedSubUser = row
    this.onTriggerOpenModal('showConfirmModal')
  }

  async setPermissionsForUser(id, data) {
    try {
      await PermissionsModel.setPermissionsForUser(id, data)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitUserPermissionsForm(permissions, permissionGroups, subUserId) {
    try {
      await this.setPermissionsForUser(subUserId, {permissions, permissionGroups})

      await this.getUsers()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async linkSubUser(data) {
    try {
      await UserModel.linkSubUser(data)

      this.warningInfoModalSettings = {
        isWarning: false,
        title: textConsts.successTitle,
      }

      this.onTriggerOpenModal('showWarningModal')
    } catch (error) {
      console.log(error)
      this.error = error

      this.warningInfoModalSettings = {
        isWarning: true,
        title: textConsts.failTitle,
      }

      this.onTriggerOpenModal('showWarningModal')
    }
  }

  async unlinkSubUser() {
    try {
      await UserModel.unlinkSubUser({userId: this.selectedSubUser._id})
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onSubmitlinkSubUser(data) {
    this.linkSubUser(data)
    this.getUsers()
    this.onTriggerOpenModal('showAddSubUserModal')
  }

  async onSubmitUnlinkSubUser() {
    try {
      await this.unlinkSubUser()
      await this.getUsers()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onChangeModalEditSubUser() {
    this.modalEditSubUser = !this.modalEditSubUser
  }

  onChangeModalPermission() {
    this.modalPermission = !this.modalPermission
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
