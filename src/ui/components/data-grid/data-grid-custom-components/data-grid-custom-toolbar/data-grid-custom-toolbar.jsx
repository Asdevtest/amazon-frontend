import { GridPagination, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'

import { useStyles } from './data-grid-custom-toolbar.style'

import { PresetsMenu } from '../data-grid-presets'
import { DataGridResetFilterButton } from '../data-grid-reset-filter-button'
import { DataGridTableSetting } from '../data-grid-table-setting'
import { QuickPresets } from '../quick-presets'
import { SelectedTags } from '../selected-tags'
import { SortSettings } from '../sort-settings'
import { TagSearch } from '../tag-search'

export const DataGridCustomToolbar = props => {
  const {
    resetFiltersBtnSettings,
    columsBtnSettings,
    children,
    presetsSettings,
    sortSettings,
    tagSearchSettings,
    tablePresets,
    excelOptions,
    ...restProps
  } = props

  const { classes: styles, cx } = useStyles()

  return (
    <GridToolbarContainer className={styles.wrapperToolbar} {...restProps}>
      <div className={styles.toolbar}>
        {(!!columsBtnSettings || !!presetsSettings) && (
          <div className={styles.buttons}>
            <DataGridTableSetting presetsSettings={presetsSettings} columsBtnSettings={columsBtnSettings} />

            <GridToolbarExport
              className={cx(styles.text, styles.exportButton)}
              excelOptions={excelOptions || { disableToolbarButton: true }}
            />

            {sortSettings ? <SortSettings {...sortSettings} /> : null}

            {tagSearchSettings ? <TagSearch {...tagSearchSettings} /> : null}

            {tablePresets ? <PresetsMenu {...tablePresets} /> : null}

            {!!resetFiltersBtnSettings?.isSomeFilterOn && (
              <DataGridResetFilterButton
                size="large"
                className={styles.text}
                resetFiltersBtnSettings={resetFiltersBtnSettings}
              />
            )}
          </div>
        )}

        <div
          className={cx(styles.buttons, {
            [styles.fullWidth]: !columsBtnSettings,
            [styles.flexEnd]: !children,
          })}
        >
          {children}
          <GridPagination />
        </div>
      </div>

      {tagSearchSettings?.activeTags ? (
        <SelectedTags
          activeTags={tagSearchSettings?.activeTags}
          setActiveProductsTag={tagSearchSettings?.setActiveProductsTag}
        />
      ) : null}

      {tablePresets ? <QuickPresets {...tablePresets} /> : null}
    </GridToolbarContainer>
  )
}
