import {action, makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {AdministratorModel} from '@models/administrator-model'

import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'

export class AdminUsersViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  users = []
  editUserFormFields = undefined
  selectionModel = undefined

  drawerOpen = false
  curPage = 0
  rowsPerPage = 15
  showEditUserModal = false
  showPermissionModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  getCurrentData() {
    return [
      {
        id: '60f5569e7c89b06e3da60451',
        name: 'Aleksey Logvenkin',
        email: 'alex2@example.com',
        role: 0,
        fba: false,
        active: true,
        rate: 8,
      },
      {
        id: '60f599377c89b06e3da60453',
        name: 'test123@gmail.com',
        email: 'test123@gmail.com',
        role: 0,
        fba: false,
        active: true,
        rate: 0,
      },
      {
        id: '60f59a7d7c89b06e3da60454',
        name: 'researcher@gmail.com',
        email: 'researcher@gmail.com',
        role: 30,
        fba: false,
        active: true,
        rate: 0,
      },
      {
        id: '60f59bbd7c89b06e3da60456',
        name: 'researcher2@gmail.com',
        email: 'researcher2@gmail.com',
        role: 30,
        fba: false,
        active: true,
        rate: 0,
      },
      {
        id: '60f59c967c89b06e3da60458',
        name: '12123@gmail.com',
        email: '12123@gmail.com',
        role: 20,
        fba: false,
        active: true,
        rate: 0,
      },
      {
        id: '60f59cbc7c89b06e3da60459',
        name: 'supervisor@gmail.com',
        email: 'supervisor@gmail.com',
        role: 20,
        fba: false,
        active: true,
        rate: 50,
      },
      {
        id: '60f59f7b7c89b06e3da6045a',
        name: 'buyer@gmail.com',
        email: 'buyer@gmail.com',
        role: 40,
        fba: false,
        active: true,
        rate: 20,
      },
      {
        id: '60f5a18a7c89b06e3da60460',
        name: 'client@gmail.com',
        email: 'client@gmail.com',
        role: 10,
        fba: false,
        active: true,
        rate: 0,
      },
      {
        id: '60f5a2f97c89b06e3da60468',
        name: 'buyer2@gmail.com',
        email: 'buyer2@gmail.com',
        role: 40,
        fba: false,
        active: true,
        rate: 0,
      },
      {
        id: '60f5a39c7c89b06e3da60469',
        name: 'client2@gmail.com',
        email: 'client2@gmail.com',
        role: 10,
        fba: false,
        active: true,
        rate: 0,
      },
      {
        id: '60f5a5eb7c89b06e3da6046a',
        name: 'storekeeper@gmail.com',
        email: 'storekeeper@gmail.com',
        role: 45,
        fba: false,
        active: true,
        rate: 0,
      },
      {
        id: '60f66a4a9555b52a624e964f',
        name: 'researcher1',
        email: 'researcher1@gmail.com',
        role: 50,
        fba: false,
        active: true,
        rate: 0,
      },
      {
        id: '60f6f3fa9555b52a624e9691',
        name: 'ddd',
        email: 'ddd@mail.ru',
        role: 50,
        fba: false,
        active: true,
        rate: 1000,
      },
      {
        id: '60f7e838037ff30e09bcb442',
        name: 'client222@gmail.com',
        email: 'client222@gmail.com',
        role: 10,
        fba: false,
        active: true,
        rate: 20,
      },
      {
        id: '6100178fd2f80f76ce705873',
        name: 'Aleksey Logvenkin',
        email: 'alex@example.com',
        role: 50,
        fba: false,
        active: true,
        rate: 0,
      },
      {
        id: '610167d136ed071515c236c3',
        name: 'уу',
        email: 'researcher22@gmail.com',
        role: 30,
        fba: false,
        active: true,
        rate: 60,
      },
    ]
  }

  onSelectionModel(model) {
    this.editUserFormFields = this.users.find(el => el.id === model)
    this.selectionModel = model
  }

  onClickEditUser() {
    this.showEditUserModal = !this.showEditUserModal
  }

  onClickBalance(userData) {
    this.history.push('/admin/user/user_id/balance', {user: userData})
  }

  onTriggerEditUserModal() {
    this.showEditUserModal = !this.showEditUserModal
  }

  onTriggerPermissionModal() {
    this.showPermissionModal = !this.showPermissionModal
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e.page
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeFormField = fieldName =>
    action(e => {
      this.editUserFormFields = {...this.editUserFormFields, [fieldName]: e.target.value}
    })

  async getUsers() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined
      const result = await AdministratorModel.getUsers()

      const usersData = await result.map(user => ({
        ...getObjectFilteredByKeyArrayBlackList(user, ['_id']),
        id: user._id,
      }))

      runInAction(() => {
        this.users = usersData
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error?.body?.message || error
    }
  }

  async submitEditUserForm() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.error = undefined
      const data = getObjectFilteredByKeyArrayBlackList(this.editUserFormFields, ['_id', 'id'])
      await AdministratorModel.updateUser(this.selectionModel, data)
      await this.getUsers()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error?.body?.message || error
    }
  }
}
