import { css } from '@emotion/react'
import { IoMdClose } from 'react-icons/io'
import { MdOutlineEdit } from 'react-icons/md'

import { GridRowModel } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  DimensionsCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  TextCell,
} from '@components/data-grid/data-grid-cells'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'
import { IBox } from '@typings/models/boxes/box'
import { IPlatformSettings } from '@typings/shared/patform-settings'

import { Entities } from '@hooks/dimensions/use-show-dimensions'

import CheckboxCell from './checkbox-cell/checkbox-cell'

const rowStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const boxesToCreateColumn = (
  platformSettings: IPlatformSettings,
  barcodeIsExist: boolean,
  isNoBuyerSupplier: boolean,
  rowHandlers: {
    onClickRemoveBtn: (row: number) => void
    onClickBarcodeCheckbox: (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => void
    onClickTransparency: (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => void
    onClickUpdateSupplierStandart: (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => void
  },
  onEditBox: () => void,
  newBoxes: IBox[],
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
    width: 300,
  },

  {
    field: 'amount',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Boxes in group'])} />,
    renderCell: ({ row }: GridRowModel) => <TextCell text={row.amount} />,
    filterable: false,
    sortable: false,
    width: 95,
  },

  {
    field: 'quantity',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
    renderCell: ({ row }: GridRowModel) => <TextCell text={row.items[0].amount} />,
    filterable: false,
    sortable: false,
    width: 95,
  },

  {
    field: 'sizes',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Sizes)} />,
    renderCell: ({ row }: GridRowModel) => <DimensionsCell data={row} calculationField={Entities.SUPPLIER} />,
    filterable: false,
    sortable: false,
    width: 300,
  },

  {
    field: 'checkbox',
    renderHeader: () => <MultilineTextHeaderCell text={''} />,
    renderCell: ({ row }: GridRowModel) => {
      const index = newBoxes.findIndex(box => box === row)
      return (
        <div className="row-style">
          <CheckboxCell
            checked={row.items[0].isBarCodeAlreadyAttachedByTheSupplier}
            disabled={!barcodeIsExist}
            label={t(TranslationKey['Supplier glued the barcode'])}
            tooltipInfoContent={t(TranslationKey["Label the box as labeled with the supplier's barcode"])}
            onChange={e => rowHandlers.onClickBarcodeCheckbox(index)(e)}
          />
          {row.items?.[0]?.transparencyFile && (
            <CheckboxCell
              checked={row.items[0].isTransparencyFileAlreadyAttachedByTheSupplier}
              label={t(TranslationKey['The supplier glued the Transparency Codes'])}
              onChange={e => rowHandlers.onClickTransparency(index)(e)}
            />
          )}
          {!isNoBuyerSupplier && (
            <CheckboxCell
              checked={row?.tmpUseToUpdateSupplierBoxDimensions}
              disabled={isNoBuyerSupplier}
              label={t(TranslationKey['Make the supplier standard'])}
              tooltipInfoContent={t(TranslationKey['Save box parameters to the current supplier'])}
              onChange={e => rowHandlers.onClickUpdateSupplierStandart(index)(e)}
            />
          )}
        </div>
      )
    },
    filterable: false,
    sortable: false,
    width: 300,
  },

  {
    field: ' ',
    renderCell: ({ row }: GridRowModel) => {
      const index = newBoxes.findIndex(box => box === row)
      return (
        <ActionButtonsCell
          isFirstButton
          isSecondButton
          iconButton
          firstButtonElement={<IoMdClose size={20} />}
          firstButtonStyle={ButtonStyle.DANGER}
          secondButtonElement={<MdOutlineEdit size={20} />}
          secondButtonVariant={ButtonVariant.OUTLINED}
          onClickFirstButton={() => rowHandlers.onClickRemoveBtn(index)}
          onClickSecondButton={() => onEditBox()}
        />
      )
    },
    filterable: false,
    sortable: false,
    width: 90,
  },
]
