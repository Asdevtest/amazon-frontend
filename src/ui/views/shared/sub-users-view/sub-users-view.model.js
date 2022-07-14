import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {PermissionsModel} from '@models/permissions-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {subUsersColumns} from '@components/table-columns/sub-users-columns/sub-users-columns'

import {addIdDataConverter} from '@utils/data-grid-data-converters'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'

export class SubUsersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''

  subUsersData = []
  singlePermissions = []
  groupPermissions = []

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

  firstRowId = undefined
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = subUsersColumns(this.rowHandlers, this.firstRowId)

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.firstRowId,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    this.firstRowId = state.sorting.sortedRows[0]

    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.OVERALL_SUB_USERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.OVERALL_SUB_USERS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = subUsersColumns(this.rowHandlers, this.firstRowId).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.subUsersData).filter(el => el.name.toLowerCase().includes(this.nameSearchValue.toLowerCase()))
    } else {
      return toJS(this.subUsersData)
    }
  }

  onChangeNameSearchValue(e) {
    this.nameSearchValue = e.target.value
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

      this.getDataGridState()

      await this.getUsers()

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
      const result = await PermissionsModel.getGroupPermissions(this.userInfo.role)

      runInAction(() => {
        this.groupPermissions = result.sort((a, b) => a.role - b.role)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getSinglePermissions() {
    try {
      const result = await PermissionsModel.getSinglePermissions(this.userInfo.role)

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

  async onSubmitUserPermissionsForm(permissions, subUserId) {
    try {
      await this.setPermissionsForUser(subUserId, {permissions, permissionGroups: []})

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
        title: t(TranslationKey['Sab-user added']),
      }

      this.onTriggerOpenModal('showWarningModal')
    } catch (error) {
      console.log(error)
      this.error = error

      this.warningInfoModalSettings = {
        isWarning: true,
        title: error.body.message || t(TranslationKey['Sab-user not added!']),
      }

      this.onTriggerOpenModal('showWarningModal')
    }
  }

  async unlinkSubUser() {
    try {
      await UserModel.unlinkSubUser({userId: this.selectedSubUser._id})

      this.warningInfoModalSettings = {
        isWarning: false,
        title: t(TranslationKey['Sab-user removed']),
      }

      this.onTriggerOpenModal('showWarningModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitlinkSubUser(data) {
    try {
      await this.linkSubUser(data)
      await this.getUsers()
      this.onTriggerOpenModal('showAddSubUserModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
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
