import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, MultilineTextCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { CrossIcon, EditIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const tagsColumns = handlers => [
  {
    field: 'title',
    headerName: t(TranslationKey['Tag name']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Tag name'])} />,
    renderCell: params => <MultilineTextCell text={params.value} />,

    width: 300,
  },

  {
    field: 'productCount',
    headerName: t(TranslationKey['Number of uses']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Number of uses'])} />,
    renderCell: params => <MultilineTextCell text={params.value} />,

    align: 'center',
    width: 150,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
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
    align: 'center',
    width: 130,
  },
]
