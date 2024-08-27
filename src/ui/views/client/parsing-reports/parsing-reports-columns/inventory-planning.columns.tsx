import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, TextCell, UserLinkCell } from '@components/data-grid/data-grid-cells'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const inventoryPlanningColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <TextCell text={params.row?.shop?.name} />,
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
      field: 'ipi',
      headerName: 'Ipi',
      renderHeader: () => <MultilineTextHeaderCell text="Ipi" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'lastWeek',
      headerName: 'Last week',
      renderHeader: () => <MultilineTextHeaderCell text="Last week" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'currentUsage',
      headerName: 'Current usage',
      renderHeader: () => <MultilineTextHeaderCell text="Current usage" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'currentUsageCubicFeet',
      headerName: 'Current usage cubic feet',
      renderHeader: () => <MultilineTextHeaderCell text="Current usage cubic feet" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'wholeUsage',
      headerName: 'Whole usage',
      renderHeader: () => <MultilineTextHeaderCell text="Whole usage" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.INVENTORY_PLANNING
    }

    column.sortable = false
  }

  return columns
}
