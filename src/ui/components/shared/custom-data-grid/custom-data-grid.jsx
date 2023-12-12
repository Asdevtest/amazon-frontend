import { useEffect } from 'react'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { DataGrid, useGridApiRef } from '@mui/x-data-grid'

import { SettingsModel } from '@models/settings-model'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'

export const CustomDataGrid = ({ rows, ...restProps }) => {
  const apiRef = useGridApiRef()

  // console.log(apiRef)
  // console.log('rows', rows)

  // useEffect(() => {
  //   if (!apiRef.current || !rows.length) {
  //     return
  //   }
  //   apiRef.current.updateRows(() => {
  //     return rows
  //   })
  // }, [SettingsModel.languageTag])

  return (
    <DataGrid
      pagination
      hideFooter
      disableVirtualization
      apiRef={apiRef}
      sortingMode="server"
      paginationMode="server"
      pageSizeOptions={[15, 25, 50, 100]}
      slots={{
        toolbar: DataGridCustomToolbar,
        columnMenuIcon: FilterAltOutlinedIcon,
        columnMenu: DataGridCustomColumnMenuComponent,
      }}
      rows={rows}
      {...restProps}
    />
  )
}
