import { GridCellParams } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  NotificationMessage,
  ProductAsinCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { getHumanFriendlyNotificationType } from '@utils/text'
import { t } from '@utils/translations'

import { RowHandlers } from '@typings/data-grid'

export const GeneralNotificationsColumns = (rowHandlers: RowHandlers) => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    // renderCell: (params: GridCellParams) => <MultilineTextCell text={params.value} />,
    renderCell: (params: GridCellParams) => <NormDateCell value={params.value} />,
    width: 100,
    // filterable: false,

    // columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'product',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    renderCell: (params: GridCellParams) => {
      // const notification = isArray(params?.row?.data) ? params?.row?.data?.[0] : params?.row?.data
      // const product =
      //   notification?.product ||
      //   notification?.vacOrders?.[0]?.product ||
      //   notification?.needConfirmOrders?.[0]?.product ||
      //   notification?.request?.product ||
      //   notification?.items?.[0]?.product ||
      //   notification?.parentProduct

      return (
        <ProductAsinCell
          withoutSku
          image={params.row.product?.images?.slice()[0]}
          amazonTitle={params.row.product?.amazonTitle}
          asin={params.row.product?.asin}
        />
      )
    },
    width: 300,
    // columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'type',
    headerName: t(TranslationKey['Notification type']),
    renderHeader: (/* params: GridRenderCellParams */) => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Notification type'])}
        // isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        // isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: (params: GridCellParams) => <MultilineTextCell text={getHumanFriendlyNotificationType(params.value)} />,
    width: 110,
    sortable: false,
    filterable: false,

    // columnKey: columnnsKeys.client.INVENTORY_SHOPS,
  },

  {
    field: 'message',
    headerName: t(TranslationKey.Message),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Message)} />,

    // renderCell: (params: GridCellParams) => <MultilineTextCell text={params.value} />,
    renderCell: (params: GridCellParams) => {
      const notification = params?.row?.data?.[0] || params?.row?.data

      return (
        <NotificationMessage
          notificationType={params?.row?.type}
          notification={notification}
          navigateToHandler={rowHandlers.navigateToHandler}
        />
      )
    },
    minWidth: 400,
    // filterable: false,

    // columnKey: columnnsKeys.shared.STRING,
  },
]
