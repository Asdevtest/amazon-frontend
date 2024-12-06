import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MediaContentCell,
  MultilineTextHeaderCell,
  NormDateCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { convertToSentenceCase, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { SupplierCardStatus } from '@typings/models/suppliers/supplier-card'
import { IGridColumn } from '@typings/shared/grid-column'

import { getStatusColor } from '../helpers/get-status-color'
import { IHandlers } from '../suppliers-view.type'

export const supplierCardsViewColumns = (handlers: IHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'xid',
      headerName: 'ID',
      renderHeader: () => <MultilineTextHeaderCell text="ID" />,
      renderCell: ({ value }) => <Text isCell text={value} />,
      width: 100,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: ({ value }) => (
        <Text
          isCell
          color={getStatusColor(Number(SupplierCardStatus[value]))}
          text={value ? t(TranslationKey[convertToSentenceCase(value) as keyof typeof TranslationKey]) : ''}
        />
      ),
      valueGetter: ({ row }) => SupplierCardStatus[row?.status],
      transformValueMethod: (value: number) =>
        t(TranslationKey[convertToSentenceCase(SupplierCardStatus[value]) as keyof typeof TranslationKey]),
      width: 150,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'cardName',
      headerName: t(TranslationKey.Title),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
      renderCell: ({ value }) => <Text isCell text={value} />,
      width: 150,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'images',
      headerName: t(TranslationKey.Photos),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Photos)} />,
      renderCell: ({ value }) => <MediaContentCell files={value} />,
      width: 80,

      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'priceInUsd',
      headerName: `${t(TranslationKey.Price)}`,
      renderHeader: () => <MultilineTextHeaderCell text={`${t(TranslationKey.Price)}`} />,
      renderCell: ({ value }) => <Text isCell text={toFixed(value)} />,
      width: 100,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'category',
      headerName: t(TranslationKey.Category),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Category)} />,
      renderCell: ({ value }) => <Text isCell text={value} />,
      valueGetter: ({ row }) => row.category?.title,
      width: 150,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'supplier',
      headerName: t(TranslationKey.Supplier),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supplier)} />,
      renderCell: ({ value }) => <Text isCell text={value} />,
      valueGetter: ({ row }) => row.supplier?.companyName,
      titleKey: 'companyName',
      width: 150,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'minlot',
      headerName: 'MOQ, pcs',
      renderHeader: () => <MultilineTextHeaderCell text="MOQ, pcs" />,
      renderCell: ({ value }) => <Text isCell text={value} />,
      width: 100,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'minProductionTerm',
      headerName: t(TranslationKey['Production time, days']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,
      renderCell: ({ value }) => <Text isCell text={value} />,
      valueGetter: ({ row }) => `${row.minProductionTerm || 0} - ${row.maxProductionTerm || 0}`,
      width: 150,

      fields: [
        {
          label: 'Min production term',
          value: 0,
        },
        {
          label: 'Max production term',
          value: 1,
        },
      ],
      columnMenuConfig: [
        {
          field: 'minProductionTerm',
          table: DataGridFilterTables.SUPPLIER_CARDS,
          columnKey: ColumnMenuKeys.NUMBER,
        },

        {
          field: 'maxProductionTerm',
          table: DataGridFilterTables.SUPPLIER_CARDS,
          columnKey: ColumnMenuKeys.NUMBER,
        },
      ],
      columnKey: columnnsKeys.shared.MULTIPLE,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
      renderCell: ({ row }: GridRowModel) => (
        <ActionButtonsCell
          row
          showFirst
          showSecond
          secondDanger
          firstGhost
          secondGhost
          firstIcon={<MdOutlineEdit size={16} />}
          secondIcon={<MdOutlineDelete size={16} />}
          secondConfirmText="Are you sure?"
          onClickFirst={() => handlers?.onClickEdit(row?._id)}
          onClickSecond={() => handlers?.onClickDelete(row._id)}
        />
      ),
      width: 100,
      disableCustomSort: true,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 100,

      columnKey: columnnsKeys.shared.DATE_VALUE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.SUPPLIER_CARDS
    }

    column.sortable = false
  }

  return columns
}
