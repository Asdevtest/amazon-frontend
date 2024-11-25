import { Avatar } from 'antd'
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MediaContentCell,
  MultilineTextHeaderCell,
  OpenInNewTabCell,
  RatingCell,
} from '@components/data-grid/data-grid-cells'
import { SupplierEmployeesCell } from '@components/data-grid/data-grid-cells/supplier-employees-cell'
import { PaymentMethods } from '@components/shared/payment-methods'
import { Text } from '@components/shared/text'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'
import { IPaymentMethod } from '@typings/shared/payment-method'

import { IHandlers } from './suppliers-view.type'

export const suppliersViewColumns = (handlers: IHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'link',
      headerName: t(TranslationKey.Link),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Link)} />,
      renderCell: ({ value }) => (
        <OpenInNewTabCell isFullSize onClickOpenInNewTab={() => handlers.onClickOpenInNewTab(value)} />
      ),
      width: 80,

      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'xid',
      headerName: 'ID',
      renderHeader: () => <MultilineTextHeaderCell text="ID" />,
      renderCell: ({ value }) => <Text isCell text={value} />,
      width: 100,
    },

    {
      field: 'companyName',
      headerName: t(TranslationKey.Title),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
      renderCell: ({ value }) => <Text isCell text={value} />,
      width: 150,
    },

    {
      field: 'images',
      headerName: t(TranslationKey.Photos),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Photos)} />,
      renderCell: ({ value }) => <MediaContentCell image={value?.[0]} />,
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

      renderCell: ({ value }) => <RatingCell disabled rating={value} />,
      width: 170,
      columnKey: columnnsKeys.shared.NUMBER,
      disableCustomSort: true,
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
