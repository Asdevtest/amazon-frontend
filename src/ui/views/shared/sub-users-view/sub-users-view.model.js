import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'
import {UserRole, UserRoleCodeMap} from '@constants/user-roles'

import {BuyerModel} from '@models/buyer-model'
import {ClientModel} from '@models/client-model'
import {PermissionsModel} from '@models/permissions-model'
import {ResearcherModel} from '@models/researcher-model'
import {SettingsModel} from '@models/settings-model'
import {ShopModel} from '@models/shop-model'
import {SupervisorModel} from '@models/supervisor-model'
import {UserModel} from '@models/user-model'

import {subUsersColumns} from '@components/table-columns/sub-users-columns/sub-users-columns'

import {addIdDataConverter, clientInventoryDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
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
  shopsData = []

  currentData = []

  curUserProductPermissions = []
  productPermissionsData = []

  drawerOpen = false

  modalPermission = false
  showAddSubUserModal = false
  showWarningModal = false
  showPermissionModal = false
  showConfirmModal = false

  selectionModel = undefined

  activeSubCategory = 0

  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
    onClickSaveComment: (id, comment) => this.onClickSaveComment(id, comment),
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
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.firstRowId,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.subUsersData,
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
        }),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }

  async onClickSaveComment(id, comment) {
    try {
      console.log(id, comment)
      await UserModel.patchSubNote(id, comment)

      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  setDataGridState(state) {
    runInAction(() => {
      this.firstRowId = state.sorting.sortedRows[0]
    })

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

    runInAction(() => {
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
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.subUsersData).filter(
        el =>
          el.name.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el.email.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      return toJS(this.subUsersData)
    }
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectionModel = model
    })
  }

  onChangeDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onChangeCurPage = e => {
    runInAction(() => {
      this.curPage = e
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
    })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.getDataGridState()

      await this.getUsers()

      if (UserRoleCodeMap[this.userInfo.role] === UserRole.CLIENT) {
        await this.getShops()
      }

      await this.getGroupPermissions()
      await this.getSinglePermissions()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getShops() {
    try {
      const result = await ShopModel.getMyShops()
      runInAction(() => {
        this.shopsData = addIdDataConverter(result)
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
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
      runInAction(() => {
        this.error = error
      })
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

  async onClickEditBtn(row) {
    try {
      runInAction(() => {
        this.selectedSubUser = row
      })

      const result = await PermissionsModel.getProductsPermissionsForUserById(row._id)

      runInAction(() => {
        this.curUserProductPermissions = result
      })

      const methodByRole = () => {
        switch (UserRoleCodeMap[this.userInfo.role]) {
          case UserRole.CLIENT:
            return ClientModel.getProductPermissionsData()

          case UserRole.BUYER:
            return BuyerModel.getProductsMyLight()

          case UserRole.SUPERVISOR:
            return SupervisorModel.getProductsMyLight()

          case UserRole.RESEARCHER:
            return ResearcherModel.getProductsVacant()

          default:
            return ClientModel.getProductPermissionsData()
        }
      }

      const productPermissionsData = await methodByRole()

      runInAction(() => {
        this.productPermissionsData = clientInventoryDataConverter(productPermissionsData)
          .filter(el => !el.originalData.archive)
          .sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })

      this.onTriggerOpenModal('showPermissionModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickRemoveBtn(row) {
    runInAction(() => {
      this.selectedSubUser = row
    })
    this.onTriggerOpenModal('showConfirmModal')
  }

  async setPermissionsForUser(id, data, allowedProductsIds) {
    try {
      await PermissionsModel.setPermissionsForUser(id, data)

      await PermissionsModel.setProductsPermissionsForUser({userId: id, productIds: allowedProductsIds})

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['User permissions were changed']),
        }
      })

      this.onTriggerOpenModal('showWarningModal')
    } catch (error) {
      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: true,
          title: t(TranslationKey['User permissions are not changed']),
        }
      })

      this.onTriggerOpenModal('showWarningModal')

      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onSubmitUserPermissionsForm(permissions, subUserId, allowedProductsIds) {
    try {
      await this.setPermissionsForUser(subUserId, {permissions, permissionGroups: []}, allowedProductsIds)

      await this.getUsers()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async linkSubUser(data) {
    try {
      await UserModel.linkSubUser(data)

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Sub-user added']),
        }
      })

      this.onTriggerOpenModal('showWarningModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error

        this.warningInfoModalSettings = {
          isWarning: true,
          title: error.body.message || t(TranslationKey['Sub-user not added!']),
        }
      })

      this.onTriggerOpenModal('showWarningModal')
    }
  }

  async unlinkSubUser() {
    try {
      await UserModel.unlinkSubUser({userId: this.selectedSubUser._id})

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Sub-user removed']),
        }
      })

      this.onTriggerOpenModal('showWarningModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onSubmitlinkSubUser(data) {
    try {
      await this.linkSubUser(data)
      await this.getUsers()
      this.onTriggerOpenModal('showAddSubUserModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onSubmitUnlinkSubUser() {
    try {
      await this.unlinkSubUser()
      await this.getUsers()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onChangeModalEditSubUser() {
    runInAction(() => {
      this.modalEditSubUser = !this.modalEditSubUser
    })
  }

  onChangeModalPermission() {
    runInAction(() => {
      this.modalPermission = !this.modalPermission
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
