import { action, observable } from 'mobx'

import { IParsingProfile } from '@typings/models/parser/parsing-profile'

export const parsingProfileViewConfig = {
  selectedProfile: observable,
  showToggleProfileModal: observable,

  onEditProfileModal: action.bound,
  onAddProfileModal: action.bound,
  onForceStart: action.bound,
  onForceStop: action.bound,
  onToggleProfileModal: action.bound,
}

export const fieldsForSearch = ['name', 'email']

export interface ColumnsProps {
  onEditProfileModal: (row: IParsingProfile) => void
  onForceStart: (ids?: string[]) => void
  onForceStop: (ids?: string[]) => void
}
