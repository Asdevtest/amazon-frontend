import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, UserLinkCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const totalBalanceColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'amountUs',
      headerName: 'Amount usd',
      renderHeader: () => <MultilineTextHeaderCell text="Amount Usd" />,

      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'amountCa',
      headerName: 'Amount cad',
      renderHeader: () => <MultilineTextHeaderCell text="Amount cad" />,

      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'amountMx',
      headerName: 'Amount mxn',
      renderHeader: () => <MultilineTextHeaderCell text="Amount mxn" />,

      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <Text isCell text={params.row?.shop?.name} />,
      width: 90,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'client',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: params => <UserLinkCell blackText name={params.row.client?.name} userId={params.row.client?._id} />,
      width: 110,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.TOTAL_BALANCE
    }

    column.sortable = false
  }

  return columns
}
