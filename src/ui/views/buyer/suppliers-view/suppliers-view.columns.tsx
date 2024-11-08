import { Avatar } from 'antd'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MediaContentCell,
  MultilineTextHeaderCell,
  OpenInNewTabCell,
  PaymentMethodsCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { checkIsMediaFileLink } from '@utils/checks'
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
      renderCell: ({ row }) => <PaymentMethodsCell paymentMethods={row?.paymentMethods || []} />,
      valueGetter: ({ value }) => value?.map(({ title }: IPaymentMethod) => title).join(', '),
      width: 180,
      sortable: false,

      disableCustomSort: true,
      columnKey: columnnsKeys.shared.PAYMENTS,
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
