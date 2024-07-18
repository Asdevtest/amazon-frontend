import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  AsinCell,
  CommentCell,
  CopyAndEditLinkCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ShortDateCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'
import { CrossIcon, EditIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const sourceFilesColumns = (rowHandlers, editField) => [
  {
    field: 'title',
    headerName: t(TranslationKey['Request title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
    renderCell: params => <MultilineTextCell leftAlign twoLines maxLength={52} text={params.value || '-'} />,
    width: 205,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => <MultilineTextCell text={params.value || '-'} />,
    width: 70,
    headerAlign: 'center',
    align: 'center',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <ShortDateCell value={params.value} />,
    width: 100,
  },

  {
    field: 'performer',
    headerName: t(TranslationKey.Performer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Performer)} />,
    width: 180,
    renderCell: params => {
      const user = params.row.sub ? params.row.sub : params.row.performer

      return <UserMiniCell userName={user?.name} userId={user?._id} />
    },
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
    width: 180,
    renderCell: params => <UserMiniCell userName={params.row.client?.name} userId={params.row.client?._id} />,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
    width: 180,
    renderCell: params => <AsinCell asin={params.value} />,
  },

  {
    field: 'sourceFile',
    headerName: t(TranslationKey.Link),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Link)} />,
    width: 250,
    renderCell: params =>
      params?.row?.originalData?._id === editField?._id ? (
        <CommentCell
          text={params.row.originalData.sourceFile}
          onClickSubmit={() => rowHandlers.onClickSaveBtn(params.row)}
        />
      ) : (
        <CopyAndEditLinkCell link={params.row.originalData.sourceFile} />
      ),
  },

  {
    field: 'comments',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
    width: 240,
    renderCell: params => (
      <CommentCell
        text={params.row.originalData.comments}
        onClickSubmit={() => rowHandlers.onClickSaveBtn(params.row)}
      />
    ),
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    renderCell: params => (
      <ActionButtonsCell
        isFirstButton
        isSecondButton
        iconButton
        row
        firstButtonElement={<EditIcon />}
        firstButtonStyle={ButtonStyle.PRIMARY}
        disabledFirstButton={params?.row?.originalData?._id === editField?._id}
        secondButtonElement={<CrossIcon />}
        secondButtonStyle={ButtonStyle.DANGER}
        onClickFirstButton={() => rowHandlers.onClickEditBtn(params.row.originalData)}
        onClickSecondButton={() => rowHandlers.onClickRemoveBtn(params.row.originalData)}
      />
    ),
    width: 100,
    filterable: false,
    sortable: false,
  },
]
