import { GridRowModel } from '@mui/x-data-grid'

import { ACCESS_DENIED } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  FilesCell,
  MultilineTextHeaderCell,
  PriceVariationsCell,
  SupplierWithIconsCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { LinkWithCopy } from '@components/shared/link-with-copy'
import { PaymentMethods } from '@components/shared/payment-methods'
import { Text } from '@components/shared/text'

import { formatNormDateTime } from '@utils/date-time'
import { checkAndMakeAbsoluteUrl, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { IPlatformSettings } from '@typings/shared/patform-settings'

interface ISuppliersOrderColumn {
  orderCreatedAt: string
  orderSupplierId: string
  platformSettings?: IPlatformSettings
}

export const suppliersOrderColumn = ({ orderCreatedAt, orderSupplierId, platformSettings }: ISuppliersOrderColumn) => [
  {
    field: 'supplier',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supplier)} />,
    renderCell: ({ row }: GridRowModel) => (
      <SupplierWithIconsCell
        supplierName={row.supplier?.companyName}
        orderCreatedAt={orderCreatedAt}
        orderSupplierId={orderSupplierId}
        supplierCreatedAt={row.createdAt}
        supplierId={row.supplier?._id}
        supplierMultiplicity={row.multiplicity}
        supplierAmountInBox={row.boxProperties?.amountInBox}
      />
    ),
    filterable: false,
    sortable: false,
    width: 145,
  },

  {
    field: 'link',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Link)} />,
    renderCell: ({ row }: GridRowModel) =>
      row.supplier && row.supplier?.link !== ACCESS_DENIED ? (
        <LinkWithCopy
          url={checkAndMakeAbsoluteUrl(row.supplier?.link)}
          title={t(TranslationKey['Go to supplier site'])}
          valueToCopy={checkAndMakeAbsoluteUrl(row.supplier?.link)}
        />
      ) : null,
    filterable: false,
    sortable: false,
    width: 160,
  },

  {
    field: 'price',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Price with delivery'])} />,
    renderCell: ({ row }: GridRowModel) => (
      <Text isCell text={toFixedWithDollarSign(row.priceInUsd + row.batchDeliveryCostInDollar / row.amount, 2)} />
    ),
    filterable: false,
    sortable: false,
    width: 100,
  },

  {
    field: 'minBatch',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Minimum batch'])} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={String(row.minlot)} />,
    filterable: false,
    sortable: false,
    width: 100,
  },

  {
    field: 'bathPrice',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch price'])} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={toFixedWithDollarSign(row.batchTotalCostInDollar, 2)} />,
    filterable: false,
    sortable: false,
    width: 90,
  },

  {
    field: 'productionTime',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time'])} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={`${row.minProductionTerm} - ${row.maxProductionTerm}`} />,
    filterable: false,
    sortable: false,
    width: 100,
  },

  {
    field: 'priceVariations',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Price variations'])} />,
    renderCell: ({ row }: GridRowModel) => (
      <PriceVariationsCell variations={row.priceVariations} yuanToDollarRate={platformSettings?.yuanToDollarRate} />
    ),
    filterable: false,
    sortable: false,
    width: 200,
    align: 'center',
  },

  {
    field: 'paymentMethods',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Payment methods'])} />,
    renderCell: ({ row }: GridRowModel) => <PaymentMethods isCell paymentMethods={row.supplier?.paymentMethods} />,
    filterable: false,
    sortable: false,
    width: 125,
    align: 'center',
  },

  {
    field: 'files',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Files)} />,
    renderCell: ({ row }: GridRowModel) => <FilesCell files={row.images} />,
    filterable: false,
    sortable: false,
    width: 90,
    align: 'center',
  },

  {
    field: 'comment',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={row?.comment} />,
    filterable: false,
    sortable: false,
    width: 195,
  },

  {
    field: 'createdBy',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,
    renderCell: ({ row }: GridRowModel) => (
      <UserCell
        name={row.supplier?.createdBy?.name}
        id={row.supplier?.createdBy?._id}
        email={row.supplier?.createdBy?.email}
      />
    ),
    filterable: false,
    sortable: false,
    width: 175,
  },

  {
    field: 'updated',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={formatNormDateTime(row.updatedAt)} />,
    filterable: false,
    sortable: false,
    width: 100,
  },
]
