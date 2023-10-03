/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridCellParams } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import {
  colorByDifficultyLevel,
  difficultyLevelByCode,
  difficultyLevelTranslate,
} from '@constants/statuses/difficulty-level'
import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  FreelancerMyProposalsActions,
  MultilineRequestStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  OrderCell,
  PriorityAndChinaDeliverCell,
  ShortDateCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

interface IHandlers {
  onClickDeleteButton: (proposal: any) => void
  onClickEditButton: (request: any, proposal: any) => void
  onClickResultButton: (request: any, proposalId: any) => void
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
        priority={params.value}
        onClickOpenInNewTab={() => handlers.onClickOpenButton(params.row.originalData.request)}
      />
    ),

    filterable: false,
    sortable: false,
    columnKey: columnnsKeys.client.FREELANCE_REQUESTS_PRIORITY,
  },

  {
    field: 'title',
    headerName: t(TranslationKey['Request title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
    renderCell: (params: GridCellParams) => <MultilineTextCell text={params.value} />,
    width: 140,
    columnKey: columnnsKeys.shared.STRING,
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
    // columnKey: columnnsKeys.freelancer.FREELANCE_MY_PROPOSALS,
  },

  {
    field: 'product',
    headerName: t(TranslationKey.Product),
    renderHeader: () => (
      <MultilineTextHeaderCell
        // isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        // isFilterActive={
        //   getColumnMenuSettings()?.asin?.currentFilterData?.length ||
        //   getColumnMenuSettings()?.skusByClient?.currentFilterData?.length ||
        //   getColumnMenuSettings()?.amazonTitle?.currentFilterData?.length
        // }
        text={t(TranslationKey.Product)}
      />
    ),
    renderCell: (params: GridCellParams) => <OrderCell withoutSku imageSize={'small'} product={params.value} />,
    width: 252,
    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
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

    renderCell: (params: GridCellParams) => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 62,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'requestCreatedBy',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,
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
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: (params: GridCellParams) => <MultilineRequestStatusCell status={params.value} />,
    width: 161,
    columnKey: columnnsKeys.client.FREELANCE_MY_REQUESTS,
  },

  {
    field: 'reworkCounter',
    headerName: t(TranslationKey['Number of rework']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Number of rework'])} />,
    renderCell: (params: GridCellParams) => <MultilineTextCell text={params.row.originalData.reworkCounter} />,
    width: 115,
    // columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey.Performer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Performer)} />,
    width: 122,
    renderCell: (params: GridCellParams) => (
      <UserMiniCell
        userName={params?.row?.originalData?.createdBy?.name}
        userId={params?.row?.originalData?.createdBy?._id}
      />
    ),
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: (params: GridCellParams) => <ShortDateCell value={params?.row?.originalData?.updatedAt} />,
    width: 85,
    // type: 'date',
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: (params: GridCellParams) => (
      <FreelancerMyProposalsActions
        status={params.row.originalData.status}
        onClickDeleteButton={() => handlers.onClickDeleteButton(params.row.originalData)}
        onClickEditButton={() => handlers.onClickEditButton(params.row.originalData.request, params.row.originalData)}
        onClickResultButton={() =>
          handlers.onClickResultButton(params.row.originalData.request, params.row.originalData._id)
        }
      />
    ),
    width: 220,
    sortable: false,
    filterable: false,
  },
]
