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

export const clientBoxesTariffsNotificationsViewColumns = (handlers: IHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'xid',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

      renderCell: params => <Text isCell text={params.value} />,
      type: 'number',
      width: 80,

      columnKey: columnnsKeys.shared.NUMBER,
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
          secondConfirmText="The box will be returned to warehouse"
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

      renderCell: ({ row }) => <Text isCell text={row.destination?.name} />,
      width: 130,

      columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_DESTINATION,
      disableCustomSort: true,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey['Int warehouse']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

      renderCell: ({ row }) => <UserCell name={row.storekeeper?.name} id={row.storekeeper?._id} />,
      width: 160,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'logicsTariff',
      headerName: t(TranslationKey.Tariff),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,

      renderCell: params => (
        <div>
          <Text isCell text={getNewTariffTextForBoxOrOrder(params.row)} />
          <p style={{ color: 'red', fontSize: 12 }}>
            {t(TranslationKey['The tariff is invalid or has been removed!'])}
          </p>
        </div>
      ),
      width: 240,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
      hideEmptyObject: true,
    },

    {
      field: 'finalWeight',
      headerName: `${t(TranslationKey['Final weight'])}, ${t(TranslationKey.kg)}`,
      renderHeader: () => (
        <MultilineTextHeaderCell text={`${t(TranslationKey['Final weight'])}, ${t(TranslationKey.kg)}`} />
      ),
      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      type: 'number',
      width: 130,

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'weighGrossKgWarehouse',
      headerName: `${t(TranslationKey['Gross weight'])}, ${t(TranslationKey.kg)}`,
      renderHeader: () => (
        <MultilineTextHeaderCell text={`${t(TranslationKey['Gross weight'])}, ${t(TranslationKey.kg)}`} />
      ),

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      type: 'number',
      width: 130,

      columnKey: columnnsKeys.shared.NUMBER,
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
