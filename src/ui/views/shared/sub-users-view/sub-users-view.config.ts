import { action, computed, observable } from 'mobx'

import { IFullUser } from '@typings/shared/full-user'

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

  userRole: computed,

  onClickSaveComment: action.bound,
  getShops: action.bound,
  getGroupPermissions: action.bound,
  getSinglePermissions: action.bound,
  onClickEditBtn: action.bound,
  setPermissionsForUser: action.bound,
  onSubmitUserPermissionsForm: action.bound,
  linkSubUser: action.bound,
  unlinkSubUser: action.bound,
  onSubmitlinkSubUser: action.bound,
  getSpecs: action.bound,
  onToggleAddSubUserModal: action.bound,
}

export interface IColumnProps {
  onClickRemove: (id: string) => void
  onClickEdit: (row: IFullUser) => void
  onClickSaveComment: (id: string, comment?: string) => void
}
