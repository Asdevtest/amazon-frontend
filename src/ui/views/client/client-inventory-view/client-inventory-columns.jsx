import { GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { ProductStatusByCode, colorByProductStatus, productStatusTranslateKey } from '@constants/product/product-status'
import { mapProductStrategyStatusEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  BarcodeCell,
  ChangeInputCell,
  CommentOfSbCell,
  FourMonthesStockCell,
  HsCodeCell,
  InStockCell,
  MultilineStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  OrderIdAndAmountCountCell,
  ProductAsinCell,
  RedFlagsCell,
  SelectRowCell,
  ShortDateCell,
  TagsCell,
  ToFixedCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { formatCamelCaseString, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { complexCells } from './cell-types'
import { getCellType } from './helpers/get-cell-type'

export const clientInventoryColumns = (
  barCodeHandlers,
  hsCodeHandlers,
  fourMonthesStockHandlers,
  stockUsHandlers,
  otherHandlers,
  additionalFields,
) => {
  const defaultColumns = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      renderCell: params => (
        <SelectRowCell
          checkboxComponent={GRID_CHECKBOX_SELECTION_COL_DEF.renderCell(params)}
          showVariationButton={params.row?.parentProductId || params.row?.hasChildren}
          isParentProduct={!params.row?.parentProductId && params.row?.hasChildren}
          onClickShareIcon={() => otherHandlers.onClickShowProduct(params.row?._id)}
          onClickVariationButton={() =>
            otherHandlers.onClickVariationButton(params.row?.parentProductId || params.row?._id)
          }
        />
      ),
      width: 120,
      hide: true,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.ASIN),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
      renderCell: ({ row }) => {
        return (
          <ProductAsinCell
            image={row?.images?.[0]}
            amazonTitle={row?.amazonTitle}
            asin={row?.asin}
            skuByClient={row?.skuByClient}
          />
        )
      },
      width: 280,
      columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
    },

    {
      field: 'shopId',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: params => <MultilineTextCell twoLines text={params.row?.shop?.name} />,
      width: 90,
      sortable: false,
      columnKey: columnnsKeys.client.INVENTORY_SHOPS,
    },

    {
      field: 'strategyStatus',
      headerName: t(TranslationKey.Strategy),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,
      renderCell: params => <MultilineStatusCell status={mapProductStrategyStatusEnum[params.value]} />,
      width: 140,
      columnKey: columnnsKeys.client.INVENTORY_STRATEGY_STATUS,
    },

    {
      field: 'fbaFbmStockSum',
      headerName: 'Available',
      renderHeader: () => <MultilineTextHeaderCell text={'Available'} />,
      renderCell: params => <MultilineTextCell text={params.value ? String(params.value) : '-'} />,
      width: 85,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'reservedSum',
      headerName: t(TranslationKey.Reserved),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reserved)} />,
      renderCell: params => <MultilineTextCell text={params.value ? String(params.value) : '-'} />,
      width: 85,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'sentToFbaSum',
      headerName: t(TranslationKey.Inbound),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Inbound)} />,
      renderCell: params => <MultilineTextCell text={params.value ? String(params.value) : '-'} />,
      width: 85,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'amountInOrders',
      headerName: 'Order',
      renderHeader: () => <MultilineTextHeaderCell text={'Order'} />,
      renderCell: params => (
        <OrderIdAndAmountCountCell
          orderId={params.value}
          amount={params.row?.amountInPendingOrders}
          onClickOrderId={e => {
            e.stopPropagation()
            otherHandlers.onClickOrderCell(params.row?._id)
          }}
        />
      ),
      width: 85,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'stockUSA',
      headerName: t(TranslationKey.Set) + ' ' + t(TranslationKey.Additionally),
      renderHeader: () => (
        <MultilineTextHeaderCell text={t(TranslationKey.Set) + ' ' + t(TranslationKey.Additionally)} />
      ),
      renderCell: params => (
        <ChangeInputCell
          isInts
          rowId={params.row?._id}
          text={params.value}
          onClickSubmit={stockUsHandlers.onClickSaveStockUs}
        />
      ),
      width: 150,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'inTransfer',
      headerName: 'in Transfer',
      renderHeader: () => <MultilineTextHeaderCell text={'in Transfer'} />,
      renderCell: params => {
        return (
          <MultilineTextCell
            text={String(params.value)}
            onClickText={e => {
              e.stopPropagation()
              otherHandlers.onClickInTransfer(params.row?._id)
            }}
          />
        )
      },
      width: 85,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'boxAmounts',
      headerName: 'In stock',
      renderHeader: () => <MultilineTextHeaderCell text={'In stock'} />,
      renderCell: params => (
        <InStockCell
          boxAmounts={params.row?.boxAmounts}
          boxId={params.row?._id}
          onClickInStock={otherHandlers.onClickInStock}
        />
      ),
      valueGetter: params => {
        return params.row?.boxAmounts
          .sort((x, y) => x?.storekeeper?.name?.localeCompare(y?.storekeeper?.name))
          .map(el => `${el?.storekeeper?.name}: ${el?.amountInBoxes}`)
          .join(', ')
      },
      width: 145,
      sortable: false,
      columnKey: columnnsKeys.client.INVENTORY_IN_STOCK,
    },

    {
      field: 'sumStock',
      headerName: t(TranslationKey['Stock sum']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Stock sum'])} />,
      renderCell: params => <MultilineTextCell text={params.value} />,
      width: 120,

      type: 'number',

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'stockCost',
      headerName: t(TranslationKey['Stock cost']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Stock cost'])} />,
      renderCell: params => <MultilineTextCell text={toFixed(params.value, 2)} />,
      width: 120,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'purchaseQuantity',
      headerName: t(TranslationKey['Recommendation for additional purchases']),
      renderHeader: () => (
        <MultilineTextHeaderCell
          withIcon
          isFilterActive
          text={t(TranslationKey['Recommendation for additional purchases'])}
        />
      ),
      renderCell: params => (
        <FourMonthesStockCell
          rowId={params.row?._id}
          value={params.value}
          fourMonthesStock={params.row.fourMonthesStock}
          onClickSaveFourMonthsStock={fourMonthesStockHandlers.onClickSaveFourMonthsStock}
        />
      ),

      width: 150,
      filterable: false,
    },

    {
      field: 'amazon',
      headerName: t(TranslationKey['Amazon price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,
      renderCell: params => <ToFixedCell value={params.value} fix={2} />,
      width: 80,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'profit',
      headerName: t(TranslationKey.Profit),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Profit)} />,
      renderCell: params => <ToFixedCell value={params.value} fix={2} />,
      width: 90,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'fbafee',
      headerName: t(TranslationKey.FBA),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.FBA)} />,
      renderCell: params => <ToFixedCell value={params.value} fix={2} />,
      width: 70,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'tags',
      headerName: t(TranslationKey.Tags),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tags)} />,
      renderCell: params => <TagsCell tags={params.row?.tags} />,
      width: 160,
      sortable: false,
      columnKey: columnnsKeys.shared.TAGS,
    },

    {
      field: 'redFlags',
      headerName: t(TranslationKey['Red flags']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Red flags'])} />,
      renderCell: params => <RedFlagsCell flags={params.row?.redFlags} />,
      width: 130,
      sortable: false,
      columnKey: columnnsKeys.shared.RED_FLAGS,
    },

    {
      field: 'transparency',
      headerName: 'Transparency codes',
      renderHeader: () => <MultilineTextHeaderCell text={'Transparency codes'} />,
      renderCell: params => <MultilineTextCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
      width: 135,
      columnKey: columnnsKeys.shared.YES_NO,
    },

    {
      field: 'barCode',
      headerName: t(TranslationKey.BarCode),
      renderHeader: () => <MultilineTextHeaderCell withIcon isFilterActive text={t(TranslationKey.BarCode)} />,
      renderCell: params => <BarcodeCell product={params.row} handlers={barCodeHandlers} />,
      width: 120,
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
    },

    {
      field: 'hsCode',
      headerName: 'HS code',
      renderHeader: () => <MultilineTextHeaderCell text={'HS code'} />,
      renderCell: params => <HsCodeCell product={params.row} handlers={hsCodeHandlers} />,
      width: 120,
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: params => (
        <MultilineTextCell
          text={t(productStatusTranslateKey(ProductStatusByCode[params.row?.status]))}
          color={colorByProductStatus(ProductStatusByCode[params.row?.status])}
        />
      ),
      width: 100,
      columnKey: columnnsKeys.client.INVENTORY_STATUS,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: params => <ShortDateCell value={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <ShortDateCell value={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'ideasOnCheck',
      headerName: t(TranslationKey['Ideas to Check']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Ideas to Check'])} />,
      renderCell: params => <MultilineTextCell text={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'ideasClosed',
      headerName: t(TranslationKey['Closed Ideas']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Closed Ideas'])} />,
      renderCell: params => <MultilineTextCell text={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'ideasFinished',
      headerName: t(TranslationKey['Verified ideas']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Verified ideas'])} />,
      renderCell: params => <MultilineTextCell text={params.value} />,
      width: 120,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'commentSb',
      headerName: t(TranslationKey['Comment of SB']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Comment of SB'])} />,
      renderCell: params => <CommentOfSbCell productsInWarehouse={params.row?.productsInWarehouse} />,
      width: 400,
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
    },

    {
      field: 'clientComment',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
      renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={140} text={params.value} />,
      width: 400,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
  ]

  if (additionalFields) {
    for (const table in additionalFields) {
      if (additionalFields[table]) {
        const columns = additionalFields[table]

        if (columns?.some(column => complexCells?.includes(column))) {
          const formedTableName = formatCamelCaseString(table)

          const complexCell = {
            field: table,
            headerName: `${formedTableName} product`,
            renderHeader: () => <MultilineTextHeaderCell text={`${formedTableName} product`} />,

            renderCell: ({ row }) => {
              const product = row?.[table]

              return (
                <ProductAsinCell withoutTitle image={product?.image} asin={product?.asin} skuByClient={product?.sku} />
              )
            },
            width: 295,

            columnKey: columnnsKeys.client.SHOP_REPORT,
          }

          defaultColumns.push(complexCell)
        }

        for (const column of columns) {
          const cell = getCellType(column, table)

          if (cell) {
            defaultColumns.push(cell)
          }
        }
      }
    }
  }

  for (const column of defaultColumns) {
    column.table = DataGridFilterTables.PRODUCTS
  }

  return defaultColumns
}
