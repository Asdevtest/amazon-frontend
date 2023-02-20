/* eslint-disable no-unused-vars */
import {
  useGridRootProps,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid'

import React from 'react'

import {DataGridCustomFilterButton} from '../data-grid-custom-filter-button'
import {DataGridResetFilterButton} from '../data-grid-reset-filter-button'
import {useClassNames} from './data-grid-custom-toolbar.style'

export const DataGridCustomToolbar = React.forwardRef((props, ref) => {
  const {classes: classNames} = useClassNames()
  const {className, resetFiltersBtnSettings, ...other} = props
  const rootProps = useGridRootProps()

  if (rootProps.disableColumnFilter && rootProps.disableColumnSelector && rootProps.disableDensitySelector) {
    return null
  }

  // console.log('props', props)
  return (
    <GridToolbarContainer ref={ref} className={classNames.toolbarContainer} {...other}>
      <GridToolbarColumnsButton size={'large'} className={classNames.toolbarText} />
      {/* <GridToolbarFilterButton className={classNames.toolbarText} /> */}

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
