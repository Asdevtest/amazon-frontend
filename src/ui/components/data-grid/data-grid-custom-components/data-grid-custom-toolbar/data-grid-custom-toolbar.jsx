import { GridPagination, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'

import { useStyles } from './data-grid-custom-toolbar.style'

import { DataGridResetFilterButton } from '../data-grid-reset-filter-button'
import { DataGridTableSetting } from '../data-grid-table-setting'
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
    ...restProps
  } = props

  const { classes: styles, cx } = useStyles()

  return (
    <GridToolbarContainer className={styles.wrapperToolbar} {...restProps}>
      <div className={styles.toolbar}>
        {(!!columsBtnSettings || !!presetsSettings) && (
          <div className={styles.buttons}>
            <DataGridTableSetting presetsSettings={presetsSettings} columsBtnSettings={columsBtnSettings} />

            <GridToolbarExport size="large" className={styles.text} />

            {sortSettings ? <SortSettings {...sortSettings} /> : null}

            {tagSearchSettings ? <TagSearch {...tagSearchSettings} /> : null}

            {!!resetFiltersBtnSettings?.isSomeFilterOn && (
              <DataGridResetFilterButton
                size="large"
                className={styles.text}
                resetFiltersBtnSettings={resetFiltersBtnSettings}
              />
            )}
          </div>
        )}

        <div className={cx(styles.buttons, { [styles.flexEnd]: !columsBtnSettings })}>
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
    </GridToolbarContainer>
  )
}
