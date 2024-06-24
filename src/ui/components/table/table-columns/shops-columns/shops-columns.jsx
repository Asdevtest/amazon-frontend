import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ShortDateCell,
  TableDataControlsButtonsCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { ShopReportsTabsValues } from '@typings/enums/shop-report'

export const shopsColumns = handlers => {
  const columns = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      width: 120,
      renderCell: params => <ShortDateCell value={params.value} />,
    },

    {
      field: 'name',
      headerName: t(TranslationKey.Title),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

      width: 320,
      renderCell: params => <MultilineTextCell text={params.value} />,
    },

    {
      field: 'ppcOrganicByDay',
      headerName: 'PPC-Organic By Day',
      renderHeader: () => <MultilineTextHeaderCell text="PPC-Organic By Day" />,

      width: 125,
      renderCell: params => (
        <ActionButtonsCell
          isFirstButton
          disabledFirstButton={!params?.row?.reportAccountUrl}
          firstButtonElement={t(TranslationKey.View)}
          firstButtonStyle={ButtonStyle.CASUAL}
          onClickFirstButton={() => handlers.onClickSeeShopReport(ShopReportsTabsValues.PPC_ORGANIC_BY_DAY, params.row)}
        />
      ),
      disableCustomSort: true,
    },

    {
      field: 'inventoryShipments',
      headerName: 'Inventory Shipments',
      renderHeader: () => <MultilineTextHeaderCell text="Inventory Shipments" />,

      width: 125,
      renderCell: params => (
        <ActionButtonsCell
          isFirstButton
          disabledFirstButton={!params?.row?.reportAccountUrl}
          firstButtonElement={t(TranslationKey.View)}
          firstButtonStyle={ButtonStyle.CASUAL}
          onClickFirstButton={() =>
            handlers.onClickSeeShopReport(ShopReportsTabsValues.INVENTORY_SHIPMENTS, params.row)
          }
        />
      ),
      disableCustomSort: true,
    },

    {
      field: 'reportInventory',
      headerName: 'Inventory',
      renderHeader: () => <MultilineTextHeaderCell text="Inventory" />,

      width: 125,
      renderCell: params => (
        <ActionButtonsCell
          isFirstButton
          disabledFirstButton={!params?.row?.reportAccountUrl}
          firstButtonElement={t(TranslationKey.View)}
          firstButtonStyle={ButtonStyle.CASUAL}
          onClickFirstButton={() => handlers.onClickSeeShopReport(ShopReportsTabsValues.INVENTORY, params.row)}
        />
      ),
      disableCustomSort: true,
    },

    {
      field: 'returns',
      headerName: t(TranslationKey.Returns),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Returns)} />,

      width: 125,
      renderCell: params => (
        <ActionButtonsCell
          isFirstButton
          disabledFirstButton={!params?.row?.reportAccountUrl}
          firstButtonElement={t(TranslationKey.View)}
          firstButtonStyle={ButtonStyle.CASUAL}
          onClickFirstButton={() => handlers.onClickSeeShopReport(ShopReportsTabsValues.RETURNS, params.row)}
        />
      ),
      disableCustomSort: true,
    },

    {
      field: 'PPCOrganicByWeeks',
      headerName: 'PPC-Organic by Weeks',
      renderHeader: () => <MultilineTextHeaderCell text="PPC-Organic by Weeks" />,

      width: 125,
      renderCell: params => (
        <ActionButtonsCell
          isFirstButton
          disabledFirstButton={!params?.row?.reportAccountUrl}
          firstButtonElement={t(TranslationKey.View)}
          firstButtonStyle={ButtonStyle.CASUAL}
          onClickFirstButton={() => handlers.onClickSeeShopReport(ShopReportsTabsValues.PPC, params.row)}
        />
      ),
      disableCustomSort: true,
    },

    {
      field: 'sellerBoardWarehouseReportUrlDaily',
      headerName: t(TranslationKey['Warehouse report']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Warehouse report'])} />,

      width: 125,
      renderCell: params => (
        <ActionButtonsCell
          isFirstButton
          firstButtonElement={t(TranslationKey.View)}
          firstButtonStyle={ButtonStyle.CASUAL}
          onClickFirstButton={() => handlers.onClickSeeShopReport(ShopReportsTabsValues.STOCK_REPORT, params.row)}
        />
      ),
      disableCustomSort: true,
    },

    {
      field: 'sellerBoardWarehouseReportUrlMonthly',
      headerName: t(TranslationKey['Dashboard by goods/days']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Dashboard by goods/days'])} />,

      width: 125,
      renderCell: params => (
        <ActionButtonsCell
          isFirstButton
          firstButtonElement={t(TranslationKey.View)}
          firstButtonStyle={ButtonStyle.CASUAL}
          onClickFirstButton={() => handlers.onClickSeeShopReport(ShopReportsTabsValues.GOODS_DAYS_REPORT, params.row)}
        />
      ),
      disableCustomSort: true,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

      width: 120,
      renderCell: params => (
        <TableDataControlsButtonsCell
          onClickEditButton={() => handlers.onClickEditBtn(params.row)}
          onClickCancelButton={() => handlers.onClickRemoveBtn(params.row)}
        />
      ),

      filterable: false,
      disableCustomSort: true,
    },
  ]

  for (const column of columns) {
    // @ts-ignore
    column.sortable = false
  }

  return columns
}
