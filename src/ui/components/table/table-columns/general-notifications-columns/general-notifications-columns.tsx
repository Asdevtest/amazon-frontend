import { GridCellParams } from '@mui/x-data-grid'

import { UserRole, UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  NotificationMessageCell,
  ProductAsinCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { getHumanFriendlyNotificationType } from '@utils/text'
import { t } from '@utils/translations'

import { RowHandlers } from '@typings/data-grid'
import { IUser } from '@typings/user'

export const GeneralNotificationsColumns = (rowHandlers: RowHandlers, userInfo: IUser | undefined) => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: (params: GridCellParams) => <NormDateCell value={params.row.originalData.updatedAt} />,
    width: 100,
    // filterable: false,
    // columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'product',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    renderCell: (params: GridCellParams) => (
      <ProductAsinCell
        withoutSku={!!userInfo?.role && UserRoleCodeMap[userInfo.role] === UserRole.FREELANCER}
        skuByClient={params.row.product?.skuByClient || params.row.parentProduct?.skuByClient}
        image={params.row.product?.images?.slice()[0]}
        amazonTitle={params.row.product?.amazonTitle}
        asin={params.row.product?.asin}
      />
    ),
    width: 300,
    // columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'type',
    headerName: t(TranslationKey['Notification type']),
    renderHeader: () => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Notification type'])}
        // isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        // isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: (params: GridCellParams) => <MultilineTextCell text={getHumanFriendlyNotificationType(params.value)} />,
    width: 115,
    sortable: false,
    filterable: false,
    // columnKey: columnnsKeys.client.INVENTORY_SHOPS,
  },

  {
    field: 'message',
    headerName: t(TranslationKey.Message),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Message)} />,
    renderCell: (params: GridCellParams) => {
      const notification = params?.row?.data?.[0] || params?.row?.data

      return (
        <NotificationMessageCell
          notificationType={params?.row?.type}
          notification={notification}
          navigateToHandler={rowHandlers.navigateToHandler}
        />
      )
    },
    minWidth: 400,
    filterable: false,
    // columnKey: columnnsKeys.shared.STRING,
  },
]
