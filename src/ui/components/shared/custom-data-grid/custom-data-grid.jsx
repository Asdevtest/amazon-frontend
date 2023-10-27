import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { DataGridPro } from '@mui/x-data-grid-pro'

import { SettingsModel } from '@models/settings-model'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'

export const CustomDataGrid = ({ ...restProps }) => {
  return (
    <DataGridPro
      key={SettingsModel.languageTag}
      pagination
      hideFooter
      disableVirtualization
      sortingMode="server"
      paginationMode="server"
      slots={{
        toolbar: DataGridCustomToolbar,
        columnMenuIcon: FilterAltOutlinedIcon,
        columnMenu: DataGridCustomColumnMenuComponent,
      }}
      {...restProps}
    />
  )
}
