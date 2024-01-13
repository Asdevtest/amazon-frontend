import { GridPagination, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'

import { useStyles } from './data-grid-custom-toolbar.style'

import { DataGridCustomColumnsButton } from '../data-grid-custom-columns-button'
import { DataGridResetFilterButton } from '../data-grid-reset-filter-button'

export const DataGridCustomToolbar = ({ resetFiltersBtnSettings, columsBtnSettings, children, ...other }) => {
  const { classes: styles } = useStyles()

  return (
    <GridToolbarContainer className={styles.toolbar} {...other}>
      <div className={styles.buttons}>
        {columsBtnSettings ? (
          <DataGridCustomColumnsButton size={'large'} className={styles.text} columsBtnSettings={columsBtnSettings} />
        ) : null}

        <GridToolbarExport size={'large'} className={styles.text} />

        {resetFiltersBtnSettings?.isSomeFilterOn ? (
          <DataGridResetFilterButton
            size={'large'}
            className={styles.text}
            resetFiltersBtnSettings={resetFiltersBtnSettings}
          />
        ) : null}
      </div>

      <div className={styles.buttons}>
        {children}
        <GridPagination />
      </div>
    </GridToolbarContainer>
  )
}
