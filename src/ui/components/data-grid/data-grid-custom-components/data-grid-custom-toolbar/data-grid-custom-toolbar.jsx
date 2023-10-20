import { GridPagination, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'

import { useClassNames } from './data-grid-custom-toolbar.style'

import { DataGridCustomColumnsButton } from '../data-grid-custom-columns-button'
import { DataGridResetFilterButton } from '../data-grid-reset-filter-button'

export const DataGridCustomToolbar = ({ resetFiltersBtnSettings, columsBtnSettings, children, ...other }) => {
  const { classes: classNames } = useClassNames()

  return (
    <GridToolbarContainer className={classNames.toolbar} {...other}>
      <div className={classNames.buttons}>
        {columsBtnSettings ? (
          <DataGridCustomColumnsButton
            size={'large'}
            className={classNames.text}
            columsBtnSettings={columsBtnSettings}
          />
        ) : null}

        <GridToolbarExport size={'large'} className={classNames.text} />

        {resetFiltersBtnSettings?.isSomeFilterOn ? (
          <DataGridResetFilterButton
            size={'large'}
            className={classNames.text}
            resetFiltersBtnSettings={resetFiltersBtnSettings}
          />
        ) : null}
      </div>

      <div className={classNames.buttons}>
        {children}
        <GridPagination />
      </div>
    </GridToolbarContainer>
  )
}
