import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, MultilineTextHeaderCell, NormDateCell } from '@components/data-grid/data-grid-cells'

import { throttle } from '@utils/throttle'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const supervisorReadyToCheckColumns = ({ onPickUp }) => {
  const columns = [
    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: ({ row }) => (
        <ActionButtonsCell
          isFirstButton
          firstButtonTooltipText={t(TranslationKey['Assign a product card to a supervisor'])}
          firstButtonElement={t(TranslationKey['Get to work'])}
          firstButtonStyle={ButtonStyle.PRIMARY}
          onClickFirstButton={throttle(onPickUp(row._id))}
        />
      ),
      width: 200,
      disableCustomSort: true,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }) => <NormDateCell value={row.updatedAt} />,
      width: 140,
    },
  ]

  for (const column of columns) {
    column.sortable = false
  }

  return columns
}
