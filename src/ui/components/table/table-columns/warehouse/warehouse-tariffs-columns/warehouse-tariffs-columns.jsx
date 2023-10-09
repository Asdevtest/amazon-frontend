import { TranslationKey } from '@constants/translations/translation-key'

import {
  EditOrRemoveIconBtnsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ScrollingCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const warehouseTariffsColumns = handlers => [
  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    width: 250,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,
    // type: 'date',
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

    width: 600,
    renderCell: params => <ScrollingCell value={params.value} />,
  },

  {
    field: 'price',
    headerName: t(TranslationKey['Service cost per kg, $']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Service cost per kg, $'])} />,

    type: 'number',
    width: 250,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 250,
    renderCell: (
      params, // <EditOrRemoveBtnsCell handlers={handlers} row={params.row} />
    ) => (
      <EditOrRemoveIconBtnsCell
        tooltipFirstButton={t(TranslationKey.Edit)}
        tooltipSecondButton={t(TranslationKey.Remove)}
        handlers={handlers}
        row={params.row}
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
      />
    ),

    filterable: false,
    sortable: false,
  },
]
