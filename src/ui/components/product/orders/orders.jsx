import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {useEffect, useRef} from 'react'

import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {loadingStatuses} from '@constants/loading-statuses'

import {OrdersModel} from './orders.model'
import {useClassNames} from './orders.style'

export const Orders = observer(({productId}) => {
  const classNames = useClassNames()
  const history = useHistory()
  const model = useRef(new OrdersModel({history, productId}))

  useEffect(() => {
    model.current.loadData()
  }, [])

  const {getCurrentData, requestStatus, columnsModel, onClickTableRow} = model.current

  return (
    <div className={classNames.mainWrapper}>
      <DataGrid
        pagination
        useResizeContainer
        classes={{
          row: classNames.row,
        }}
        rowsPerPageOptions={[15, 25, 50, 100]}
        rows={getCurrentData()}
        rowHeight={100}
        components={{
          Toolbar: GridToolbar,
        }}
        columns={columnsModel}
        loading={requestStatus === loadingStatuses.isLoading}
        onRowDoubleClick={e => onClickTableRow(e.row)}
      />
    </div>
  )
})
