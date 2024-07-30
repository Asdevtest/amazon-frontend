import { action, observable } from 'mobx'

import { IParsingProfile } from '@typings/models/parser/parsing-profile'

export const parsingProdileViewConfig = {
  editProfile: observable,
  showToggleProfileModal: observable,

  onEditProfileModal: action.bound,
  onAddProfileModal: action.bound,
  onForceStart: action.bound,
}

export const additionalSearchFields = ['name', 'email']

export interface ColumnsProps {
  onEditProfileModal: (row: IParsingProfile) => void
}
