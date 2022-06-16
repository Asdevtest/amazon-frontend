import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  EditOrRemoveBtnsCell,
  MultilineTextHeaderCell,
  renderFieldValueCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const destinationsColumns = handlers => [
  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'country',
    headerName: t(TranslationKey.Country),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Country)} />,

    width: 140,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'zipCode',
    headerName: t(TranslationKey['ZIP code']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ZIP code'])} />,

    width: 90,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'city',
    headerName: t(TranslationKey.City),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.City)} />,

    width: 200,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'state',
    headerName: t(TranslationKey.State),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.State)} />,

    width: 170,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'address',
    headerName: t(TranslationKey.Address),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Address)} />,

    width: 350,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    width: 250,
    renderCell: params => <EditOrRemoveBtnsCell handlers={handlers} row={params.row} />,
    filterable: false,
    sortable: false,
  },
]
