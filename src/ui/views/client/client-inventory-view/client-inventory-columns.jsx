import { GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { ProductStatusByCode, colorByProductStatus, productStatusTranslateKey } from '@constants/product/product-status'
import { productStrategyStatusesEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  ChangeInputCell,
  CommentOfSbCell,
  FourMonthesStockCell,
  InStockCell,
  ManyUserLinkCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductCell,
  ProductVariationsCell,
  RedFlagsCell,
  SelectRowCell,
  TagsCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'
import { productionTimeColumnMenuItems } from '@config/data-grid-column-menu/production-time'

import { productionTimeColumnMenuValue } from './client-inventory-view.config'
import { getColumn } from './helpers/get-column'

export const clientInventoryColumns = ({
  barCodeHandlers,
  hsCodeHandlers,
  fourMonthesStockHandlers,
  stockUsHandlers,
  otherHandlers,
  storekeepers,
  integrationTables,
}) => {
  const defaultColumns = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      renderCell: params => {
        const isShowSheldGreen = !params.row.ideasOnCheck && !!params.row.ideasVerified
        const isShowSheldYellow = !!params.row.ideasOnCheck

        return (
          <SelectRowCell
            isShowSheldGreen={isShowSheldGreen}
            isShowSheldYellow={isShowSheldYellow}
            checkboxComponent={GRID_CHECKBOX_SELECTION_COL_DEF.renderCell(params)}
            onClickShareIcon={() => otherHandlers.onClickShowProduct(params.row?._id)}
          />
        )
      },
      width: 80,
      disableCustomSort: true,
      hide: true,
    },

    {
      field: 'children',
      headerName: t(TranslationKey.Variation),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Variation)} />,
      renderCell: ({ row }) => (
        <ProductVariationsCell
          showVariationButton={row?.parentProductId || row?.hasChildren}
          isParentProduct={!row?.parentProductId && row?.hasChildren}
          onClickVariationButton={() => otherHandlers.onClickVariationButton(row?.parentProductId || row?._id)}
        />
      ),
      width: 90,
      columnKey: columnnsKeys.shared.YES_NO,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.ASIN),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
      renderCell: ({ row }) => (
        <ProductCell image={row.images?.[0]} title={row.amazonTitle} asin={row.asin} sku={row.skuByClient} />
      ),
      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue(),
      columnKey: columnnsKeys.shared.MULTIPLE,
      width: 170,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: params => <Text isCell text={params.row?.shop?.name} />,
      valueGetter: ({ row }) => row?.shop?.name,
      width: 90,
      disableCustomSort: true,
      sortOptions: 'asc',
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'strategyStatus',
      headerName: t(TranslationKey.Strategy),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,
      renderCell: params => <Text isCell text={productStrategyStatusesEnum[params.value]?.replace(/_/g, ' ')} />,
      transformValueMethod: status => productStrategyStatusesEnum[status]?.replace(/_/g, ' '),
      width: 140,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'fbaFbmStockSum',
      headerName: 'Available',
      renderHeader: () => <MultilineTextHeaderCell text={'Available'} />,
      renderCell: params => <Text isCell text={String(params.value)} />,
      width: 85,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'reservedSum',
      headerName: t(TranslationKey.Reserved),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reserved)} />,
      renderCell: params => <Text isCell text={String(params.value)} />,
      width: 85,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'sentToFbaSum',
      headerName: t(TranslationKey.Inbound),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Inbound)} />,
      renderCell: params => (
        <Text
          isCell
          text={params.value}
          link={Number(params.value) > 0}
          onClick={e => {
            if (Number(params.value) > 0) {
              otherHandlers.onOpenProductDataModal(params.row, true)
            }
          }}
        />
      ),
      width: 85,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'amountInOrders',
      headerName: 'Order',
      renderHeader: () => <MultilineTextHeaderCell text={'Order'} />,
      renderCell: params => (
        <Text
          isCell
          link
          text={params.value}
          onClick={() => otherHandlers.onClickOrderCell(params.row?._id, 'atProcess')}
        />
      ),
      width: 85,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'amountInPendingOrders',
      headerName: t(TranslationKey['Pending order']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Pending order'])} />,
      renderCell: params => (
        <Text
          isCell
          link
          text={params.value}
          onClick={() => otherHandlers.onClickOrderCell(params.row?._id, 'pending')}
        />
      ),
      width: 85,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'stockUSA',
      headerName: t(TranslationKey.Set) + ' ' + t(TranslationKey.Additionally),
      renderHeader: () => (
        <MultilineTextHeaderCell text={t(TranslationKey.Set) + ' ' + t(TranslationKey.Additionally)} />
      ),
      renderCell: params => (
        <ChangeInputCell
          isInteger
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
      headerName: 'In Transfer',
      renderHeader: () => <MultilineTextHeaderCell text="In Transfer" />,
      renderCell: params => (
        <Text
          isCell
          link={Number(params.value) > 0}
          text={params.value}
          onClick={e => {
            if (Number(params.value) > 0) {
              otherHandlers.onOpenProductDataModal(params.row, false)
            }
          }}
        />
      ),
      width: 85,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'sumStock',
      headerName: t(TranslationKey['Stock sum']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Stock sum'])} />,
      renderCell: params => <Text isCell text={Math.round(params.value)} />,
      valueGetter: ({ row }) => toFixed(row?.sumStock, 2),
      width: 120,
      type: 'number',
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'stockCost',
      headerName: t(TranslationKey['Stock cost']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Stock cost'])} />,
      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      valueGetter: ({ row }) => toFixed(row?.stockCost, 2),
      width: 120,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'purchaseQuantity',
      headerName: t(TranslationKey['Recommendation for additional purchases']),
      renderHeader: () => (
        <MultilineTextHeaderCell text={t(TranslationKey['Recommendation for additional purchases'])} />
      ),
      renderCell: params => (
        <FourMonthesStockCell
          rowId={params.row?._id}
          value={params.value}
          fourMonthesStockValue={params.row.fourMonthesStock}
          minValue={100}
          maxValue={99999}
          onClick={fourMonthesStockHandlers.onClickSaveFourMonthsStock}
          onClickRepurchase={fourMonthesStockHandlers.onClickRepurchase}
        />
      ),

      width: 150,
      filterable: false,
      columnKey: columnnsKeys.client.INVENTORY_PURCHASE_QUANTITY,
    },

    {
      field: 'amazon',
      headerName: t(TranslationKey['Amazon price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,
      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      width: 80,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'profit',
      headerName: t(TranslationKey.Profit),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Profit)} />,
      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      width: 90,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'fbafee',
      headerName: t(TranslationKey.FBA),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.FBA)} />,
      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      width: 70,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'currentSupplierMaxProductionTerm',
      headerName: t(TranslationKey['Production time, days']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,
      renderCell: params => {
        const currentSupplier = params.row.currentSupplier

        return currentSupplier ? (
          <Text isCell text={`${currentSupplier?.minProductionTerm} - ${currentSupplier?.maxProductionTerm}`} />
        ) : null
      },
      valueGetter: params => {
        const currentSupplier = params.row.currentSupplier

        return `${currentSupplier?.minProductionTerm} - ${currentSupplier?.maxProductionTerm}`
      },

      fields: productionTimeColumnMenuItems,
      columnMenuConfig: productionTimeColumnMenuValue,
      columnKey: columnnsKeys.shared.MULTIPLE,

      sortable: false,
      width: 120,
    },

    {
      field: 'tags',
      headerName: t(TranslationKey.Tags),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tags)} />,
      renderCell: params => (
        <TagsCell
          tags={params.row?.tags}
          onClickTag={otherHandlers.onClickTag}
          onClickEdit={() => otherHandlers.onClickEdit(params.row?._id)}
        />
      ),
      valueGetter: ({ row }) => row?.tags?.map(el => el?.title).join(', '),
      width: 160,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.TAGS,
    },

    {
      field: 'redFlags',
      headerName: t(TranslationKey['Red flags']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Red flags'])} />,
      renderCell: params => <RedFlagsCell flags={params.row?.redFlags} />,
      valueGetter: ({ row }) => row?.redFlags?.map(el => el?.title).join(', '),
      width: 130,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.RED_FLAGS,
    },

    {
      field: 'requestsInWork',
      headerName: t(TranslationKey['Requests in progress']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Requests in progress'])} />,
      renderCell: params => (
        <Text isCell link text={params.value} onClick={() => otherHandlers.onClickRequestCell(params.row?._id)} />
      ),
      width: 120,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'transparency',
      headerName: 'Transparency Codes',
      renderHeader: () => <MultilineTextHeaderCell text={'Transparency Codes'} />,
      renderCell: params => <Text isCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
      width: 135,
      columnKey: columnnsKeys.shared.YES_NO,
    },

    {
      field: 'barCode',
      headerName: t(TranslationKey.BarCode),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,
      renderCell: ({ row }) => (
        <ActionButtonsCell
          showFirst
          firstDropdown={!!row?.barCode}
          firstContent={t(TranslationKey.BarCode)}
          onClickFirst={() => barCodeHandlers.onClickBarcode(row)}
          onClickRemoveFirst={() => barCodeHandlers.onDeleteBarcode(row)}
        />
      ),

      width: 130,
      columnKey: columnnsKeys.client.INVENTORY_BARCODE,
    },

    {
      field: 'hsCode',
      headerName: 'HS code',
      renderHeader: () => <MultilineTextHeaderCell text={'HS code'} />,
      renderCell: ({ row }) => (
        <ActionButtonsCell
          showFirst
          firstDropdown={row?.hsCode}
          firstContent={t(TranslationKey['HS code'])}
          onClickFirst={() => hsCodeHandlers.onClickHsCode(row)}
          onClickRemoveFirst={() => hsCodeHandlers.onDeleteHsCode(row)}
        />
      ),

      width: 150,
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: params => (
        <Text
          isCell
          text={t(productStatusTranslateKey(ProductStatusByCode[params.row?.status]))}
          color={colorByProductStatus(ProductStatusByCode[params.row?.status])}
        />
      ),
      transformValueMethod: status => t(productStatusTranslateKey(ProductStatusByCode[status])),
      width: 100,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE,
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
      field: 'ideasOnCheck',
      headerName: t(TranslationKey['Ideas to Check']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Ideas to Check'])} />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'ideasClosed',
      headerName: t(TranslationKey['Closed Ideas']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Closed Ideas'])} />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'ideasFinished',
      headerName: t(TranslationKey['Verified ideas']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Verified ideas'])} />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 120,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'subUsers',
      headerName: t(TranslationKey['Access to product']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Access to product'])} />,
      renderCell: params => {
        const subUsers = params.row?.subUsers || []
        const subUsersByShop = params.row?.subUsersByShop || []

        return <ManyUserLinkCell usersData={subUsers?.concat(subUsersByShop)} />
      },
      valueGetter: ({ row }) => {
        const subUsers = row?.subUsers || []
        const subUsersByShop = row?.subUsersByShop || []

        return subUsers?.concat(subUsersByShop).join(', ')
      },
      width: 187,
      filterable: false,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'commentSb',
      headerName: t(TranslationKey['Comment of SB']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Comment of SB'])} />,
      renderCell: params => <CommentOfSbCell productsInWarehouse={params.row?.productsInWarehouse} />,
      valueGetter: ({ row }) => row?.productsInWarehouse?.map(el => el?.comment || '').join(', '),
      width: 400,
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'clientComment',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
      renderCell: params => <Text isCell text={params.value} />,
      valueGetter: ({ row }) => row?.clientComment,
      width: 400,
      disableCustomSort: true,
      filterable: false,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
  ]

  if (storekeepers?.length) {
    const storekeeperCells = []

    for (const storekeeper of storekeepers) {
      const lable = `In stock (${storekeeper?.name})`
      const lablePurchaseQuantity = `Prep limit (${storekeeper?.name})`

      const storekeeperCell = {
        field: 'amountInBoxes' + storekeeper?._id,
        headerName: lable,
        defaultOption: storekeeper?._id,
        renderHeader: () => <MultilineTextHeaderCell text={lable} />,
        renderCell: params => (
          <InStockCell
            isHideStorekeeper
            boxAmounts={params.row?.boxAmounts?.filter(box => box?.storekeeper?._id === storekeeper?._id)}
            boxId={params.row?._id}
            onClickInStock={otherHandlers.onClickInStock}
          />
        ),
        valueGetter: params => {
          const boxAmounts = params.row?.boxAmounts?.filter(box => box?.storekeeper?._id === storekeeper?._id)?.[0]
            ?.amountInBoxes

          return Number(boxAmounts) || 0
        },
        width: 160,
        columnKey: columnnsKeys.client.INVENTORY_IN_STOCK,
      }

      storekeeperCells.push(storekeeperCell)

      const purchaseQuantityCell = {
        field: 'toRefill' + storekeeper?._id,
        defaultOption: storekeeper?._id,
        headerName: lablePurchaseQuantity,
        renderHeader: () => <MultilineTextHeaderCell text={lablePurchaseQuantity} />,
        renderCell: params => {
          const currentBoxAmounts = params.row?.boxAmounts?.filter(
            box => box?.storekeeper?._id === storekeeper?._id,
          )?.[0]

          return (
            <FourMonthesStockCell
              isNotPepurchase
              title="For shipping"
              rowId={storekeeper?._id}
              value={currentBoxAmounts?.toRefill || 0}
              fourMonthesStockValue={currentBoxAmounts?.recommendedValue || 0}
              onClick={(storekeeperId, recommendedValue) =>
                fourMonthesStockHandlers.editRecommendationForStockByGuid(
                  params?.row?._id,
                  storekeeperId,
                  recommendedValue,
                )
              }
            />
          )
        },
        valueGetter: params => {
          const currentBoxAmounts = params.row?.boxAmounts?.filter(
            box => box?.storekeeper?._id === storekeeper?._id,
          )?.[0]

          return Number(currentBoxAmounts?.toRefill) || 0
        },
        width: 150,
        filterable: false,
        columnKey: columnnsKeys.client.INVENTORY_PURCHASE_QUANTITY,
      }

      storekeeperCells.push(purchaseQuantityCell)
    }

    defaultColumns.splice(11, 0, ...storekeeperCells)
  }

  if (integrationTables) {
    for (const table in integrationTables) {
      if (integrationTables[table]) {
        const currentTableColumns = integrationTables[table]

        if (Array?.isArray(currentTableColumns)) {
          for (const column of currentTableColumns) {
            const currentColumn = getColumn({ table, column })

            defaultColumns.push(currentColumn)
          }
        } else {
          const currentColumn = getColumn({
            table,
            column: currentTableColumns,
            isCounter: true,
            onClickParsingReportCell: otherHandlers.onClickParsingReportCell,
          })
          defaultColumns.push(currentColumn)
        }
      }
    }
  }

  for (const column of defaultColumns) {
    if (!column.table) {
      column.table = DataGridFilterTables.PRODUCTS
    }

    column.sortable = false
  }

  return defaultColumns
}
