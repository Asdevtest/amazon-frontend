import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  DeadlineCell,
  DownloadAndCopyBtnsCell,
  IconHeaderCell,
  MultilineTextHeaderCell,
  NormDateCell,
  PriorityAndChinaDeliverCell,
  ProductCell,
  TextCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { IOrder } from '@typings/models/orders/order'
import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

import {
  productionTermColumnMenuItems,
  productionTermColumnMenuValue,
} from '../buyer-pending-orders-view/column.config'

interface IHandlers {
  onClickTableRowBtn: (order: IOrder) => void
}

export const buyerFreeOrdersViewColumns = (handlers: IHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'id',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: params => <TextCell text={params.value} />,

      columnKey: columnnsKeys.shared.NUMBER,
      width: 65,
    },

    {
      field: 'priorityAndChinaDelivery',
      headerName: t(TranslationKey.Priority),
      renderHeader: () => <IconHeaderCell url={'/assets/icons/bookmark.svg'} />,
      renderCell: params => (
        <PriorityAndChinaDeliverCell
          priority={params.row.priority}
          chinaDelivery={params.row.expressChinaDelivery}
          status={params.row.status}
        />
      ),

      disableCustomSort: true,
      filterable: false,
      width: 80,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
      renderCell: params => (
        <ActionButtonsCell
          isFirstButton
          isFirstRow={params.api.getSortedRowIds()?.[0] === params.row._id}
          firstButtonTooltipText={t(TranslationKey['To assign the order to Byer'])}
          firstButtonElement={t(TranslationKey['Get to work'])}
          firstButtonStyle={ButtonStyle.PRIMARY}
          onClickFirstButton={() => handlers.onClickTableRowBtn(params.row as IOrder)}
        />
      ),

      disableCustomSort: true,
      filterable: false,
      width: 180,
    },

    {
      field: 'asin',
      headerName: 'ASIN',
      renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,
      renderCell: params => {
        const product = params.row.product

        return (
          <ProductCell
            image={product?.images?.[0]}
            title={product?.amazonTitle}
            asin={product?.asin}
            sku={product?.skuByClient}
          />
        )
      },

      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue(),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 260,
      minWidth: 100,
    },

    {
      field: 'amount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
      renderCell: params => <TextCell text={params.value} />,

      columnKey: columnnsKeys.shared.NUMBER,
      width: 100,
    },

    {
      field: 'totalPrice',
      headerName: t(TranslationKey.Price),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,
      renderCell: params => <TextCell text={toFixedWithDollarSign(params.value, 2)} />,

      columnKey: columnnsKeys.shared.NUMBER,
      width: 110,
    },

    {
      field: 'barCode',
      headerName: t(TranslationKey.BarCode),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,
      renderCell: params => (
        <DownloadAndCopyBtnsCell
          value={params.row.product?.barCode}
          isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        />
      ),

      disableCustomSort: true,
      filterable: false,
      width: 210,
    },

    {
      field: 'minProductionTerm',
      headerName: t(TranslationKey['Production time']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,
      renderCell: params => {
        const currentSupplier = params.row?.orderSupplier

        return <TextCell text={`${currentSupplier?.minProductionTerm} - ${currentSupplier?.maxProductionTerm}`} />
      },
      valueGetter: params => {
        const currentSupplier = params.row?.orderSupplier

        return `${currentSupplier?.minProductionTerm} - ${currentSupplier?.maxProductionTerm}`
      },

      fields: productionTermColumnMenuItems,
      columnMenuConfig: productionTermColumnMenuValue,

      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 120,
    },

    {
      field: 'deadline',
      headerName: t(TranslationKey.Deadline),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
      renderCell: params => <DeadlineCell deadline={params.row.deadline} />,

      columnKey: columnnsKeys.shared.DATE,
      width: 100,
    },

    {
      field: 'needsResearch',
      headerName: t(TranslationKey['Re-search supplier']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Re-search supplier'])} />,
      renderCell: params => <TextCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,

      disableCustomSort: true,
      filterable: false,
      width: 140,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey['Int warehouse']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,
      renderCell: params => (
        <UserLinkCell blackText name={params.row.storekeeper?.name} userId={params.row.storekeeper?._id} />
      ),

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      width: 155,
    },

    {
      field: 'client',
      headerName: t(TranslationKey.Client),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
      renderCell: params => (
        <UserLinkCell blackText name={params.row.product.client?.name} userId={params.row.product.client?._id} />
      ),

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      table: DataGridFilterTables.PRODUCTS,
      width: 120,
    },

    {
      field: 'destination',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
      renderCell: params => <TextCell text={params.row.destination?.name} />,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      width: 160,
    },

    {
      field: 'clientComment',
      headerName: t(TranslationKey['Client comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
      renderCell: params => <TextCell text={params.value} />,

      columnKey: columnnsKeys.shared.STRING_VALUE,
      width: 400,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,

      columnKey: columnnsKeys.shared.DATE,
      width: 115,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.ORDERS
    }

    column.sortable = false
  }

  return columns
}
