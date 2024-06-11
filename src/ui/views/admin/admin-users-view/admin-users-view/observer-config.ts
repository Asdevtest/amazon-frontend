import { action, observable } from 'mobx'

export const observerConfig = {
  groupPermissions: observable,
  singlePermissions: observable,
  checkValidationNameOrEmail: observable,
  availableSubUsers: observable,
  changeNameAndEmail: observable,
  editUserFormFields: observable,
  rowSelectionModel: observable,
  switcherCondition: observable,
  submitEditData: observable,
  showConfirmModal: observable,
  showEditUserModal: observable,

  loadData: action.bound,
  getGroupPermissions: action.bound,
  getSinglePermissions: action.bound,
  submitEditUserForm: action.bound,
  finalStepSubmitEditUserForm: action.bound,
  onClickEditUser: action.bound,
  onClickUser: action.bound,
  onClickBalance: action.bound,
  onClickChangeRole: action.bound,
}
