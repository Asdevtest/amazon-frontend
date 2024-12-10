import { GridCellParams } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { IRequest } from '@typings/models/requests/request'
import { IGridColumn } from '@typings/shared/grid-column'

interface ColumnProps {
  onClickOpenRequest: (item: string) => void
  onClickOpenResult: (item: IRequest) => void
}

export const productMyRequestsViewColumns = (handlers: ColumnProps) => {
  const columns: IGridColumn[] = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: (params: GridCellParams) => <NormDateCell value={String(params.value)} />,
      width: 120,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'xid',
      headerName: 'ID',
      renderHeader: () => <MultilineTextHeaderCell text={'ID'} />,
      renderCell: (params: GridCellParams) => <Text isCell text={String(params.value)} />,
      width: 65,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: (params: GridCellParams) => (
        <Text isCell text={MyRequestStatusTranslate(params.value)} color={colorByStatus(params.value)} />
      ),
      width: 140,
      transformValueMethod: MyRequestStatusTranslate,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'title',
      headerName: t(TranslationKey.Title),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
      renderCell: (params: GridCellParams) => <Text isCell text={String(params.value)} />,
      width: 390,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'spec',
      headerName: t(TranslationKey['Request type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
      renderCell: (params: GridCellParams) => <Text isCell text={params.row.spec?.title} />,
      width: 110,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'price',
      headerName: t(TranslationKey.Cost),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Cost)} />,
      renderCell: (params: GridCellParams) => <Text isCell text={toFixedWithDollarSign(params.value, 2)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'executor',
      headerName: t(TranslationKey.Executor),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Executor)} />,
      renderCell: (params: GridCellParams) => (
        <UserCell name={params.row.executor?.name} id={params.row.executor?._id} email={params.row.executor?.email} />
      ),
      width: 160,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'timeoutAt',
      headerName: t(TranslationKey.Deadline),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
      renderCell: (params: GridCellParams) => <NormDateCell value={String(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'allProposals',
      headerName: t(TranslationKey['Total proposals']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total proposals'])} />,
      renderCell: (params: GridCellParams) => <Text isCell text={params.row?.countProposalsByStatuses?.allProposals} />,
      width: 115,
    },

    {
      field: 'acceptedProposals',
      headerName: t(TranslationKey.Accepted),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Accepted)} />,
      renderCell: (params: GridCellParams) => (
        <Text isCell text={params.row?.countProposalsByStatuses?.acceptedProposals} />
      ),
      width: 90,
    },

    {
      field: 'actions',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: (params: GridCellParams) => {
        const secondDisabled =
          !params.row.countProposalsByStatuses.acceptedProposals &&
          !params.row.countProposalsByStatuses.atWorkProposals &&
          !params.row.countProposalsByStatuses.verifyingProposals

        return (
          <ActionButtonsCell
            showFirst
            showSecond
            firstContent={t(TranslationKey['Open a request'])}
            secondContent={t(TranslationKey['Open result'])}
            secondDisabled={secondDisabled}
            onClickFirst={() => handlers.onClickOpenRequest(params.row._id)}
            onClickSecond={() => handlers.onClickOpenResult(params.row)}
          />
        )
      },
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
      width: 200,
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
