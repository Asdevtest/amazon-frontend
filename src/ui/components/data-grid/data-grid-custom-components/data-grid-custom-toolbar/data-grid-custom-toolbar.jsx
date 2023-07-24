/* eslint-disable no-unused-vars */
import React from 'react'

import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  useGridRootProps,
} from '@mui/x-data-grid'

import { useClassNames } from './data-grid-custom-toolbar.style'

import { DataGridCustomColumnsButton } from '../data-grid-custom-columns-button'
import { DataGridCustomFilterButton } from '../data-grid-custom-filter-button'
import { DataGridResetFilterButton } from '../data-grid-reset-filter-button'

export const DataGridCustomToolbar = React.forwardRef((props, ref) => {
  const { classes: classNames } = useClassNames()
  const { className, resetFiltersBtnSettings, columsBtnSettings, ...other } = props
  const rootProps = useGridRootProps()

  if (rootProps.disableColumnFilter && rootProps.disableColumnSelector && rootProps.disableDensitySelector) {
    return null
  }

  return (
    <GridToolbarContainer ref={ref} className={classNames.toolbarContainer} {...other}>
      {!columsBtnSettings ? <GridToolbarColumnsButton size={'large'} className={classNames.toolbarText} /> : null}

      {/* <GridToolbarFilterButton className={classNames.toolbarText} /> */}

      {columsBtnSettings ? (
        <DataGridCustomColumnsButton
          size={'large'}
          className={classNames.toolbarText}
          columsBtnSettings={columsBtnSettings}
        />
      ) : null}

      {/* <GridToolbarDensitySelector size={'large'} className={classNames.toolbarText} /> */}
      <GridToolbarExport size={'large'} className={classNames.toolbarText} />

      {resetFiltersBtnSettings?.isSomeFilterOn ? (
        <DataGridResetFilterButton
          size={'large'}
          className={classNames.toolbarText}
          resetFiltersBtnSettings={resetFiltersBtnSettings}
        />
      ) : null}

      {/* <DataGridCustomFilterButton size={'large'} className={classNames.toolbarText} /> */}
    </GridToolbarContainer>
  )
})
