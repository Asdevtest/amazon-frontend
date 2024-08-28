import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { humanFriendlyStategyStatus, productStrategyStatusesEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  OpenInNewTabCell,
  ProductCell,
  TextCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

interface IRowHandlers {
  onClickOpenInNewTab: (id: string) => void
}

export const adminExchangeColumns = (rowHandlers: IRowHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={''} />,

      renderCell: params => (
        <OpenInNewTabCell onClickOpenInNewTab={() => rowHandlers.onClickOpenInNewTab(params.row._id)} />
      ),
      width: 60,
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

      renderCell: params => {
        const product = params.row

        return (
          <ProductCell
            image={product?.images?.[0]}
            title={product?.amazonTitle}
            asin={product?.asin}
            sku={product?.skuByClient}
          />
        )
      },

      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue(),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 170,
    },

    {
      field: 'strategyStatus',
      headerName: t(TranslationKey.Strategy),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,

      renderCell: params => (
        <TextCell
          text={humanFriendlyStategyStatus(
            productStrategyStatusesEnum[params.value as keyof typeof productStrategyStatusesEnum],
          )}
        />
      ),

      width: 250,

      transformValueMethod: status =>
        humanFriendlyStategyStatus(
          productStrategyStatusesEnum[status as keyof typeof productStrategyStatusesEnum],
        ) as string,

      columnKey: columnnsKeys.shared.STRING_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'amazon',
      headerName: t(TranslationKey.Price),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,

      renderCell: params => <TextCell text={toFixedWithDollarSign(params.value, 2)} />,
      width: 150,
      type: 'number',

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'createdBy',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: params => <UserLinkCell blackText name={params.value.name} userId={params.value._id} />,
      width: 200,
      hideEmptyObject: true,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },
    {
      field: 'checkedBy',
      headerName: t(TranslationKey.Supervisor),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supervisor)} />,

      renderCell: params => (
        <UserLinkCell blackText name={params.row.checkedBy?.name} userId={params.row.checkedBy?._id} />
      ),
      width: 200,
      hideEmptyObject: true,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'buyer',
      headerName: t(TranslationKey.Buyer),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,

      renderCell: params => <UserLinkCell blackText name={params.value?.name} userId={params.value?._id} />,
      width: 200,
      hideEmptyObject: true,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'checkednotes',
      headerName: t(TranslationKey["Supervisor's comment"]),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey["Supervisor's comment"])} />,

      renderCell: params => <TextCell text={params.value} />,
      width: 200,
      disableCustomSort: true,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'profit',
      headerName: t(TranslationKey.Profit),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Profit)} />,

      renderCell: params => <TextCell text={toFixedWithDollarSign(params.value, 2)} />,
      width: 150,
      type: 'number',

      columnKey: columnnsKeys.shared.NUMBER,
    },
    {
      field: 'margin',
      headerName: t(TranslationKey.Margin),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Margin)} />,

      renderCell: params => <TextCell text={toFixedWithDollarSign(params.value, 2)} />,
      width: 150,
      type: 'number',

      columnKey: columnnsKeys.shared.NUMBER,
    },
    {
      field: 'bsr',
      headerName: t(TranslationKey.BSR),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

      renderCell: params => <TextCell text={params.value} />,
      width: 150,
      type: 'number',

      columnKey: columnnsKeys.shared.NUMBER,
    },
    {
      field: 'fbafee',
      headerName: t(TranslationKey['FBA fee , $']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA fee , $'])} />,

      renderCell: params => <TextCell text={toFixedWithDollarSign(params.value, 2)} />,
      width: 150,
      type: 'number',

      columnKey: columnnsKeys.shared.NUMBER,
    },
    {
      field: 'fbaamount',
      headerName: t(TranslationKey['FBA Amount']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA Amount'])} />,

      renderCell: params => <TextCell text={params.value} />,
      width: 150,
      type: 'number',

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 150,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

      renderCell: params => <NormDateCell value={params?.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.PRODUCTS
    }
    column.sortable = false
  }

  return columns
}
