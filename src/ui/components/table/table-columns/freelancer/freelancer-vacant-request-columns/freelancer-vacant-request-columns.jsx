/* eslint-disable no-unused-vars */
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React from 'react'

import {freelanceRequestTypeByCode, freelanceRequestTypeTranslate} from '@constants/statuses/freelance-request-type'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  ShortDateCell,
  MultilineTextHeaderCell,
  MultilineTextCell,
  MultilineRequestStatusCell,
  UserMiniCell,
  NormalActionBtnCell,
  AsinCell,
  VacantRequestPriceCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import {timeToDeadlineInDaysAndHours, toFixed, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const FreelancerVacantRequestColumns = (handlers, languageTag) => [
  {
    field: 'title',
    headerName: t(TranslationKey['Request title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 159,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 50,
  },

  {
    field: 'name',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
    width: 112,
    renderCell: params => <UserMiniCell userName={params.row.createdBy.name} userId={params.row.createdBy._id} />,
  },

  {
    field: 'price',
    headerName: t(TranslationKey['Request price']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Request price'])} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    width: 96,
    sortable: false,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: params => <MultilineRequestStatusCell languageTag={languageTag} status={params.value} />,
    width: 124,
  },

  {
    field: 'typeTask',
    headerName: t(TranslationKey['Request type']),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,

    renderCell: params => (
      <MultilineTextCell text={freelanceRequestTypeTranslate(freelanceRequestTypeByCode[params.value])} />
    ),
    type: 'number',
    width: 96,
    sortable: false,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,

    renderCell: params => <AsinCell asin={params.row.asin} />,
    width: 128,
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    renderCell: params => <ShortDateCell value={params.value} />,
    width: 87,
    type: 'date',
  },

  {
    field: 'deadline',
    headerName: t(TranslationKey['Time till deadline']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Time till deadline'])} />,

    renderCell: params => (
      <MultilineTextCell withLineBreaks text={timeToDeadlineInDaysAndHours({date: params.row.timeoutAt})} />
    ),
    width: 91,
  },

  {
    field: 'cashBackInPercent',
    headerName: t(TranslationKey.CashBack),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.CashBack)} />,

    renderCell: params => <MultilineTextCell text={toFixed(params.row.cashBackInPercent, 2) + ' %'} />,
    width: 90,
  },

  {
    field: 'productPrice',
    headerName: t(TranslationKey['Product price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Product price'])} />,

    renderCell: params => (
      <VacantRequestPriceCell price={params.row.priceAmazon} cashBackInPercent={params.row.cashBackInPercent} />
    ),
    width: 127,
  },

  {
    field: 'remainingOffers',
    headerName: t(TranslationKey['Remaining offers']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Remaining offers'])} />,

    renderCell: params => (
      <MultilineTextCell
        text={`${params.row.countProposalsByStatuses.acceptedProposals} ${t(TranslationKey['out of'])} ${
          params.row.maxAmountOfProposals
        }`}
      />
    ),
    width: 115,
  },

  {
    field: 'withoutConfirmation',
    headerName: t(TranslationKey['To work without confirmation']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['To work without confirmation'])} />,
    renderCell: params => (
      <MultilineTextCell
        customTextStyles={
          params.value
            ? {
                background: 'linear-gradient(180deg, #00B746 0%, #03A03F 100%)',
                '-webkit-background-clip': 'text',
                '-webkit-text-fill-color': 'transparent',
              }
            : {
                background: 'linear-gradient(180deg, #FF1616 0%, #DF0C0C 100%)',
                '-webkit-background-clip': 'text',
                '-webkit-text-fill-color': 'transparent',
              }
        }
        text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)}
      />
    ),
    width: 140,
    type: 'date',
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => (
      <NormalActionBtnCell
        // disabled={!params.row.batch}
        smallActionBtn
        bTnText={t(TranslationKey.Details)}
        onClickOkBtn={() => handlers.onClickViewMore(params.row._id)}
      />
    ),
    width: 126,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <ShortDateCell value={params.value} />,
    width: 97,
    type: 'date',
  },
]
