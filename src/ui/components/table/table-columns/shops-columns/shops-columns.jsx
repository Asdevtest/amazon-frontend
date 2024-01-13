import { ShopReportsTabsValues } from '@constants/tabs/shop-report'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormalActionBtnCell,
  ShortDateCell,
  TableDataControlsButtonsCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const shopsColumns = handlers => [
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
    field: 'PPCOrganicByWeeks',
    headerName: 'PPC-Organic by Weeks',
    renderHeader: () => <MultilineTextHeaderCell text="PPC-Organic by Weeks" />,

    width: 125,
    renderCell: params => (
      <NormalActionBtnCell
        casual
        fullWidthButton
        disabled={!params?.row?.reportAccountUrl}
        bTnText={t(TranslationKey.View)}
        onClickOkBtn={() => handlers.onClickSeeShopReport(ShopReportsTabsValues.PPC, params.row)}
      />
    ),
  },

  {
    field: 'inventoryShipments',
    headerName: 'Inventory Shipments',
    renderHeader: () => <MultilineTextHeaderCell text="Inventory Shipments" />,

    width: 125,
    renderCell: params => (
      <NormalActionBtnCell
        casual
        fullWidthButton
        disabled={!params?.row?.reportAccountUrl}
        bTnText={t(TranslationKey.View)}
        onClickOkBtn={() => handlers.onClickSeeShopReport(ShopReportsTabsValues.INVENTORY_SHIPMENTS, params.row)}
      />
    ),
  },

  {
    field: 'reportInventory',
    headerName: 'Inventory',
    renderHeader: () => <MultilineTextHeaderCell text="Inventory" />,

    width: 125,
    renderCell: params => (
      <NormalActionBtnCell
        casual
        fullWidthButton
        disabled={!params?.row?.reportAccountUrl}
        bTnText={t(TranslationKey.View)}
        onClickOkBtn={() => handlers.onClickSeeShopReport(ShopReportsTabsValues.INVENTORY, params.row)}
      />
    ),
  },

  {
    field: 'sellerBoardWarehouseReportUrlDaily',
    headerName: t(TranslationKey['Warehouse report']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Warehouse report'])} />,

    width: 125,
    renderCell: params => (
      <NormalActionBtnCell
        casual
        fullWidthButton
        bTnText={t(TranslationKey.View)}
        onClickOkBtn={() => handlers.onClickSeeShopReport(ShopReportsTabsValues.STOCK_REPORT, params.row)}
      />
    ),
  },

  {
    field: 'sellerBoardWarehouseReportUrlMonthly',
    headerName: t(TranslationKey['Dashboard by goods/days']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Dashboard by goods/days'])} />,

    width: 125,
    renderCell: params => (
      <NormalActionBtnCell
        casual
        fullWidthButton
        bTnText={t(TranslationKey.View)}
        onClickOkBtn={() => handlers.onClickSeeShopReport(ShopReportsTabsValues.GOODS_DAYS_REPORT, params.row)}
      />
    ),
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    width: 120,
    renderCell: params => (
      <TableDataControlsButtonsCell
        onClickEditButton={() => handlers.onClickEditBtn(params.row)}
        onClickRemoveButton={() => handlers.onClickRemoveBtn(params.row)}
      />
    ),

    filterable: false,
    sortable: false,
  },
]
