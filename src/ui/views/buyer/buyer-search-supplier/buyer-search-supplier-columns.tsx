import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, MultilineTextHeaderCell, NormDateCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'
import { IGridColumn } from '@typings/shared/grid-column'

interface IHandlers {
  onPickUp: (row: IProduct) => void
}

export const buyerSearchSuppliersViewColumns = (handlers: IHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

      renderCell: params => {
        return (
          <ActionButtonsCell
            showFirst
            firstContent={t(TranslationKey['Get to work'])}
            onClickFirst={() => handlers.onPickUp(params.row as IProduct)}
          />
        )
      },
      width: 150,
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'checkednotes',
      headerName: t(TranslationKey["Supervisor's comment"]),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey["Supervisor's comment"])} />,
      renderCell: params => <Text isCell text={params.value} />,

      width: 400,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,

      width: 100,
    },
  ]

  for (const column of columns) {
    column.sortable = false
  }

  return columns
}
