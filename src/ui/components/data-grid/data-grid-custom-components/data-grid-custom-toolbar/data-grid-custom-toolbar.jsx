import { GridPagination, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'

import { useStyles } from './data-grid-custom-toolbar.style'

import { DataGridCustomColumnsButton } from '../data-grid-custom-columns-button'
import { DataGridResetFilterButton } from '../data-grid-reset-filter-button'

export const DataGridCustomToolbar = ({ resetFiltersBtnSettings, columsBtnSettings, children, ...restProps }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <GridToolbarContainer className={styles.toolbar} {...restProps}>
      {columsBtnSettings && (
        <div className={styles.buttons}>
          <DataGridCustomColumnsButton size={'large'} className={styles.text} columsBtnSettings={columsBtnSettings} />

          <GridToolbarExport size={'large'} className={styles.text} />

          {resetFiltersBtnSettings?.isSomeFilterOn && (
            <DataGridResetFilterButton
              size={'large'}
              className={styles.text}
              resetFiltersBtnSettings={resetFiltersBtnSettings}
            />
          )}
        </div>
      )}

      <div className={cx(styles.buttons, { [styles.fullWidth]: !columsBtnSettings })}>
        {children}
        <GridPagination />
      </div>
    </GridToolbarContainer>
  )
}
