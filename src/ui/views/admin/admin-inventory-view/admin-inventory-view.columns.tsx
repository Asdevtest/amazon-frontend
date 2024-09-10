import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { ProductStatusByCode, colorByProductStatus, productStatusTranslateKey } from '@constants/product/product-status'
import { humanFriendlyStategyStatus, productStrategyStatusesEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  FeesValuesWithCalculateBtnCell,
  LinkCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OpenInNewTabCell,
  ProductCell,
  SupplierCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

interface IRowHandlers {
  onClickOpenInNewTab: (id: string) => void
}

export const adminInventoryColumns = (rowHandlers: IRowHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => null,

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
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

      renderCell: params => (
        <Text
          isCell
          color={colorByProductStatus(ProductStatusByCode[params.value as keyof typeof ProductStatusByCode])}
          // @ts-ignore
          text={t(productStatusTranslateKey(ProductStatusByCode[params.value]))}
        />
      ),

      transformValueMethod: status =>
        // @ts-ignore
        t(productStatusTranslateKey(ProductStatusByCode[status])),

      columnKey: columnnsKeys.shared.STRING_VALUE,
      disableCustomSort: true,
      width: 150,
    },

    {
      field: 'strategyStatus',
      headerName: t(TranslationKey.Strategy),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,

      renderCell: params => (
        <Text
          isCell
          text={humanFriendlyStategyStatus(
            productStrategyStatusesEnum[params?.value as keyof typeof productStrategyStatusesEnum],
          )}
        />
      ),

      transformValueMethod: status =>
        humanFriendlyStategyStatus(
          productStrategyStatusesEnum[status as keyof typeof productStrategyStatusesEnum],
        ) as string,

      columnKey: columnnsKeys.shared.STRING_VALUE,

      width: 150,
      disableCustomSort: true,
    },

    {
      field: 'fees-net',
      headerName: t(TranslationKey['Fees & Net']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Fees & Net'])} />,

      renderCell: params => (
        <FeesValuesWithCalculateBtnCell
          noCalculate
          fbafee={params.row?.fbafee}
          reffee={params.row?.reffee}
          productId={params.row?._id}
        />
      ),
      width: 200,
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'amazon',
      headerName: t(TranslationKey.Price),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,

      renderCell: params => <Text isCell text={toFixedWithDollarSign(params.value, 2)} />,
      type: 'number',
      width: 100,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'barCode',
      headerName: t(TranslationKey.BarCode),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

      width: 100,
      renderCell: params => <LinkCell value={params.value} />,
      align: 'center',
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'client',
      headerName: t(TranslationKey.Client),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,

      renderCell: params => <UserLinkCell blackText name={params?.value?.name} userId={params?.value?._id} />,
      width: 150,

      hideEmptyObject: true,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'createdBy',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: params => <UserLinkCell blackText name={params.value?.name} userId={params.value?._id} />,

      hideEmptyObject: true,
      width: 150,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'checkedBy',
      headerName: t(TranslationKey.Supervisor),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supervisor)} />,

      renderCell: params => <UserLinkCell blackText name={params.value?.name} userId={params.value?._id} />,
      width: 150,

      hideEmptyObject: true,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'buyer',
      headerName: t(TranslationKey.Buyer),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,

      renderCell: params => <UserLinkCell blackText name={params.value?.name} userId={params.value?._id} />,
      width: 150,
      hideEmptyObject: true,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'currentSupplier',
      headerName: t(TranslationKey.Supplier),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supplier)} />,

      renderCell: params => <SupplierCell supplierName={params.value?.name} supplierLink={params.value?.link} />,
      width: 150,
      hideEmptyObject: true,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'profit',
      headerName: t(TranslationKey.Profit),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Profit)} />,

      renderCell: params => <Text isCell text={toFixedWithDollarSign(params.value, 2)} />,
      width: 150,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'margin',
      headerName: t(TranslationKey.Margin),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Margin)} />,

      renderCell: params => <Text isCell text={toFixedWithDollarSign(params.value, 2)} />,
      width: 150,
      type: 'number',
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'bsr',
      headerName: t(TranslationKey.BSR),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 150,
      type: 'number',
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'fbafee',
      headerName: t(TranslationKey['FBA fee , $']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA fee , $'])} />,

      renderCell: params => <Text isCell text={toFixedWithDollarSign(params.value, 2)} />,
      width: 150,
      type: 'number',
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'fbaamount',
      headerName: t(TranslationKey['FBA Amount']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA Amount'])} />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 150,
      type: 'number',
      columnKey: columnnsKeys.shared.NUMBER,
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
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 150,

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
