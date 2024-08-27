import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
  TextCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const fypSearchSuppressedColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <TextCell text={params.row?.shop?.name} />,
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
      field: 'reason',
      headerName: 'Reason',
      renderHeader: () => <MultilineTextHeaderCell text="Reason" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.ASIN),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
      renderCell: ({ row }) => <ProductAsinCell withoutImage withoutTitle asin={row?.asin} skuByClient={row?.sku} />,

      fields: getProductColumnMenuItems({ withoutTitle: true }),
      columnMenuConfig: getProductColumnMenuValue<ParsingReportsType>({
        isSimpleSku: true,
        table: ParsingReportsType.FYP_SEARCH_SUPPRESSED,
      }),
      columnKey: columnnsKeys.shared.MULTIPLE,
      width: 210,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.FYP_SEARCH_SUPPRESSED
    }

    column.sortable = false
  }

  return columns
}
