import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
// import { DataGrid } from '@mui/x-data-grid'
import { DataGridPro } from '@mui/x-data-grid-pro'

import { SettingsModel } from '@models/settings-model'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'

import { SeparatorIcon } from '../svg-icons'

export const CustomDataGrid = ({ ...restProps }) => {
  const grid = document.querySelector('.MuiDataGrid-main')
  const childNodesList = grid?.childNodes
  const alertElement = childNodesList?.[2]

  if (alertElement) {
    alertElement.style.display = 'none'
  }

  return (
    <DataGridPro
      key={SettingsModel.languageTag}
      pagination
      hideFooter
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
