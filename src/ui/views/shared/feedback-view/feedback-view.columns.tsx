import { FaEye } from 'react-icons/fa'
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserModel } from '@models/user-model'

import {
  ActionButtonsCell,
  MediaContentCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { FeedbackStatus } from '@typings/enums/feedback-status'
import { isAdmin, isModerator } from '@typings/guards/roles'
import { IFullUser } from '@typings/shared/full-user'
import { IGridColumn } from '@typings/shared/grid-column'

import { ColumnProps, getStatusColor, getStatusText } from './feedback-view.config'

export const feedbackViewColumns = (props: ColumnProps) => {
  const { onSelectFeedback, onRemoveFeedback } = props

  const user = UserModel.userInfo as unknown as IFullUser
  const creator = isAdmin(user?.role) || isModerator(user?.role)
  const admin = isAdmin(user?.role)

  const userColumn = (
    creator
      ? {
          field: 'user',
          headerName: t(TranslationKey.User),
          renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.User)} />,
          renderCell: ({ row }: GridRowModel) => (
            <UserCell name={row.user?.name} id={row.user?._id} email={row.user?.email} />
          ),
          width: 180,
          disableCustomSort: true,
          columnKey: columnnsKeys.shared.OBJECT_VALUE,
        }
      : null
  ) as IGridColumn
  const moderatorColumn = (
    admin
      ? {
          field: 'moderator',
          headerName: t(TranslationKey.Moderator),
          renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Moderator)} />,
          renderCell: ({ row }: GridRowModel) => (
            <UserCell name={row.moderator?.name} id={row.moderator?._id} email={row.moderator?.email} />
          ),
          width: 180,
          disableCustomSort: true,
          columnKey: columnnsKeys.shared.OBJECT_VALUE,
        }
      : null
  ) as IGridColumn

  const columns: IGridColumn[] = [
    {
      field: 'xid',
      headerName: 'ID',
      renderHeader: () => <MultilineTextHeaderCell text="ID" />,
      renderCell: ({ row }) => <Text isCell text={row.xid} />,
      width: 90,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    userColumn,
    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: ({ row }: GridRowModel) => {
        const isResponse = !!row.responseText || !!row.responseMedia?.length
        const showFirst = (!isResponse && row.status === FeedbackStatus.CREATED) || creator
        const showSecond = !isResponse && !creator && row.status === FeedbackStatus.CREATED
        const firstIcon = isResponse && creator ? <FaEye size={16} /> : <MdOutlineEdit size={16} />

        return (
          <ActionButtonsCell
            row
            secondDanger
            firstGhost
            secondGhost
            showFirst={showFirst}
            showSecond={showSecond}
            secondConfirmText="Are you sure you want to delete this ticket?"
            firstIcon={firstIcon}
            secondIcon={<MdOutlineDelete size={16} />}
            onClickFirst={() => onSelectFeedback(row, creator)}
            onClickSecond={() => onRemoveFeedback(row._id)}
          />
        )
      },
      disableCustomSort: true,
      filterable: false,
      width: 90,
    },
    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: ({ row }: GridRowModel) => (
        <Text isCell text={getStatusText(row.status)} color={getStatusColor(row.status)} />
      ),
      width: 110,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      transformValueMethod: getStatusText,
    },
    {
      field: 'title',
      headerName: t(TranslationKey.Title),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row.title} />,
      width: 200,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'text',
      headerName: t(TranslationKey.Description),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,
      renderCell: ({ row }: GridRowModel) => <CustomTextarea isCell readOnly value={row.text} />,
      flex: 1,
      minWidth: 200,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'responseText',
      headerName: t(TranslationKey.Response),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Response)} />,
      renderCell: ({ row }: GridRowModel) => <CustomTextarea isCell readOnly value={row.responseText} />,
      flex: 1,
      minWidth: 200,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'media',
      headerName: t(TranslationKey['User files']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['User files'])} />,
      renderCell: ({ row }: GridRowModel) => <MediaContentCell image={row.media?.[0]} isEmpty={!row.media.length} />,
      width: 90,
      filterable: false,
      disableCustomSort: true,
    },
    {
      field: 'responseMedia',
      headerName: t(TranslationKey['Response files']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Response files'])} />,
      renderCell: ({ row }: GridRowModel) => (
        <MediaContentCell image={row.responseMedia?.[0]} isEmpty={!row.responseMedia.length} />
      ),
      width: 90,
      filterable: false,
      disableCustomSort: true,
    },
    moderatorColumn,
    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.createdAt} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE,
    },
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }) => <NormDateCell value={row.updatedAt} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  const filteredColumns = columns.filter(column => column)

  for (const column of filteredColumns) {
    if (!column.table) {
      column.table = DataGridFilterTables.FEEDBACK
    }

    column.sortable = false
  }

  return filteredColumns
}
