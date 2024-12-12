import { action, override } from 'mobx'

export const observerConfig = {
  setActiveProductsTag: action.bound,
  setActiveProductsTagFromTable: action.bound,

  setSettingsFromActivePreset: override,
}
