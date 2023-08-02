import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  EditOrRemoveIconBtnsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ShopsReportBtnsCell,
  ShortDateCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const shopsColumns = handlers => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    width: 120,
    renderCell: params => <ShortDateCell value={params.value} />,
  },

  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    width: 320,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'sellerBoardWarehouseReportUrlDaily',
    headerName: t(TranslationKey['Warehouse report']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Warehouse report'])} />,

    width: 250,
    renderCell: params => (
      <ShopsReportBtnsCell
        value={params.value}
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        onClickSeeMore={() => handlers.onClickSeeStockReport(params.row)}
      />
    ),
  },

  {
    field: 'sellerBoardWarehouseReportUrlMonthly',
    headerName: t(TranslationKey['Dashboard by goods/days']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Dashboard by goods/days'])} />,

    width: 250,
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

    width: 200,
    renderCell: params => (
      <EditOrRemoveIconBtnsCell
        tooltipFirstButton={t(TranslationKey['Change store name or links to reports'])}
        tooltipSecondButton={t(TranslationKey['Remove a store from your list'])}
        handlers={handlers}
        row={params.row}
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
      />
    ),

    filterable: false,
    sortable: false,
  },
]
