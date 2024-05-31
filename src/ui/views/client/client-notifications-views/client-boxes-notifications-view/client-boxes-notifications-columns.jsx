import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  SuperboxQtyCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { getNewTariffTextForBoxOrOrder, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const clientBoxesNotificationsViewColumns = handlers => {
  const columns = [
    {
      field: 'humanFriendlyId',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

      renderCell: params => <MultilineTextCell text={params.value} />,
      type: 'number',
      width: 60,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 100,
    },

    {
      field: 'deliveryTotalPriceChanged',
      headerName: t(TranslationKey['Pay more']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Pay more'])} />,

      width: 100,
      renderCell: params => <MultilineTextCell text={(params.value - params.row.deliveryTotalPrice).toFixed(2)} />,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

      width: 150,
      renderCell: params => (
        <ActionButtonsCell
          isFirstButton
          isSecondButton
          firstButtonElement={t(TranslationKey.Confirm)}
          firstButtonStyle={ButtonStyle.PRIMARY}
          secondButtonElement={t(TranslationKey.Reject)}
          secondButtonStyle={ButtonStyle.DANGER}
          onClickFirstButton={() => handlers.onTriggerOpenConfirmModal(params.row)}
          onClickSecondButton={() => handlers.onTriggerOpenRejectModal(params.row)}
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
      field: 'amount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

      renderCell: params =>
        params.row.amount > 1 ? (
          <SuperboxQtyCell qty={params.row.amount} superbox={params.row.amount} />
        ) : (
          <MultilineTextCell text={params.value} />
        ),
      type: 'number',
      width: 100,
    },

    {
      field: 'destination',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

      renderCell: params => <MultilineTextCell text={params.row.destination?.name} />,
      width: 130,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey['Int warehouse']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

      renderCell: params => (
        <UserLinkCell blackText name={params.row.storekeeper?.name} userId={params.row.storekeeper?._id} />
      ),
      width: 160,
    },

    {
      field: 'logicsTariff',
      headerName: t(TranslationKey.Tariff),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,

      renderCell: params => <MultilineTextCell text={getNewTariffTextForBoxOrOrder(params.row)} />,
      width: 180,
    },

    {
      // TODO: formula
      field: 'amazonPrice',
      headerName: t(TranslationKey['Total price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,

      renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
      type: 'number',
      width: 100,
    },

    {
      // TODO: formula
      field: 'finalWeight',
      headerName: t(TranslationKey['Final weight']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,

      renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value)} />,
      type: 'number',
      width: 100,
    },

    {
      field: 'weighGrossKgWarehouse',
      headerName: t(TranslationKey['Gross weight']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Gross weight'])} />,

      renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value)} />,
      type: 'number',
      width: 100,
    },
  ]

  for (const column of columns) {
    column.sortable = false
  }

  return columns
}
