/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GridCellParams } from '@mui/x-data-grid'

import { UserRole, UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserModel } from '@models/user-model'

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

export const GeneralNotificationsColumns = (rowHandlers: RowHandlers) => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    // @ts-ignore
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    // @ts-ignore
    renderCell: (params: GridCellParams) => <NormDateCell value={params.value} />,
    width: 100,
    // filterable: false,

    // columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'product',
    headerName: t(TranslationKey.Product),
    // @ts-ignore
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    renderCell: (params: GridCellParams) => (
      <ProductAsinCell
        // @ts-ignore
        withoutSku={UserRoleCodeMap[(UserModel?.userInfo as any).role] === UserRole.FREELANCER}
        skusByClient={
          params.row.product?.skusByClient?.slice()[0] || params.row.parentProduct?.skusByClient?.slice()[0]
        }
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
    renderHeader: (/* params: GridRenderCellParams */) => (
      <MultilineTextHeaderCell
        // @ts-ignore
        text={t(TranslationKey['Notification type'])}
        // isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        // isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    // @ts-ignore
    renderCell: (params: GridCellParams) => <MultilineTextCell text={getHumanFriendlyNotificationType(params.value)} />,
    width: 110,
    sortable: false,
    filterable: false,

    // columnKey: columnnsKeys.client.INVENTORY_SHOPS,
  },

  {
    field: 'message',
    headerName: t(TranslationKey.Message),
    // @ts-ignore
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Message)} />,

    // renderCell: (params: GridCellParams) => <MultilineTextCell text={params.value} />,
    renderCell: (params: GridCellParams) => {
      const notification = params?.row?.data?.[0] || params?.row?.data

      return (
        <NotificationMessageCell
          // @ts-ignore
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
