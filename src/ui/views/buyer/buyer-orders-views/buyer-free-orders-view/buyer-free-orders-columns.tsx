import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  DeadlineCell,
  DownloadAndCopyBtnsCell,
  IconHeaderCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  PriorityAndChinaDeliverCell,
  ProductAsinCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { IOrder } from '@typings/models/orders/order'
import { IGridColumn } from '@typings/shared/grid-column'

interface IHandlers {
  onClickTableRowBtn: (order: IOrder) => void
}

export const buyerFreeOrdersViewColumns = (handlers: IHandlers) => {
  const columns: IGridColumn[] = [
    {
      field: 'id',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
      minWidth: 65,
      type: 'number',
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
      minWidth: 80,
      sortable: false,
      filterable: false,
      align: 'center',
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
      minWidth: 180,
      filterable: false,
      sortable: false,
    },

    {
      field: 'asin',
      headerName: 'ASIN',
      renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,
      renderCell: params => {
        const product = params.row.product

        return (
          <ProductAsinCell
            image={product?.images?.[0]}
            amazonTitle={product?.amazonTitle}
            asin={product?.asin}
            skuByClient={product?.skuByClient}
          />
        )
      },
      minWidth: 280,
    },

    {
      field: 'amount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
      renderCell: params => <MultilineTextCell text={params.value} />,
      type: 'number',
      minWidth: 100,
    },

    {
      field: 'totalPrice',
      headerName: t(TranslationKey.Price),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,
      renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
      type: 'number',
      minWidth: 110,
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
      minWidth: 210,
      align: 'center',
    },

    {
      field: 'productionTerm',
      headerName: t(TranslationKey['Production time']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,
      renderCell: params => {
        const currentSupplier = params.row?.orderSupplier

        return (
          <MultilineTextCell text={`${currentSupplier?.minProductionTerm} - ${currentSupplier?.maxProductionTerm}`} />
        )
      },
      valueGetter: params => {
        const currentSupplier = params.row?.orderSupplier

        return `${currentSupplier?.minProductionTerm} - ${currentSupplier?.maxProductionTerm}`
      },
      minWidth: 120,
      sortable: false,
    },

    {
      field: 'deadline',
      headerName: t(TranslationKey.Deadline),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
      renderCell: params => <DeadlineCell deadline={params.row.deadline} />,
      minWidth: 100,
    },

    {
      field: 'needsResearch',
      headerName: t(TranslationKey['Re-search supplier']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Re-search supplier'])} />,
      renderCell: params => <MultilineTextCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
      type: 'boolean',
      minWidth: 140,
    },

    {
      field: 'storekeeper',
      headerName: t(TranslationKey['Int warehouse']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,
      renderCell: params => (
        <UserLinkCell blackText name={params.row.storekeeper?.name} userId={params.row.storekeeper?._id} />
      ),
      minWidth: 155,
    },

    {
      field: 'client',
      headerName: t(TranslationKey.Client),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
      renderCell: params => (
        <UserLinkCell blackText name={params.row.product.client?.name} userId={params.row.product.client?._id} />
      ),
      minWidth: 120,
    },

    {
      field: 'warehouses',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
      renderCell: params => <MultilineTextCell text={params.row.destination?.name} />,
      minWidth: 160,
    },

    {
      field: 'clientComment',
      headerName: t(TranslationKey['Client comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
      renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={140} text={params.value} />,
      minWidth: 400,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      minWidth: 115,
    },
  ]

  return columns
}
