import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  FilesCell,
  MultilineTextAlignLeftCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const adminFeedbackViewColumns = handlers => [
  {
    field: 'userName',
    headerName: t(TranslationKey.User),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.User)} />,
    renderCell: params => {
      const user = params.row.originalData.user

      return <UserCell userId={user?._id} name={user?.name} email={user?.email} rating={user?.rating} />
    },
    width: 320,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    width: 100,
  },

  {
    field: 'text',
    headerName: t(TranslationKey.Reviews),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reviews)} />,
    renderCell: params => <MultilineTextAlignLeftCell text={params.value} />,
    flex: 1,
  },

  {
    field: 'files',
    headerName: t(TranslationKey.Files),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Files)} />,
    renderCell: params => (
      <FilesCell filesLength={params.value?.length} onClickCell={() => handlers.onClickFilesCell(params.value)} />
    ),
    filterable: false,
    sortable: false,
    width: 80,
    align: 'center',
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
    filterable: false,
    sortable: false,
    width: 180,
    renderCell: params => (
      <ActionButtonsCell
        isFirstButton
        firstButtonElement={t(TranslationKey.View)}
        firstButtonStyle={ButtonStyle.PRIMARY}
        onClickFirstButton={() => handlers.onClickOpenFeedbackBtn(params.row.originalData)}
      />
    ),
  },
]
