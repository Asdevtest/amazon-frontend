import { GridRowModel } from '@mui/x-data-grid'

import { ACCESS_DENIED } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  FilesCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  PaymentMethodsCell,
  PriceVariationsCell,
  SupplierWithIconsCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'
import { LinkWithCopy } from '@components/shared/link-with-copy'

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
        supplierName={row.name}
        orderCreatedAt={orderCreatedAt}
        orderSupplierId={orderSupplierId}
        supplierCreatedAt={row.createdAt}
        supplierId={row._id}
        supplierMultiplicity={row.multiplicity}
        supplierAmountInBox={row.boxProperties?.amountInBox}
      />
    ),
    filterable: false,
    sortable: false,
    width: 150,
  },

  {
    field: 'link',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Link)} />,
    renderCell: ({ row }: GridRowModel) =>
      row.link !== ACCESS_DENIED ? (
        <LinkWithCopy
          url={checkAndMakeAbsoluteUrl(row.link)}
          title={t(TranslationKey['Go to supplier site'])}
          valueToCopy={checkAndMakeAbsoluteUrl(row.link)}
        />
      ) : (
        <MultilineTextCell leftAlign text={t(TranslationKey['Link not available'])} />
      ),
    filterable: false,
    sortable: false,
    width: 160,
  },

  {
    field: 'price',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Price with delivery'])} />,
    renderCell: ({ row }: GridRowModel) => (
      <MultilineTextCell text={toFixedWithDollarSign(row.price + row.batchDeliveryCostInDollar / row.amount, 2)} />
    ),
    filterable: false,
    sortable: false,
    width: 100,
  },

  {
    field: 'minBatch',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Minimum batch'])} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={String(row.minlot)} />,
    filterable: false,
    sortable: false,
    width: 100,
  },

  {
    field: 'bathPrice',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch price'])} />,
    renderCell: ({ row }: GridRowModel) => (
      <MultilineTextCell text={toFixedWithDollarSign(row.batchTotalCostInDollar, 2)} />
    ),
    filterable: false,
    sortable: false,
    width: 90,
  },

  {
    field: 'productionTime',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time'])} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={String(row.productionTerm)} />,
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
    renderCell: ({ row }: GridRowModel) => <PaymentMethodsCell paymentMethods={row.paymentMethods} />,
    filterable: false,
    sortable: false,
    width: 100,
    align: 'center',
  },

  {
    field: 'files',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Files)} />,
    renderCell: ({ row }: GridRowModel) => <FilesCell files={row.images} />,
    filterable: false,
    sortable: false,
    width: 80,
    align: 'center',
  },

  {
    field: 'comment',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell leftAlign threeLines maxLength={60} text={row.comment} />,
    filterable: false,
    sortable: false,
    width: 200,
  },

  {
    field: 'createdBy',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,
    renderCell: ({ row }: GridRowModel) => <UserMiniCell userName={row.createdBy.name} userId={row.createdBy._id} />,
    filterable: false,
    sortable: false,
    width: 180,
  },

  {
    field: 'updated',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={formatNormDateTime(row.updatedAt)} />,
    filterable: false,
    sortable: false,
    width: 100,
  },
]
