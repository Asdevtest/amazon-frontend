import { GridCellParams } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { UserRole, UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  NotificationMessageCell,
  ProductAsinCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'

import { checkIsFreelancer } from '@utils/checks'
import { getHumanFriendlyNotificationType } from '@utils/text'
import { t } from '@utils/translations'

import { RowHandlers } from '@typings/shared/data-grid'

export const generalNotificationsColumns = (rowHandlers: RowHandlers) => {
  const userInfo = rowHandlers?.userInfo()

  const renderCells = [
    {
      field: 'product',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
      renderCell: (params: GridCellParams) => (
        <ProductAsinCell
          withoutSku={!!userInfo?.role && UserRoleCodeMap[userInfo.role] === UserRole.FREELANCER}
          skuByClient={params.row.product?.skuByClient || params.row.parentProduct?.skuByClient}
          image={params.row.product?.images?.[0]}
          amazonTitle={params.row.product?.amazonTitle}
          asin={params.row.product?.asin}
        />
      ),
      width: 300,
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: (params: GridCellParams) => <MultilineTextCell twoLines text={params.row?.shop?.name} />,
      width: 90,
      columnKey: columnnsKeys.client.INVENTORY_SHOPS,
    },

    {
      field: 'type',
      headerName: t(TranslationKey['Notification type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Notification type'])} />,
      renderCell: (params: GridCellParams) => (
        <MultilineTextCell text={getHumanFriendlyNotificationType(params.value)} />
      ),
      width: 115,
      columnKey: columnnsKeys.shared.TYPE,
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
      flex: 1,
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: (params: GridCellParams) => <NormDateCell value={params.row.updatedAt} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: (params: GridCellParams) => <NormDateCell value={params.row.createdAt} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  if (checkIsFreelancer(UserRoleCodeMap[userInfo?.role || 0])) {
    // @ts-ignore
    renderCells.splice(1, 0, {
      field: 'user',
      headerName: t(TranslationKey.Performer),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Performer)} />,
      renderCell: (params: GridCellParams) => {
        const sub = params?.row?.sub

        return sub ? (
          <UserMiniCell userName={sub?.name} userId={sub?._id} />
        ) : (
          <MultilineTextCell text={t(TranslationKey.Missing)} />
        )
      },
      width: 145,
    })
  }

  for (const column of renderCells) {
    // @ts-ignore
    column.table = DataGridFilterTables.USER_NOTIFICATIONS
    column.sortable = false
  }

  return renderCells
}
