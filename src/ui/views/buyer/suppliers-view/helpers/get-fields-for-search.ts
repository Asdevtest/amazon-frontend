import { TableView } from '../suppliers-view.type'

export const getFieldsForSearch = (activeTable: TableView) => {
  switch (activeTable) {
    case TableView.SUPLLIERS:
      return ['name']
    case TableView.CARDS:
      return ['name']
  }
}
