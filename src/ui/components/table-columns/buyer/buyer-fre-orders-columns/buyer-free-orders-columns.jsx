import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  OrderCell,
  MultilineTextCell,
  NormDateCell,
  NormalActionBtnCell,
  UserLinkCell,
  MultilineTextHeaderCell,
  DownloadAndCopyBtnsCell,
  MultilineTextAlignLeftCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const buyerFreeOrdersViewColumns = (handlers, firstRowId) => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 120,
    type: 'date',
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 200,
    renderCell: params => (
      <NormalActionBtnCell
        tooltipText={t(TranslationKey['To assign the order to Byer'])}
        bTnText={t(TranslationKey['Get to work'])}
        isFirstRow={firstRowId === params.row.id}
        onClickOkBtn={() => handlers.onClickTableRowBtn(params.row)}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'asin',
    headerName: 'ASIN',
    renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,

    width: 400,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 150,
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    width: 200,
    renderCell: params => <DownloadAndCopyBtnsCell value={params.value} isFirstRow={firstRowId === params.row.id} />,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey['Int warehouse']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.storekeeper?._id} />
    ),
    width: 200,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.product.client?._id} />
    ),
    width: 200,
  },

  {
    field: 'warehouses',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 200,
  },

  {
    field: 'clientComment',
    headerName: t(TranslationKey['Client comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,

    renderCell: params => <MultilineTextAlignLeftCell withTooltip text={params.value} />,
    width: 400,
  },
]
