import { Tag } from 'antd'
import { MdOutlineDelete } from 'react-icons/md'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, MultilineTextHeaderCell, TextCell } from '@components/data-grid/data-grid-cells'
import { EditIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
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
      renderCell: params => (params.value ? <Tag color={params.row.color}>{params.value}</Tag> : null),
      width: 300,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'productCount',
      headerName: t(TranslationKey['Number of uses']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Number of uses'])} />,
      renderCell: params => <TextCell text={params.value} />,
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
            iconButton
            isFirstButton
            isSecondButton
            firstButtonElement={<EditIcon />}
            firstButtonStyle={ButtonStyle.PRIMARY}
            secondButtonElement={<MdOutlineDelete size={18} />}
            secondButtonStyle={ButtonStyle.DANGER}
            onClickFirstButton={() => handlers.onClickEditBtn(currentTag)}
            onClickSecondButton={() => handlers.onClickRemoveBtn(currentTag)}
          />
        )
      },
      disableColumnMenu: true,
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
