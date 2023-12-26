import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  NormDateWithoutTimeCell,
  ProductAsinCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const clientLast30DaySellerBoardColumns = () => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,

    table: 'sellerboardLast30Days',
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'shop',
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
    renderCell: params => <MultilineTextCell twoLines text={params.value?.name} />,
    width: 150,

    table: 'sellerboardLast30Days',
    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'asin',
    headerName: `${t(TranslationKey.ASIN)} / ${t(TranslationKey.SKU)}`,
    renderHeader: () => <MultilineTextHeaderCell text={`${t(TranslationKey.ASIN)} / ${t(TranslationKey.SKU)}`} />,

    renderCell: params => (
      <ProductAsinCell withoutImage withoutTitle asin={params.row?.asin} skuByClient={params.row?.sku} />
    ),
    width: 185,
    sortable: false,

    table: 'sellerboardLast30Days',
    columnKey: columnnsKeys.client.SHOP_REPORT,
  },

  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    renderCell: params => <MultilineTextCell leftAlign maxLength={100} text={params.value} />,
    width: 250,

    table: 'sellerboardLast30Days',
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'date',
    headerName: t(TranslationKey.Date),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Date)} />,

    renderCell: params => <NormDateWithoutTimeCell value={params.value} />,
    minWidth: 80,

    table: 'sellerboardLast30Days',
    columnKey: columnnsKeys.shared.DATE,
  },
  {
    field: 'unitsorganic',
    headerName: 'Unitsorganic',
    renderHeader: () => <MultilineTextHeaderCell text={'Unitsorganic'} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 200,

    table: 'sellerboardLast30Days',
    columnKey: columnnsKeys.shared.QUANTITY,
  },
  {
    field: 'unitsppc',
    headerName: 'Unitsppc',
    renderHeader: () => <MultilineTextHeaderCell text={'Unitsppc'} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 200,

    table: 'sellerboardLast30Days',
    columnKey: columnnsKeys.shared.QUANTITY,
  },
  {
    field: 'netprofit',
    headerName: 'Netprofit',
    renderHeader: () => <MultilineTextHeaderCell text={'Netprofit'} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 250,

    table: 'sellerboardLast30Days',
    columnKey: columnnsKeys.shared.QUANTITY,
  },
]
