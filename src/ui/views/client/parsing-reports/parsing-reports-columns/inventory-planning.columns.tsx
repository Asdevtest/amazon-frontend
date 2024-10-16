import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, UserCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { IFbaCapacityLimits, ParsingReportsType } from '../parsing-reports.type'

export const inventoryPlanningColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
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

      renderCell: params => (
        <UserCell name={params.row.client?.name} id={params.row.client?._id} email={params.row.client?.email} />
      ),
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
      field: 'fbaCapacityLimitsValue',
      headerName: 'Fba capacity limits',
      renderHeader: () => <MultilineTextHeaderCell text="Fba capacity limits" />,
      renderCell: params => (
        <div>
          {params.row?.fbaCapacityLimits?.map((item: IFbaCapacityLimits) => (
            <Text key={item?._id} text={`${item?.month}: ${item?.value}`} />
          ))}
        </div>
      ),

      fields: [
        {
          label: 'Month',
          value: 0,
        },
        {
          label: 'Month value',
          value: 1,
        },
      ],
      columnMenuConfig: [
        {
          field: 'fbaCapacityLimitsMonth',
          table: ParsingReportsType.INVENTORY_PLANNING,
          columnKey: ColumnMenuKeys.STRING,
        },
        {
          field: 'fbaCapacityLimitsValue',
          table: ParsingReportsType.INVENTORY_PLANNING,
          columnKey: ColumnMenuKeys.NUMBER,
        },
      ],
      columnKey: columnnsKeys.shared.MULTIPLE,
      width: 170,
    },

    {
      field: 'ipi',
      headerName: 'Ipi',
      renderHeader: () => <MultilineTextHeaderCell text="Ipi" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'lastWeek',
      headerName: 'Last week',
      renderHeader: () => <MultilineTextHeaderCell text="Last week" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'currentUsage',
      headerName: 'Current usage',
      renderHeader: () => <MultilineTextHeaderCell text="Current usage" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'currentUsageCubicFeet',
      headerName: 'Current usage cubic feet',
      renderHeader: () => <MultilineTextHeaderCell text="Current usage cubic feet" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'wholeUsage',
      headerName: 'Whole usage',
      renderHeader: () => <MultilineTextHeaderCell text="Whole usage" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
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
