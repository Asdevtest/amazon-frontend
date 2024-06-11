import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { getNewTariffTextForBoxOrOrder, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { IBox } from '@typings/models/boxes/box'
import { IGridColumn } from '@typings/shared/grid-column'

interface IHandlers {
  onTriggerOpenConfirmModal: (row: IBox) => void
  onTriggerOpenRejectModal: (row: IBox) => void
}

export const clientBoxesNotificationsViewColumns = (handlers: IHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'humanFriendlyId',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

      renderCell: params => <MultilineTextCell text={params.value} />,
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
      field: 'deliveryTotalPriceChanged',
      headerName: `${t(TranslationKey['Pay more'])}, $`,
      renderHeader: () => <MultilineTextHeaderCell text={`${t(TranslationKey['Pay more'])}, $`} />,

      width: 120,
      renderCell: params => <MultilineTextCell text={params.value} />,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

      width: 150,
      renderCell: ({ row }) => (
        <ActionButtonsCell
          isFirstButton
          isSecondButton
          firstButtonElement={t(TranslationKey.Confirm)}
          firstButtonStyle={ButtonStyle.PRIMARY}
          secondButtonElement={t(TranslationKey.Reject)}
          secondButtonStyle={ButtonStyle.DANGER}
          onClickFirstButton={() => handlers.onTriggerOpenConfirmModal(row as IBox)}
          onClickSecondButton={() => handlers.onTriggerOpenRejectModal(row as IBox)}
        />
      ),

      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'orders',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

      width: 270,
      renderCell: params => {
        return params.row.items.length > 1 ? (
          <OrderManyItemsCell box={params.row} />
        ) : (
          <OrderCell
            product={params.row.items[0].product}
            superbox={params.row.amount > 1 && params.row.amount}
            box={params.row}
          />
        )
      },
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'totalAmount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

      renderCell: params => <MultilineTextCell text={params.value} />,

      width: 100,

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'destination',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

      renderCell: params => <MultilineTextCell text={params.row.destination?.name} />,
      width: 130,

      columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_DESTINATION,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey['Int warehouse']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

      renderCell: params => (
        <UserLinkCell blackText name={params.row.storekeeper?.name} userId={params.row.storekeeper?._id} />
      ),
      width: 140,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'logicsTariff',
      headerName: t(TranslationKey.Tariff),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,

      renderCell: params => <MultilineTextCell text={getNewTariffTextForBoxOrOrder(params.row)} />,
      width: 180,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'totalPrice',
      headerName: `${t(TranslationKey['Total price'])}, $`,
      renderHeader: () => <MultilineTextHeaderCell text={`${t(TranslationKey['Total price'])}, $`} />,

      renderCell: params => <MultilineTextCell text={toFixed(params.value)} />,
      width: 120,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'finalWeight',
      headerName: `${t(TranslationKey['Final weight'])}, ${t(TranslationKey.kg)}`,
      renderHeader: () => (
        <MultilineTextHeaderCell text={`${t(TranslationKey['Final weight'])}, ${t(TranslationKey.kg)}`} />
      ),

      renderCell: params => <MultilineTextCell text={toFixed(params.value)} />,

      columnKey: columnnsKeys.shared.QUANTITY,

      width: 100,
    },

    {
      field: 'weighGrossKgWarehouse',
      headerName: `${t(TranslationKey['Gross weight'])}, ${t(TranslationKey.kg)}`,
      renderHeader: () => (
        <MultilineTextHeaderCell text={`${t(TranslationKey['Gross weight'])}, ${t(TranslationKey.kg)}`} />
      ),

      renderCell: params => <MultilineTextCell text={toFixed(params.value)} />,

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
