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
  MultilineTextHeaderCell,
  NormDateCell,
  PriorityAndChinaDeliverCell,
  ProductCell,
  TextCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'

import { PerformerSelect } from '@views/shared/my-proposals-view/performer-select'

import { t } from '@utils/translations'

interface IHandlers {
  onClickDeleteButton: (proposalId: string, proposalStatus: string) => void
  onClickEditButton: (requestId: string, proposalId: string) => void
  onClickResultButton: (proposalId: string) => void
  onClickOpenButton: (request: any) => void
  onChangePerformer: (id: string, userId: string) => void
}

export const freelancerMyProposalsColumns = (handlers: IHandlers) => [
  {
    field: 'priority',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <MultilineTextHeaderCell textCenter component={<img src="/assets/icons/bookmark.svg" />} />,
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
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Category)} />,
    headerName: t(TranslationKey.Category),

    renderCell: (params: GridCellParams) => (
      <TextCell
        text={difficultyLevelTranslate(difficultyLevelByCode[params.value as number])}
        color={colorByDifficultyLevel(difficultyLevelByCode[params.value as number])}
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
    renderCell: (params: GridCellParams) => <TextCell text={params.value} />,
    width: 120,
    columnKey: columnnsKeys.shared.STRING_VALUE,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    renderCell: (params: GridCellParams) => {
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
    width: 260,
    minWidth: 100,
    columnKey: columnnsKeys.shared.BATCHES_PRODUCTS,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    // @ts-ignore
    renderCell: (params: GridCellParams) => <TextCell text={params.value} />,
    type: 'number',
    width: 80,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'shop',
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

    renderCell: (params: GridCellParams) => (
      <TextCell text={params.row.product?.shop?.name || t(TranslationKey.Missing)} />
    ),
    width: 100,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'announcement',
    headerName: t(TranslationKey.Announcement),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Announcement)} />,

    renderCell: (params: GridCellParams) => (
      <TextCell text={params.row?.originalData?.request?.announcement?.title || t(TranslationKey.Missing)} />
    ),
    width: 115,

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
    renderCell: (params: GridCellParams) => <TextCell text={params.row.spec?.title} />,
    width: 110,
    sortable: false,
    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    // @ts-ignore
    renderCell: (params: GridCellParams) => <NormDateCell value={params.value} />,
    width: 80,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: (params: GridCellParams) => (
      <TextCell text={MyRequestStatusTranslate(params.value)} color={colorByStatus(params.value)} />
    ),
    width: 110,
    columnKey: columnnsKeys.client.FREELANCE_MY_REQUESTS,
  },

  {
    field: 'reworkCounter',
    headerName: t(TranslationKey['Number of rework']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Number of rework'])} />,
    renderCell: (params: GridCellParams) => <TextCell text={params.row.originalData.reworkCounter} />,
    width: 105,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'sub',
    headerName: t(TranslationKey.Performer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Performer)} />,
    width: 245,
    renderCell: (params: GridCellParams) => (
      <PerformerSelect
        spec={params.row.originalData.request?.spec}
        defaultPerformer={params.row.originalData.sub}
        onChangeData={useId => handlers.onChangePerformer(params.row.originalData._id, useId)}
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
    width: 240,
    sortable: false,
    filterable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: (params: GridCellParams) => <NormDateCell value={params?.row?.originalData?.updatedAt} />,
    width: 100,
    columnKey: columnnsKeys.shared.DATE,
  },
]
