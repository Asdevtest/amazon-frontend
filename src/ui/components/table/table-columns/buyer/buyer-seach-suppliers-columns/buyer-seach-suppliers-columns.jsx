import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  NormalActionBtnCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const buyerSearchSuppliersViewColumns = handlers => [
  {
    field: 'number',
    headerName: '№',
    renderHeader: () => <MultilineTextHeaderCell text={'№'} />,
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
        <NormalActionBtnCell
          isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
          tooltipText={t(TranslationKey['Assign the task of finding a supplier to the Buyer'])}
          bTnText={t(TranslationKey['Get to work'])}
          onClickOkBtn={() => handlers.onPickUp(params.row.originalData)}
        />
      )
    },
    width: 550,
    filterable: false,
    sortable: false,
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
    // type: 'date',
  },
]
