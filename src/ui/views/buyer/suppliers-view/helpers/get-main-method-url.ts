import { TableView } from '../suppliers-view.type'

export const getMainMethodUrl = (activeTable: TableView) => {
  switch (activeTable) {
    case TableView.SUPLLIERS:
      return 'v2/suppliers?'
    case TableView.CARDS:
      return 'v2/cards?'
  }
}
