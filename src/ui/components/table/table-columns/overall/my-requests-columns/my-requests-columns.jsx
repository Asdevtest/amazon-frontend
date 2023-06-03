import React from 'react'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  AsinCell,
  MultilineRequestStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ShortDateCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const myRequestsViewColumns = (getColumnMenuSettings, getOnHover) => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Updated)}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        // isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 117,
    // type: 'date',
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.ID)}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
      />
    ),

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 62,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Status)}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineRequestStatusCell /* languageTag={languageTag} */ status={params.value} />,
    width: 161,
    filterable: false,

    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Title)}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
      />
    ),

    renderCell: params => (
      <MultilineTextCell withTooltip leftAlign threeLines={params.value.length > 50} text={params.value} />
    ),
    width: 228,
  },

  {
    field: 'typeTask',
    headerName: t(TranslationKey['Request type']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Request type'])}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => (
      <MultilineTextCell leftAlign text={freelanceRequestTypeTranslate(freelanceRequestTypeByCode[params.value])} />
    ),
    width: 146,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.ASIN)}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
      />
    ),

    renderCell: params => <AsinCell asin={params.row.originalData.asin} />,
    width: 123,
  },

  {
    field: 'price',
    headerName: t(TranslationKey.Cost),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Cost)}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
      />
    ),

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    width: 115,
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Deadline)}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
      />
    ),

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 115,
    // type: 'date',
  },

  {
    field: 'allProposals',
    headerName: t(TranslationKey['Total proposals']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Total proposals'])}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
      />
    ), // ПРИМЕР МНОГОСТРОЧНОГО ХЕДЕРА
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 115,
  },

  {
    field: 'verifyingProposals',
    headerName: t(TranslationKey['Waiting selection']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Waiting selection'])}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
      />
    ),

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 85,
  },

  {
    field: 'atWorkProposals',
    headerName: t(TranslationKey['In the work']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['In the work'])}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
      />
    ),

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 80,
  },

  {
    field: 'waitedProposals',
    headerName: t(TranslationKey['Waiting check']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Waiting check'])}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
      />
    ),

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 85,
  },

  {
    field: 'acceptedProposals',
    headerName: t(TranslationKey.Accepted),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Accepted)}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
      />
    ),

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 85,
  },
]
