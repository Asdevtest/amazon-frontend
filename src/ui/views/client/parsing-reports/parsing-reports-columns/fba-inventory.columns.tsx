import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, ProductCell, UserLinkCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const fbaInventoryColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <Text isCell text={params.row?.shop?.name} />,
      width: 90,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'client',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: params => <UserLinkCell blackText name={params.row.client?.name} userId={params.row.client?._id} />,
      width: 110,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.ASIN),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
      renderCell: ({ row }) => <ProductCell title={row?.productName} asin={row?.asin} sku={row?.sku} />,

      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue<ParsingReportsType>({
        isSimpleSku: true,
        table: ParsingReportsType.ORDERS,
        customTitleField: 'productName',
      }),
      columnKey: columnnsKeys.shared.MULTIPLE,
      width: 170,
    },

    {
      field: 'fnsku',
      headerName: 'Fnsku',
      renderHeader: () => <MultilineTextHeaderCell text="Fnsku" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'condition',
      headerName: 'Condition',
      renderHeader: () => <MultilineTextHeaderCell text="Condition" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'available',
      headerName: 'Available',
      renderHeader: () => <MultilineTextHeaderCell text="Available" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'pendingRemovalQuantity',
      headerName: 'Pending removal quantity',
      renderHeader: () => <MultilineTextHeaderCell text="Pending removal quantity" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'invAge0To90Days',
      headerName: 'Inv age 0 to 90 days',
      renderHeader: () => <MultilineTextHeaderCell text="Inv age 0 to 90 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'invAge91To180Days',
      headerName: 'Inv age 91 to 180 days',
      renderHeader: () => <MultilineTextHeaderCell text="Inv age 91 to 180 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'invAge181To270Days',
      headerName: 'Inv age 181 to 270 days',
      renderHeader: () => <MultilineTextHeaderCell text="Inv age 181 to 270 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'invAge271To365Days',
      headerName: 'Inv age 271 to 365 days',
      renderHeader: () => <MultilineTextHeaderCell text="Inv age 271 to 365 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'invAge365PlusDays',
      headerName: 'Inv age 365 plus days',
      renderHeader: () => <MultilineTextHeaderCell text="Inv age 365 plus days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'currency',
      headerName: 'Currency',
      renderHeader: () => <MultilineTextHeaderCell text="Currency" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'unitsShippedT7',
      headerName: 'Units shipped T7',
      renderHeader: () => <MultilineTextHeaderCell text="Units shipped T7" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'unitsShippedT30',
      headerName: 'Units shipped T30',
      renderHeader: () => <MultilineTextHeaderCell text="Units shipped T30" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'unitsShippedT60',
      headerName: 'Units shipped T60',
      renderHeader: () => <MultilineTextHeaderCell text="Units shipped T60" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'unitsShippedT90',
      headerName: 'Units shipped T90',
      renderHeader: () => <MultilineTextHeaderCell text="Units shipped T90" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'alert',
      headerName: 'Alert',
      renderHeader: () => <MultilineTextHeaderCell text="Alert" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'yourPrice',
      headerName: 'Your price',
      renderHeader: () => <MultilineTextHeaderCell text="Your price" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'salesPrice',
      headerName: 'Sales price',
      renderHeader: () => <MultilineTextHeaderCell text="Sales price" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'lowestPriceNewPlusShipping',
      headerName: 'Lowest price new plus shipping',
      renderHeader: () => <MultilineTextHeaderCell text="Lowest price new plus shipping" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'lowestPriceUsed',
      headerName: 'Lowest price used',
      renderHeader: () => <MultilineTextHeaderCell text="Lowest price used" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'recommendedAction',
      headerName: 'Recommended action',
      renderHeader: () => <MultilineTextHeaderCell text="Recommended action" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'deprecatedHealthyInventoryLevel',
      headerName: 'Deprecated healthy inventory level',
      renderHeader: () => <MultilineTextHeaderCell text="Deprecated healthy inventory level" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'recommendedSalesPrice',
      headerName: 'Recommended sales price',
      renderHeader: () => <MultilineTextHeaderCell text="Recommended sales price" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'recommendedSaleDurationDays',
      headerName: 'Recommended sale duration days',
      renderHeader: () => <MultilineTextHeaderCell text="Recommended sale duration days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'recommendedRemovalQuantity',
      headerName: 'Recommended removal quantity',
      renderHeader: () => <MultilineTextHeaderCell text="Recommended removal quantity" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'estimatedCostSavingsOfRecommendedActions',
      headerName: 'Estimated cost savings of recommended actions',
      renderHeader: () => <MultilineTextHeaderCell text="Estimated cost savings of recommended actions" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'sellThrough',
      headerName: 'Sell through',
      renderHeader: () => <MultilineTextHeaderCell text="Sell through" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'itemVolume',
      headerName: 'Item volume',
      renderHeader: () => <MultilineTextHeaderCell text="Item volume" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'volumeUnitMeasurement',
      headerName: 'Volume unit measurement',
      renderHeader: () => <MultilineTextHeaderCell text="Volume unit measurement" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'storageType',
      headerName: 'Storage type',
      renderHeader: () => <MultilineTextHeaderCell text="Storage type" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'marketplace',
      headerName: 'Marketplace',
      renderHeader: () => <MultilineTextHeaderCell text="Marketplace" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'productGroup',
      headerName: 'Product group',
      renderHeader: () => <MultilineTextHeaderCell text="Product group" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'storageVolume',
      headerName: 'Storage volume',
      renderHeader: () => <MultilineTextHeaderCell text="Storage volume" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'salesRank',
      headerName: 'Sales rank',
      renderHeader: () => <MultilineTextHeaderCell text="Sales rank" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'daysOfSupply',
      headerName: 'Days of supply',
      renderHeader: () => <MultilineTextHeaderCell text="Days of supply" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'estimatedExcessQuantity',
      headerName: 'Stimated excess quantity',
      renderHeader: () => <MultilineTextHeaderCell text="Stimated excess quantity" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'weeksOfCoverT30',
      headerName: 'Weeks of cover T30',
      renderHeader: () => <MultilineTextHeaderCell text="Weeks of cover T30" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'weeksOfCoverT90',
      headerName: 'Weeks of cover T90',
      renderHeader: () => <MultilineTextHeaderCell text="Weeks of cover T90" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'featuredofferPrice',
      headerName: 'Featuredoffer Price',
      renderHeader: () => <MultilineTextHeaderCell text="Featuredoffer Price" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'salesShippedLast7Days',
      headerName: 'Sales shipped last 7 days',
      renderHeader: () => <MultilineTextHeaderCell text="Sales shipped last 7 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'salesShippedLast30Days',
      headerName: 'Sales shipped last 30 days',
      renderHeader: () => <MultilineTextHeaderCell text="Sales shipped last 30 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'salesShippedLast60Days',
      headerName: 'Sales shipped last 60 days',
      renderHeader: () => <MultilineTextHeaderCell text="Sales shipped last 60 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'salesShippedLast90Days',
      headerName: 'Sales shipped last 90 days',
      renderHeader: () => <MultilineTextHeaderCell text="Sales shipped last 90 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'invAge0To30Days',
      headerName: 'Inv age 0 to 30 days',
      renderHeader: () => <MultilineTextHeaderCell text="Inv age 0 to 30 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'invAge31To60Days',
      headerName: 'Inv age 31 to 60 days',
      renderHeader: () => <MultilineTextHeaderCell text="Inv age 31 to 60 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'invAge61To90Days',
      headerName: 'Inv age 61 to 90 days',
      renderHeader: () => <MultilineTextHeaderCell text="Inv age 61 to 90 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'invAge181To330Days',
      headerName: 'Inv age 181 to 330 days',
      renderHeader: () => <MultilineTextHeaderCell text="Inv age 181 to 330 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'invAge331To365Days',
      headerName: 'Inv age 331 to 365 days',
      renderHeader: () => <MultilineTextHeaderCell text="Inv age 331 to 365 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'estimatedStorageCostNextMonth',
      headerName: 'Estimated storage cost next month',
      renderHeader: () => <MultilineTextHeaderCell text="Estimated storage cost next month" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'inboundQuantity',
      headerName: 'Inbound quantity',
      renderHeader: () => <MultilineTextHeaderCell text="Inbound quantity" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'inboundWorking',
      headerName: 'Inbound working',
      renderHeader: () => <MultilineTextHeaderCell text="Inbound working" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'inboundShipped',
      headerName: 'Inbound shipped',
      renderHeader: () => <MultilineTextHeaderCell text="Inbound shipped" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'inboundReceived',
      headerName: 'Inbound received',
      renderHeader: () => <MultilineTextHeaderCell text="Inbound received" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'noSaleLast6Months',
      headerName: 'No sale last 6 months',
      renderHeader: () => <MultilineTextHeaderCell text="No sale last 6 months" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'reservedQuantity',
      headerName: 'Reserved quantity',
      renderHeader: () => <MultilineTextHeaderCell text="Reserved quantity" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'unfulfillableQuantity',
      headerName: 'Unfulfillable quantity',
      renderHeader: () => <MultilineTextHeaderCell text="Unfulfillable quantity" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'quantityToBeChargedAis181210Days',
      headerName: 'Quantity to be charged ais 181210 days',
      renderHeader: () => <MultilineTextHeaderCell text="Quantity to be charged ais 181210 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'estimatedAis181210Days',
      headerName: 'Estimated ais 181210 days',
      renderHeader: () => <MultilineTextHeaderCell text="Estimated ais 181210 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'quantityToBeChargedAis211240Days',
      headerName: 'Quantity to be charged ais 211240 days',
      renderHeader: () => <MultilineTextHeaderCell text="Quantity to be charged ais 211240 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'estimatedAis211240Days',
      headerName: 'Estimated ais 211240 days',
      renderHeader: () => <MultilineTextHeaderCell text="Estimated ais 211240 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'quantityToBeChargedAis241270Days',
      headerName: 'Quantity to be charged ais 241270 days',
      renderHeader: () => <MultilineTextHeaderCell text="Quantity to be charged ais 241270 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'estimatedAis241270Days',
      headerName: 'Estimated ais 241270 days',
      renderHeader: () => <MultilineTextHeaderCell text="Estimated ais 241270 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'quantityToBeChargedAis271300Days',
      headerName: 'Quantity to be charged ais 271300 days',
      renderHeader: () => <MultilineTextHeaderCell text="Quantity to be charged ais 271300 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'estimatedAis271300Days',
      headerName: 'Estimated ais 271300 days',
      renderHeader: () => <MultilineTextHeaderCell text="Estimated ais 271300 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'quantityToBeChargedAis301330Days',
      headerName: 'Quantity to be charged ais 301330 days',
      renderHeader: () => <MultilineTextHeaderCell text="Quantity to be charged ais 301330 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'estimatedAis301330Days',
      headerName: 'Estimated ais 301330 days',
      renderHeader: () => <MultilineTextHeaderCell text="Estimated ais 301330 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'quantityToBeChargedAis331365Days',
      headerName: 'Quantity to be charged ais 331365 days',
      renderHeader: () => <MultilineTextHeaderCell text="Quantity to be charged ais 331365 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'estimatedAis331365Days',
      headerName: 'Estimated ais 331365 days',
      renderHeader: () => <MultilineTextHeaderCell text="Estimated ais 331365 days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'quantityToBeChargedAis365PlusDays',
      headerName: 'Quantity to be charged ais 365 plus days',
      renderHeader: () => <MultilineTextHeaderCell text="Quantity to be charged ais 365 plus days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'estimatedAis365PlusDays',
      headerName: 'Estimated ais 365 plus days',
      renderHeader: () => <MultilineTextHeaderCell text="Estimated ais 365 plus days" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'historicalDaysOfSupply',
      headerName: 'Historical days of supply',
      renderHeader: () => <MultilineTextHeaderCell text="Historical days of supply" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'fbaMinimumInventoryLevel',
      headerName: 'Fba minimum inventory level',
      renderHeader: () => <MultilineTextHeaderCell text="Fba minimum inventory level" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'fbaInventoryLevelHealthStatus',
      headerName: 'Fba inventory level health status',
      renderHeader: () => <MultilineTextHeaderCell text="Fba inventory level health status" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'recommendedShipInQuantity',
      headerName: 'Recommended ship in quantity',
      renderHeader: () => <MultilineTextHeaderCell text="Recommended ship in quantity" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'recommendedShipInDate',
      headerName: 'Recommended ship in date',
      renderHeader: () => <MultilineTextHeaderCell text="Recommended ship in date" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.FBA_INVENTORY
    }

    column.sortable = false
  }

  return columns
}
