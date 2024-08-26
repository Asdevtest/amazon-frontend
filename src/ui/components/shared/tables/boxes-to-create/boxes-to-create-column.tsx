import { IoMdClose } from 'react-icons/io'
import { MdOutlineEdit } from 'react-icons/md'

import { GridRowModel } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  TextCell,
} from '@components/data-grid/data-grid-cells'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'
import { IPlatformSettings } from '@typings/shared/patform-settings'

export const boxesToCreateColumn = (
  platformSettings: IPlatformSettings,
  barcodeIsExist: boolean,
  isNoBuyerSupplier: boolean,
  onRemoveBox: (index: number) => void,
  onEditBox: () => void,
  onClickBarcodeCheckbox: () => void,
  onClickUpdateSupplierStandart: () => void,
  onClickTransparency: () => void,
) => [
  {
    field: 'box',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Box)} />,
    renderCell: ({ row }: GridRowModel) => (
      <ProductAsinCell
        image={row.items[0].product.images?.[0] && getAmazonImageUrl(row.items[0].product.images[0])}
        amazonTitle={row.items[0].product.amazonTitle}
        asin={row.items[0].product.asin}
        skuByClient={row.items[0].product.skuByClient}
      />
    ),
    filterable: false,
    sortable: false,
    width: 280,
  },

  {
    field: 'amount',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Boxes in group'])} />,
    renderCell: ({ row }: GridRowModel) => <TextCell text={row.amount} />,
    filterable: false,
    sortable: false,
    width: 95,
    align: 'center',
  },

  {
    field: 'quantity',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
    renderCell: ({ row }: GridRowModel) => <TextCell text={row.items[0].amount} />,
    filterable: false,
    sortable: false,
    width: 95,
    align: 'center',
  },

  // {
  //   field: 'sizes',
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Sizes)} />,
  //   renderCell: ({ row }: GridRowModel) => <FilesCell files={row.item[0].amount} />,
  //   filterable: false,
  //   sortable: false,
  //   width: 60,
  //   align: 'center',
  // },

  // {
  //   field: 'weight',
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Weight)} />,
  //   renderCell: ({ row }: GridRowModel) => {
  //     const totalQuantityText =
  //       row.amount > 1
  //         ? `${row.amount} x ${row.items[0]?.amount} ${t(TranslationKey['pcs.'])}`
  //         : `${row.items[0]?.amount} ${t(TranslationKey['pcs.'])}`

  //     return <TextCell text={totalQuantityText} />
  //   },
  //   filterable: false,
  //   sortable: false,
  //   width: 90,
  // },

  // {
  //   field: 'volumeWeight',
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Volume weight'])} />,
  //   renderCell: ({ row }: GridRowModel) => <TextCell text={row.destination?.name} />,
  //   filterable: false,
  //   sortable: false,
  //   width: 100,
  // },

  // {
  //   field: 'finalWeight',
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
  //   renderCell: ({ row }: GridRowModel) => <TextCell text={`ID: ${row.humanFriendlyId}`} />,
  //   filterable: false,
  //   sortable: false,
  //   width: 85,
  // },

  // {
  //   field: 'finalWeight',
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
  //   renderCell: ({ row }: GridRowModel) => (
  //     <TextCell
  //       text={toFixedWithKg(
  //         Math.max(
  //           row.weighGrossKgWarehouse
  //             ? (row.lengthCmWarehouse * row.widthCmWarehouse * row.heightCmWarehouse) /
  //                 (platformSettings?.volumeWeightCoefficient || 0)
  //             : (row.lengthCmSupplier * row.widthCmSupplier * row.heightCmSupplier) /
  //                 (platformSettings?.volumeWeightCoefficient || 0),
  //           row.weighGrossKgWarehouse ? row.weighGrossKgWarehouse : row.weighGrossKgSupplier,
  //         ),
  //       )}
  //     />
  //   ),
  //   filterable: false,
  //   sortable: false,
  //   width: 90,
  // },

  {
    field: ' ',
    renderCell: ({ id }: GridRowModel) => (
      <ActionButtonsCell
        isFirstButton
        isSecondButton
        iconButton
        firstButtonElement={<IoMdClose size={20} />}
        firstButtonStyle={ButtonStyle.DANGER}
        secondButtonElement={<MdOutlineEdit size={20} />}
        secondButtonVariant={ButtonVariant.OUTLINED}
        onClickFirstButton={() => onRemoveBox(id)}
        onClickSecondButton={onEditBox}
      />
    ),
    filterable: false,
    sortable: false,
    width: 90,
  },
]
