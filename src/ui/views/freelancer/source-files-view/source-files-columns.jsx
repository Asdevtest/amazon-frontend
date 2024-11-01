import { MdOutlineDelete } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

export const sourceFilesColumns = rowHandlers => [
  {
    field: 'title',
    headerName: t(TranslationKey['Request title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
    renderCell: params => <Text isCell text={params.row.proposal?.request?.title} />,
    width: 240,
  },

  {
    field: 'xid',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => <Text isCell text={params.row.proposal?.xid} />,
    width: 90,
    headerAlign: 'center',
    align: 'center',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <NormDateCell value={params.row.updatedAt} />,
    width: 105,
  },

  {
    field: 'performer',
    headerName: t(TranslationKey.Performer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Performer)} />,
    width: 180,
    renderCell: params => <UserCell name={params.row.createdBy?.name} id={params.row.createdBy?._id} />,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
    width: 180,
    renderCell: params => <UserCell name={params.row.proposal?.client?.name} id={params.row.proposal?.client?._id} />,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
    width: 160,
    renderCell: params => (
      <Text
        link
        text={params.row.proposal?.request?.asin}
        url={`https://www.amazon.com/dp/${params.row.proposal?.request?.asin}`}
      />
    ),
  },

  {
    field: 'sourceFile',
    headerName: t(TranslationKey.Link),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Link)} />,
    width: 280,
    renderCell: params => (
      <Text
        isCell
        editMode
        text={params.row.sourceFile}
        onClickSubmit={value => rowHandlers.onClickSaveBtn(params.row._id, 'sourceFile', value)}
      />
    ),
  },

  {
    field: 'comments',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
    width: 280,
    renderCell: params => (
      <Text
        isCell
        editMode
        text={params.row.comments}
        onClickSubmit={value => rowHandlers.onClickSaveBtn(params.row._id, 'comments', value)}
      />
    ),
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    renderCell: params => (
      <ActionButtonsCell
        showFirst
        firstDanger
        firstGhost
        firstIcon={<MdOutlineDelete />}
        firstConfirmText="Do you want to delete the source file?"
        onClickFirst={() => rowHandlers.onClickRemoveBtn(params.row._id)}
      />
    ),
    width: 90,
    filterable: false,
    sortable: false,
  },
]
