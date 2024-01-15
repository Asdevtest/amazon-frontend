import { GridRowModel } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  FilesCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  PaymentMethodsCell,
  PriceVariationsCell,
  SupplierWithIconsCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'
import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'
import { LinkWithCopy } from '@components/shared/link-with-copy'

import { formatNormDateTime } from '@utils/date-time'
import { checkAndMakeAbsoluteUrl, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { IPlatformSettings } from '@typings/patform-settings'
import { IUploadFile } from '@typings/upload-file'

export const suppliersOrderColumn = (
  order: IOrderWithAdditionalFields,
  platformSettings: IPlatformSettings,
  onClickFilesCell: (files?: Array<string | IUploadFile>) => void,
) => [
  {
    field: 'supplier',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supplier)} />,
    renderCell: ({ row }: GridRowModel) => (
      <SupplierWithIconsCell
        supplierName={row.name}
        orderCreatedAt={order?.createdAt}
        orderSupplierId={order?.orderSupplier?._id}
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
      row.link !== 'access denied' ? (
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
    width: 105,
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
    width: 105,
  },

  {
    field: 'priceVariations',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Price variations'])} />,
    renderCell: ({ row }: GridRowModel) => (
      <PriceVariationsCell variations={row.priceVariations} platformSettings={platformSettings} />
    ),
    filterable: false,
    sortable: false,
    width: 190,
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
    renderCell: ({ row }: GridRowModel) => (
      <FilesCell filesLength={row.images.length} onClickCell={() => onClickFilesCell(row.images)} />
    ),
    filterable: false,
    sortable: false,
    width: 80,
    align: 'center',
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
