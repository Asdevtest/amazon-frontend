import { action, observable } from 'mobx'

import { IFullUser } from '@typings/shared/full-user'

export const observerConfig = {
  selectedSubUser: observable,
  showAddSubUserModal: observable,
  showPermissionModal: observable,

  onClickSaveComment: action.bound,
  onClickEditBtn: action.bound,
  linkSubUser: action.bound,
  unlinkSubUser: action.bound,
  onSubmitlinkSubUser: action.bound,
  onToggleAddSubUserModal: action.bound,
  onClosePermissionModal: action.bound,
}

export interface IColumnProps {
  onClickRemove: (id: string) => void
  onClickEdit: (row: IFullUser) => void
  onClickSaveComment: (id: string, comment?: string) => void
}
