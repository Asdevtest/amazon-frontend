import { enUS, ruRU, ukUA, zhCN } from '@mui/x-data-grid'

import { SettingsModel } from '@models/settings-model'

import { LanguageKey } from '@typings/enums/language-key'

export const getLocalizationByLanguageTag = () => {
  switch (SettingsModel.languageTag) {
    case LanguageKey.en:
      return enUS.components.MuiDataGrid.defaultProps.localeText

    case LanguageKey.ru:
      return ruRU.components.MuiDataGrid.defaultProps.localeText

    case LanguageKey.zh:
      return zhCN.components.MuiDataGrid.defaultProps.localeText

    case LanguageKey.ua:
      return ukUA.components.MuiDataGrid.defaultProps.localeText

    default:
      return enUS.components.MuiDataGrid.defaultProps.localeText
  }
}
