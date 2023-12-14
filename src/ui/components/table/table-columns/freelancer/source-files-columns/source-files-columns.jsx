import { TranslationKey } from '@constants/translations/translation-key'

import {
  AsinCell,
  ChangeInputCommentCell,
  CopyAndEditLinkCell,
  EditOrRemoveIconBtnsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ShortDateCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

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
        <ChangeInputCommentCell
          rowsCount={1}
          fieldName="sourceFile"
          text={params.row.originalData.sourceFile}
          onChangeText={rowHandlers.onChangeText}
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
      <ChangeInputCommentCell
        rowsCount={2}
        text={params.row.originalData.comments}
        onChangeText={rowHandlers.onChangeText}
        onClickSubmit={() => rowHandlers.onClickSaveBtn(params.row)}
      />
    ),
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    width: 150,
    renderCell: params => (
      <EditOrRemoveIconBtnsCell
        tooltipFirstButton={t(TranslationKey['Change store name or links to reports'])}
        tooltipSecondButton={t(TranslationKey['Remove a store from your list'])}
        handlers={rowHandlers}
        row={params.row}
        isSave={params?.row?.originalData?._id === editField?._id}
      />
    ),
    filterable: false,
    sortable: false,
  },
]
