import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, Text } from '@components/data-grid/data-grid-cells'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

export const clientFreelanceNotificationsColumns = handlers => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
    renderCell: params => <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={params.value} />,
    width: 190,
  },

  {
    field: 'shop',
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
    renderCell: params => <Text text={params.row?.product?.shop?.name} />,
    filterable: false,
    sortable: false,
    disableCustomSort: true,

    width: 100,
  },

  {
    field: 'title',
    headerName: t(TranslationKey['Request title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
    renderCell: params => <Text text={params.value} />,
    width: 200,
  },

  {
    field: 'spec',
    headerName: t(TranslationKey['Request type']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
    renderCell: params => <Text text={params.row.spec?.title} />,
    width: 200,
  },

  {
    field: 'xid',
    headerName: `ID ${t(TranslationKey.Requests)}`,
    renderHeader: () => <MultilineTextHeaderCell text={`ID ${t(TranslationKey.Requests)}`} />,
    renderCell: params => <Text text={params.value} />,
  },

  {
    field: 'unreadMessages',
    headerName: t(TranslationKey['Unread messages']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Unread messages'])} />,
    renderCell: params => <Text text={params.value} />,
    width: 200,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
    renderCell: params => (
      <Button onClick={() => handlers.onClickReplyBtn(params.row._id, params.row.chatId)}>
        {t(TranslationKey.Reply)}
      </Button>
    ),
    sortable: false,
    width: 140,
  },
]
