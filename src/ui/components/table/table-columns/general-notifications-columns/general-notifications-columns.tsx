import { GridCellParams } from '@mui/x-data-grid'

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
import { IFullUser } from '@typings/shared/full-user'

export const GeneralNotificationsColumns = (rowHandlers: RowHandlers, userInfo: IFullUser | undefined) => {
  const renderCells = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: (params: GridCellParams) => <NormDateCell value={params.row.updatedAt} />,
      width: 100,
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
    },

    {
      field: 'type',
      headerName: t(TranslationKey['Notification type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Notification type'])} />,
      renderCell: (params: GridCellParams) => (
        <MultilineTextCell text={getHumanFriendlyNotificationType(params.value)} />
      ),
      width: 115,
      sortable: false,
      filterable: false,
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
      minWidth: 590,
      filterable: false,
    },
  ]

  if (checkIsFreelancer(UserRoleCodeMap[userInfo?.role || 0])) {
    renderCells.splice(2, 0, {
      field: 'createdBy',
      headerName: t(TranslationKey.Performer),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Performer)} />,
      width: 145,
      renderCell: (params: GridCellParams) => {
        const sub = params?.row?.sub

        return sub ? (
          <UserMiniCell userName={sub?.name} userId={sub?._id} />
        ) : (
          <MultilineTextCell text={t(TranslationKey.Missing)} />
        )
      },
    })
  }

  return renderCells
}
