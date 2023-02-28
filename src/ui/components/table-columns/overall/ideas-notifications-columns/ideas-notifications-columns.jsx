/* eslint-disable no-unused-vars */
import React from 'react'

import {colorByIdeaStatus, ideaStatusByCode} from '@constants/idea-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  MultilineTextCell,
  UserLinkCell,
  NormalActionBtnCell,
  ProductAsinCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const ideasNotificationsViewColumns = handlers => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 325,
    renderCell: params => (
      <NormalActionBtnCell
        bTnText={t(TranslationKey.View)}
        onClickOkBtn={() => handlers.onClickViewBtn(params?.row?.product?._id)}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'product',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    renderCell: params => <ProductAsinCell product={params?.row?.originalData?.product} />,
    width: 300,
    // columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'createdByName',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

    renderCell: params => (
      <UserLinkCell blackText name={params?.value} userId={params?.row?.originalData?.createdBy._id} />
    ),
    width: 160,
  },

  {
    field: 'status',
    headerName: t(TranslationKey['Idea Status']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Idea Status'])} />,

    renderCell: params => (
      <MultilineTextCell
        text={params?.value}
        color={colorByIdeaStatus(ideaStatusByCode[params.row.originalData.idea.status])}
      />
    ),
    width: 200,
  },

  {
    field: 'productName',
    headerName: t(TranslationKey['Name idea']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Name idea'])} />,

    renderCell: params => <MultilineTextCell text={params?.row?.productName} />,
    width: 200,
  },
]
