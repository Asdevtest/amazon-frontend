import { GridRowParams } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  ChangeInputCommentCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserCell,
  UserRolesCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { IFullUser } from '@typings/shared/full-user'
import { ISpec } from '@typings/shared/spec'

interface SubUsersFreelancerColumnsProps {
  onClickRemoveBtn: (row: IFullUser) => void
  onClickEditBtn: (row: IFullUser) => void
  onClickSaveComment: (id: string, comment?: string) => void
}

export const subUsersFreelancerColumns = (handlers: SubUsersFreelancerColumnsProps) => {
  const columns = [
    {
      field: 'name',
      headerName: t(TranslationKey.User),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.User)} />,
      width: 350,
      renderCell: (params: GridRowParams) => {
        const user = params.row
        return <UserCell userId={user?._id} name={user?.name} email={user?.email} rating={user?.rating} />
      },
    },

    {
      field: 'roles',
      headerName: t(TranslationKey.Roles),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Roles)} />,
      width: 215,
      renderCell: (params: GridRowParams) => <UserRolesCell user={params.row} />,
      filterable: false,
    },

    {
      field: 'spec',
      headerName: t(TranslationKey['Request type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
      renderCell: (params: GridRowParams) => {
        const stringForRender = params.row.allowedSpec?.map((spec: ISpec) => spec?.title).join('\n')

        return <MultilineTextCell leftAlign text={stringForRender} />
      },
      width: 110,
      filterable: false,
      disableColumnMenu: true,
      disableCustomSort: true,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

      renderCell: (params: GridRowParams) => (
        <ActionButtonsCell
          isFirstButton
          isSecondButton
          // @ts-ignore
          isFirstRow={params?.api?.getSortedRowIds()?.[0] === params.row.id}
          firstButtonTooltipText={t(TranslationKey["Editing an employee's permission list"])}
          firstButtonElement={t(TranslationKey['Assign permissions'])}
          firstButtonStyle={ButtonStyle.PRIMARY}
          secondButtonTooltipText={t(
            TranslationKey['Removing an employee from the list, banning and disabling access to the platform'],
          )}
          secondButtonElement={t(TranslationKey.Remove)}
          secondButtonStyle={ButtonStyle.DANGER}
          onClickFirstButton={() => handlers.onClickEditBtn(params.row)}
          onClickSecondButton={() => handlers.onClickRemoveBtn(params.row)}
        />
      ),

      width: 230,
      disableColumnMenu: true,
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'note',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
      width: 335,
      renderCell: (params: GridRowParams) => (
        <ChangeInputCommentCell
          rowsCount={3}
          text={params?.row?.note?.comment}
          onClickSubmit={reason => handlers.onClickSaveComment(params.row._id, reason)}
        />
      ),
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: (params: GridRowParams) => <NormDateCell value={params.row.updatedAt} />,
      width: 100,
    },
  ]

  for (const column of columns) {
    // @ts-ignore
    column.sortable = false
  }

  return columns
}
