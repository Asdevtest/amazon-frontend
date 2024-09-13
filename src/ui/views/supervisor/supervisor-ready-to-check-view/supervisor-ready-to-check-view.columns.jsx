import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, MultilineTextHeaderCell, NormDateCell } from '@components/data-grid/data-grid-cells'

import { throttle } from '@utils/throttle'
import { t } from '@utils/translations'

export const supervisorReadyToCheckColumns = ({ onPickUp }) => {
  const columns = [
    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: ({ row }) => (
        <ActionButtonsCell
          showFirst
          firstContent={t(TranslationKey['Get to work'])}
          onClickFirst={() => throttle(onPickUp(row._id))}
        />
      ),
      width: 150,
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
