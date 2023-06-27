import React from 'react'

// import {colorByProductStatus, ProductStatusByCode} from '@constants/product-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  EditOrRemoveIconBtnsCell,
  MultilineTextAlignLeftCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const supervisorSettingsViewColumns = handlers => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,

    renderCell: params => <MultilineTextAlignLeftCell isAsin text={params.value} />,
    width: 200,
  },

  {
    field: 'reason',
    headerName: t(TranslationKey.Reason),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reason)} />,

    width: 535,
    renderCell: params => <MultilineTextAlignLeftCell withTooltip text={params.value} />,
  },
  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    width: 150,
    renderCell: params => <EditOrRemoveIconBtnsCell handlers={handlers} row={params.row} />,
    filterable: false,
    sortable: false,
  },
]
