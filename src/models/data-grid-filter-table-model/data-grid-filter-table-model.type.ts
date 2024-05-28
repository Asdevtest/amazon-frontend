/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGridTableModelParams } from '@models/data-grid-table-model/data-grid-table-model.type'

export interface DataGridFilterTableModelParams extends DataGridTableModelParams {
  filtersFields: string[]
  mainMethodURL: string
  fieldsForSearch?: string[]
  additionalPropertiesColumnMenuSettings?: any
  additionalPropertiesGetFilters?: any
  operatorsSettings?: {
    [key: string]: string
  }
}
