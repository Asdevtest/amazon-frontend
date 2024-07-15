import { GridRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { ProductStatusByCode, colorByProductStatus, productStatusTranslateKey } from '@constants/product/product-status'
import { productStrategyStatusesEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ManyUserLinkCell,
  MultilineStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OpenInNewTabCell,
  ProductAsinCell,
  RedFlagsCell,
  TagsCell,
  ToFixedWithDollarSignCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'

import { formatNormDateTime } from '@utils/date-time'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

interface SupervisorProductsViewColumnsProps {
  onClickTableRow: (id: string) => void
}

export const supervisorProductsViewColumns = ({ onClickTableRow }: SupervisorProductsViewColumnsProps) => {
  const columns: IGridColumn[] = [
    {
      field: 'link',
      renderHeader: () => null,
      renderCell: ({ row }: GridRowModel) => <OpenInNewTabCell onClickOpenInNewTab={() => onClickTableRow(row?._id)} />,
      minWidth: 50,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
      renderCell: ({ row }: GridRowModel) => (
        <ProductAsinCell
          image={row?.images?.[0]}
          amazonTitle={row?.amazonTitle}
          asin={row?.asin}
          skuByClient={row?.skuByClient}
        />
      ),
      minWidth: 260,
      columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: ({ row }: GridRowModel) => (
        <MultilineTextCell
          maxLength={48}
          // @ts-ignore
          text={t(productStatusTranslateKey(ProductStatusByCode[row?.status]))}
          // @ts-ignore
          color={colorByProductStatus(ProductStatusByCode[row?.status])}
        />
      ),
      // @ts-ignore
      valueFormatter: ({ row }: GridRowModel) => t(productStatusTranslateKey(ProductStatusByCode[row?.status])),
      minWidth: 160,
      columnKey: columnnsKeys.client.INVENTORY_STATUS,
    },

    {
      field: 'strategyStatus',
      headerName: t(TranslationKey.Strategy),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,
      renderCell: ({ row }: GridRowModel) => (
        // @ts-ignore
        <MultilineStatusCell leftAlign status={productStrategyStatusesEnum[row?.strategyStatus]} />
      ),
      minWidth: 140,
      align: 'center',
      columnKey: columnnsKeys.client.INVENTORY_STRATEGY_STATUS,
    },

    {
      field: 'amazon',
      headerName: t(TranslationKey['Amazon price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,
      renderCell: ({ row }: GridRowModel) => <ToFixedWithDollarSignCell value={row?.amazon} fix={2} />,
      valueGetter: ({ row }: GridRowModel) => (row?.amazon ? toFixedWithDollarSign(row?.amazon, 2) : '-'),
      minWidth: 100,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'createdBy',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,
      renderCell: ({ row }: GridRowModel) => (
        <UserMiniCell userName={row?.createdBy?.name} userId={row?.createdBy?._id} />
      ),
      valueGetter: ({ row }: GridRowModel) => row?.createdBy?.name,
      minWidth: 180,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'buyer',
      headerName: t(TranslationKey.Buyer),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,
      renderCell: ({ row }: GridRowModel) => <UserMiniCell userName={row?.buyer?.name} userId={row?.buyer?._id} />,
      valueGetter: ({ row }: GridRowModel) => row?.buyer?.name,

      minWidth: 180,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'bsr',
      headerName: t(TranslationKey.BSR),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,
      renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row?.bsr} />,
      minWidth: 70,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'fbafee',
      headerName: t(TranslationKey['FBA fee , $']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA fee , $'])} />,
      valueGetter: ({ row }: GridRowModel) => (row?.fbafee ? toFixedWithDollarSign(row?.fbafee, 2) : ''),
      renderCell: ({ row }: GridRowModel) => <ToFixedWithDollarSignCell value={row?.fbafee} fix={2} />,
      minWidth: 105,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'ordered',
      headerName: t(TranslationKey.Ordered),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Ordered)} />,
      renderCell: ({ row }: GridRowModel) => (
        <MultilineTextCell
          customTextStyles={
            row?.ordered
              ? {
                  background: 'linear-gradient(180deg, #00B746 0%, #03A03F 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }
              : {
                  background: 'linear-gradient(180deg, #FF1616 0%, #DF0C0C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }
          }
          color={row?.ordered ? '#00b746' : 'red'}
          text={row?.ordered ? t(TranslationKey.Yes) : t(TranslationKey.No)}
        />
      ),
      valueFormatter: ({ row }: GridRowModel) => (row?.ordered ? t(TranslationKey.Yes) : t(TranslationKey.No)),
      minWidth: 100,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.YES_NO,
    },

    {
      field: 'tags',
      headerName: t(TranslationKey.Tags),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tags)} />,
      valueGetter: ({ row }: GridRowModel) => row?.tags?.map((el: { title: string }) => `#${el.title}`).join(),
      renderCell: ({ row }: GridRowModel) => <TagsCell tags={row?.tags} />,
      minWidth: 180,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.TAGS,
    },

    {
      field: 'redFlags',
      headerName: t(TranslationKey['Red flags']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Red flags'])} />,
      renderCell: ({ row }: GridRowModel) => <RedFlagsCell flags={row?.redFlags} />,
      minWidth: 130,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.RED_FLAGS,
    },

    {
      field: 'subUsers',
      headerName: t(TranslationKey['Access to product']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Access to product'])} />,
      renderCell: ({ row }) => {
        const subUsers = row?.subUsers || []
        const subUsersByShop = row?.subUsersByShop || []

        return <ManyUserLinkCell usersData={subUsers?.concat(subUsersByShop)} />
      },
      valueGetter: ({ row }) => {
        const subUsers = row?.subUsers || []
        const subUsersByShop = row?.subUsersByShop || []

        return subUsers?.concat(subUsersByShop).join(', ')
      },
      minWidth: 160,
      filterable: false,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: ({ row }: GridRowModel) => <NormDateCell value={row?.createdAt} />,
      valueFormatter: ({ row }: GridRowModel) => formatNormDateTime(row?.createdAt),
      minWidth: 100,
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }: GridRowModel) => <NormDateCell value={row?.updatedAt} />,
      valueFormatter: ({ row }: GridRowModel) => formatNormDateTime(row?.updatedAt),
      minWidth: 115,
      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.PRODUCTS
    }

    column.sortable = false
  }

  return columns
}
