import { Avatar } from 'antd'
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MediaContentCell,
  MultilineTextHeaderCell,
  NormDateCell,
  RatingCell,
} from '@components/data-grid/data-grid-cells'
import { SupplierEmployeesCell } from '@components/data-grid/data-grid-cells/supplier-employees-cell'
import { PaymentMethods } from '@components/shared/payment-methods'
import { Text } from '@components/shared/text'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { convertToSentenceCase, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { SupplierCardStatus } from '@typings/models/suppliers/supplier-card'
import { IGridColumn } from '@typings/shared/grid-column'
import { IPaymentMethod } from '@typings/shared/payment-method'

import { getStatusColor } from '../helpers/get-status-color'
import { IHandlers } from '../suppliers-view.type'

export const suppliersViewColumns = (handlers: IHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'xid',
      headerName: 'ID',
      renderHeader: () => <MultilineTextHeaderCell text="ID" />,
      renderCell: ({ value }) => <Text isCell text={value} />,
      width: 100,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: ({ value }) => (
        <Text
          isCell
          color={getStatusColor(Number(SupplierCardStatus[value]))}
          text={value ? convertToSentenceCase(value) : ''}
        />
      ),
      valueGetter: ({ row }) => SupplierCardStatus[row?.status],
      transformValueMethod: (value: number) => convertToSentenceCase(SupplierCardStatus[value]),
      width: 150,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'companyName',
      headerName: t(TranslationKey.Title),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
      renderCell: ({ value }) => <Text isCell text={value} />,
      width: 150,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'images',
      headerName: t(TranslationKey.Photos),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Photos)} />,
      renderCell: ({ value }) => <MediaContentCell files={value} />,
      width: 80,

      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'originCountry',
      headerName: t(TranslationKey.Country),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Country)} />,
      renderCell: ({ value }) => (
        <Text isCell text={value?.title || ''} icon={<Avatar size={20} src={getAmazonImageUrl(value?.image)} />} />
      ),
      width: 170,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'totalCountCards',
      headerName: t(TranslationKey['Cards total']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Cards total'])} />,
      renderCell: ({ value }) => <Text isCell text={value} />,
      width: 100,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'totalAmountInUsd',
      headerName: `${t(TranslationKey.Commodity)}, $ / ¥`,
      renderHeader: () => <MultilineTextHeaderCell text={`${t(TranslationKey.Commodity)}, $ / ¥`} />,
      renderCell: ({ value }) => <Text isCell text={value} />,
      valueGetter: ({ row }) => `${toFixed(row?.totalAmountInUsd || 0)}  / ${toFixed(row?.totalAmountInYuan || 0)}`,
      width: 100,

      fields: [
        {
          label: 'Commodity USD',
          value: 0,
        },
        {
          label: 'Commodity CNY',
          value: 1,
        },
      ],
      columnMenuConfig: [
        {
          field: 'totalAmountInUsd',
          table: DataGridFilterTables.SUPPLIER,
          columnKey: ColumnMenuKeys.NUMBER,
        },

        {
          field: 'totalAmountInYuan',
          table: DataGridFilterTables.SUPPLIER,
          columnKey: ColumnMenuKeys.NUMBER,
        },
      ],
      columnKey: columnnsKeys.shared.MULTIPLE,
    },

    {
      field: 'totalCountInOrder',
      headerName: t(TranslationKey['Total orders']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total orders'])} />,
      renderCell: ({ value }) => <Text isCell text={value} />,
      width: 100,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'paymentMethods',
      headerName: t(TranslationKey['Payment methods']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Payment methods'])} />,
      renderCell: ({ row }) => <PaymentMethods paymentMethods={row?.paymentMethods || []} />,
      valueGetter: ({ value }) => value?.map(({ title }: IPaymentMethod) => title).join(', '),
      width: 180,
      sortable: false,

      disableCustomSort: true,
      columnKey: columnnsKeys.shared.PAYMENTS,
    },

    {
      field: 'supplierEmployees',
      headerName: t(TranslationKey.Employee),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Employee)} />,
      renderCell: ({ row }) => <SupplierEmployeesCell employees={row?.supplierEmployees || []} />,
      width: 180,
      sortable: false,

      disableCustomSort: true,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'comment',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 200,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
      renderCell: ({ row }: GridRowModel) => (
        <ActionButtonsCell
          row
          showFirst
          showSecond
          secondDanger
          firstGhost
          secondGhost
          firstIcon={<MdOutlineEdit size={16} />}
          secondIcon={<MdOutlineDelete size={16} />}
          secondConfirmText="Are you sure?"
          onClickFirst={() => handlers?.onClickEdit(row?._id)}
          onClickSecond={() => handlers?.onClickDelete(row._id)}
        />
      ),
      width: 100,
      disableCustomSort: true,
    },

    {
      field: 'avgRating',
      headerName: t(TranslationKey.Rating),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Rating)} />,

      renderCell: ({ row }) => <RatingCell disabled rating={row?.avgRating} totalFeedback={row?.totalCountFeedback} />,
      width: 180,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 100,

      columnKey: columnnsKeys.shared.DATE_VALUE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.SUPPLIER
    }

    column.sortable = false
  }

  return columns
}
