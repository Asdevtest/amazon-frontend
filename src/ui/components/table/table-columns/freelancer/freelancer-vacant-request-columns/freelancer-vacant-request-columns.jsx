import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import {
  colorByDifficultyLevel,
  difficultyLevelByCode,
  difficultyLevelTranslate,
} from '@constants/statuses/difficulty-level'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineRequestStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  PriorityAndChinaDeliverCell,
  ProductAsinCell,
  ShortDateCell,
  UserMiniCell,
  VacantRequestPriceCell,
} from '@components/data-grid/data-grid-cells'

import { timeToDeadlineInDaysAndHours, toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const freelancerVacantRequestColumns = handlers => [
  {
    field: 'priority',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <MultilineTextHeaderCell textCenter component={<img src="/assets/icons/bookmark.svg" />} />,
    minWidth: 80,
    renderCell: params => (
      <PriorityAndChinaDeliverCell
        isRequest
        priority={params.row.originalData.priority}
        onClickOpenInNewTab={() => handlers.onClickOpenInNewTab(params.row._id)}
      />
    ),

    filterable: false,
  },

  {
    field: 'taskComplexity',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Difficulty level'])} />,
    headerName: t(TranslationKey['Difficulty level']),

    renderCell: params => (
      <MultilineTextCell
        text={difficultyLevelTranslate(difficultyLevelByCode[params.value])}
        customTextStyles={{
          color: colorByDifficultyLevel(difficultyLevelByCode[params.value]),
          fontWeight: 600,
        }}
      />
    ),
    minWidth: 95,
    columnKey: columnnsKeys.shared.TASK_COMPLEXITY,
  },

  {
    field: 'title',
    headerName: t(TranslationKey['Request title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
    renderCell: params => <MultilineTextCell threeLines maxLength={56} text={params.value} />,
    minWidth: 110,

    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    renderCell: params => {
      const product = params.row?.product

      return (
        <ProductAsinCell
          image={product?.images?.[0]}
          amazonTitle={product?.amazonTitle}
          asin={product?.asin}
          skuByClient={product?.skuByClient}
        />
      )
    },
    minWidth: 260,

    columnKey: columnnsKeys.freelancer.FREELANCER_VACANT_REQUEST_PRODUCT,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    minWidth: 70,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
    minWidth: 145,
    renderCell: params => <UserMiniCell userName={params.row.createdBy.name} userId={params.row.createdBy._id} />,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'price',
    headerName: t(TranslationKey['Request price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request price'])} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    minWidth: 96,
    sortable: false,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: params => <MultilineRequestStatusCell status={params.value} />,
    minWidth: 120,

    columnKey: columnnsKeys.client.FREELANCE_MY_REQUESTS,
  },

  {
    field: 'spec',
    headerName: t(TranslationKey['Request type']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
    renderCell: params => <MultilineTextCell threeLines text={params.row.spec?.title} />,
    minWidth: 110,
    sortable: false,
    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    renderCell: params => <ShortDateCell value={params.value} />,
    minWidth: 87,

    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'deadline',
    headerName: t(TranslationKey['Time till deadline']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Time till deadline'])} />,

    renderCell: params => (
      <MultilineTextCell withLineBreaks text={timeToDeadlineInDaysAndHours({ date: params.row.timeoutAt })} />
    ),
    minWidth: 80,
  },

  {
    field: 'shop',
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

    renderCell: params => (
      <MultilineTextCell threeLines text={params.row.product?.shop?.name || t(TranslationKey.Missing)} />
    ),
    minWidth: 110,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'announcement',
    headerName: t(TranslationKey.Announcement),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Announcement)} />,

    renderCell: params => <MultilineTextCell text={params.row.announcement?.title || t(TranslationKey.Missing)} />,
    minWidth: 130,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'proposalSub',
    headerName: t(TranslationKey.Performer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Performer)} />,
    minWidth: 145,
    renderCell: ({ row }) => (
      <UserMiniCell userName={row.proposals?.[0]?.sub?.name} userId={row.proposals?.[0]?.sub?._id} />
    ),

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'cashBackInPercent',
    headerName: t(TranslationKey.CashBack),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.CashBack)} />,

    renderCell: params => <MultilineTextCell text={toFixed(params.row.cashBackInPercent, 2) + ' %'} />,
    minWidth: 90,
  },

  {
    field: 'priceAmazon',
    headerName: t(TranslationKey['Product price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Product price'])} />,

    renderCell: params => (
      <VacantRequestPriceCell price={params.row.priceAmazon} cashBackInPercent={params.row.cashBackInPercent} />
    ),
    minWidth: 127,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'maxAmountOfProposals',
    headerName: t(TranslationKey['Remaining offers']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Remaining offers'])} />,

    renderCell: params => (
      <MultilineTextCell
        text={`${params.row.maxAmountOfProposals - params.row.countProposalsByStatuses.acceptedProposals} ${t(
          TranslationKey['out of'],
        )} ${params.row.maxAmountOfProposals}`}
      />
    ),
    minWidth: 115,
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
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }
            : {
                background: 'linear-gradient(180deg, #FF1616 0%, #DF0C0C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }
        }
        text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)}
      />
    ),
    minWidth: 140,
    columnKey: columnnsKeys.freelancer.FREELANCE_REQUESTS_CONFIRMATION,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <ShortDateCell value={params.value} />,
    minWidth: 105,
    columnKey: columnnsKeys.shared.DATE,
  },
]
