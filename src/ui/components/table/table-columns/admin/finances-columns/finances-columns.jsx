import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ScrollingCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const financesViewColumns = () => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    minWidth: 120,
    // type: 'date',
  },

  {
    field: 'type',
    headerName: t(TranslationKey.Type),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,

    minWidth: 90,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'sum',
    headerName: t(TranslationKey.Sum),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Sum)} />,

    minWidth: 110,
    type: 'number',
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
  },

  {
    field: 'creatorName',
    headerName: t(TranslationKey.Initiator),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Initiator)} />,

    minWidth: 170,
    // renderCell: params => <MultilineTextCell text={params.value} />,
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.createdBy?._id} />,
  },

  {
    field: 'recipientName',
    headerName: t(TranslationKey.Recipient),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Recipient)} />,

    minWidth: 170,
    // renderCell: params => <MultilineTextCell text={params.value} />,
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.recipient?._id} />,
  },

  {
    field: 'paymentType',
    headerName: t(TranslationKey.Category),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Category)} />,

    minWidth: 230,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'comment',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    minWidth: 700,
    renderCell: params => (
      <ScrollingCell
        fontSize={'14px'}
        value={`${params.value} ${params.row?.originalData?.product ? params.row.originalData.product?.id : ''}`}
      />
    ),
  },
]
