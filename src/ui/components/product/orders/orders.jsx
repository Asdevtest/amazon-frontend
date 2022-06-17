import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {useEffect, useRef} from 'react'

import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {loadingStatuses} from '@constants/loading-statuses'

import {SettingsModel} from '@models/settings-model'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'

import {OrdersModel} from './orders.model'
import {useClassNames} from './orders.style'

export const Orders = observer(({productId}) => {
  const classNames = useClassNames()
  const history = useHistory()
  const model = useRef(new OrdersModel({history, productId}))

  const {getCurrentData, requestStatus, columnsModel, onClickTableRow, updateColumnsModel} = model.current

  useEffect(() => {
    model.current.loadData()
  }, [])

  useEffect(() => {
    updateColumnsModel()
  }, [SettingsModel.languageTag])

  return (
    <div className={classNames.mainWrapper}>
      <DataGrid
        pagination
        useResizeContainer
        localeText={getLocalizationByLanguageTag()}
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
