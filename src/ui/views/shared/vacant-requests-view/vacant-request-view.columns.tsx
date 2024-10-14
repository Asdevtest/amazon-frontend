import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import {
  colorByDifficultyLevel,
  difficultyLevelByCode,
  difficultyLevelTranslate,
} from '@constants/statuses/difficulty-level'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  PriorityAndChinaDeliverCell,
  ProductCell,
  UserCell,
  VacantRequestPriceCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { timeToDeadlineInDaysAndHours, toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

import { ColumnsProps } from './vacant-requests-view.type'

export const vacantRequestColumns = ({ onClickOpenInNewTab }: ColumnsProps) => {
  const columns: IGridColumn[] = [
    {
      field: 'priority',
      headerName: t(TranslationKey.Priority),
      renderHeader: () => <MultilineTextHeaderCell component={<img src="/assets/icons/bookmark.svg" />} />,

      renderCell: ({ row }) => (
        <PriorityAndChinaDeliverCell
          isRequest
          priority={row.priority}
          onClickOpenInNewTab={() => onClickOpenInNewTab(row._id)}
        />
      ),
      width: 80,
      filterable: false,
    },

    {
      field: 'taskComplexity',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Category)} />,
      headerName: t(TranslationKey.Category),
      renderCell: ({ row }) => (
        <Text
          isCell
          text={difficultyLevelTranslate(difficultyLevelByCode[row.taskComplexity])}
          color={colorByDifficultyLevel(difficultyLevelByCode[row.taskComplexity])}
        />
      ),
      width: 95,
      columnKey: columnnsKeys.shared.TASK_COMPLEXITY,
    },

    {
      field: 'title',
      headerName: t(TranslationKey['Request title']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
      renderCell: ({ row }) => <Text isCell text={row.title} />,
      width: 110,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
      renderCell: ({ row }) => (
        <ProductCell
          image={row?.product?.images?.[0]}
          title={row?.product?.amazonTitle}
          asin={row?.product?.asin}
          sku={row?.product?.skuByClient}
        />
      ),
      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue(),
      columnKey: columnnsKeys.shared.MULTIPLE,
      width: 170,
    },

    {
      field: 'xid',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: ({ row }) => <Text isCell text={row.xid} />,
      width: 70,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'createdBy',
      headerName: t(TranslationKey.Client),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
      renderCell: ({ row }) => <UserCell name={row.createdBy?.name} id={row.createdBy?._id} />,

      width: 145,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'price',
      headerName: t(TranslationKey['Request price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request price'])} />,
      renderCell: ({ row }) => <Text isCell text={toFixedWithDollarSign(row.price, 2)} />,
      width: 100,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: ({ row }) => (
        <Text isCell text={MyRequestStatusTranslate(row.status)} color={colorByStatus(row.status)} />
      ),
      width: 120,
      columnKey: columnnsKeys.client.FREELANCE_MY_REQUESTS,
    },

    {
      field: 'spec',
      headerName: t(TranslationKey['Request type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
      renderCell: ({ row }) => <Text isCell text={row.spec?.title} />,
      width: 110,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'timeoutAt',
      headerName: t(TranslationKey.Deadline),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
      renderCell: ({ row }) => <NormDateCell value={row.timeoutAt} />,
      width: 87,
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'deadline',
      headerName: t(TranslationKey['Time till deadline']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Time till deadline'])} />,
      renderCell: ({ row }) => <Text isCell text={timeToDeadlineInDaysAndHours({ date: row.timeoutAt })} />,
      width: 80,
      filterable: false,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: ({ row }) => <Text isCell text={row.product?.shop?.name || t(TranslationKey.Missing)} />,
      width: 110,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'announcement',
      headerName: t(TranslationKey.Announcement),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Announcement)} />,

      renderCell: ({ row }) => <Text isCell text={row.announcement?.title || t(TranslationKey.Missing)} />,
      width: 130,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'proposalSub',
      headerName: t(TranslationKey.Performer),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Performer)} />,
      width: 145,
      renderCell: ({ row }) => (
        <UserCell
          name={row.proposals?.[0]?.sub?.name || row.announcement?.createdBy?.name}
          id={row.proposals?.[0]?.sub?._id || row.announcement?.createdBy?._id}
        />
      ),
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'cashBackInPercent',
      headerName: t(TranslationKey.CashBack),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.CashBack)} />,
      renderCell: ({ row }) => <Text isCell text={toFixed(row.cashBackInPercent, 2) + ' %'} />,
      width: 90,
      filterable: false,
    },

    {
      field: 'priceAmazon',
      headerName: t(TranslationKey['Product price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Product price'])} />,
      renderCell: ({ row }) => (
        <VacantRequestPriceCell price={row.priceAmazon} cashBackInPercent={row.cashBackInPercent} />
      ),
      width: 130,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'maxAmountOfProposals',
      headerName: t(TranslationKey['Remaining offers']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Remaining offers'])} />,
      renderCell: ({ row }) => {
        const text = `${row.maxAmountOfProposals - row.countProposalsByStatuses.acceptedProposals} ${t(
          TranslationKey['out of'],
        )} ${row.maxAmountOfProposals}`

        return <Text isCell text={text} />
      },
      width: 115,
      filterable: false,
    },

    {
      field: 'withoutConfirmation',
      headerName: t(TranslationKey['To work without confirmation']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['To work without confirmation'])} />,
      renderCell: ({ row }) => (
        <Text isCell text={row.withoutConfirmation ? t(TranslationKey.Yes) : t(TranslationKey.No)} />
      ),
      width: 140,
      columnKey: columnnsKeys.freelancer.FREELANCE_REQUESTS_CONFIRMATION,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }) => <NormDateCell value={row.updatedAt} />,
      width: 105,
      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.REQUESTS
    }

    column.sortable = false
  }

  return columns
}
