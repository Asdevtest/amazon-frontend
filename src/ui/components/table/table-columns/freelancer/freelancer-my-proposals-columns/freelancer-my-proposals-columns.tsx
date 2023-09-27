import { GridCellParams, GridRenderCellParams } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
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

export const FreelancerMyProposalsColumns = handlers => [
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
    renderCell: (params: GridCellParams) => (
      <PriorityAndChinaDeliverCell
        isRequest
        priority={params.value}
        onClickOpenInNewTab={() => handlers.onClickOpenInNewTab(params.row._id)}
      />
    ),

    filterable: false,
    sortable: false,

    // columnKey: columnnsKeys.client.FREELANCE_REQUESTS_PRIORITY,
  },

  {
    field: 'title',
    headerName: t(TranslationKey['Request title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
    renderCell: (params: GridCellParams) => <MultilineTextCell text={params.value} />,
    width: 140,

    // columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'product',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    renderCell: (params: GridCellParams) => <OrderCell withoutSku imageSize={'small'} product={params.value} />,
    width: 252,

    // columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'requestCreatedBy',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
    width: 130,
    renderCell: (params: GridCellParams) => (
      <UserMiniCell
        userName={params?.row?.originalData?.request?.createdBy?.name}
        userId={params?.row?.originalData?.request?.createdBy?._id}
      />
    ),
  },

  {
    field: 'typeTask',
    headerName: t(TranslationKey['Request type']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,

    renderCell: (params: GridCellParams) => (
      <MultilineTextCell text={freelanceRequestTypeTranslate(freelanceRequestTypeByCode[params.value as number])} />
    ),
    type: 'number',
    width: 86,
    sortable: false,

    // columnKey: columnnsKeys.client.FREELANCE_REQUEST_TYPE_MY,
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    renderCell: (params: GridCellParams) => <ShortDateCell value={params.value} />,
    width: 110,

    // columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: (params: GridCellParams) => <MultilineRequestStatusCell status={params.value} />,
    width: 161,

    // columnKey: columnnsKeys.client.FREELANCE_MY_REQUESTS,
  },

  {
    field: 'reworkСounter',
    headerName: t(TranslationKey['Number of improvements']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Number of improvements'])} />,
    renderCell: (params: GridCellParams) => <MultilineTextCell text={params.value} />,
    width: 115,

    // columnKey: columnnsKeys.shared.QUANTITY,
  },

  // {
  //   field: 'deadline',
  //   headerName: t(TranslationKey['Time till deadline']),
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Time till deadline'])} />,

  //   renderCell: (params: GridCellParams) => (
  //     <MultilineTextCell withLineBreaks text={timeToDeadlineInDaysAndHours({ date: params.row.timeoutAt })} />
  //   ),
  //   width: 100,
  // },

  // {
  //   field: 'humanFriendlyId',
  //   headerName: t(TranslationKey.ID),
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
  //   renderCell: params => <MultilineTextCell text={params.value} />,
  //   width: 70,

  //   columnKey: columnnsKeys.shared.QUANTITY,
  // },

  // {
  //   field: 'price',
  //   headerName: t(TranslationKey['Request price']),
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request price'])} />,

  //   renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
  //   type: 'number',
  //   width: 96,
  //   sortable: false,

  //   columnKey: columnnsKeys.shared.QUANTITY,
  // },

  // {
  //   field: 'timeoutAt',
  //   headerName: t(TranslationKey.Deadline),
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
  //   renderCell: params => <ShortDateCell value={params.value} />,
  //   width: 87,

  //   columnKey: columnnsKeys.shared.DATE,
  // },

  // {
  //   field: 'maxAmountOfProposals',
  //   headerName: t(TranslationKey['Remaining offers']),
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Remaining offers'])} />,

  //   renderCell: params => (
  //     <MultilineTextCell
  //       text={`${params.row.maxAmountOfProposals - params.row.countProposalsByStatuses.acceptedProposals} ${t(
  //         TranslationKey['out of'],
  //       )} ${params.row.maxAmountOfProposals}`}
  //     />
  //   ),
  //   width: 115,
  // },

  // {
  //   field: 'updatedAt',
  //   headerName: t(TranslationKey.Updated),
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
  //   renderCell: params => <ShortDateCell value={params.value} />,
  //   width: 105,
  //   // type: 'date',
  //   columnKey: columnnsKeys.shared.DATE,
  // },
]
