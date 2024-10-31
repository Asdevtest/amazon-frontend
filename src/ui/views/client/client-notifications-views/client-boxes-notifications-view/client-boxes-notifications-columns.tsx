import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductsCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { getNewTariffTextForBoxOrOrder, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'
import { IGridColumn } from '@typings/shared/grid-column'

interface IHandlers {
  onTriggerOpenConfirmModal: (row: IBox) => void
  onTriggerOpenRejectModal: (row: IBox) => void
}

export const clientBoxesNotificationsViewColumns = (handlers: IHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'xid',
      headerName: 'ID',
      renderHeader: () => <MultilineTextHeaderCell text="ID" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 60,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 100,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

      width: 130,
      renderCell: ({ row }) => (
        <ActionButtonsCell
          showFirst
          showSecond
          secondDanger
          firstContent={t(TranslationKey.Confirm)}
          secondContent={t(TranslationKey.Reject)}
          onClickFirst={() => handlers.onTriggerOpenConfirmModal(row as IBox)}
          onClickSecond={() => handlers.onTriggerOpenRejectModal(row as IBox)}
        />
      ),

      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'orders',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
      width: 200,
      renderCell: params => <ProductsCell box={params.row as IBox} />,
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'totalAmount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

      renderCell: params => <Text isCell text={params.value} />,

      width: 100,

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'destination',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

      renderCell: params => <Text isCell text={params.row.destination?.name} />,
      width: 130,
      disableCustomSort: true,
      columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_DESTINATION,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey['Int warehouse']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

      renderCell: params => (
        <UserCell
          name={params.row.storekeeper?.name}
          id={params.row.storekeeper?._id}
          email={params.row.storekeeper?.email}
        />
      ),
      width: 140,
      disableCustomSort: true,
      hideEmptyObject: true,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'logicsTariff',
      headerName: t(TranslationKey.Tariff),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,

      renderCell: params => <Text isCell text={getNewTariffTextForBoxOrOrder(params.row)} />,
      width: 180,

      disableCustomSort: true,
      hideEmptyObject: true,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'totalPrice',
      headerName: `${t(TranslationKey['Total price'])}, $`,
      renderHeader: () => <MultilineTextHeaderCell text={`${t(TranslationKey['Total price'])}, $`} />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 120,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'finalWeight',
      headerName: `${t(TranslationKey['Final weight'])}, ${t(TranslationKey.kg)}`,
      renderHeader: () => (
        <MultilineTextHeaderCell text={`${t(TranslationKey['Final weight'])}, ${t(TranslationKey.kg)}`} />
      ),

      renderCell: params => <Text isCell text={toFixed(params.value)} />,

      columnKey: columnnsKeys.shared.QUANTITY,

      width: 100,
    },

    {
      field: 'weighGrossKgWarehouse',
      headerName: `${t(TranslationKey['Gross weight'])}, ${t(TranslationKey.kg)}`,
      renderHeader: () => (
        <MultilineTextHeaderCell text={`${t(TranslationKey['Gross weight'])}, ${t(TranslationKey.kg)}`} />
      ),

      renderCell: params => <Text isCell text={toFixed(params.value)} />,

      columnKey: columnnsKeys.shared.QUANTITY,

      width: 120,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.BOXES
    }

    column.sortable = false
  }

  return columns
}
