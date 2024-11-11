import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, ProductsCell, UserCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'
import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

export const adminWarehouseBoxesColumns = () => {
  const columns: IGridColumn[] = [
    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 105,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 105,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'xid',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 60,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'client',
      headerName: t(TranslationKey.Client),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
      renderCell: params => (
        <UserCell
          name={params.row.items?.[0]?.product?.client?.name}
          id={params.row.items?.[0]?.product?.client?._id}
          email={params.row.items?.[0]?.product?.client?.email}
        />
      ),
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      hideEmptyObject: true,
      disableCustomSort: true,
      width: 180,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey.Storekeeper),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Storekeeper)} />,
      renderCell: params => (
        <UserCell
          name={params.row.storekeeper?.name}
          id={params.row.storekeeper?._id}
          email={params.row.storekeeper?.email}
        />
      ),
      width: 180,
      hideEmptyObject: true,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
      renderCell: params => <ProductsCell box={params?.row as IBox} />,
      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue(),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 200,
    },

    {
      field: 'totalAmount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
      renderCell: params => <Text isCell text={params?.value} />,

      columnKey: columnnsKeys.shared.NUMBER,
      width: 100,
    },

    {
      field: 'destination',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
      renderCell: params => <Text isCell text={params.row.destination?.name} />,
      width: 200,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'totalPrice',
      headerName: t(TranslationKey['Total price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,
      renderCell: params => <Text isCell text={toFixedWithDollarSign(params.row.items?.[0]?.order?.totalPrice, 2)} />,
      width: 110,
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'weighGrossKgSupplier',
      headerName: t(TranslationKey['Final weight']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
      renderCell: params => <Text isCell text={toFixedWithKg(params.value, 2)} />,
      columnKey: columnnsKeys.shared.NUMBER,
      disableCustomSort: true,
      filterable: false,
      width: 120,
    },

    {
      field: 'weighGrossKgWarehouse',
      headerName: t(TranslationKey['Gross weight']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Gross weight'])} />,
      renderCell: params => <Text isCell text={toFixedWithKg(params.value, 2)} />,
      type: 'number',
      width: 130,
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'trackNumberText',
      headerName: t(TranslationKey['Track number']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Track number'])} />,
      renderCell: params => <Text isCell text={params.value} />,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      disableCustomSort: true,
      width: 150,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.BOXES
    }
    column.sortable = false
  }

  return columns
}
