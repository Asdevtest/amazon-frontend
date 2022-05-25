import {TranslationKey} from '@constants/translations/translation-key'

import {
  EditOrRemoveBtnsCell,
  renderFieldValueCell,
  ShopsReportBtnsCell,
  ShortDateCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const shopsColumns = handlers => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    minWidth: 120,
    renderCell: params => <ShortDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    width: 300,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'sellerBoardWarehouseReportUrlDaily',
    headerName: t(TranslationKey['Warehouse report']),
    width: 350,
    renderCell: params => (
      <ShopsReportBtnsCell value={params.value} onClickSeeMore={() => handlers.onClickSeeStockReport(params.row)} />
    ),
  },

  {
    field: 'sellerBoardWarehouseReportUrlMonthly',
    headerName: t(TranslationKey['Dashboard by goods/days']),
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
    headerName: t(TranslationKey.Actions),
    width: 300,
    renderCell: params => <EditOrRemoveBtnsCell handlers={handlers} row={params.row} />,
    filterable: false,
    sortable: false,
  },
]
