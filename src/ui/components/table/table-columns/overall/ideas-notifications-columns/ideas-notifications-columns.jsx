/* eslint-disable no-unused-vars */
import React, {useCallback, useMemo} from 'react'

import {colorByIdeaStatus, ideaStatusByCode} from '@constants/statuses/idea-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  MultilineTextCell,
  UserLinkCell,
  NormalActionBtnCell,
  ProductAsinCell,
  ShortDateCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const ideasNotificationsViewColumns = handlers => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 85,
    type: 'date',
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 200,
    renderCell: params => {
      const onClickViewBtn = useCallback(() => handlers.onClickViewBtn(params?.row?.product?._id), [])

      return <NormalActionBtnCell bTnText={t(TranslationKey.View)} onClickOkBtn={onClickViewBtn} />
    },
    filterable: false,
    sortable: false,
  },

  {
    field: 'product',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    renderCell: params => {
      const originalDataMemo = useMemo(() => params?.row?.originalData?.product, [])

      return <ProductAsinCell product={originalDataMemo} />
    },
    width: 300,
    // columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'createdByName',
    headerName: t(TranslationKey['Updated by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Updated by'])} />,

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
    width: 120,
  },

  {
    field: 'productName',
    headerName: t(TranslationKey['Name idea']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Name idea'])} />,

    renderCell: params => <MultilineTextCell leftAlign text={params?.row?.productName} />,
    // width: 200,
    flex: 1,
  },
]
