import {texts} from '@constants/texts'

import {
  EditOrRemoveBtnsCell,
  NormDateCell,
  renderFieldValueCell,
  ScrollingLinkCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').shopsTableColumns

export const shopsColumns = handlers => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    minWidth: 130,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updateDateField,
    minWidth: 130,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'name',
    headerName: textConsts.nameField,
    width: 300,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'sellerBoardWarehouseReportUrlDaily',
    headerName: textConsts.warehouseReportField,
    width: 350,
    renderCell: params => <ScrollingLinkCell value={params.value} />,
  },

  {
    field: 'sellerBoardWarehouseReportUrlMonthly',
    headerName: textConsts.dashboardField,
    width: 350,
    renderCell: params => <ScrollingLinkCell value={params.value} />,
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 300,
    renderCell: params => <EditOrRemoveBtnsCell handlers={handlers} row={params.row} />,
    filterable: false,
    sortable: false,
  },
]
