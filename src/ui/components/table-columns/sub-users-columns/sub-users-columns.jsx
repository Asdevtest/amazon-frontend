import {TranslationKey} from '@constants/translations/translation-key'

import {
  EditOrRemoveBtnsCell,
  MultilineTextHeaderCell,
  renderFieldValueCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const subUsersColumns = handlers => [
  {
    field: 'name',
    headerName: t(TranslationKey.Name),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Name)} />,

    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'email',
    headerName: t(TranslationKey.Email),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Email)} />,

    width: 300,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 320,
    renderCell: params => <EditOrRemoveBtnsCell isSubUsersTable handlers={handlers} row={params.row} />,
    filterable: false,
    sortable: false,
  },
]
