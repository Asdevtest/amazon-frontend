import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  FilesCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { EyeIcon } from '@components/shared/svg-icons'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { IFeedback } from '@typings/models/administrators/feedback'

interface IAdminFeedbackViewColumns {
  onClickOpenFeedback: (row: IFeedback) => void
}

export const adminFeedbackViewColumns = ({ onClickOpenFeedback }: IAdminFeedbackViewColumns) => [
  {
    field: 'userName',
    headerName: t(TranslationKey.User),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.User)} />,
    renderCell: ({ row }: GridRowModel) => (
      <UserCell userId={row.user?._id} name={row.user?.name} email={row.user?.email} rating={row.user?.rating} />
    ),
    width: 320,
    sortable: false,
  },
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
    renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.updatedAt} />,
    width: 100,
    sortable: false,
  },
  {
    field: 'text',
    headerName: t(TranslationKey.Reviews),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reviews)} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={row.text} />,
    flex: 1,
    sortable: false,
  },
  {
    field: 'files',
    headerName: t(TranslationKey.Files),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Files)} />,
    renderCell: ({ row }: GridRowModel) => <FilesCell files={row.media} />,
    filterable: false,
    sortable: false,
    width: 90,
  },
  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
    renderCell: ({ row }: GridRowModel) => (
      <ActionButtonsCell
        isFirstButton
        iconButton
        fullWidth
        firstButtonElement={<EyeIcon />}
        firstButtonStyle={ButtonStyle.PRIMARY}
        onClickFirstButton={() => onClickOpenFeedback(row)}
      />
    ),
    filterable: false,
    sortable: false,
    width: 90,
  },
]
