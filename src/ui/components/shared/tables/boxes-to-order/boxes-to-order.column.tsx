import { GridRowModel } from '@mui/x-data-grid'

import { boxStatusTranslateKey } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { FilesCell, MultilineTextHeaderCell, ProductCell, TextCell } from '@components/data-grid/data-grid-cells'

import { calcPriceForBox } from '@utils/calculation'
import { formatNormDateTime } from '@utils/date-time'
import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { IPlatformSettings } from '@typings/shared/patform-settings'

export const boxesToOrderColumn = (platformSettings: IPlatformSettings) => [
  {
    field: 'status',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: ({ row }: GridRowModel) => <TextCell text={boxStatusTranslateKey(row.status)} />,
    filterable: false,
    sortable: false,
    width: 105,
  },

  {
    field: 'updated',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: ({ row }: GridRowModel) => <TextCell text={formatNormDateTime(row.updatedAt)} />,
    filterable: false,
    sortable: false,
    width: 95,
  },

  {
    field: 'product',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    renderCell: ({ row }: GridRowModel) => (
      <ProductCell image={row.boxProductPreview} title={row.amazonTitle} asin={row.asin} sku={row.skuByClient} />
    ),
    filterable: false,
    sortable: false,
    width: 260,
    minWidth: 100,
  },

  {
    field: 'files',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Files)} />,
    renderCell: ({ row }: GridRowModel) => <FilesCell files={row.images} />,
    filterable: false,
    sortable: false,
    width: 60,
    align: 'center',
  },

  {
    field: 'quantity',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
    renderCell: ({ row }: GridRowModel) => {
      const totalQuantityText =
        row.amount > 1
          ? `${row.amount} x ${row.items[0]?.amount} ${t(TranslationKey['pcs.'])}`
          : `${row.items[0]?.amount} ${t(TranslationKey['pcs.'])}`

      return <TextCell text={totalQuantityText} />
    },
    filterable: false,
    sortable: false,
    width: 90,
  },

  {
    field: 'warehouse',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Warehouse)} />,
    renderCell: ({ row }: GridRowModel) => <TextCell text={row.destination?.name} />,
    filterable: false,
    sortable: false,
    width: 100,
  },

  {
    field: 'boxes',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Boxes)} />,
    renderCell: ({ row }: GridRowModel) => <TextCell text={`ID: ${row.humanFriendlyId}`} />,
    filterable: false,
    sortable: false,
    width: 85,
  },

  {
    field: 'price',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,
    renderCell: ({ row }: GridRowModel) => <TextCell text={toFixedWithDollarSign(calcPriceForBox(row))} />,
    filterable: false,
    sortable: false,
    width: 90,
  },

  {
    field: 'finalWeight',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
    renderCell: ({ row }: GridRowModel) => (
      <TextCell
        text={toFixedWithKg(
          Math.max(
            row.weighGrossKgWarehouse
              ? (row.lengthCmWarehouse * row.widthCmWarehouse * row.heightCmWarehouse) /
                  (platformSettings?.volumeWeightCoefficient || 0)
              : (row.lengthCmSupplier * row.widthCmSupplier * row.heightCmSupplier) /
                  (platformSettings?.volumeWeightCoefficient || 0),
            row.weighGrossKgWarehouse ? row.weighGrossKgWarehouse : row.weighGrossKgSupplier,
          ),
        )}
      />
    ),
    filterable: false,
    sortable: false,
    width: 90,
  },

  {
    field: 'grossWeight',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Gross weight'])} />,
    renderCell: ({ row }: GridRowModel) => (
      <TextCell
        text={toFixedWithKg(row.weighGrossKgWarehouse ? row.weighGrossKgWarehouse : row.weighGrossKgSupplier)}
      />
    ),
    filterable: false,
    sortable: false,
    width: 90,
  },
]
