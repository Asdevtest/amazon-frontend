import { action, computed, observable } from 'mobx'

export const observerConfig = {
  singlePermissions: observable,
  groupPermissions: observable,
  shopsData: observable,
  specs: observable,
  curUserProductPermissions: observable,
  curUserShopsPermissions: observable,
  productPermissionsData: observable,
  selectedSubUser: observable,

  showAddSubUserModal: observable,
  showPermissionModal: observable,
  showConfirmModal: observable,

  userRole: computed,

  onClickSaveComment: action.bound,
  getShops: action.bound,
  getGroupPermissions: action.bound,
  getSinglePermissions: action.bound,
  onClickEditBtn: action.bound,
  onClickRemoveBtn: action.bound,
  setPermissionsForUser: action.bound,
  onSubmitUserPermissionsForm: action.bound,
  linkSubUser: action.bound,
  unlinkSubUser: action.bound,
  onSubmitlinkSubUser: action.bound,
  onSubmitUnlinkSubUser: action.bound,
  getSpecs: action.bound,
}
