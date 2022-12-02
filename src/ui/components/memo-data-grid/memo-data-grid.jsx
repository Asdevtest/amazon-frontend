import {DataGrid} from '@mui/x-data-grid'

import React, {useMemo} from 'react'

import {observer} from 'mobx-react'

export const MemoDataGrid = observer(({...restProps}) => {
  const result = useMemo(
    () => (
      // {
      //     console.log('render DataGrid')

      //     return <DataGrid {...restProps} />
      //   }
      <DataGrid {...restProps} />
    ),

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
    ],
  )

  return <>{result}</>
})

// export const MemoDataGrid = ({...restProps}) => { // КОНТРОЛЬНЫЙ
//   console.log('render')
//   return <DataGrid {...restProps} />
// }
