import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, Text, UserCell } from '@components/data-grid/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const financesViewColumns = () => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,
  },

  {
    field: 'type',
    headerName: t(TranslationKey.Type),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,

    width: 90,
    renderCell: params => <Text text={params.value} />,
  },

  {
    field: 'sum',
    headerName: t(TranslationKey.Sum),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Sum)} />,

    width: 110,
    type: 'number',
    renderCell: params => <Text text={toFixedWithDollarSign(params.value, 2)} />,
  },

  {
    field: 'creatorName',
    headerName: t(TranslationKey.Initiator),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Initiator)} />,

    width: 170,
    renderCell: params => (
      <UserCell name={params.row.createdBy?.name} id={params.row.createdBy?._id} email={params.row.createdBy?.email} />
    ),
  },

  {
    field: 'recipientName',
    headerName: t(TranslationKey.Recipient),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Recipient)} />,

    width: 170,
    renderCell: params => (
      <UserCell name={params.row.recipient?.name} id={params.row.recipient?._id} email={params.row.recipient?.email} />
    ),
  },

  {
    field: 'paymentType',
    headerName: t(TranslationKey.Category),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Category)} />,

    width: 230,
    renderCell: params => <Text text={params.value} />,
  },

  {
    field: 'comment',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    width: 700,
    renderCell: params => (
      <Text text={`${params.value} ${params.row?.originalData?.product ? params.row.product?.id : ''}`} />
    ),
  },
]
