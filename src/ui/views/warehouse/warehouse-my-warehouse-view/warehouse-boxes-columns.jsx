import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  ChangeInputCell,
  DimensionsCell,
  DimensionsHeaderCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductsCell,
  RedFlagsCell,
  StringListCell,
  UserCell,
  WarehouseBoxesBtnsCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { calcFinalWeightForBox } from '@utils/calculation'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { openMedia } from '@utils/open-media'
import { printMedia } from '@utils/print-media'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

export const warehouseBoxesViewColumns = (handlers, getUnitsOption) => {
  const columns = [
    {
      field: 'xid',
      headerName: t(TranslationKey['Box ID']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Box ID'])} />,
      type: 'number',
      renderCell: params => <Text isCell text={params.value} />,
      width: 80,
      columnKey: columnnsKeys.client.WAREHOUSE_ID,
    },

    {
      field: 'orderIdsItems',
      headerName: t(TranslationKey['№ Order/ № Item']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['№ Order/ № Item'])} />,

      valueGetter: ({ row }) => {
        const orderNumbers = row?.items.map(cur => cur.order?.xid).join(', ')
        const itemNumbers = row?.items.map(cur => cur.order?.item).join(', ')
        return `${t(TranslationKey.Order)} ${orderNumbers} | Item: ${itemNumbers}`
      },

      renderCell: params => {
        return <StringListCell data={params.value.split('|')} />
      },
      fields: [
        {
          label: '№ Order',
          value: 0,
        },
        {
          label: '№ Item',
          value: 1,
        },
      ],

      columnMenuConfig: [
        {
          field: 'orderXid',
          table: DataGridFilterTables.ORDERS,
          columnKey: ColumnMenuKeys.NUMBER,
        },
        {
          field: 'item',
          table: DataGridFilterTables.ORDERS,
          columnKey: ColumnMenuKeys.NUMBER,
        },
      ],
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 150,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
      valueGetter: ({ row }) =>
        row.items
          ?.map(
            item =>
              `ASIN: ${item?.product?.asin || t(TranslationKey.Missing)} / SKU: ${
                item?.product?.skuByClient || t(TranslationKey.Missing)
              }`,
          )
          .join(', '),
      renderCell: params => <ProductsCell box={params.row} />,
      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue(),
      columnKey: columnnsKeys.shared.MULTIPLE,
      width: 200,
    },

    {
      field: 'shippingLabel',
      headerName: `Shipping label / Barcode / Transparency Codes`,
      renderHeader: () => <MultilineTextHeaderCell text={`Shipping label / Barcode / Transparency Codes`} />,
      renderCell: ({ row }) => (
        <ActionButtonsCell
          showFirst
          showSecond
          showThird
          firstGhost={!row.shippingLabel}
          secondGhost={!row.items[0].barCode}
          thirdGhost={!row.items[0].transparencyFile}
          firstDropdown={!!row.shippingLabel}
          secondDropdown={!!row.items[0].barCode}
          thirdDropdown={!!row.items[0].transparencyFile}
          firstContent="Shipping label"
          secondContent={t(TranslationKey.BarCode)}
          thirdContent="Transparency Codes"
          onClickFirst={() => openMedia(row.shippingLabel)}
          onClickSecond={() => openMedia(row.items[0].barCode)}
          onClickThird={() => openMedia(row.items[0].transparencyFile)}
          onClickPrintFirst={() => printMedia(row.shippingLabel)}
          onClickPrintSecond={() => printMedia(row.items[0].barCode)}
          onClickPrintThird={() => printMedia(row.items[0].transparencyFile)}
        />
      ),
      valueGetter: ({ row }) => {
        const shippingLabelLink = row?.shippingLabel
          ? getAmazonImageUrl(row?.shippingLabel, true)
          : t(TranslationKey.Missing)

        return shippingLabelLink
      },
      filterable: false,
      sortable: false,
      disableCustomSort: true,
      width: 190,
    },

    {
      field: 'amount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
      renderCell: params => {
        const sumItemsAmount = params.row.items.reduce((acc, item) => acc + item.amount, 0)
        const result = params.row.amount * sumItemsAmount

        return <Text isCell text={result} />
      },
      width: 110,
      type: 'number',
      sortable: false,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'destinationId',
      headerName: t(TranslationKey['Destination and tariff']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Destination and tariff'])} />,
      valueGetter: ({ row }) => `${row?.warehouse || ''} / ${row?.logicsTariff || ''}`,
      renderCell: params => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', width: '100%' }}>
          <Text isCell text={params.row?.destination?.name} />
          <Text isCell text={params.row?.logicsTariff?.name} />
        </div>
      ),
      width: 170,
      filterable: false,
      sortable: false,

      fields: [
        {
          label: 'Destination',
          value: 0,
        },
        {
          label: 'Tariff',
          value: 1,
        },
      ],

      columnMenuConfig: [
        {
          field: 'destination',
          table: DataGridFilterTables.BOXES,
          columnKey: ColumnMenuKeys.STRING_VALUE,
        },
        {
          field: 'logicsTariff',
          table: DataGridFilterTables.BOXES,
          columnKey: ColumnMenuKeys.STRING_VALUE,
        },
      ],
      columnKey: columnnsKeys.shared.MULTIPLE,
    },

    {
      field: 'client',
      headerName: t(TranslationKey.Client),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,

      renderCell: params => (
        <UserCell name={params.row.client?.name} id={params.row.client?._id} email={params.row.client?.email} />
      ),
      sortable: false,
      disableCustomSort: true,
      width: 150,
    },

    {
      field: 'batchXid',
      headerName: t(TranslationKey.Batch),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Batch)} />,
      valueGetter: ({ row }) => row?.batch?.xid || t(TranslationKey['Outside Batch']),
      renderCell: params => <Text isCell text={params.row?.batch?.xid || t(TranslationKey['Outside Batch'])} />,

      width: 110,
      table: DataGridFilterTables.BATCHES,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'dimensions',
      headerName: t(TranslationKey.Dimensions),
      renderHeader: params => (
        <DimensionsHeaderCell
          data={params.row}
          transmittedSizeSetting={getUnitsOption()}
          onChangeUnitsOption={handlers.onChangeUnitsOption}
        />
      ),
      renderCell: params => (
        <DimensionsCell isCell isTotalWeight data={params.row} transmittedSizeSetting={getUnitsOption()} />
      ),
      valueGetter: ({ row }) => {
        const boxFinalWeight = toFixed(calcFinalWeightForBox(row, row.volumeWeightCoefficient), 2)
        return `L:${row?.lengthCmWarehouse}, W:${row?.widthCmWarehouse}, H:${row?.heightCmWarehouse}, FW:${boxFinalWeight}`
      },
      sortable: false,
      filterable: false,
      disableCustomSort: true,
      minWidth: 230,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

      renderCell: params => <WarehouseBoxesBtnsCell row={params.row} handlers={handlers} />,

      filterable: false,
      sortable: false,
      disableCustomSort: true,
      width: 200,
    },

    {
      field: 'clientComment',
      headerName: t(TranslationKey['Client comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,

      renderCell: params => <Text isCell text={params.row?.clientComment} />,
      width: 280,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'prepId',
      headerName: 'PREP ID',
      renderHeader: () => <MultilineTextHeaderCell text={'PREP ID'} />,

      renderCell: params => (
        <ChangeInputCell
          isString
          maxLength={25}
          rowId={params.row._id}
          text={params.value}
          onClickSubmit={handlers.onClickSavePrepId}
        />
      ),
      width: 240,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'storage',
      headerName: 'Storage',
      renderHeader: () => <MultilineTextHeaderCell text="Storage" />,

      renderCell: params => (
        <ChangeInputCell
          isString
          maxLength={25}
          rowId={params.row._id}
          text={params.row?.storage}
          onClickSubmit={handlers.onClickSaveStorage}
        />
      ),
      width: 240,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'redFlags',
      headerName: t(TranslationKey['Red flags']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Red flags'])} />,
      renderCell: params => <RedFlagsCell flags={params.row?.items?.[0]?.product?.redFlags} />,
      valueGetter: ({ row }) => row?.items?.[0]?.product?.redFlags?.map(el => el?.title).join(', '),
      width: 130,
      columnKey: columnnsKeys.shared.RED_FLAGS,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE_VALUE,
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
