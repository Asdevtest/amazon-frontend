import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { BatchStatus } from '@constants/statuses/batch-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  BatchBoxesCell,
  BatchTrackingCell,
  ManyUserLinkCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserLinkCell,
  WarehouseTariffDatesCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { getNewTariffTextForBoxOrOrder, toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

export const clientBatchesViewColumns = rowHandlers => {
  const columns = [
    {
      field: 'asin',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
      renderCell: params => <BatchBoxesCell boxes={params.row.boxes} />,
      width: 200,
      filterable: false,
      sortable: false,
      disableCustomSort: true,
      fields: getProductColumnMenuItems({ withoutSku: true }),
      columnMenuConfig: getProductColumnMenuValue(),
      columnKey: columnnsKeys.shared.MULTIPLE,
    },

    {
      field: 'title',
      headerName: t(TranslationKey['Batch title']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch title'])} />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 150,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'destination',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
      renderCell: params => <Text isCell text={params.row?.boxes?.[0]?.destination?.name} />,
      width: 130,
      sortable: false,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      table: DataGridFilterTables.BOXES,
      disableCustomSort: true,
    },

    {
      field: 'quantityBoxes',
      headerName: t(TranslationKey.Boxes),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Boxes)} />,
      renderCell: params => <Text isCell text={params.value} />,
      type: 'number',
      width: 70,
      filterable: false,
      sortable: false,
      columnKey: columnnsKeys.shared.NUMBER,
      disableCustomSort: true,
    },

    {
      field: 'humanFriendlyId',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: params => <Text isCell text={params.value} />,
      type: 'number',
      width: 80,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey['Int warehouse']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,
      renderCell: params => (
        <UserLinkCell blackText name={params.row?.storekeeper?.name} userId={params.row?.storekeeper?._id} />
      ),
      width: 150,
      sortable: false,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      table: DataGridFilterTables.BOXES,
      disableCustomSort: true,
    },

    {
      field: 'subUsers',
      headerName: t(TranslationKey['Access to product']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Access to product'])} />,
      renderCell: params => {
        const product = params.row?.boxes?.[0]?.items?.[0]?.product
        const subUsers = product?.subUsers || []
        const subUsersByShop = product?.subUsersByShop || []

        return <ManyUserLinkCell usersData={subUsers?.concat(subUsersByShop)} />
      },
      valueGetter: ({ row }) => {
        const product = row?.boxes?.[0]?.items?.[0]?.product
        const subUsers = product?.subUsers || []
        const subUsersByShop = product?.subUsersByShop || []

        return subUsers?.concat(subUsersByShop).join(', ')
      },
      width: 187,
      table: DataGridFilterTables.PRODUCTS,
      filterable: false,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'logicsTariff',
      headerName: t(TranslationKey.Tariff),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,
      renderCell: params => <Text isCell text={getNewTariffTextForBoxOrOrder(params.row.boxes[0])} />,
      width: 160,
      sortable: false,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      table: DataGridFilterTables.BOXES,
      disableCustomSort: true,
    },

    {
      field: 'trackingNumber',
      headerName: t(TranslationKey['Batch tracking']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch tracking'])} />,
      renderCell: params => (
        <BatchTrackingCell
          disabled={params.row?.status !== BatchStatus.HAS_DISPATCHED}
          rowHandlers={rowHandlers}
          id={params.row?._id}
          arrivalDate={params.row?.arrivalDate}
          trackingNumber={params.row?.trackingNumber}
        />
      ),
      width: 200,
      filterable: false,
      sortable: false,
      columnKey: columnnsKeys.shared.BATCHES_TRACKING,
      disableCustomSort: true,
    },

    {
      field: 'finalWeight',
      headerName: t(TranslationKey['Final weight']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
      renderCell: params => <Text isCell text={toFixedWithKg(params.row.finalWeight)} />,
      type: 'number',
      width: 100,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'deliveryTotalPrice',
      headerName: t(TranslationKey['Delivery cost']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Delivery cost'])} />,
      renderCell: params => <Text isCell text={toFixedWithDollarSign(params.row?.totalPriceFromOrderSupplier, 2)} />,
      type: 'number',
      width: 110,
      sortable: false,
      columnKey: columnnsKeys.shared.NUMBER,
      table: DataGridFilterTables.BOXES,
      disableCustomSort: true,
    },

    {
      field: 'cls',
      headerName: t(TranslationKey['Shipping dates']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Shipping dates'])} />,
      renderCell: params => (
        <WarehouseTariffDatesCell
          cls={params.row.boxes[0].logicsTariff?.cls}
          etd={params.row.boxes[0].logicsTariff?.etd}
          eta={params.row.boxes[0].logicsTariff?.eta}
        />
      ),
      width: 350,
      filterable: false,
      sortable: false,
      columnKey: columnnsKeys.shared.BATCHES_SHIPPING_DATE,
      table: DataGridFilterTables.BOXES,
      disableCustomSort: true,
    },

    {
      field: 'updatedAt',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      headerName: t(TranslationKey.Updated),
      renderCell: params => <NormDateCell value={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.BATCHES
    }
    column.sortable = false
  }

  return columns
}
