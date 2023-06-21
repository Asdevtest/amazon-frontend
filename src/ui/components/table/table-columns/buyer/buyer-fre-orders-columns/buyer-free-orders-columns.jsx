import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  OrderCell,
  MultilineTextCell,
  NormDateCell,
  NormalActionBtnCell,
  UserLinkCell,
  MultilineTextHeaderCell,
  DownloadAndCopyBtnsCell,
  MultilineTextAlignLeftCell,
  IconHeaderCell,
  PriorityAndChinaDeliverCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { formatDate, getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { timeToDeadlineInHoursAndMins, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const buyerFreeOrdersViewColumns = handlers => [
  {
    field: 'ID',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

    width: 100,
    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
  },

  {
    field: 'priorityAndChinaDelivery',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <IconHeaderCell url={'/assets/icons/bookmark.svg'} />,
    width: 60,
    renderCell: params => (
      <PriorityAndChinaDeliverCell
        priority={params.row.originalData.priority}
        chinaDelivery={params.row.originalData.expressChinaDelivery}
        status={params.row.originalData.status}
      />
    ),
    sortable: false,
    filterable: false,
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
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
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
    field: 'totalPrice',
    headerName: t(TranslationKey.Price),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.row.originalData.totalPrice, 2)} />,
    type: 'number',
    width: 90,
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    width: 200,
    renderCell: params => (
      <DownloadAndCopyBtnsCell value={params.value} isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id} />
    ),
  },

  {
    field: 'productionTerm',
    headerName: t(TranslationKey['Production time']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,

    renderCell: params => <MultilineTextCell text={params.row?.originalData?.orderSupplier?.productionTerm} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'deadline',
    headerName: 'Deadline',
    renderHeader: () => <MultilineTextHeaderCell text={'Deadline'} />,

    renderCell: params => (
      // <MultilineTextCell
      //   withLineBreaks
      //   tooltipText={formatNormDateTime(params.value)}
      //   color={params.value && getDistanceBetweenDatesInSeconds(params.value) < 86400 ? '#FF1616' : null}
      //   text={params.value ? timeToDeadlineInHoursAndMins({date: params.value}) : ''}
      // />
      <MultilineTextCell
        withLineBreaks
        tooltipText={params.value ? timeToDeadlineInHoursAndMins({ date: params.value }) : ''}
        color={params.value && getDistanceBetweenDatesInSeconds(params.value) < 86400 ? '#FF1616' : null}
        text={params.value ? formatDate(params.value) : ''}
      />
    ),
    width: 200,
  },

  {
    field: 'needsResearch',
    headerName: t(TranslationKey['Re-search supplier']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Re-search supplier'])} />,

    width: 100,
    renderCell: params => <MultilineTextCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
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

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,
    // type: 'date',
  },
]
