/* eslint-disable no-unused-vars */
import { DataGrid } from '@mui/x-data-grid'

import React, { useMemo } from 'react'

import { observer } from 'mobx-react'

import { SettingsModel } from '@models/settings-model'

export const MemoDataGrid = observer(({ ...restProps }) => {
  const result = useMemo(
    () => <DataGrid key={SettingsModel.languageTag} disableVirtualization {...restProps} />,

    [
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
      SettingsModel.uiTheme,
      restProps.propsToRerender?.onHover,
      restProps.propsToRerender?.unitsOption,
      restProps.propsToRerender?.isArchive,
      restProps.propsToRerender?.currentData,
      restProps.propsToRerender?.productViewMode,
    ],
  )

  return <>{result}</>
})
