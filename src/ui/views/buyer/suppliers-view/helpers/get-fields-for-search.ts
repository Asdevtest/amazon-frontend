import { TableView } from '../suppliers-view.type'

export const getFieldsForSearch = (activeTable: TableView) => {
  switch (activeTable) {
    case TableView.SUPLLIERS:
      return ['companyName', 'xid']
    case TableView.CARDS:
      return ['cardName', 'xid']
  }
}
