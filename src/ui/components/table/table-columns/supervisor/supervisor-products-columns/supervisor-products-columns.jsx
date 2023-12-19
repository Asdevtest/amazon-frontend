import { GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { ProductStatusByCode, colorByProductStatus, productStatusTranslateKey } from '@constants/product/product-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
  RedFlagsCell,
  SelectRowCell,
  TagsCell,
  ToFixedWithDollarSignCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { formatNormDateTime } from '@utils/date-time'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const supervisorProductsViewColumns = handlers => [
  {
    ...GRID_CHECKBOX_SELECTION_COL_DEF,
    renderCell: params => (
      <SelectRowCell
        checkboxComponent={GRID_CHECKBOX_SELECTION_COL_DEF.renderCell(params)}
        onClickShareIcon={() => handlers.onClickShowProduct(params.row?.originalData?._id)}
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
    width: 265,

    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    width: 150,
    renderCell: params => (
      <MultilineTextCell
        maxLength={48}
        text={t(productStatusTranslateKey(ProductStatusByCode[params.value]))}
        color={colorByProductStatus(ProductStatusByCode[params.row.originalData.status])}
      />
    ),
    valueFormatter: params => t(productStatusTranslateKey(ProductStatusByCode[params.value])),
    columnKey: columnnsKeys.client.INVENTORY_STATUS,
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,
    renderCell: params => <MultilineStatusCell status={params.value} />,
    width: 140,
    align: 'center',

    columnKey: columnnsKeys.client.INVENTORY_STRATEGY_STATUS,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,

    renderCell: params => <ToFixedWithDollarSignCell value={params.row.amazon} fix={2} />,
    type: 'number',
    width: 100,
    valueGetter: params => (params.row.amazon ? toFixedWithDollarSign(params.row.amazon, 2) : '-'),
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,
    renderCell: params => (
      <UserLinkCell
        blackText
        name={params.row.originalData.createdBy?.name}
        userId={params.row.originalData.createdBy?._id}
      />
    ),
    valueGetter: params => params.row.originalData.createdBy?.name,
    width: 170,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'buyer',
    headerName: t(TranslationKey.Buyer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.row.originalData.buyer?.name} userId={params.row.originalData.buyer?._id} />
    ),
    valueGetter: params => params.row.originalData.buyer?.name,
    width: 170,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'bsr',
    headerName: t(TranslationKey.BSR),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 70,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'fbafee',
    headerName: t(TranslationKey['FBA fee , $']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA fee , $'])} />,
    valueGetter: params => (params.row.fbafee ? toFixedWithDollarSign(params.row.fbafee, 2) : ''),
    renderCell: params => <ToFixedWithDollarSignCell value={params.row.fbafee} fix={2} />,
    type: 'number',
    minWidth: 100,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'ordered',
    headerName: t(TranslationKey.Ordered),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Ordered)} />,

    renderCell: params => (
      <MultilineTextCell
        customTextStyles={
          params.value
            ? {
                background: 'linear-gradient(180deg, #00B746 0%, #03A03F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }
            : {
                background: 'linear-gradient(180deg, #FF1616 0%, #DF0C0C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }
        }
        color={params.value ? '#00b746' : 'red'}
        text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)}
      />
    ),
    valueFormatter: params => (params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)),
    minWidth: 50,
    type: 'boolean',
    sortable: false,
    columnKey: columnnsKeys.shared.YES_NO,
  },

  {
    field: 'tags',
    headerName: t(TranslationKey.Tags),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tags)} />,
    valueGetter: params => params.row.originalData.tags?.map(el => `#${el.title}`).join(),
    renderCell: params => <TagsCell tags={params.row.originalData.tags} />,
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

    width: 120,
    renderCell: params => <NormDateCell value={params.value} />,
    valueFormatter: params => formatNormDateTime(params.value),
    // type: 'date',

    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    minWidth: 150,
    flex: 1,
    valueFormatter: params => formatNormDateTime(params.value),
    renderCell: params => <NormDateCell value={params.value} />,
    // type: 'date',
    columnKey: columnnsKeys.shared.DATE,
  },
]
