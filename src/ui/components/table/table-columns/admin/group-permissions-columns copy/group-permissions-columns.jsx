import React, { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  EditOrRemoveIconBtnsCell,
  MultilineTextAlignLeftCell,
  MultilineTextAlignLeftHeaderCell,
  ShortDateCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const adminGroupPermissionsColumns = handlers => [
  {
    field: 'key',
    headerName: t(TranslationKey.Key),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Key)} />,

    width: 280,
    renderCell: params => <MultilineTextAlignLeftCell pointer text={params.value} />,
  },

  {
    field: 'role',
    headerName: t(TranslationKey.Role),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Role)} />,

    width: 140,
    renderCell: params => <MultilineTextAlignLeftCell pointer text={params.value} />,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Title)} />,

    width: 200,
    renderCell: params => <MultilineTextAlignLeftCell pointer text={params.value} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Description)} />,

    width: 450,
    renderCell: params => <MultilineTextAlignLeftCell pointer text={params.value} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Actions)} />,

    width: 180,
    renderCell: params => {
      const handlersMemo = useMemo(() => handlers, [])
      const rowMemo = useMemo(() => params.row.originalData, [])

      return (
        <EditOrRemoveIconBtnsCell
          tooltipFirstButton={t(TranslationKey.Edit)}
          tooltipSecondButton={t(TranslationKey.Remove)}
          handlers={handlersMemo}
          row={rowMemo}
          isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        />
      )
    },
    filterable: false,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 110,
    // type: 'date',
  },
]
