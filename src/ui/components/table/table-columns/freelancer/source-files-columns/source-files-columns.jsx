import { MdOutlineDelete } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  TextCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CrossIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const sourceFilesColumns = rowHandlers => [
  {
    field: 'title',
    headerName: t(TranslationKey['Request title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
    renderCell: params => <TextCell text={params.value || '-'} />,
    width: 205,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => <TextCell text={params.value || '-'} />,
    width: 70,
    headerAlign: 'center',
    align: 'center',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <NormDateCell value={params.value} />,
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
    renderCell: params => <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={params.value} />,
  },

  {
    field: 'sourceFile',
    headerName: t(TranslationKey.Link),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Link)} />,
    width: 250,
    renderCell: params => (
      <TextCell
        editMode
        text={params.row.originalData.sourceFile}
        onClickSubmit={value => rowHandlers.onClickSaveBtn(params.row._id, 'sourceFile', value)}
      />
    ),
  },

  {
    field: 'comments',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
    width: 240,
    renderCell: params => (
      <TextCell
        editMode
        text={params.row.originalData.comments}
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
        isFirstButton
        iconButton
        firstButtonElement={<MdOutlineDelete />}
        firstButtonStyle={ButtonStyle.DANGER}
        firstDescriptionText="Do you want to delete the source file?"
        onClickFirstButton={() => rowHandlers.onClickRemoveBtn(params.row._id)}
      />
    ),
    width: 100,
    filterable: false,
    sortable: false,
  },
]
