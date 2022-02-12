import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {useEffect, useRef} from 'react'

import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {loadingStatuses} from '@constants/loading-statuses'

import {IntegrationsModel} from './integrations.model'
import {useClassNames} from './integrations.style'

export const Integrations = observer(({productId}) => {
  const classNames = useClassNames()
  const history = useHistory()
  const model = useRef(new IntegrationsModel({history, productId}))

  useEffect(() => {
    model.current.loadData()
  }, [])

  const {getCurrentData, requestStatus, columnsModel} = model.current

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
      />
    </div>
  )
})
