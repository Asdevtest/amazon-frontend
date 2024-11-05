import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'

import { GridCellParams } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import {
  MyRequestStatusTranslate,
  RequestProposalStatus,
  disabledCancelBtnStatuses,
  noDisabledEditBtnStatuses,
} from '@constants/requests/request-proposal-status'
import { colorByStatus, showResultStatuses } from '@constants/requests/request-status'
import {
  colorByDifficultyLevel,
  difficultyLevelByCode,
  difficultyLevelTranslate,
} from '@constants/statuses/difficulty-level'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  PriorityAndChinaDeliverCell,
  ProductCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { PerformerSelect } from '@views/shared/my-proposals-view/performer-select'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

interface IHandlers {
  onClickDeleteButton: (proposalId: string, proposalStatus: keyof typeof RequestProposalStatus) => void
  onClickEditButton: (requestId: string, proposalId: string) => void
  onClickResultButton: (proposalId: string) => void
  onClickOpenButton: (requestId: string) => void
  onChangePerformer: (id: string, userId: string) => void
}

export const proposalsColumns = (handlers: IHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'xid',
      headerName: t(TranslationKey['Proposal ID']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Proposal ID'])} />,
      renderCell: (params: GridCellParams) => <Text isCell text={params.row?.xid} />,

      width: 120,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      table: DataGridFilterTables.REQUESTS,
    },

    {
      field: 'priority',
      headerName: t(TranslationKey.Priority),
      renderHeader: () => <MultilineTextHeaderCell component={<img src="/assets/icons/bookmark.svg" />} />,
      width: 80,
      renderCell: (params: GridCellParams) => {
        const request = params.row?.request

        return (
          <PriorityAndChinaDeliverCell
            isRequest
            priority={Number(request?.priority)}
            onClickOpenInNewTab={() => handlers.onClickOpenButton(request?._id)}
          />
        )
      },

      filterable: false,
      disableCustomSort: true,
      columnKey: columnnsKeys.client.FREELANCE_REQUESTS_PRIORITY,
      table: DataGridFilterTables.REQUESTS,
    },

    {
      field: 'taskComplexity',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Category)} />,
      headerName: t(TranslationKey.Category),

      renderCell: (params: GridCellParams) => {
        const taskComplexity = params.row?.request?.taskComplexity as number
        const difficultyLevel = difficultyLevelByCode[taskComplexity]

        return (
          <Text
            isCell
            text={difficultyLevelTranslate(difficultyLevel)}
            color={colorByDifficultyLevel(difficultyLevel)}
          />
        )
      },

      transformValueMethod: status => difficultyLevelTranslate(difficultyLevelByCode[status]),

      width: 95,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      table: DataGridFilterTables.REQUESTS,
    },

    {
      field: 'title',
      headerName: t(TranslationKey['Request title']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
      renderCell: (params: GridCellParams) => <Text isCell text={params.row?.request?.title} />,

      width: 120,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      table: DataGridFilterTables.REQUESTS,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
      renderCell: (params: GridCellParams) => {
        const product = params.row?.request?.product

        return (
          <ProductCell
            image={product?.images?.[0]}
            title={product?.amazonTitle}
            asin={product?.asin}
            sku={product?.skuByClient}
          />
        )
      },
      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue(),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 170,
    },

    {
      field: 'requestXid',
      headerName: 'ID',
      renderHeader: () => <MultilineTextHeaderCell text="ID" />,
      renderCell: (params: GridCellParams) => <Text isCell text={params.row?.request.xid} />,
      width: 80,

      columnKey: columnnsKeys.shared.QUANTITY,
      table: DataGridFilterTables.REQUESTS,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: (params: GridCellParams) => (
        <Text isCell text={params.row.request?.product?.shop?.name || t(TranslationKey.Missing)} />
      ),
      width: 100,

      columnKey: columnnsKeys.shared.OBJECT,
      table: DataGridFilterTables.PRODUCTS,
    },

    {
      field: 'announcement',
      headerName: t(TranslationKey.Announcement),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Announcement)} />,

      renderCell: (params: GridCellParams) => (
        <Text isCell text={params.row?.request?.announcement?.title || t(TranslationKey.Missing)} />
      ),
      width: 115,

      columnKey: columnnsKeys.shared.OBJECT,
      table: DataGridFilterTables.REQUESTS,
    },

    {
      field: 'requestCreatedBy',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,
      width: 180,
      renderCell: (params: GridCellParams) => (
        <UserCell
          name={params?.row?.request?.createdBy?.name}
          id={params?.row?.request?.createdBy?._id}
          email={params?.row?.request?.createdBy?.email}
        />
      ),
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'spec',
      headerName: t(TranslationKey['Request type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
      renderCell: (params: GridCellParams) => <Text isCell text={params.row.request?.spec?.title} />,
      width: 110,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.OBJECT,
      table: DataGridFilterTables.REQUESTS,
    },

    {
      field: 'timeoutAt',
      headerName: t(TranslationKey.Deadline),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
      renderCell: (params: GridCellParams) => <NormDateCell value={params.row?.request.timeoutAt as string} />,
      width: 80,
      columnKey: columnnsKeys.shared.DATE,
      table: DataGridFilterTables.REQUESTS,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: (params: GridCellParams) => (
        <Text isCell text={MyRequestStatusTranslate(params.value)} color={colorByStatus(params.value)} />
      ),
      width: 110,
      columnKey: columnnsKeys.client.FREELANCE_MY_REQUESTS,
    },

    {
      field: 'freelanceNotices',
      headerName: t(TranslationKey['Unread messages']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Unread messages'])} />,
      renderCell: params => <Text isCell text={params.row?.request?.freelanceNotices} />,
      width: 130,
      sortable: false,
    },

    {
      field: 'reworkCounter',
      headerName: t(TranslationKey['Number of rework']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Number of rework'])} />,
      renderCell: (params: GridCellParams) => <Text isCell text={params.row?.reworkCounter} />,
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
          spec={params.row?.request?.spec}
          defaultPerformer={params.row?.sub}
          onChangeData={useId => handlers.onChangePerformer(params.row?._id, useId)}
        />
      ),
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'actions',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: (params: GridCellParams) => (
        <ActionButtonsCell
          row
          showFirst
          showSecond
          showThird
          secondDanger
          firstGhost
          secondGhost
          firstDisabled={!noDisabledEditBtnStatuses.includes(params.row?.status)}
          secondDisabled={disabledCancelBtnStatuses.includes(params.row?.status)}
          thirdDisabled={!showResultStatuses.includes(params.row?.status)}
          firstIcon={<MdOutlineEdit size={16} />}
          secondIcon={<MdOutlineDelete size={16} />}
          thirdContent={t(TranslationKey.Result)}
          onClickFirst={() => handlers.onClickEditButton(params.row?.request?._id, params.row?._id)}
          onClickSecond={() => handlers.onClickDeleteButton(params.row?._id, params.row?.status)}
          onClickThird={() => handlers.onClickResultButton(params.row?._id)}
        />
      ),
      width: 160,
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: (params: GridCellParams) => <NormDateCell value={params?.row?.updatedAt} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.PROPOSALS
    }
    column.sortable = false
  }

  return columns
}
