import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextAlignLeftCell,
  MultilineTextHeaderCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const supervisorSettingsViewColumns = handlers => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,

    renderCell: params => <MultilineTextAlignLeftCell isAsin text={params.value} />,
    width: 200,
  },

  {
    field: 'reason',
    headerName: t(TranslationKey.Reason),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reason)} />,

    width: 535,
    renderCell: params => <MultilineTextAlignLeftCell text={params.value} />,
  },
  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    width: 150,
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
]
