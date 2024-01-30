/* eslint-disable @typescript-eslint/ban-ts-comment */

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
import { freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  FreelancerMyProposalsActionsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  OrderCell,
  PriorityAndChinaDeliverCell,
  ShortDateCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

interface IHandlers {
  onClickDeleteButton: (proposalId: string, proposalStatus: string) => void
  onClickEditButton: (requestId: string, proposalId: string) => void
  onClickResultButton: (requestId: string, proposalId: string) => void
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
    width: 80,
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
    width: 95,
    columnKey: columnnsKeys.shared.TASK_COMPLEXITY,
  },

  {
    field: 'title',
    headerName: t(TranslationKey['Request title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
    // @ts-ignore
    renderCell: (params: GridCellParams) => <MultilineTextCell text={params.value} />,
    width: 120,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    renderCell: (params: GridCellParams) => (
      // @ts-ignore
      <OrderCell withoutSku imageSize={'small'} product={params.row.originalData.request.product} />
    ),
    width: 250,
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
    width: 60,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'shop',
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

    renderCell: (params: GridCellParams) => (
      <MultilineTextCell maxLength={20} text={params.row.product?.shop?.name || t(TranslationKey.Missing)} />
    ),
    width: 100,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'announcement',
    headerName: t(TranslationKey.Announcement),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Announcement)} />,

    renderCell: (params: GridCellParams) => (
      <MultilineTextCell text={params.row?.originalData?.request?.announcement?.title || t(TranslationKey.Missing)} />
    ),
    width: 110,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'requestCreatedBy',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,
    width: 180,
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
    renderCell: (params: GridCellParams) => (
      <MultilineTextCell text={freelanceRequestTypeTranslate(params.row.spec?.title)} />
    ),
    type: 'number',
    width: 85,
    sortable: false,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    // @ts-ignore
    renderCell: (params: GridCellParams) => <ShortDateCell value={params.value} />,
    width: 80,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: (params: GridCellParams) => (
      <MultilineTextCell text={MyRequestStatusTranslate(params.value)} color={colorByStatus(params.value)} />
    ),
    width: 110,
    columnKey: columnnsKeys.client.FREELANCE_MY_REQUESTS,
  },

  {
    field: 'reworkCounter',
    headerName: t(TranslationKey['Number of rework']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Number of rework'])} />,
    renderCell: (params: GridCellParams) => <MultilineTextCell text={params.row.originalData.reworkCounter} />,
    width: 105,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey.Performer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Performer)} />,
    width: 180,
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
        onClickResultButton={() =>
          handlers.onClickResultButton(params.row.originalData.request?._id, params.row.originalData._id)
        }
      />
    ),
    width: 200,
    sortable: false,
    filterable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: (params: GridCellParams) => <ShortDateCell value={params?.row?.originalData?.updatedAt} />,
    width: 100,
    columnKey: columnnsKeys.shared.DATE,
  },
]
