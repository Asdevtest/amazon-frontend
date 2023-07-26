import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { GridCellParams } from '@mui/x-data-grid'

import { t } from '@utils/translations'

export const SupplierWeightBasedApproximateCalculationsFormColumns = () => [
  {
    field: 'name',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
    width: 125,
    renderCell: (params: GridCellParams) => <MultilineTextCell text={params.value} />,
  },
]
