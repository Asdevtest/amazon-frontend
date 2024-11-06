import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

interface IRowHandlers {
  onClickReplyBtn: (requestId: string, chatId: string) => void
}

export const clientFreelanceNotificationsColumns = (handlers: IRowHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'asin',
      headerName: t(TranslationKey.ASIN),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
      renderCell: ({ row }) => <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={row.request.asin} />,
      width: 190,
      disableCustomSort: true,
    },

    {
      field: 'shopId',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: ({ row }) => <Text isCell text={row?.request?.product?.shop?.name} />,
      valueGetter: ({ row }) => row?.request?.product?.shop?.name,
      width: 140,
      disableCustomSort: true,
    },

    {
      field: 'title',
      headerName: t(TranslationKey['Request title']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
      renderCell: ({ row }) => <Text isCell text={row.request.title} />,
      flex: 1,
      disableCustomSort: true,
    },

    {
      field: 'spec',
      headerName: t(TranslationKey['Request type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
      renderCell: ({ row }) => <Text isCell text={row?.request?.spec?.title} />,
      width: 140,
      disableCustomSort: true,
    },

    {
      field: 'xid',
      headerName: `ID ${t(TranslationKey.Requests)}`,
      renderHeader: () => <MultilineTextHeaderCell text={`ID ${t(TranslationKey.Requests)}`} />,
      renderCell: ({ row }) => <Text isCell text={row?.request?.xid} />,
      disableCustomSort: true,
    },

    {
      field: 'unreadMessages',
      headerName: t(TranslationKey['Unread messages']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Unread messages'])} />,
      renderCell: ({ row }) => <Text isCell text={String(row?.unreadMessages)} />,
      width: 120,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
      renderCell: ({ row }) => (
        <ActionButtonsCell
          showFirst
          firstContent={t(TranslationKey.Reply)}
          onClickFirst={() => handlers.onClickReplyBtn(row.request._id, row.chatId)}
        />
      ),
      width: 110,
      disableCustomSort: true,
    },
  ]

  for (const column of columns) {
    column.sortable = false
  }

  return columns
}
