import { TableView } from '../suppliers-view.type'

export const getAdditionalFiltersFields = (activeTable: TableView) => {
  switch (activeTable) {
    case TableView.SUPLLIERS:
      return ['']
    case TableView.CARDS:
      return ['maxProductionTerm']
  }
}
