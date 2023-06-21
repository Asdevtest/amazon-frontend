import React from 'react'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
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

export const myRequestsViewColumns = (rowHandlers, getColumnMenuSettings, getOnHover, onListingFiltersData) => [
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
    width: 60,
    renderCell: params => (
      <PriorityAndChinaDeliverCell
        isRequest
        priority={params.row.originalData.priority}
        chinaDelivery={params.row.originalData.expressChinaDelivery}
        status={params.row.originalData.status}
      />
    ),

    filterable: false,
    sortable: false,

    columnKey: columnnsKeys.client.FREELANCE_REQUESTS_PRIORITY,
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
          getColumnMenuSettings()?.skusByClient?.currentFilterData?.length ||
          getColumnMenuSettings()?.amazonTitle?.currentFilterData?.length
        }
      />
    ),

    renderCell: params => {
      const product = params.row.originalData.product

      return (
        <ProductAsinCell
          image={product?.images?.slice()[0]}
          amazonTitle={product?.amazonTitle}
          asin={product?.asin}
          skusByClient={product?.skusByClient?.slice()[0]}
        />
      )
    },
    width: 300,

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
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Status)}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineRequestStatusCell /* languageTag={languageTag} */ status={params.value} />,
    width: 161,
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
    renderHeader: params => (
      <MultilineTextHeaderCell
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
        text={t(TranslationKey['Access to product'])}
      />
    ),

    renderCell: params => <ManyUserLinkCell usersData={params.row.originalData?.product?.subUsers} />,
    width: 187,

    filterable: false,
    sortable: false,

    columnKey: columnnsKeys.shared.OBJECT,
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

    renderCell: params => (
      <MultilineTextCell withTooltip leftAlign threeLines={params.value.length > 50} text={params.value} />
    ),
    width: 228,

    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'typeTask',
    headerName: t(TranslationKey['Request type']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Request type'])}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => (
      <MultilineTextCell leftAlign text={freelanceRequestTypeTranslate(freelanceRequestTypeByCode[params.value])} />
    ),
    width: 146,
    columnKey: columnnsKeys.client.FREELANCE_REQUEST_TYPE_MY,
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
    width: 115,
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
    width: 117,
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
    width: 117,
    columnKey: columnnsKeys.shared.DATE,
  },
]
