import { action, observable } from 'mobx'

import { IParsingProfile } from '@typings/models/parser/parsing-profile'

export const parsingProfileViewConfig = {
  selectedProfile: observable,
  showToggleProfileModal: observable,

  onToggleProfileModal: action.bound,
  onEditProfileModal: action.bound,
  onAddProfileModal: action.bound,
  onForceStart: action.bound,
  onForceStop: action.bound,
  onParsingProfileRegistred: action.bound,
  onParsingProfileRemoved: action.bound,
}

export const fieldsForSearch = ['name', 'email']

export interface ColumnsProps {
  onEditProfileModal: (row: IParsingProfile) => void
  onForceStart: (ids?: string[]) => void
  onForceStop: (ids?: string[]) => void
  onParsingProfileRegistred: (id: string) => void
  onParsingProfileRemoved: (id: string) => void
}
