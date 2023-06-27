import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells/data-grid-cells'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

export const supplierApproximateCalculationsFormColumns = () => [
  {
    field: 'name',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
    width: 150,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'costDeliveryToChina',
    headerName: t(TranslationKey['Cost per unit with delivery to China']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Cost per unit with delivery to China'])} />,
    width: 250,
    renderCell: params => <MultilineTextCell text={'$ ' + toFixed(params.value, 2)} />,
  },

  {
    field: 'costDeliveryToUsa',
    headerName: t(TranslationKey['Cost of per unit in the U.S.']) + ', $',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Cost of per unit in the U.S.'])} />,
    width: 250,
    renderCell: params => <MultilineTextCell text={'$ ' + toFixed(params.value, 2)} />,
  },

  {
    field: 'roi',
    headerName: t(TranslationKey['ROI calculation']) + ', %',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ROI calculation'])} />,
    width: 140,
    renderCell: params => <MultilineTextCell text={toFixed(params.value, 2) + ' %'} />,
  },
]
