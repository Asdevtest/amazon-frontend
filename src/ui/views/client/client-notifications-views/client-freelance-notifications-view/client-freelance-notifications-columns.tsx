import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/button'

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
      renderCell: params => <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={params.row.request.asin} />,
      width: 190,
      disableCustomSort: true,
    },

    {
      field: 'shopId',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: ({ row }) => <MultilineTextCell twoLines text={row?.request?.product?.shop?.name} />,
      valueGetter: ({ row }) => row?.request?.product?.shop?.name,
      width: 90,
      disableCustomSort: true,
    },

    {
      field: 'title',
      headerName: t(TranslationKey['Request title']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
      renderCell: params => <MultilineTextCell text={params.row.request.title} />,
      width: 200,
      disableCustomSort: true,
    },

    {
      field: 'spec',
      headerName: t(TranslationKey['Request type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
      renderCell: params => <MultilineTextCell threeLines text={params.row?.request?.spec?.title} />,
      width: 200,
      disableCustomSort: true,
    },

    {
      field: 'humanFriendlyId',
      headerName: `ID ${t(TranslationKey.Requests)}`,
      renderHeader: () => <MultilineTextHeaderCell text={`ID ${t(TranslationKey.Requests)}`} />,
      renderCell: params => <MultilineTextCell text={params.row?.request?.humanFriendlyId} />,
      disableCustomSort: true,
    },

    {
      field: 'unreadMessages',
      headerName: t(TranslationKey['Unread messages']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Unread messages'])} />,
      renderCell: params => <MultilineTextCell text={params.value} />,
      width: 200,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
      renderCell: ({ row }) => (
        <Button
          style={{
            height: '30px !important',
          }}
          onClick={() => handlers.onClickReplyBtn(row.request._id, row.chatId)}
        >
          {t(TranslationKey.Reply)}
        </Button>
      ),
      disableCustomSort: true,
    },
  ]

  for (const column of columns) {
    column.sortable = false
  }

  return columns
}
