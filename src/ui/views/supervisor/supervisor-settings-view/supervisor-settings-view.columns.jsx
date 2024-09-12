import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

export const supervisorSettingsViewColumns = props => {
  const columns = [
    {
      field: 'asin',
      headerName: t(TranslationKey.ASIN),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 200,
    },

    {
      field: 'reason',
      headerName: t(TranslationKey.Reason),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reason)} />,
      renderCell: params => <Text isCell text={params.value} />,
      flex: 1,
    },
    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: ({ row }) => (
        <ActionButtonsCell
          row
          showFirst
          showSecond
          secondDanger
          firstGhost
          secondGhost
          firstIcon={<MdOutlineEdit size={16} />}
          secondIcon={<MdOutlineDelete size={16} />}
          secondDescription="Are you sure you want to delete ASIN?"
          onClickFirst={() => props.onEditAsin(row)}
          onClickSecond={() => props.onRemoveAsin(row._id)}
        />
      ),
      disableCustomSort: true,
      disableColumnMenu: true,
      width: 100,
    },
  ]

  for (const column of columns) {
    column.sortable = false
  }

  return columns
}
