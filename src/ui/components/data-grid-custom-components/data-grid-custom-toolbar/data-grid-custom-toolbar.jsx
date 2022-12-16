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

import {useClassNames} from './data-grid-custom-toolbar.style'

export const DataGridCustomToolbar = React.forwardRef((props, ref) => {
  const {classes: classNames} = useClassNames()
  const {className, ...other} = props
  const rootProps = useGridRootProps()

  if (rootProps.disableColumnFilter && rootProps.disableColumnSelector && rootProps.disableDensitySelector) {
    return null
  }

  return (
    <GridToolbarContainer ref={ref} className={classNames.toolbarContainer} {...other}>
      <GridToolbarColumnsButton size={'large'} className={classNames.toolbarText} />
      <GridToolbarFilterButton className={classNames.toolbarText} />

      <GridToolbarDensitySelector size={'large'} className={classNames.toolbarText} />
      <GridToolbarExport size={'large'} className={classNames.toolbarText} />
    </GridToolbarContainer>
  )
})
