import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  ManyUserLinkCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'
import { Launches } from '@components/shared/launches'
import { getLaunchName } from '@components/shared/launches/helpers/get-launch-name'
import { Text } from '@components/shared/text'

import { formatShortDateTime } from '@utils/date-time'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { IFullUser } from '@typings/shared/full-user'
import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

interface ReportsViewColumnsProps {
  onToggleReportModalEditMode: (reportId: string) => void
  onClickRemoveReport: (reportId: string) => void
  subView?: boolean
}

export const reportsViewColumns = (props: ReportsViewColumnsProps) => {
  const { onToggleReportModalEditMode, onClickRemoveReport, subView } = props

  const asinColumn = subView
    ? {
        field: 'asin',
        headerName: t(TranslationKey.ASIN),
        renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
        renderCell: ({ row }: GridRowModel) => (
          <ProductCell
            image={row.product?.images?.[0]}
            title={row.product?.amazonTitle}
            asin={row.product?.asin}
            sku={row.product?.skuByClient}
          />
        ),
        valueGetter: (row: GridRowModel) => row?.product?.asin,

        fields: getProductColumnMenuItems(),
        columnMenuConfig: getProductColumnMenuValue(),
        columnKey: columnnsKeys.shared.MULTIPLE,
        width: 170,
      }
    : null
  const shopColumn = subView
    ? {
        field: 'shop',
        headerName: t(TranslationKey.Shop),
        renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
        renderCell: ({ row }: GridRowModel) => <Text isCell text={row.product?.shop?.name} />,
        valueGetter: (row: GridRowModel) => row?.product?.shop?.name,
        width: 120,
        disableCustomSort: true,
        sortOptions: 'asc',
        columnKey: columnnsKeys.shared.OBJECT_VALUE,
        table: DataGridFilterTables.PRODUCTS,
      }
    : null

  const columns: IGridColumn[] = [
    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: ({ row }) => (
        <ActionButtonsCell
          row
          showFirst
          showSecond
          secondDanger
          firstGhost
          secondGhost
          firstIcon={<MdOutlineEdit size={16} />}
          secondDisabled={row.listingLaunches.length > 0}
          secondIcon={<MdOutlineDelete size={16} />}
          secondConfirmText="Are you sure you want to remove the report?"
          onClickFirst={() => onToggleReportModalEditMode(row._id)}
          onClickSecond={() => onClickRemoveReport(row._id)}
        />
      ),
      disableExport: true,
      disableCustomSort: true,
      disableColumnMenu: true,
      filterable: false,
      width: 95,
    },

    shopColumn as IGridColumn,
    asinColumn as IGridColumn,

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: ({ row }) => <NormDateCell value={row.createdAt} />,
      valueGetter: (row: GridRowModel) => formatShortDateTime(row?.createdAt),
      width: 100,
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'launchType',
      headerName: t(TranslationKey['Launch type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Launch type'])} />,
      renderCell: ({ row }) => <Launches isCell launches={row.listingLaunches || []} />,
      valueGetter: (launch: GridRowModel) =>
        `${getLaunchName(launch?.type, launch?.showShortName ?? true)} - ${launch?.value}%`,
      width: 330,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'newProductPrice',
      headerName: t(TranslationKey['New product price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['New product price'])} />,
      renderCell: ({ row }) => <Text isCell text={String(toFixedWithDollarSign(row.newProductPrice))} />,
      width: 140,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'createdBy',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,
      renderCell: ({ row }) => (
        <UserMiniCell userName={row.sub?.name || row.createdBy?.name} userId={row.sub?._id || row.createdBy?._id} />
      ),
      valueGetter: (row: GridRowModel) => row?.sub?.name || row?.createdBy?.name,

      fields: [
        {
          label: 'Master user',
          value: 0,
        },
        {
          label: 'Sub user',
          value: 1,
        },
      ],

      columnMenuConfig: [
        {
          field: 'createdBy',
          table: DataGridFilterTables.PRODUCT_LISTING_REPORTS,
          sortOptions: 'asc',
          columnKey: ColumnMenuKeys.OBJECT,
          hideEmptyObject: true,
        },

        {
          field: 'sub',
          table: DataGridFilterTables.PRODUCT_LISTING_REPORTS,
          sortOptions: 'asc',
          columnKey: ColumnMenuKeys.OBJECT,
          hideEmptyObject: true,
        },
      ],

      width: 180,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.MULTIPLE,
    },

    {
      field: 'subUsers',
      headerName: t(TranslationKey['Access to product']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Access to product'])} />,
      renderCell: params => {
        const subUsers = params.row?.product?.subUsers || []
        const subUsersByShop = params.row?.product?.subUsersByShop || []

        return <ManyUserLinkCell usersData={subUsers?.concat(subUsersByShop)} />
      },
      valueGetter: (row: GridRowModel) => {
        const subUsers = row?.product?.subUsers || []
        const subUsersByShop = row?.product?.subUsersByShop || []

        return subUsers
          ?.concat(subUsersByShop)
          ?.map((user: IFullUser) => user?.name)
          .join(', ')
      },
      width: 187,
      filterable: false,
      disableCustomSort: true,
      table: DataGridFilterTables.PRODUCTS,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'description',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
      renderCell: ({ row }) => <Text isCell text={row.description} />,
      flex: 1,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }) => <NormDateCell value={row.updatedAt} />,
      valueGetter: (row: GridRowModel) => formatShortDateTime(row?.updatedAt),
      width: 105,
      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  const filteredColumns = columns.filter(column => column)

  for (const column of filteredColumns) {
    if (!column.table) {
      column.table = DataGridFilterTables.PRODUCT_LISTING_REPORTS
    }

    column.sortable = false
  }

  return filteredColumns
}
