import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, MultilineTextCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
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
      minWidth: 190,
      disableCustomSort: true,
    },

    {
      field: 'shopId',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: ({ row }) => <MultilineTextCell twoLines text={row?.request?.product?.shop?.name} />,
      valueGetter: ({ row }) => row?.request?.product?.shop?.name,
      minWidth: 140,
      disableCustomSort: true,
    },

    {
      field: 'title',
      headerName: t(TranslationKey['Request title']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
      renderCell: ({ row }) => <MultilineTextCell twoLines text={row.request.title} />,
      flex: 1,
      disableCustomSort: true,
    },

    {
      field: 'spec',
      headerName: t(TranslationKey['Request type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
      renderCell: ({ row }) => <MultilineTextCell threeLines text={row?.request?.spec?.title} />,
      minWidth: 140,
      disableCustomSort: true,
    },

    {
      field: 'humanFriendlyId',
      headerName: `ID ${t(TranslationKey.Requests)}`,
      renderHeader: () => <MultilineTextHeaderCell text={`ID ${t(TranslationKey.Requests)}`} />,
      renderCell: ({ row }) => <MultilineTextCell text={row?.request?.humanFriendlyId} />,
      disableCustomSort: true,
    },

    {
      field: 'unreadMessages',
      headerName: t(TranslationKey['Unread messages']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Unread messages'])} />,
      renderCell: ({ row }) => <MultilineTextCell text={String(row?.unreadMessages)} />,
      minWidth: 120,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
      renderCell: ({ row }) => (
        <ActionButtonsCell
          isFirstButton
          firstButtonElement={t(TranslationKey.Reply)}
          firstButtonStyle={ButtonStyle.PRIMARY}
          onClickFirstButton={() => handlers.onClickReplyBtn(row.request._id, row.chatId)}
        />
      ),
      minWidth: 140,
      disableCustomSort: true,
    },
  ]

  for (const column of columns) {
    column.sortable = false
  }

  return columns
}
