/* eslint-disable no-unused-vars */
import { DataGrid } from '@mui/x-data-grid'

import React, { useMemo } from 'react'

import { observer } from 'mobx-react'

import { SettingsModel } from '@models/settings-model'

export const MemoDataGrid = observer(({ ...restProps }) => {
  const result = useMemo(
    () => <DataGrid {...restProps} />,

    [
      restProps.rows,
      restProps.columns,
      restProps.loading,
      restProps.density,
      restProps.pageSize,
      restProps.page,
      restProps.sortModel,
      restProps.filterModel,
      restProps.selectionModel,
      restProps.componentsProps?.columnMenu,
      SettingsModel.uiTheme,
      SettingsModel.languageTag,
    ],
  )

  return <>{result}</>
})
