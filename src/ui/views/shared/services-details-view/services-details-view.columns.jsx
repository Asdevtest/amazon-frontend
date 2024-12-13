import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

export const serviceDetailsColumns = handlers => [
  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: params => (
      <Text isCell text={MyRequestStatusTranslate(params.value)} color={colorByStatus(params.row.status)} />
    ),
    width: 160,
  },
  {
    field: 'name',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
    width: 228,
    renderCell: params => (
      <UserCell name={params.row.createdBy?.name} id={params.row.createdBy?._id} email={params.row.createdBy?.email} />
    ),
  },
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <NormDateCell value={params.row.updatedAt} />,
    width: 116,
  },
  {
    field: 'title',
    headerName: t(TranslationKey['Request title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
    renderCell: params => <Text isCell text={params.row.title} />,
    width: 220,
  },
  {
    field: 'xid',
    headerName: t(TranslationKey['Request ID']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request ID'])} />,
    renderCell: params => <Text isCell text={params.row.xid} />,
    width: 80,
  },
  {
    field: 'price',
    headerName: t(TranslationKey.Cost),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Cost) + ', $'} />,
    renderCell: params => <Text isCell text={toFixed(params.row.price, 2)} />,
    width: 118,
  },
  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    renderCell: params => <NormDateCell value={params.row.timeoutAt} />,
    width: 134,
  },
  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    renderCell: params => (
      <ActionButtonsCell
        showFirst
        firstContent={t(TranslationKey.Open)}
        onClickFirst={() => handlers.onClickOpenButton(params.row._id)}
      />
    ),
    width: 190,
  },
]
