import { ColumnMenuKeys } from '@constants/data-grid/column-menu-keys'
import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import {
  colorByDifficultyLevel,
  difficultyLevelByCode,
  difficultyLevelTranslate,
} from '@constants/statuses/difficulty-level'
import { MIDDLE_COMMENT_VALUE } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  CheckboxCell,
  ManyUserLinkCell,
  MultilineTextHeaderCell,
  NormDateCell,
  PriorityAndChinaDeliverCell,
  ProductCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

export const myRequestsViewColumns = rowHandlers => {
  const columns = [
    {
      field: 'priority',
      headerName: t(TranslationKey.Priority),
      renderHeader: () => <MultilineTextHeaderCell component={<img src="/assets/icons/bookmark.svg" />} />,
      width: 80,
      renderCell: params => (
        <PriorityAndChinaDeliverCell
          isRequest
          priority={params.row.priority}
          chinaDelivery={params.row.expressChinaDelivery}
          status={params.row.status}
          onClickOpenInNewTab={() => rowHandlers.onClickOpenInNewTab(params.row._id)}
        />
      ),

      filterable: false,
      columnKey: columnnsKeys.client.FREELANCE_REQUESTS_PRIORITY,
    },

    {
      field: 'taskComplexity',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Category)} />,
      headerName: t(TranslationKey.Category),

      renderCell: params => (
        <Text
          isCell
          text={difficultyLevelTranslate(difficultyLevelByCode[params.value])}
          color={colorByDifficultyLevel(difficultyLevelByCode[params.value])}
        />
      ),
      transformValueMethod: status => difficultyLevelTranslate(difficultyLevelByCode[status]),

      width: 95,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'title',
      headerName: t(TranslationKey.Title),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
      renderCell: params => <Text isCell text={params.value} />,
      width: 160,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'shopId',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <Text isCell text={params.row?.product?.shop?.name} />,
      width: 90,
      sortOptions: 'asc',
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      table: DataGridFilterTables.PRODUCTS,
      disableCustomSort: true,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

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
      width: 170,
    },

    {
      field: 'xid',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

      renderCell: params => <Text isCell text={params.value} />,
      type: 'number',
      width: 80,

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

      renderCell: params => (
        <Text isCell text={MyRequestStatusTranslate(params.value)} color={colorByStatus(params.value)} />
      ),
      width: 120,
      filterable: false,
      transformValueMethod: MyRequestStatusTranslate,
      columnKey: columnnsKeys.shared.STRING_VALUE,

      disableCustomSort: true,
    },

    {
      field: 'waitedProposals',
      headerName: t(TranslationKey['Waiting for checks']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Waiting for checks'])} />,
      type: 'number',
      align: 'center',
      renderCell: params => <Text isCell center text={params.row.countProposalsByStatuses.waitedProposals} />,
      width: 120,

      // columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'freelanceNotices',
      headerName: t(TranslationKey['Unread messages']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Unread messages'])} />,
      type: 'number',
      align: 'center',
      renderCell: params => <Text isCell center text={params.value} />,
      width: 130,
    },

    {
      field: 'createdBy',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: params => (
        <UserCell
          name={params.row.sub?.name || params.row.createdBy?.name}
          id={params.row.sub?._id || params.row.createdBy?._id}
          email={params.row.sub?.email || params.row.createdBy?.email}
        />
      ),
      width: 110,

      filterable: false,
      disableCustomSort: true,
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
          table: DataGridFilterTables.REQUESTS,
          columnKey: ColumnMenuKeys.OBJECT,
          sortOptions: 'asc',
        },

        {
          field: 'sub',
          table: DataGridFilterTables.REQUESTS,
          columnKey: ColumnMenuKeys.OBJECT,
          sortOptions: 'asc',
        },
      ],
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

      valueGetter: ({ row }) => {
        const subUsers = row?.product?.subUsers || []
        const subUsersByShop = row?.product?.subUsersByShop || []
        return subUsers?.concat(subUsersByShop).join(', ')
      },

      width: 187,
      filterable: false,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,

      disableCustomSort: true,
    },

    {
      field: 'announcementCreatedBy',
      headerName: t(TranslationKey['Service representative']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Service representative'])} />,

      renderCell: params => (
        <UserCell
          name={params.row.announcement?.createdBy.name}
          id={params.row.announcement?.createdBy._id}
          email={params.row.announcement?.createdBy.email}
        />
      ),
      width: 160,

      filterable: false,

      columnKey: columnnsKeys.shared.OBJECT,
      disableCustomSort: true,
    },

    {
      field: 'announcement',
      headerName: t(TranslationKey['Service name']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Service name'])} />,
      renderCell: params => <Text isCell text={params.row.announcement?.title} />,
      width: 200,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'spec',
      headerName: t(TranslationKey['Request type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
      renderCell: params => <Text isCell text={params.row.spec?.title} />,
      width: 110,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'price',
      headerName: t(TranslationKey.Cost),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Cost)} />,

      renderCell: params => <Text isCell text={toFixedWithDollarSign(params.value, 2)} />,
      width: 115,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'uploadedToListing',
      headerName: t(TranslationKey['Uploaded by on listing']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Uploaded by on listing'])} />,

      renderCell: params => (
        <CheckboxCell
          disabled
          checked={params.value}
          onClick={() => rowHandlers.onToggleUploadedToListing(params.row._id, params.value)}
        />
      ),
      width: 115,
      columnKey: columnnsKeys.client.FREELANCER_REQUEST_LISTING,
    },

    {
      field: 'timeoutAt',
      headerName: t(TranslationKey.Deadline),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 100,

      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'note',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
      width: 335,
      renderCell: ({ row }) => (
        <Text
          isCell
          editMode
          maxTextareaLength={MIDDLE_COMMENT_VALUE}
          text={row?.detailsCustom?.comment}
          onClickSubmit={comment => rowHandlers.onClickSaveComment(row?._id, comment)}
        />
      ),
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE_VALUE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.REQUESTS
    }
    column.sortable = false
    column.filterable = false
  }

  return columns
}
