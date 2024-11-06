import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { CustomTag } from '@components/shared/custom-tag'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'
import { ITag } from '@typings/shared/tag'

interface IRowHandlers {
  onClickEditBtn: (row: ITag) => void
  onClickRemoveBtn: (row: ITag) => void
}

export const tagsColumns = (handlers: IRowHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'title',
      headerName: t(TranslationKey['Tag name']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Tag name'])} />,
      renderCell: params => (
        <CustomTag title={params.row.title} tooltipText={params.row.title} color={params.row.color} />
      ),
      width: 300,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'productCount',
      headerName: t(TranslationKey['Number of uses']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Number of uses'])} />,
      renderCell: params => <Text text={params.value} />,
      width: 150,

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: params => {
        const currentTag = params.row as ITag

        return (
          <ActionButtonsCell
            row
            showFirst
            showSecond
            secondDanger
            firstGhost
            secondGhost
            firstIcon={<MdOutlineEdit size={16} />}
            secondIcon={<MdOutlineDelete size={16} />}
            onClickFirst={() => handlers.onClickEditBtn(currentTag)}
            onClickSecond={() => handlers.onClickRemoveBtn(currentTag)}
          />
        )
      },
      disableCustomSort: true,
      filterable: false,
      sortable: false,
      width: 130,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.TAGS
    }
    column.sortable = false
  }

  return columns
}
