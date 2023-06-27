import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { AdministratorModel } from '@models/administrator-model'
import { PermissionsModel } from '@models/permissions-model'
import { UserModel } from '@models/user-model'

import { adminGroupPermissionsColumns } from '@components/table/table-columns/admin/group-permissions-columns copy'

export class UserEditModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  checkValidationNameOrEmail = {}
  changeFields = { email: '', name: '', oldPassword: '', newPassword: '', confirmNewPassword: '' }
  editUserFormFields = undefined

  wrongPassword = null

  userData = undefined

  submitEditData = undefined

  groupPermissions = undefined
  singlePermissions = undefined

  showAddOrEditGroupPermissionModal = false
  showTwoVerticalChoicesModal = false
  showConfirmModal = false

  addOrEditGroupPermissionSettings = {
    permission: {},
    isEdit: false,
    onSubmit: (data, newSinglePermissions) => this.onSubmitCreateGroupPermission(data, newSinglePermissions),
  }

  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickSuccess: () => {},
  }

  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
  }

  sortModel = []
  filterModel = { items: [] }
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = adminGroupPermissionsColumns(this.rowHandlers)

  constructor({ history, user }) {
    this.history = history

    this.userId = user._id

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.userId,
      () =>
        runInAction(() => {
          this.loadData()
        }),
    )
  }

  async finalStepSubmitEditUserForm() {
    try {
      await AdministratorModel.updateUser(this.userData._id, this.submitEditData)

      this.onTriggerOpenModal('showTwoVerticalChoicesModal')

      this.changeFields = { email: '', name: '' }
    } catch (error) {
      console.log(error)
      this.error = error?.body?.message || error
    }
  }

  async getUserData() {
    try {
      const result = await AdministratorModel.getUsersById(this.userId)

      this.userData = result
    } catch (error) {
      console.log(error)
      this.error = error?.body?.message || error
    }
  }

  async onClickBottomBtn() {
    this.loadData()
    this.onTriggerOpenModal('showTwoVerticalChoicesModal')
  }

  async submitEditUserForm(data, sourceData) {
    try {
      this.error = undefined
      this.checkValidationNameOrEmail = await UserModel.isCheckUniqueUser({
        name: this.changeFields.name,
        email: this.changeFields.email,
      })

      this.submitEditData = { ...data, permissions: data.active && data.active !== 'false' ? data.permissions : [] } // удаляем пермишены если баним юзера

      this.availableSubUsers = undefined

      if (sourceData.canByMasterUser === true && data.canByMasterUser === false) {
        this.availableSubUsers = !!(await AdministratorModel.getUsersById(this.userData._id)).subUsers.length
      }

      if (
        this.checkValidationNameOrEmail.nameIsUnique === false ||
        this.checkValidationNameOrEmail.emailIsUnique === false
      ) {
        return
      } else if (this.availableSubUsers) {
        this.onTriggerOpenModal('showConfirmModal')
      } else {
        await this.finalStepSubmitEditUserForm()
      }
    } catch (error) {
      console.log(error)
      this.error = error?.body?.message || error
    }
  }

  onClickCancelBtn() {
    this.history.goBack()
  }

  goToUsers() {
    this.history.push('/admin/users')
  }

  async getGroupPermissions() {
    try {
      const result = await PermissionsModel.getGroupPermissions()

      runInAction(() => {
        this.groupPermissions = result?.sort((a, b) => a.role - b.role) || []
      })
    } catch (error) {
      this.groupPermissions = []
      console.log(error)
    }
  }

  async getSinglePermissions() {
    try {
      const result = await PermissionsModel.getSinglePermissions()

      runInAction(() => {
        this.singlePermissions = result?.sort((a, b) => a.role - b.role) || []
      })
    } catch (error) {
      this.singlePermissions = []
      console.log(error)
    }
  }

  async loadData() {
    try {
      await Promise.all([this.getUserData(), this.getGroupPermissions(), this.getSinglePermissions()])
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
