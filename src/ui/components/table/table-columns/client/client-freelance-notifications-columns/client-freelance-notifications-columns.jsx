import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  AsinCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

export const clientFreelanceNotificationsColumns = handlers => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,

    renderCell: params => <AsinCell asin={params.value} />,

    width: 190,
  },
  {
    field: 'title',
    headerName: t(TranslationKey['Request title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request title'])} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 200,
  },

  {
    field: 'typeTask',
    headerName: t(TranslationKey['Request type']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
    renderCell: params => (
      <MultilineTextCell text={freelanceRequestTypeTranslate(freelanceRequestTypeByCode[params.value])} />
    ),
    width: 200,
  },
  {
    field: 'humanFriendlyId',
    headerName: `ID ${t(TranslationKey.Requests)}`,
    renderHeader: () => <MultilineTextHeaderCell text={`ID ${t(TranslationKey.Requests)}`} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
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
    renderCell: params => (
      <MultilineTextCell
        text={
          <Button
            sx={{
              height: '30px !important',
            }}
            onClick={() => {
              handlers.onClickReplyBtn(params.row._id, params.row.humanFriendlyId)
            }}
          >
            {t(TranslationKey.Reply)}
          </Button>
        }
      />
    ),

    sortable: false,
  },
]
