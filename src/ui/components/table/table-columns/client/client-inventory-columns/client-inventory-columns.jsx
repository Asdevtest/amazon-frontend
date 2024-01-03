import { GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { ProductStatusByCode, colorByProductStatus } from '@constants/product/product-status'
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

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

export const clientInventoryColumns = (
  barCodeHandlers,
  hsCodeHandlers,
  fourMonthesStockHandlers,
  stockUsHandlers,
  otherHandlers,
  getColumnMenuSettings,
  getOnHover,
) => [
  {
    ...GRID_CHECKBOX_SELECTION_COL_DEF,
    renderCell: params => (
      <SelectRowCell
        checkboxComponent={GRID_CHECKBOX_SELECTION_COL_DEF.renderCell(params)}
        showVariationButton={params.row?.originalData?.parentProductId || params.row?.originalData?.hasChildren}
        isParentProduct={!params.row?.originalData?.parentProductId && params.row?.originalData?.hasChildren}
        onClickShareIcon={() => otherHandlers.onClickShowProduct(params.row?.originalData?._id)}
        onClickVariationButton={() =>
          otherHandlers.onClickVariationButton(
            params.row?.originalData?.parentProductId || params.row?.originalData?._id,
          )
        }
      />
    ),
    width: 120,

    hide: true,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.ASIN)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={
          getColumnMenuSettings()?.asin?.currentFilterData?.length ||
          getColumnMenuSettings()?.skuByClient?.currentFilterData?.length ||
          getColumnMenuSettings()?.amazonTitle?.currentFilterData?.length
        }
      />
    ),

    renderCell: params => {
      const product = params.row.originalData

      return (
        <ProductAsinCell
          image={product?.images?.[0]}
          amazonTitle={product?.amazonTitle}
          asin={product?.asin}
          skuByClient={product?.skuByClient}
        />
      )
    },
    width: 295,
    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'shopId',
    headerName: t(TranslationKey.Shop),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Shop)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell twoLines text={params.value} />,
    width: 90,
    sortable: false,

    columnKey: columnnsKeys.client.INVENTORY_SHOPS,
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Strategy)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineStatusCell status={params.value} />,
    width: 140,

    columnKey: columnnsKeys.client.INVENTORY_STRATEGY_STATUS,
  },

  {
    field: 'fbaFbmStockSum',
    headerName: 'Available',
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={'Available'}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineTextCell text={params.value ? String(params.value) : '-'} />,
    type: 'number',
    width: 85,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'reservedSum',
    headerName: t(TranslationKey.Reserved),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Reserved)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineTextCell text={params.value ? String(params.value) : '-'} />,
    type: 'number',
    width: 85,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'sentToFbaSum',
    headerName: t(TranslationKey.Inbound),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Inbound)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    // renderCell: params => <MultilineTextCell text={String(params.value)} />,
    renderCell: params => <MultilineTextCell text={params.value ? String(params.value) : '-'} />,
    type: 'number',
    width: 85,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'amountInOrders',
    headerName: 'Order',
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={'Order'}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => (
      <OrderIdAndAmountCountCell
        orderId={params.value}
        amount={params.row.originalData.amountInPendingOrders}
        onClickOrderId={e => {
          e.stopPropagation()

          otherHandlers.onClickOrderCell(params.row.originalData._id)
        }}
      />
    ),
    type: 'number',
    width: 85,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'stockUSA',
    headerName: t(TranslationKey.Set) + ' ' + t(TranslationKey.Additionally),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Set) + ' ' + t(TranslationKey.Additionally)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => (
      <ChangeInputCell
        isInts
        rowId={params.row.originalData._id}
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
            otherHandlers.onClickInTransfer(params.row.originalData._id)
          }}
        />
      )
    },
    type: 'number',
    width: 85,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'transparency',
    headerName: 'Transparency codes',
    renderHeader: () => <MultilineTextHeaderCell text={'Transparency codes'} />,
    renderCell: params => <MultilineTextCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
    type: 'boolean',
    width: 135,
    columnKey: columnnsKeys.shared.YES_NO,
  },

  {
    field: 'boxAmounts',
    headerName: 'In stock',
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={'In stock'}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => (
      <InStockCell
        boxAmounts={params.row.originalData.boxAmounts}
        boxId={params.row.originalData._id}
        onClickInStock={otherHandlers.onClickInStock}
      />
    ),
    valueGetter: params => {
      return params.row.originalData.boxAmounts
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
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Stock sum'])}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 75,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'stockCost',
    headerName: t(TranslationKey['Stock cost']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Stock cost'])}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell text={toFixed(params.value, 2)} />,
    width: 120,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'tags',
    headerName: t(TranslationKey.Tags),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Tags)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <TagsCell tags={params.row.originalData.tags} />,
    width: 160,
    sortable: false,
    columnKey: columnnsKeys.shared.TAGS,
  },

  {
    field: 'redFlags',
    headerName: t(TranslationKey['Red flags']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Red flags'])}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <RedFlagsCell flags={params.row.originalData.redFlags} />,
    width: 130,
    sortable: false,
    columnKey: columnnsKeys.shared.RED_FLAGS,
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
        rowId={params.row.originalData._id}
        value={params.value}
        fourMonthesStock={params.row.fourMonthesStock}
        onClickSaveFourMonthsStock={fourMonthesStockHandlers.onClickSaveFourMonthsStock}
      />
    ),

    width: 150,
    type: 'number',
    headerAlign: 'center',
    filterable: false,

    columnKey: columnnsKeys.client.INVENTORY_PURCHASE_QUANTITY,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Amazon price'])}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <ToFixedCell value={params.value} fix={2} />,
    type: 'number',
    width: 80,
    headerAlign: 'center',
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'profit',
    headerName: t(TranslationKey.Profit),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Profit)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <ToFixedCell value={params.value} fix={2} />,
    type: 'number',
    width: 90,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'fbafee',
    headerName: t(TranslationKey.FBA),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.FBA)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <ToFixedCell value={params.value} fix={2} />,

    width: 70,
    type: 'number',
    headerAlign: 'center',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell withIcon isFilterActive text={t(TranslationKey.BarCode)} />,

    renderCell: params => <BarcodeCell product={params.row.originalData} handlers={barCodeHandlers} />,
    minWidth: 100,
    headerAlign: 'center',
    filterable: false,
    sortable: false,

    columnKey: columnnsKeys.client.INVENTORY_BARCODE,
  },

  {
    field: 'hsCode',
    headerName: 'HS code',
    renderHeader: () => <MultilineTextHeaderCell text={'HS code'} />,

    renderCell: params => <HsCodeCell product={params.row.originalData} handlers={hsCodeHandlers} />,
    minWidth: 100,
    headerAlign: 'center',
    type: 'actions',
    sortable: false,
    filterable: false,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Status)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => (
      <MultilineTextCell
        text={params.value}
        color={colorByProductStatus(ProductStatusByCode[params.row.originalData.status])}
      />
    ),
    width: 100,

    columnKey: columnnsKeys.client.INVENTORY_STATUS,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Created)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <ShortDateCell value={params.value} />,
    minWidth: 90,
    // type: 'date',

    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Updated)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <ShortDateCell value={params.value} />,
    minWidth: 90,
    // type: 'date',

    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'ideasOnCheck',
    headerName: t(TranslationKey['Ideas to Check']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Ideas to Check'])}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ideasClosed',
    headerName: t(TranslationKey['Closed Ideas']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Closed Ideas'])}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ideasFinished',
    headerName: t(TranslationKey['Verified ideas']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Verified ideas'])}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'commentSb',
    headerName: t(TranslationKey['Comment of SB']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Comment of SB'])}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <CommentOfSbCell productsInWarehouse={params.row.originalData.productsInWarehouse} />,
    width: 400,
    filterable: false,
    sortable: false,
  },

  {
    field: 'clientComment',
    headerName: t(TranslationKey.Comment),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Comment)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={140} text={params.value} />,
    width: 400,
    filterable: false,
    sortable: false,
  },
]
