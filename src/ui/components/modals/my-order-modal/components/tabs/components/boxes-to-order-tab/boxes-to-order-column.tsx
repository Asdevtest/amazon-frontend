import { GridRowModel } from '@mui/x-data-grid'

import { boxStatusTranslateKey, colorByBoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'
import { FilesCell } from '@components/data-grid/data-grid-cells/files-cell/files-cell'

import { calcPriceForBox } from '@utils/calculation'
import { formatNormDateTime } from '@utils/date-time'
import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { IPlatformSettings } from '@typings/patform-settings'
import { IUploadFile } from '@typings/upload-file'

interface IBoxesToOrderColumn {
  platformSettings: IPlatformSettings
  onOpenGalleryModal: (files?: Array<string | IUploadFile>) => void
}

export const boxesToOrderColumn = ({ platformSettings, onOpenGalleryModal }: IBoxesToOrderColumn) => [
  {
    field: 'status',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: ({ row }: GridRowModel) => (
      <MultilineTextCell
        leftAlign
        customTextStyles={colorByBoxStatus(row.status)}
        text={t(boxStatusTranslateKey(row.status))}
      />
    ),
    filterable: false,
    sortable: false,
    width: 105,
    height: 40,
  },

  {
    field: 'updated',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={formatNormDateTime(row.updatedAt)} />,
    filterable: false,
    sortable: false,
    width: 100,
  },

  {
    field: 'product',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    renderCell: ({ row }: GridRowModel) => (
      <ProductAsinCell
        image={row.boxProductPreview}
        amazonTitle={row.amazonTitle}
        asin={row.asin}
        skuByClient={row.skuByClient}
      />
    ),
    filterable: false,
    sortable: false,
    width: 270,
  },

  {
    field: 'files',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Files)} />,
    renderCell: ({ row }: GridRowModel) => <FilesCell files={row.images} onClickCell={onOpenGalleryModal} />,
    filterable: false,
    sortable: false,
    width: 100,
    align: 'center',
  },

  {
    field: 'quantity',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
    renderCell: ({ row }: GridRowModel) => (
      <MultilineTextCell text={`${row.items[0]?.amount} ${t(TranslationKey['pcs.'])}`} />
    ),
    filterable: false,
    sortable: false,
    width: 100,
  },

  {
    field: 'warehouse',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Warehouse)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row.destination?.name} />,
    filterable: false,
    sortable: false,
    width: 130,
  },

  {
    field: 'boxes',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Boxes)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={`ID: ${row.humanFriendlyId}`} />,
    filterable: false,
    sortable: false,
    width: 90,
  },

  {
    field: 'price',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={toFixedWithDollarSign(calcPriceForBox(row))} />,
    filterable: false,
    sortable: false,
    width: 90,
  },

  {
    field: 'finalWeight',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
    renderCell: ({ row }: GridRowModel) => (
      <MultilineTextCell
        text={toFixedWithKg(
          Math.max(
            row.weighGrossKgWarehouse
              ? (row.lengthCmWarehouse * row.widthCmWarehouse * row.heightCmWarehouse) /
                  platformSettings.volumeWeightCoefficient
              : (row.lengthCmSupplier * row.widthCmSupplier * row.heightCmSupplier) /
                  platformSettings.volumeWeightCoefficient,
            row.weighGrossKgWarehouse ? row.weighGrossKgWarehouse : row.weighGrossKgSupplier,
          ),
        )}
      />
    ),
    filterable: false,
    sortable: false,
    width: 100,
  },

  {
    field: 'grossWeight',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Gross weight'])} />,
    renderCell: ({ row }: GridRowModel) => (
      <MultilineTextCell
        text={toFixedWithKg(row.weighGrossKgWarehouse ? row.weighGrossKgWarehouse : row.weighGrossKgSupplier)}
      />
    ),
    filterable: false,
    sortable: false,
    width: 100,
  },
]
