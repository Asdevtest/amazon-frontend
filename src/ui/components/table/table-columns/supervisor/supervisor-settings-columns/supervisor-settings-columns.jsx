import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextAlignLeftCell,
  MultilineTextHeaderCell,
} from '@components/data-grid/data-grid-cells'
import { CrossIcon, EditIcon } from '@components/shared/svg-icons'

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

    width: 100,
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
        onClickFirstButton={() => handlers.onClickEditBtn(params.row.originalData)}
        onClickSecondButton={() => handlers.onClickRemoveBtn(params.row.originalData)}
      />
    ),
    filterable: false,
    sortable: false,
  },
]
