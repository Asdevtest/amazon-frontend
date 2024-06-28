import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { IProduct } from '@typings/models/products/product'
import { IGridColumn } from '@typings/shared/grid-column'

interface IHandlers {
  onPickUp: (row: IProduct) => void
}

export const buyerSearchSuppliersViewColumns = (handlers: IHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'number',
      headerName: '№',
      renderHeader: () => <MultilineTextHeaderCell text="№" />,
      renderCell: params => <MultilineTextCell text={params.value} />,
      type: 'number',
      width: 300,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

      renderCell: params => {
        return (
          <ActionButtonsCell
            isFirstButton
            isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
            firstButtonTooltipText={t(TranslationKey['Assign the task of finding a supplier to the Buyer'])}
            firstButtonElement={t(TranslationKey['Get to work'])}
            firstButtonStyle={ButtonStyle.PRIMARY}
            onClickFirstButton={() => handlers.onPickUp(params.row as IProduct)}
          />
        )
      },
      width: 180,
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'checkednotes',
      headerName: t(TranslationKey['Comments from the supervisor']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Comments from the supervisor'])} />,

      renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={165} text={params.value} />,
      width: 400,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      minWidth: 150,
      flex: 1,
      renderCell: params => <NormDateCell value={params.value} />,
    },
  ]

  for (const column of columns) {
    column.sortable = false
  }

  return columns
}
