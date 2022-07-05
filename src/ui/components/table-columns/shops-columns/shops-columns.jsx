import {TranslationKey} from '@constants/translations/translation-key'

import {
  EditOrRemoveBtnsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ShopsReportBtnsCell,
  ShortDateCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const shopsColumns = handlers => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    minWidth: 150,
    renderCell: params => <ShortDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    width: 300,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'sellerBoardWarehouseReportUrlDaily',
    headerName: t(TranslationKey['Warehouse report']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Warehouse report'])} />,

    width: 350,
    renderCell: params => (
      <ShopsReportBtnsCell value={params.value} onClickSeeMore={() => handlers.onClickSeeStockReport(params.row)} />
    ),
  },

  {
    field: 'sellerBoardWarehouseReportUrlMonthly',
    headerName: t(TranslationKey['Dashboard by goods/days']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Dashboard by goods/days'])} />,

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
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    width: 300,
    renderCell: params => <EditOrRemoveBtnsCell handlers={handlers} row={params.row} />,
    filterable: false,
    sortable: false,
  },
]
