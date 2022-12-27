import {DataGrid} from '@mui/x-data-grid'

import React, {useMemo} from 'react'

import {observer} from 'mobx-react'

import {SettingsModel} from '@models/settings-model'

export const MemoDataGrid = observer(({...restProps}) => {
  // console.log('restProps.rows', restProps.rows)

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
      SettingsModel.uiTheme,
    ],
  )

  return <>{result}</>
})

// export const MemoDataGrid = ({...restProps}) => { // КОНТРОЛЬНЫЙ
//   console.log('render')
//   return <DataGrid {...restProps} />
// }
