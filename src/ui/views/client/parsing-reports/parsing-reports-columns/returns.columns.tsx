import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, ProductCell, UserCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const returnsColumns = () => {
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

      renderCell: params => (
        <UserCell name={params.row.client?.name} id={params.row.client?._id} email={params.row.client?.email} />
      ),
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
      field: 'amzOrderId',
      headerName: 'AMZ order ID',
      renderHeader: () => <MultilineTextHeaderCell text="AMZ order ID" />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.ASIN),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
      renderCell: ({ row }) => <ProductCell title={row?.productName} asin={row?.asin} sku={row?.sku} />,

      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue<ParsingReportsType>({
        isSimpleSku: true,
        table: ParsingReportsType.RETURNS,
        customTitleField: 'productName',
      }),
      columnKey: columnnsKeys.shared.MULTIPLE,
      width: 170,
    },

    {
      field: 'reason',
      headerName: 'Reason',
      renderHeader: () => <MultilineTextHeaderCell text="Reason" />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'fnsku',
      headerName: 'FNSKU',
      renderHeader: () => <MultilineTextHeaderCell text="FNSKU" />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'dateReturned',
      headerName: 'Date returned',
      renderHeader: () => <MultilineTextHeaderCell text="Date returned" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'disposition',
      headerName: 'Disposition',
      renderHeader: () => <MultilineTextHeaderCell text="Disposition" />,
      renderCell: params => <Text isCell text={params.value?.replaceAll('_', ' ')} />,
      transformValueMethod: value => value?.replaceAll('_', ' '),
      width: 120,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'quantity',
      headerName: 'Quantity',
      renderHeader: () => <MultilineTextHeaderCell text="Quantity" />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'fulfillmentCenterId',
      headerName: 'Fulfillment Center ID',
      renderHeader: () => <MultilineTextHeaderCell text="Fulfillment Center ID" />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'licencePlateNumber',
      headerName: 'Licence Plate Number',
      renderHeader: () => <MultilineTextHeaderCell text="Licence Plate Number" />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'customerComments',
      headerName: 'Customer comments',
      renderHeader: () => <MultilineTextHeaderCell text="Customer comments" />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'status',
      headerName: 'Status',
      renderHeader: () => <MultilineTextHeaderCell text="Status" />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'messageSent',
      headerName: 'Message sent',
      renderHeader: () => <MultilineTextHeaderCell text="Message sent" />,
      renderCell: params => <Text isCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
      width: 120,
      filterable: false,
      // columnKey: columnnsKeys.shared.STRING_VALUE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.RETURNS
    }

    column.sortable = false
  }

  return columns
}
