import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineRequestStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ShortDateCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const FreelancerFreelanceColumns = handlers => [
  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: params => <MultilineRequestStatusCell status={params.value} />,
    minWidth: 160,
  },
  {
    field: 'name',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
    minWidth: 228,
    renderCell: params => (
      <UserMiniCell userName={params.row.originalData.createdBy.name} userId={params.row.originalData.createdBy._id} />
    ),
  },
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <ShortDateCell value={params.value} />,
    minWidth: 116,
    // type: 'date',
  },

  {
    field: 'title',
    headerName: t(TranslationKey['Request title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    minWidth: 220,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey['Request ID']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request ID'])} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    minWidth: 93,
  },

  {
    field: 'price',
    headerName: t(TranslationKey.Cost),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Cost) + ', $'} />,
    renderCell: params => <MultilineTextCell text={toFixed(params.value, 2)} />,
    type: 'number',
    minWidth: 118,
  },
  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    renderCell: params => <ShortDateCell value={params.value} />,
    minWidth: 134,
    // type: 'date',
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => (
      <ActionButtonsCell
        isFirstButton
        firstButtonElement={t(TranslationKey.Open)}
        firstButtonStyle={ButtonStyle.PRIMARY}
        onClickFirstButton={() => handlers.onClickOpenButton(params.row.id)}
      />
    ),
    minWidth: 190,
  },
]
