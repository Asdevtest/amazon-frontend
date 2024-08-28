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
  TextCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

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
        <TextCell
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
      renderCell: params => <TextCell text={params.value} />,
      width: 160,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'shopId',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <TextCell text={params.row?.product?.shop?.name} />,
      width: 90,
      columnKey: columnnsKeys.client.INVENTORY_SHOPS,
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
      field: 'humanFriendlyId',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

      renderCell: params => <TextCell text={params.value} />,
      type: 'number',
      width: 80,

      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

      renderCell: params => (
        <TextCell text={MyRequestStatusTranslate(params.value)} color={colorByStatus(params.value)} />
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
      renderCell: params => <TextCell center text={params.row.countProposalsByStatuses.waitedProposals} />,
      width: 120,

      // columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'freelanceNotices',
      headerName: t(TranslationKey['Unread messages']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Unread messages'])} />,
      type: 'number',
      align: 'center',
      renderCell: params => <TextCell center text={params.value} />,
      width: 130,
    },

    {
      field: 'createdBy',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: params => (
        <UserLinkCell
          blackText
          name={params.row.sub ? params.row.sub?.name : params.row.createdBy?.name}
          userId={params.row.sub ? params.row.sub?._id : params.row.createdBy?._id}
        />
      ),
      width: 110,

      filterable: false,

      columnKey: columnnsKeys.client.FREELANCE_REQUESTS_CREATED_BY,
      disableCustomSort: true,
    },

    {
      field: 'subUsers',
      headerName: t(TranslationKey['Access to product']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Access to product'])} />,

      renderCell: params => <ManyUserLinkCell usersData={params.row.product?.subUsers} />,
      width: 187,

      filterable: false,

      columnKey: columnnsKeys.shared.OBJECT,
      disableCustomSort: true,
    },

    {
      field: 'announcementCreatedBy',
      headerName: t(TranslationKey['Service representative']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Service representative'])} />,

      renderCell: params => (
        <UserLinkCell
          blackText
          name={params.row.announcement?.createdBy.name}
          userId={params.row.announcement?.createdBy._id}
        />
      ),
      width: 160,

      filterable: false,

      columnKey: columnnsKeys.shared.OBJECT,
      disableCustomSort: true,
    },

    {
      field: 'spec',
      headerName: t(TranslationKey['Request type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
      renderCell: params => <TextCell text={params.row.spec?.title} />,
      width: 110,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'price',
      headerName: t(TranslationKey.Cost),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Cost)} />,

      renderCell: params => <TextCell text={toFixedWithDollarSign(params.value, 2)} />,
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
      // type: 'date',
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'note',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
      width: 335,
      renderCell: ({ row }) => (
        <TextCell
          editMode
          maxLength={MIDDLE_COMMENT_VALUE}
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
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.REQUESTS
    }
    column.sortable = false
  }

  return columns
}
