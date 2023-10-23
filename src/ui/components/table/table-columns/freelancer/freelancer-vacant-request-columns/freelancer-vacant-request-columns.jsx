import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import {
  colorByDifficultyLevel,
  difficultyLevelByCode,
  difficultyLevelTranslate,
} from '@constants/statuses/difficulty-level'
import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineRequestStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  OrderCell,
  PriorityAndChinaDeliverCell,
  ShortDateCell,
  UserMiniCell,
  VacantRequestPriceCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { timeToDeadlineInDaysAndHours, toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const FreelancerVacantRequestColumns = handlers => [
  {
    field: 'priority',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => (
      <MultilineTextHeaderCell
        textCenter
        component={<img src="/assets/icons/bookmark.svg" />}
        // isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        // isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    width: 80,
    renderCell: params => (
      <PriorityAndChinaDeliverCell
        isRequest
        priority={params.row.originalData.priority}
        onClickOpenInNewTab={() => handlers.onClickOpenInNewTab(params.row._id)}
      />
    ),

    filterable: false,
    sortable: false,

    // columnKey: columnnsKeys.client.FREELANCE_REQUESTS_PRIORITY,
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
    width: 95,
    columnKey: columnnsKeys.shared.TASK_COMPLEXITY,
  },

  {
    field: 'title',
    headerName: t(TranslationKey['Request title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 159,

    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    renderCell: params => <OrderCell withoutSku imageSize={'small'} product={params.row.originalData.product} />,
    width: 256,

    columnKey: columnnsKeys.freelancer.FREELANCER_VACANT_REQUEST_PRODUCT,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 70,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
    width: 145,
    renderCell: params => <UserMiniCell userName={params.row.createdBy.name} userId={params.row.createdBy._id} />,
  },

  {
    field: 'price',
    headerName: t(TranslationKey['Request price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request price'])} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    width: 96,
    sortable: false,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: params => <MultilineRequestStatusCell status={params.value} />,
    width: 100,

    columnKey: columnnsKeys.client.FREELANCE_MY_REQUESTS,
  },

  {
    field: 'typeTask',
    headerName: t(TranslationKey['Request type']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,

    renderCell: params => (
      <MultilineTextCell text={freelanceRequestTypeTranslate(freelanceRequestTypeByCode[params.value])} />
    ),
    type: 'number',
    width: 95,
    sortable: false,

    columnKey: columnnsKeys.client.FREELANCE_REQUEST_TYPE_MY,
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    renderCell: params => <ShortDateCell value={params.value} />,
    width: 87,

    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'deadline',
    headerName: t(TranslationKey['Time till deadline']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Time till deadline'])} />,

    renderCell: params => (
      <MultilineTextCell withLineBreaks text={timeToDeadlineInDaysAndHours({ date: params.row.timeoutAt })} />
    ),
    width: 100,
  },

  {
    field: 'cashBackInPercent',
    headerName: t(TranslationKey.CashBack),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.CashBack)} />,

    renderCell: params => <MultilineTextCell text={toFixed(params.row.cashBackInPercent, 2) + ' %'} />,
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
      <MultilineTextCell
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
    width: 140,
    // type: 'date',

    columnKey: columnnsKeys.freelancer.FREELANCE_REQUESTS_CONFIRMATION,
  },

  // {
  //   field: 'actions',
  //   headerName: t(TranslationKey.Actions),
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
  //
  //   renderCell: params => (
  //     <NormalActionBtnCell
  //       // disabled={!params.row.batch}
  //       bTnText={t(TranslationKey.Details)}
  //       onClickOkBtn={() => handlers.onClickViewMore(params.row._id)}
  //     />
  //   ),
  //   width: 126,
  // },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <ShortDateCell value={params.value} />,
    width: 105,
    // type: 'date',
    columnKey: columnnsKeys.shared.DATE,
  },
]
