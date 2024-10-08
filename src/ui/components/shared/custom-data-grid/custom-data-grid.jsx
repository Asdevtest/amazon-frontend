import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { DataGridPremium } from '@mui/x-data-grid-premium'

import { SettingsModel } from '@models/settings-model'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'

import { SeparatorIcon } from '../svg-icons'

export const CustomDataGrid = ({ ...restProps }) => {
  const grids = document.querySelectorAll('.MuiDataGrid-main')

  for (const grid of grids) {
    const childNodesList = grid?.childNodes
    const alertElement = childNodesList?.[2]

    if (alertElement) {
      alertElement.style.display = 'none'
    }
  }

  return (
    <DataGridPremium
      key={SettingsModel.languageTag}
      pagination
      hideFooter
      useResizeContainer
      disableVirtualization
      sortingMode="server"
      paginationMode="server"
      pageSizeOptions={[15, 25, 50, 100]}
      localeText={getLocalizationByLanguageTag()}
      slots={{
        toolbar: DataGridCustomToolbar,
        columnMenuIcon: FilterAltOutlinedIcon,
        columnMenu: DataGridCustomColumnMenuComponent,
        columnResizeIcon: SeparatorIcon,
      }}
      {...restProps}
    />
  )
}
