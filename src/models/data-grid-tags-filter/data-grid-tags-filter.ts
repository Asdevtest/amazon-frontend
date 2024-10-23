import { makeObservable } from 'mobx'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { DataGridFilterTableModelParams } from '@models/data-grid-filter-table-model/data-grid-filter-table-model.type'

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
      newTags.push(tag)
    }

    this.setActiveProductsTag(newTags)
  }
}
