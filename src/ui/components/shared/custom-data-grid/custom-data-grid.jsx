import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { DataGrid } from '@mui/x-data-grid'

import { SettingsModel } from '@models/settings-model'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'

export const CustomDataGrid = ({ ...restProps }) => {
  const pageSizeOptions = [15, 25, 50, 100]

  return (
    <DataGrid
      key={SettingsModel.languageTag}
      pagination
      hideFooter
      disableVirtualization
      sortingMode="server"
      paginationMode="server"
      pageSizeOptions={pageSizeOptions}
      slots={{
        toolbar: DataGridCustomToolbar,
        columnMenuIcon: FilterAltOutlinedIcon,
        columnMenu: DataGridCustomColumnMenuComponent,
      }}
      {...restProps}
    />
  )
}
