import { enUS, ruRU, zhCN } from '@mui/x-data-grid'

import { LanguageKey } from '@constants/translations/language-key'

import { SettingsModel } from '@models/settings-model'

export const getLocalizationByLanguageTag = () => {
  switch (SettingsModel.languageTag) {
    case LanguageKey.en:
      return enUS.components.MuiDataGrid.defaultProps.localeText

    case LanguageKey.ru:
      return ruRU.components.MuiDataGrid.defaultProps.localeText

    case LanguageKey.zh:
      return zhCN.components.MuiDataGrid.defaultProps.localeText

    default:
      return enUS.components.MuiDataGrid.defaultProps.localeText
  }
}
