/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridCellParams } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import {
  colorByDifficultyLevel,
  difficultyLevelByCode,
  difficultyLevelTranslate,
} from '@constants/statuses/difficulty-level'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  FreelancerMyProposalsActionsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  PriorityAndChinaDeliverCell,
  ProductAsinCell,
  ShortDateCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

interface IHandlers {
  onClickDeleteButton: (proposalId: string, proposalStatus: string) => void
  onClickEditButton: (requestId: string, proposalId: string) => void
  onClickResultButton: (proposalId: string) => void
  onClickOpenButton: (request: any) => void
}

export const FreelancerMyProposalsColumns = (handlers: IHandlers) => [
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
    minWidth: 80,
    renderCell: (params: GridCellParams) => (
      <PriorityAndChinaDeliverCell
        isRequest
        priority={Number(params.value)}
        onClickOpenInNewTab={() => handlers.onClickOpenButton(params.row?.originalData?.request?._id)}
      />
    ),

    filterable: false,
    sortable: false,
    columnKey: columnnsKeys.client.FREELANCE_REQUESTS_PRIORITY,
  },

  {
    field: 'taskComplexity',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Difficulty level'])} />,
    headerName: t(TranslationKey['Difficulty level']),

    renderCell: (params: GridCellParams) => (
      <MultilineTextCell
        text={difficultyLevelTranslate(difficultyLevelByCode[params.value as number])}
        customTextStyles={{
          color: colorByDifficultyLevel(difficultyLevelByCode[params.value as number]),
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
    // @ts-ignore
    renderCell: (params: GridCellParams) => <MultilineTextCell text={params.value} />,
    minWidth: 120,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    renderCell: (params: GridCellParams) => {
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
    columnKey: columnnsKeys.shared.BATCHES_PRODUCTS,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.ID)}
        // isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        // isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    // @ts-ignore
    renderCell: (params: GridCellParams) => <MultilineTextCell text={params.value} />,
    type: 'number',
    minWidth: 60,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'shop',
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

    renderCell: (params: GridCellParams) => (
      <MultilineTextCell maxLength={20} text={params.row.product?.shop?.name || t(TranslationKey.Missing)} />
    ),
    minWidth: 100,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'announcement',
    headerName: t(TranslationKey.Announcement),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Announcement)} />,

    renderCell: (params: GridCellParams) => (
      <MultilineTextCell text={params.row?.originalData?.request?.announcement?.title || t(TranslationKey.Missing)} />
    ),
    minWidth: 115,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'requestCreatedBy',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,
    minWidth: 180,
    renderCell: (params: GridCellParams) => (
      <UserMiniCell
        userName={params?.row?.originalData?.request?.createdBy?.name}
        userId={params?.row?.originalData?.request?.createdBy?._id}
      />
    ),
    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'spec',
    headerName: t(TranslationKey['Request type']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
    renderCell: (params: GridCellParams) => <MultilineTextCell threeLines text={params.row.spec?.title} />,
    minWidth: 110,
    sortable: false,
    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    // @ts-ignore
    renderCell: (params: GridCellParams) => <ShortDateCell value={params.value} />,
    minWidth: 80,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: (params: GridCellParams) => (
      <MultilineTextCell text={MyRequestStatusTranslate(params.value)} color={colorByStatus(params.value)} />
    ),
    minWidth: 110,
    columnKey: columnnsKeys.client.FREELANCE_MY_REQUESTS,
  },

  {
    field: 'reworkCounter',
    headerName: t(TranslationKey['Number of rework']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Number of rework'])} />,
    renderCell: (params: GridCellParams) => <MultilineTextCell text={params.row.originalData.reworkCounter} />,
    minWidth: 105,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey.Performer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Performer)} />,
    minWidth: 180,
    renderCell: (params: GridCellParams) => (
      <UserMiniCell
        userName={params?.row?.originalData?.sub?.name || params?.row?.originalData?.createdBy?.name}
        userId={params?.row?.originalData?.sub?._id || params?.row?.originalData?.createdBy?._id}
      />
    ),
    columnKey: columnnsKeys.freelancer.FREELANCE_PROPOSALS_CREATED_BY,
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    renderCell: (params: GridCellParams) => (
      <FreelancerMyProposalsActionsCell
        status={params.row.originalData.status}
        onClickDeleteButton={() =>
          handlers.onClickDeleteButton(params.row.originalData?._id, params.row.originalData?.status)
        }
        onClickEditButton={() =>
          handlers.onClickEditButton(params.row.originalData?.request?._id, params.row.originalData?._id)
        }
        onClickResultButton={() => handlers.onClickResultButton(params.row.originalData._id)}
      />
    ),
    minWidth: 240,
    sortable: false,
    filterable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: (params: GridCellParams) => <ShortDateCell value={params?.row?.originalData?.updatedAt} />,
    minWidth: 100,
    columnKey: columnnsKeys.shared.DATE,
  },
]
