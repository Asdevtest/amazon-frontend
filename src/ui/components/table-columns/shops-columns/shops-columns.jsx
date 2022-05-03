import {texts} from '@constants/texts'

import {
  EditOrRemoveBtnsCell,
  renderFieldValueCell,
  ShopsReportBtnsCell,
  ShortDateCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').shopsTableColumns

export const shopsColumns = handlers => [
  {
    field: 'updatedAt',
    headerName: textConsts.updateDateField,
    minWidth: 120,
    renderCell: params => <ShortDateCell params={params} />,
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
    renderCell: params => (
      <ShopsReportBtnsCell value={params.value} onClickSeeMore={() => handlers.onClickSeeStockReport(params.row)} />
    ),
  },

  {
    field: 'sellerBoardWarehouseReportUrlMonthly',
    headerName: textConsts.dashboardField,
    width: 350,
    renderCell: params => (
      <ShopsReportBtnsCell
        value={params.value}
        onClickSeeMore={() => handlers.onClickSeeGoodsDailyReport(params.row)}
      />
    ),
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
