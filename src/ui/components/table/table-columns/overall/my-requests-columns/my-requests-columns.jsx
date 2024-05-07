import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import {
  colorByDifficultyLevel,
  difficultyLevelByCode,
  difficultyLevelTranslate,
} from '@constants/statuses/difficulty-level'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  CheckboxCell,
  ManyUserLinkCell,
  MultilineRequestStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  PriorityAndChinaDeliverCell,
  ProductAsinCell,
  ShortDateCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

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
      sortable: false,

      columnKey: columnnsKeys.client.FREELANCE_REQUESTS_PRIORITY,
    },

    {
      field: 'taskComplexity',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Difficulty level'])} />,
      headerName: t(TranslationKey['Difficulty level']),

      renderCell: params => (
        <MultilineTextCell
          text={difficultyLevelTranslate(difficultyLevelByCode[params.value])}
          customTextStyles={{
            color: colorByDifficultyLevel(difficultyLevelByCode[params.value]),
            fontWeight: 600,
          }}
        />
      ),
      width: 95,
      columnKey: columnnsKeys.shared.TASK_COMPLEXITY,
    },

    {
      field: 'title',
      headerName: t(TranslationKey.Title),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
      renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={140} text={params.value} />,
      width: 160,

      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'shopId',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <MultilineTextCell twoLines text={params.row?.shop?.name} />,
      width: 90,
      sortable: false,

      columnKey: columnnsKeys.client.INVENTORY_SHOPS,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.Product),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

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
      width: 270,

      filterable: false,
      sortable: false,

      columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
    },

    {
      field: 'humanFriendlyId',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

      renderCell: params => <MultilineTextCell text={params.value} />,
      type: 'number',
      width: 62,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

      renderCell: params => <MultilineRequestStatusCell status={params.value} />,
      width: 120,
      filterable: false,
      sortable: false,

      columnKey: columnnsKeys.client.FREELANCE_MY_REQUESTS,
    },

    {
      field: 'waitedProposals',
      headerName: t(TranslationKey['Waiting for checks']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Waiting for checks'])} />,
      type: 'number',
      align: 'center',
      renderCell: params => <MultilineTextCell text={params.row.countProposalsByStatuses.waitedProposals} />,
      width: 120,

      // columnKey: columnnsKeys.shared.QUANTITY,
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
      sortable: false,

      columnKey: columnnsKeys.client.FREELANCE_REQUESTS_CREATED_BY,
    },

    {
      field: 'subUsers',
      headerName: t(TranslationKey['Access to product']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Access to product'])} />,

      renderCell: params => <ManyUserLinkCell usersData={params.row.product?.subUsers} />,
      width: 187,

      filterable: false,
      sortable: false,

      columnKey: columnnsKeys.shared.OBJECT,
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
      sortable: false,

      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'spec',
      headerName: t(TranslationKey['Request type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
      renderCell: params => <MultilineTextCell threeLines text={params.row.spec?.title} />,
      width: 110,
      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'price',
      headerName: t(TranslationKey.Cost),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Cost)} />,

      renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
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

      renderCell: params => <ShortDateCell value={params.value} />,
      width: 100,
      // type: 'date',
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      renderCell: params => <ShortDateCell value={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

      renderCell: params => <ShortDateCell value={params.value} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  for (const column of columns) {
    column.table = DataGridFilterTables.REQUESTS
  }

  return columns
}
