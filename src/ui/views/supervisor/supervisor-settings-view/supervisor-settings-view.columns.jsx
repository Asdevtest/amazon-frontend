import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextAlignLeftCell,
  MultilineTextHeaderCell,
} from '@components/data-grid/data-grid-cells'
import { CrossIcon, EditIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const supervisorSettingsViewColumns = props => {
  const columns = [
    {
      field: 'asin',
      headerName: t(TranslationKey.ASIN),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
      renderCell: params => <MultilineTextAlignLeftCell isAsin text={params.value} />,
      minWidth: 200,
    },

    {
      field: 'reason',
      headerName: t(TranslationKey.Reason),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reason)} />,
      renderCell: params => <MultilineTextAlignLeftCell text={params.value} />,
      flex: 1,
    },
    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: ({ row }) => (
        <ActionButtonsCell
          row
          iconButton
          isFirstButton
          isSecondButton
          firstButtonElement={<EditIcon />}
          firstButtonStyle={ButtonStyle.PRIMARY}
          secondButtonElement={<CrossIcon />}
          secondButtonStyle={ButtonStyle.DANGER}
          secondDescriptionText="Are you sure you want to delete ASIN?"
          onClickFirstButton={() => props.onEditAsin(row)}
          onClickSecondButton={() => props.onRemoveAsin(row._id)}
        />
      ),
      disableCustomSort: true,
      disableColumnMenu: true,
      minWidth: 100,
    },
  ]

  for (const column of columns) {
    column.sortable = false
  }

  return columns
}
