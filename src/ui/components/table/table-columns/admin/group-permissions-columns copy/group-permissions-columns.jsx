import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextAlignLeftCell,
  MultilineTextAlignLeftHeaderCell,
  ShortDateCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const adminGroupPermissionsColumns = handlers => [
  {
    field: 'key',
    headerName: t(TranslationKey.Key),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Key)} />,

    width: 280,
    renderCell: params => <MultilineTextAlignLeftCell pointer text={params.value} />,
  },

  {
    field: 'role',
    headerName: t(TranslationKey.Role),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Role)} />,

    width: 140,
    renderCell: params => <MultilineTextAlignLeftCell pointer text={params.value} />,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Title)} />,

    width: 200,
    renderCell: params => <MultilineTextAlignLeftCell pointer text={params.value} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Description)} />,

    width: 450,
    renderCell: params => <MultilineTextAlignLeftCell pointer text={params.value} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Actions)} />,

    width: 180,
    renderCell: params => (
      <ActionButtonsCell
        isFirstButton
        isSecondButton
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        firstButtonTooltipText={t(TranslationKey.Edit)}
        firstButtonElement={<EditOutlinedIcon />}
        firstButtonStyle={ButtonStyle.PRIMARY}
        secondButtonTooltipText={t(TranslationKey.Remove)}
        secondButtonElement={<DeleteOutlineOutlinedIcon />}
        secondButtonStyle={ButtonStyle.DANGER}
        onClickFirstButton={() => handlers.onClickEditBtn(params.row.originalData)}
        onClickSecondButton={() => handlers.onClickRemoveBtn(params.row.originalData)}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextAlignLeftHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 110,
    // type: 'date',
  },
]
