import { GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { ProductStatusByCode, colorByProductStatus, productStatusTranslateKey } from '@constants/product/product-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  FeesValuesWithCalculateBtnCell,
  MultilineStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
  RedFlagsCell,
  SelectRowCell,
  TagsCell,
} from '@components/data-grid/data-grid-cells'

import { formatNormDateTime } from '@utils/date-time'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const buyerProductsViewColumns = handlers => [
  {
    ...GRID_CHECKBOX_SELECTION_COL_DEF,
    renderCell: params => (
      <SelectRowCell
        checkboxComponent={GRID_CHECKBOX_SELECTION_COL_DEF.renderCell(params)}
        onClickShareIcon={() => handlers.onClickShowProduct(params.row)}
      />
    ),
    width: 80,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

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
    width: 260,

    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    width: 170,
    renderCell: params => (
      <MultilineTextCell
        text={t(productStatusTranslateKey(ProductStatusByCode[params.row.originalData.status]))}
        color={colorByProductStatus(ProductStatusByCode[params.row.originalData.status])}
      />
    ),
    valueGetter: params => t(productStatusTranslateKey(ProductStatusByCode[params.row.originalData.status])),

    columnKey: columnnsKeys.buyer.MY_PRODUCTS_STATUS,
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,

    renderCell: params => <MultilineStatusCell status={params.value} />,
    width: 135,

    columnKey: columnnsKeys.client.INVENTORY_STRATEGY_STATUS,
  },

  {
    field: 'feesAndNet',
    headerName: t(TranslationKey['Fees & Net']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Fees & Net'])} />,

    renderCell: params => (
      <FeesValuesWithCalculateBtnCell
        noCalculate={!['30', '40', '50', '60'].includes(params.row.status)}
        fbafee={params.row.originalData.fbafee}
        reffee={params.row.originalData.reffee}
        productId={params.row.originalData._id}
        onClickCalculate={handlers.onClickFeesCalculate}
      />
    ),
    minWidth: 110,

    filterable: false,
    sortable: false,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    valueFormatter: params => (params.value ? toFixedWithDollarSign(params.value, 2) : ''),
    type: 'number',
    minWidth: 90,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'profit',
    headerName: t(TranslationKey.Profit),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Profit)} />,
    valueFormatter: params => (params.value ? toFixedWithDollarSign(params.value, 2) : ''),
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    width: 90,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'bsr',
    headerName: t(TranslationKey.BSR),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 75,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'fbaamount',
    headerName: t(TranslationKey['Recommend amount']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Recommend amount'])} />,
    valueFormatter: params => (params.value ? toFixedWithDollarSign(params.value, 2) : ''),
    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    minWidth: 150,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ideasOnCheck',
    headerName: t(TranslationKey['Ideas to Check']),
    renderHeader: () => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Ideas to Check'])}
        // isShowIconOnHover={onHover && params.field && onHover === params.field}
        // isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
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
    renderHeader: () => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Closed Ideas'])}
        // isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        // isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ideasFinished',
    headerName: t(TranslationKey['Realized ideas']),
    renderHeader: () => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Realized ideas'])}
        // isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        // isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 125,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'tags',
    headerName: t(TranslationKey.Tags),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tags)} />,
    renderCell: params => <TagsCell tags={params.row.originalData.tags} />,
    valueGetter: params => params.row.originalData.tags?.map(el => `#${el.title}`).join(),
    width: 160,
    sortable: false,
    columnKey: columnnsKeys.shared.TAGS,
  },

  {
    field: 'redFlags',
    headerName: t(TranslationKey['Red flags']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Red flags'])} />,
    renderCell: params => <RedFlagsCell flags={params.row.originalData.redFlags} />,
    width: 130,
    sortable: false,
    columnKey: columnnsKeys.shared.RED_FLAGS,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    minWidth: 120,
    valueFormatter: params => formatNormDateTime(params.value),
    renderCell: params => <NormDateCell value={params.value} />,
    // type: 'date',

    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    valueFormatter: params => formatNormDateTime(params.value),
    minWidth: 150,
    flex: 1,
    renderCell: params => <NormDateCell value={params.value} />,
    // type: 'date',

    columnKey: columnnsKeys.shared.DATE,
  },
]
