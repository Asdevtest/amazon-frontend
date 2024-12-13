import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
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

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

export const freelancerVacantRequestColumns = handlers => [
  {
    field: 'priority',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <MultilineTextHeaderCell textCenter component={<img src="/assets/icons/bookmark.svg" />} />,
    width: 80,
    renderCell: params => (
      <PriorityAndChinaDeliverCell
        isRequest
        priority={params.row.priority}
        onClickOpenInNewTab={() => handlers.onClickOpenInNewTab(params.row._id)}
      />
    ),

    filterable: false,
  },

  {
    field: 'taskComplexity',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Category)} />,
    headerName: t(TranslationKey.Category),

    renderCell: params => (
      <Text
        isCell
        text={difficultyLevelTranslate(difficultyLevelByCode[params.value])}
        color={colorByDifficultyLevel(difficultyLevelByCode[params.value])}
      />
    ),
    width: 95,
    columnKey: columnnsKeys.shared.TASK_COMPLEXITY,
  },

  {
    field: 'title',
    headerName: t(TranslationKey['Request title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
    renderCell: params => <Text isCell text={params.value} />,
    width: 110,

    columnKey: columnnsKeys.shared.STRING_VALUE,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    renderCell: params => {
      const product = params.row?.product

      return (
        <ProductCell
          image={product?.images?.[0]}
          title={product?.amazonTitle}
          asin={product?.asin}
          sku={product?.skuByClient}
        />
      )
    },

    width: 170,
    fields: getProductColumnMenuItems({ withoutSku: true }),
    columnMenuConfig: getProductColumnMenuValue(),
    columnKey: columnnsKeys.shared.MULTIPLE,
    disableCustomSort: true,
  },

  {
    field: 'xid',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => <Text isCell text={params.value} />,
    width: 70,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
    width: 145,
    renderCell: params => (
      <UserCell name={params.row.createdBy.name} id={params.row.createdBy._id} email={params.row.createdBy.email} />
    ),

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'price',
    headerName: t(TranslationKey['Request price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request price'])} />,

    renderCell: params => <Text isCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    width: 96,
    sortable: false,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: params => (
      <Text isCell text={MyRequestStatusTranslate(params.value)} color={colorByStatus(params.value)} />
    ),
    width: 120,

    columnKey: columnnsKeys.client.FREELANCE_MY_REQUESTS,
  },

  {
    field: 'spec',
    headerName: t(TranslationKey['Request type']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
    renderCell: params => <Text isCell text={params.row.spec?.title} />,
    width: 110,
    sortable: false,
    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    width: 87,

    columnKey: columnnsKeys.shared.DATE_VALUE,
  },

  {
    field: 'deadline',
    headerName: t(TranslationKey['Time till deadline']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Time till deadline'])} />,

    renderCell: params => <Text isCell text={timeToDeadlineInDaysAndHours({ date: params.row.timeoutAt })} />,
    width: 80,
  },

  {
    field: 'shop',
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

    renderCell: params => <Text isCell text={params.row.product?.shop?.name || t(TranslationKey.Missing)} />,
    width: 110,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'announcement',
    headerName: t(TranslationKey.Announcement),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Announcement)} />,

    renderCell: params => <Text isCell text={params.row.announcement?.title || t(TranslationKey.Missing)} />,
    width: 130,

    columnKey: columnnsKeys.shared.OBJECT,
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
        email={row.proposals?.[0]?.sub?.email || row.announcement?.createdBy?.email}
      />
    ),

    fields: [
      {
        label: 'By proposal',
        value: 0,
      },
      {
        label: 'By announcement',
        value: 1,
      },
    ],

    columnMenuConfig: [
      {
        field: 'proposalSub',
        table: DataGridFilterTables.REQUESTS,
        columnKey: ColumnMenuKeys.OBJECT,
      },
      {
        field: 'announcementCreatedBy',
        table: DataGridFilterTables.REQUESTS,
        columnKey: ColumnMenuKeys.OBJECT,
      },
    ],

    columnKey: columnnsKeys.shared.MULTIPLE,
    disableCustomSort: true,
  },

  {
    field: 'cashBackInPercent',
    headerName: t(TranslationKey.CashBack),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.CashBack)} />,

    renderCell: params => <Text isCell text={toFixed(params.row.cashBackInPercent, 2) + ' %'} />,
    width: 90,
  },

  {
    field: 'priceAmazon',
    headerName: t(TranslationKey['Product price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Product price'])} />,

    renderCell: params => (
      <VacantRequestPriceCell price={params.row.priceAmazon} cashBackInPercent={params.row.cashBackInPercent} />
    ),
    width: 127,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'maxAmountOfProposals',
    headerName: t(TranslationKey['Remaining offers']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Remaining offers'])} />,

    renderCell: params => (
      <Text
        isCell
        text={`${params.row.maxAmountOfProposals - params.row.countProposalsByStatuses.acceptedProposals} ${t(
          TranslationKey['out of'],
        )} ${params.row.maxAmountOfProposals}`}
      />
    ),
    width: 115,
  },

  {
    field: 'withoutConfirmation',
    headerName: t(TranslationKey['To work without confirmation']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['To work without confirmation'])} />,
    renderCell: params => <Text isCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
    width: 140,
    columnKey: columnnsKeys.freelancer.FREELANCE_REQUESTS_CONFIRMATION,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    width: 105,
    columnKey: columnnsKeys.shared.DATE_VALUE,
  },
]
