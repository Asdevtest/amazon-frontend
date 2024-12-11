import { makeObservable, runInAction } from 'mobx'

import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { DataGridFilterTableModelParams } from '@models/data-grid-filter-table-model/data-grid-filter-table-model.type'
import { defaultPinnedColumns, paginationModelInitialValue } from '@models/data-grid-table-model/model-config'

import { IGridColumn } from '@typings/shared/grid-column'
import { ITag } from '@typings/shared/tag'

import { observerConfig } from './observer-config'

export class DataGridTagsFilter extends DataGridFilterTableModel {
  constructor(params: DataGridFilterTableModelParams) {
    super(params)

    makeObservable(this, observerConfig)
  }

  setActiveProductsTag(tags: ITag[]) {
    this.columnMenuSettings?.onChangeFullFieldMenuItem(tags, 'tags')
    this.columnMenuSettings?.onClickAccept()
  }

  setActiveProductsTagFromTable(tag: ITag) {
    const index = this.columnMenuSettings?.tags?.currentFilterData?.findIndex(
      (currentTag: ITag) => currentTag?._id === tag?._id,
    )

    const newTags = [...this.columnMenuSettings.tags.currentFilterData]

    if (index > -1) {
      newTags.splice(index, 1)
    } else {
      newTags.push(tag?._id)
    }

    this.setActiveProductsTag(newTags)
  }

  async setSettingsFromActivePreset() {
    const activePreset = this.getActivePreset()

    if (activePreset) {
      const savedColumns: IGridColumn[] = []
      const defaultColumnsModel = [...this.defaultColumnsModel]
      const visibilityModel = activePreset?.settings?.columnVisibilityModel
      for (const field of activePreset.settings.fields) {
        const foundColumnIndex = defaultColumnsModel?.findIndex(column => column?.field === field?.field)
        const foundColumn = defaultColumnsModel?.[foundColumnIndex]

        if (foundColumn) {
          foundColumn.width = field?.width
        } else {
          continue
        }

        savedColumns.push(foundColumn)
        defaultColumnsModel.splice(foundColumnIndex, 1)
      }

      if (defaultColumnsModel.length > 0) {
        savedColumns?.push(...defaultColumnsModel)

        for (const column of defaultColumnsModel) {
          visibilityModel[column.field] = false
        }
      }

      const parsedValue = this.parseQueryString(activePreset?.settings?.filters)

      this.setColumnMenuSettings(this.filtersFields, this.additionalPropertiesColumnMenuSettings)

      this.setFilterFromPreset(parsedValue)

      runInAction(() => {
        this.columnsModel = savedColumns
        this.sortModel = activePreset?.settings?.sortModel
        this.pinnedColumns = activePreset?.settings?.pinnedColumns
        this.paginationModel = activePreset?.settings?.paginationModel
        this.columnVisibilityModel = visibilityModel
      })
    } else {
      this.handlePinColumn(defaultPinnedColumns)

      const savedColumns: IGridColumn[] = await this.defaultColumnsModel?.map(column => ({
        ...column,
      }))

      this.currentSearchValue = ''
      this.setColumnMenuSettings(this.filtersFields, this.additionalPropertiesColumnMenuSettings)

      runInAction(() => {
        this.columnsModel = savedColumns
        this.sortModel = this.defaultSortModel
        this.paginationModel = paginationModelInitialValue
        this.columnVisibilityModel = this.defaultColumnVisibilityModel || {}
      })
    }

    this.useOneTimeFilter()

    this.columnMenuSettings?.onClickFilterBtn('tags', DataGridFilterTables.PRODUCTS)
    this.getCurrentData()
  }
}
