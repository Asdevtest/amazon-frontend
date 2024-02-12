import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
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
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const myRequestsViewColumns = (rowHandlers, getColumnMenuSettings, getOnHover) => [
  {
    field: 'priority',
    headerName: t(TranslationKey.Priority),
    renderHeader: params => (
      <MultilineTextHeaderCell
        component={<img src="/assets/icons/bookmark.svg" />}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    width: 80,
    renderCell: params => (
      <PriorityAndChinaDeliverCell
        isRequest
        priority={params.row.originalData.priority}
        chinaDelivery={params.row.originalData.expressChinaDelivery}
        status={params.row.originalData.status}
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
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Title)}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={140} text={params.value} />,
    width: 160,

    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'shopId',
    headerName: t(TranslationKey.Shop),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Shop)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineTextCell twoLines text={params.value} />,
    width: 90,
    sortable: false,

    columnKey: columnnsKeys.client.INVENTORY_SHOPS,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Product)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={
          getColumnMenuSettings()?.asin?.currentFilterData?.length ||
          getColumnMenuSettings()?.skuByClient?.currentFilterData?.length ||
          getColumnMenuSettings()?.amazonTitle?.currentFilterData?.length
        }
      />
    ),

    renderCell: params => {
      const product = params.row.originalData.product

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
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.ID)}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

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
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Waiting for checks'])}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        // isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    type: 'number',
    align: 'center',
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,

    // columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey['Created by']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
        text={t(TranslationKey['Created by'])}
      />
    ),

    renderCell: params => (
      <UserLinkCell
        blackText
        name={
          params.row.originalData?.sub ? params.row.originalData?.sub?.name : params.row.originalData?.createdBy?.name
        }
        userId={
          params.row.originalData?.sub ? params.row.originalData?.sub?._id : params.row.originalData?.createdBy?._id
        }
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

    renderCell: params => <ManyUserLinkCell usersData={params.row.originalData?.product?.subUsers} />,
    width: 187,

    filterable: false,
    sortable: false,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'announcementCreatedBy',
    headerName: t(TranslationKey['Service representative']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
        text={t(TranslationKey['Service representative'])}
      />
    ),

    renderCell: params => (
      <UserLinkCell
        blackText
        name={params.row.originalData?.announcement?.createdBy.name}
        userId={params.row.originalData?.announcement?.createdBy._id}
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
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Request type'])}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell text={params.row.spec?.title} />,
    width: 90,
    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'price',
    headerName: t(TranslationKey.Cost),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Cost)}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 115,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'uploadedToListing',
    headerName: t(TranslationKey['Uploaded by on listing']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Uploaded by on listing'])}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={
          !getColumnMenuSettings()?.onListingFiltersData?.onListing ||
          !getColumnMenuSettings()?.onListingFiltersData?.notOnListing
        }
      />
    ),

    renderCell: params => (
      <CheckboxCell
        disabled
        checked={params.value}
        onClick={() => rowHandlers.onToggleUploadedToListing(params.row.originalData._id, params.value)}
      />
    ),
    width: 115,
    columnKey: columnnsKeys.client.FREELANCER_REQUEST_LISTING,
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Deadline)}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
      />
    ),

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 100,
    // type: 'date',
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Updated)}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 100,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Created)}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 100,
    columnKey: columnnsKeys.shared.DATE,
  },
]
