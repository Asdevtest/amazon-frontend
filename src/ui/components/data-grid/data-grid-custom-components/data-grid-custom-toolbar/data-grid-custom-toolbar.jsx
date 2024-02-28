import { GridPagination, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'

import { useStyles } from './data-grid-custom-toolbar.style'

import { DataGridResetFilterButton } from '../data-grid-reset-filter-button'
import { DataGridTableSetting } from '../data-grid-table-setting'
import { SortSettings } from '../sort-settings'

export const DataGridCustomToolbar = props => {
  const { resetFiltersBtnSettings, columsBtnSettings, children, presetsSettings, sortSettings, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  return (
    <GridToolbarContainer className={styles.toolbar} {...restProps}>
      {(!!columsBtnSettings || !!presetsSettings) && (
        <div className={styles.buttons}>
          <DataGridTableSetting presetsSettings={presetsSettings} columsBtnSettings={columsBtnSettings} />

          <GridToolbarExport size="large" className={styles.text} />

          {!!resetFiltersBtnSettings?.isSomeFilterOn && (
            <DataGridResetFilterButton
              size="large"
              className={styles.text}
              resetFiltersBtnSettings={resetFiltersBtnSettings}
            />
          )}

          <SortSettings {...sortSettings} />
        </div>
      )}

      <div className={cx(styles.buttons, { [styles.fullWidth]: !columsBtnSettings })}>
        {children}
        <GridPagination />
      </div>
    </GridToolbarContainer>
  )
}
