import { GridPagination, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'

import { useStyles } from './data-grid-custom-toolbar.style'

import { DataGridResetFilterButton } from '../data-grid-reset-filter-button'
import { DataGridTableSetting } from '../data-grid-table-setting'

export const DataGridCustomToolbar = ({
  resetFiltersBtnSettings,
  columsBtnSettings,
  children,
  presetsSettings,
  ...other
}) => {
  const { classes: styles } = useStyles()

  return (
    <GridToolbarContainer className={styles.toolbar} {...other}>
      <div className={styles.buttons}>
        {!!columsBtnSettings && (
          <DataGridTableSetting presetsSettings={presetsSettings} columsBtnSettings={columsBtnSettings} />
        )}

        <GridToolbarExport size={'large'} className={styles.text} />

        {!!resetFiltersBtnSettings?.isSomeFilterOn && (
          <DataGridResetFilterButton
            size={'large'}
            className={styles.text}
            resetFiltersBtnSettings={resetFiltersBtnSettings}
          />
        )}
      </div>

      <div className={styles.buttons}>
        {children}
        <GridPagination />
      </div>
    </GridToolbarContainer>
  )
}
