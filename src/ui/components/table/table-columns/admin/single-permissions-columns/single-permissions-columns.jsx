import { TranslationKey } from '@constants/translations/translation-key'

import {
  EditOrRemoveIconBtnsCell,
  MultilineTextAlignLeftCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ShortDateCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const adminSinglePermissionsColumns = handlers => [
  {
    field: 'key',
    headerName: t(TranslationKey.Key),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Key)} />,

    width: 280,
    renderCell: params => <MultilineTextCell pointer text={params.value} />,
  },

  {
    field: 'role',
    headerName: t(TranslationKey.Role),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Role)} />,

    width: 140,
    renderCell: params => <MultilineTextAlignLeftCell pointer text={params.value} />,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    width: 250,
    renderCell: params => <MultilineTextAlignLeftCell pointer text={params.value} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextCell text={t(TranslationKey.Description)} />,

    width: 450,
    renderCell: params => <MultilineTextAlignLeftCell pointer text={params.value} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    width: 180,
    renderCell: params => (
      <EditOrRemoveIconBtnsCell
        tooltipFirstButton={t(TranslationKey.Edit)}
        tooltipSecondButton={t(TranslationKey.Remove)}
        handlers={handlers}
        row={params.row.originalData}
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
      />
    ),

    filterable: false,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 110,
    // type: 'date',
  },
]
