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

export const clientBoxesTariffsNotificationsViewColumns = (handlers: IHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'humanFriendlyId',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

      renderCell: params => <MultilineTextCell text={params.value} />,
      type: 'number',
      width: 60,

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

      width: 150,
      renderCell: ({ row }) => (
        <ActionButtonsCell
          isFirstRow
          isFirstButton
          isSecondButton
          firstButtonElement={t(TranslationKey.Confirm)}
          firstButtonStyle={ButtonStyle.PRIMARY}
          secondButtonElement={t(TranslationKey.Reject)}
          secondButtonStyle={ButtonStyle.DANGER}
          firstButtonTooltipText={t(TranslationKey['Choose another tariff'])}
          secondDescriptionText="The box will be returned to warehouse"
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

      width: 280,
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

      renderCell: ({ row }) => <MultilineTextCell text={row.destination?.name} />,
      width: 130,

      columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_DESTINATION,
      disableCustomSort: true,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey['Int warehouse']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

      renderCell: ({ row }) => <UserLinkCell blackText name={row.storekeeper?.name} userId={row.storekeeper?._id} />,
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
          <MultilineTextCell text={getNewTariffTextForBoxOrOrder(params.row)} />
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
      renderCell: params => <MultilineTextCell text={toFixed(params.value)} />,
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

      renderCell: params => <MultilineTextCell text={toFixed(params.value)} />,
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
