import { observer } from 'mobx-react'
import { useMemo } from 'react'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { DataGrid } from '@mui/x-data-grid'

import { SettingsModel } from '@models/settings-model'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'

export const MemoDataGrid = observer(({ ...restProps }) => {
  const result = useMemo(
    () => (
      <DataGrid
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
    ),

    [
      SettingsModel.uiTheme,
      SettingsModel.languageTag,
      restProps.rows,
      restProps.columns,
      restProps.loading,
      restProps.density,
      restProps.paginationModel?.pageSize,
      restProps.paginationModel?.page,
      restProps.sortModel,
      restProps.filterModel,
      restProps.rowSelectionModel,
      restProps.slotProps?.columnMenu,
      restProps.propsToRerender?.onHover,
      restProps.propsToRerender?.unitsOption,
      restProps.propsToRerender?.isArchive,
      restProps.propsToRerender?.currentData,
      restProps.propsToRerender?.productViewMode,
    ],
  )

  return <>{result}</>
})
