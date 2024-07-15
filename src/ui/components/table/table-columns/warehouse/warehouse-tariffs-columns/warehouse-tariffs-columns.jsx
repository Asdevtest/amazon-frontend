import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ScrollingCell,
} from '@components/data-grid/data-grid-cells'
import { CrossIcon, EditIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const warehouseTariffsColumns = handlers => [
  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    minWidth: 250,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    minWidth: 120,
    // type: 'date',
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

    minWidth: 600,
    renderCell: params => <ScrollingCell value={params.value} />,
  },

  {
    field: 'price',
    headerName: t(TranslationKey['Service cost per kg, $']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Service cost per kg, $'])} />,

    type: 'number',
    minWidth: 250,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    minWidth: 100,
    renderCell: params => (
      <ActionButtonsCell
        row
        iconButton
        isFirstButton
        isSecondButton
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        firstButtonTooltipText={t(TranslationKey.Edit)}
        firstButtonElement={<EditIcon />}
        firstButtonStyle={ButtonStyle.PRIMARY}
        secondButtonTooltipText={t(TranslationKey.Remove)}
        secondButtonElement={<CrossIcon />}
        secondButtonStyle={ButtonStyle.DANGER}
        onClickFirstButton={() => handlers.onClickEditBtn(params.row.originalData)}
        onClickSecondButton={() => handlers.onClickRemoveBtn(params.row.originalData)}
      />
    ),

    filterable: false,
    sortable: false,
  },
]
