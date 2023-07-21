import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  MultilineTextCell,
  EditOrRemoveIconBtnsCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const destinationsColumns = handlers => [
  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    width: 240,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'country',
    headerName: t(TranslationKey.Country),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Country)} />,

    width: 120,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'zipCode',
    headerName: t(TranslationKey['ZIP code']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ZIP code'])} />,

    width: 100,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'city',
    headerName: t(TranslationKey.City),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.City)} />,

    width: 140,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'state',
    headerName: t(TranslationKey.State),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.State)} />,

    width: 150,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'address',
    headerName: t(TranslationKey.Address),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Address)} />,

    width: 350,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    width: 150,
    renderCell: params => <EditOrRemoveIconBtnsCell isShowButtonText={false} handlers={handlers} row={params.row} />,
    filterable: false,
    sortable: false,
    align: 'center',
  },
]
