import { UserRolePrettyMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ShortDateCell,
} from '@components/data-grid/data-grid-cells'
import { CrossIcon, EditIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const userPermissionsColumns = handlers => [
  {
    field: 'key',
    headerName: t(TranslationKey.Key),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Key)} />,
    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    minWidth: 280,
  },

  {
    field: 'role',
    headerName: t(TranslationKey.Role),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Role)} />,
    renderCell: params => <MultilineTextCell leftAlign text={UserRolePrettyMap[params.value]} />,
    minWidth: 140,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
    renderCell: params => <MultilineTextCell leftAlign threeLines text={params.value} />,
    minWidth: 300,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,
    renderCell: params => <MultilineTextCell leftAlign threeLines text={params.value} />,
    flex: 1,
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
        firstButtonElement={<EditIcon />}
        firstButtonStyle={ButtonStyle.PRIMARY}
        secondButtonElement={<CrossIcon />}
        secondButtonStyle={ButtonStyle.DANGER}
        onClickFirstButton={() => handlers.onClickEditBtn(params.row)}
        onClickSecondButton={() => handlers.onClickRemoveBtn(params.row)}
      />
    ),
    filterable: false,
    sortable: false,
    minWidth: 100,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <ShortDateCell value={params.value} />,
    minWidth: 110,
  },
]
