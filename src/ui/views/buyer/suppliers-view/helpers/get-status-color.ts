import { darkTheme, lightTheme } from '@constants/theme/mui-theme'

import { SettingsModel } from '@models/settings-model'

import { UiTheme } from '@typings/enums/ui-theme'
import { SupplierCardStatus } from '@typings/models/suppliers/supplier-card'

export const getStatusColor = (status: number) => {
  switch (status) {
    case SupplierCardStatus.PUBLISHED:
      return SettingsModel.uiTheme === UiTheme.dark ? darkTheme.palette.other.succes : lightTheme.palette.other.succes
    case SupplierCardStatus.DRAFT:
      return SettingsModel.uiTheme === UiTheme.dark ? darkTheme.palette.primary.main : lightTheme.palette.primary.main
    case SupplierCardStatus.ON_HOLD:
      return SettingsModel.uiTheme === UiTheme.dark ? darkTheme.palette.text.second : lightTheme.palette.text.second
  }
}
