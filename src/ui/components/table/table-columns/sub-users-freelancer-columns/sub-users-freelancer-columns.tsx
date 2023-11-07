/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GridRowParams } from '@mui/x-data-grid'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  CommentUsersCell,
  EditOrRemoveBtnsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserCell,
  UserRolesCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

interface SubUsersFreelancerColumnsProps {
  onClickRemoveBtn: (row: GridRowParams) => void
  onClickEditBtn: (row: GridRowParams) => void
  onClickSaveComment: (id: string, comment: string) => void
}

export const subUsersFreelancerColumns = (handlers: SubUsersFreelancerColumnsProps) => [
  {
    field: 'name',
    headerName: t(TranslationKey.User),
    // @ts-ignore
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.User)} />,

    width: 350,
    renderCell: (params: GridRowParams) => {
      const user = params.row
      // @ts-ignore
      return <UserCell userId={user?._id} name={user?.name} email={user?.email} rating={user?.rating} />
    },
  },

  {
    field: 'roles',
    headerName: t(TranslationKey.Roles),
    // @ts-ignore
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Roles)} />,

    width: 215,
    // @ts-ignore
    renderCell: (params: GridRowParams) => <UserRolesCell user={params.row} />,
  },

  {
    field: 'typeTask',
    headerName: t(TranslationKey['Request type']),
    // @ts-ignore
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,

    renderCell: (params: GridRowParams) => {
      const stringForRender = params.row.allowedSpec
        .map((spec: number) => freelanceRequestTypeTranslate(freelanceRequestTypeByCode[spec]))
        .join('\n')
      // @ts-ignore
      return <MultilineTextCell leftAlign text={stringForRender} />
    },
    type: 'number',
    width: 95,
    sortable: false,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    // @ts-ignore
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 340,
    renderCell: (params: GridRowParams) => (
      <EditOrRemoveBtnsCell
        // @ts-ignore
        isSubUsersTable
        tooltipFirstButton={t(TranslationKey["Editing an employee's permission list"])}
        tooltipSecondButton={t(
          TranslationKey['Removing an employee from the list, banning and disabling access to the platform'],
        )}
        handlers={handlers}
        row={params.row}
        // @ts-ignore
        isFirstRow={params?.api?.getSortedRowIds()?.[0] === params.row.id}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'note',
    headerName: t(TranslationKey.Comment),
    // @ts-ignore
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    width: 335,
    renderCell: (params: GridRowParams) => (
      <CommentUsersCell
        // @ts-ignore
        id={params.row._id}
        comment={params?.row?.note?.comment}
        // @ts-ignore
        handler={handlers.onClickSaveComment}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    // @ts-ignore
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    // @ts-ignore
    renderCell: (params: GridRowParams) => <NormDateCell value={params.row.originalData.updatedAt} />,
    width: 100,
  },
]
