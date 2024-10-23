import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, UserCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const campaignsColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    // {
    //   field: 'updatedAt',
    //   headerName: t(TranslationKey.Updated),
    //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    //   renderCell: params => <NormDateCell value={params.value} />,
    //   width: 120,

    //   columnKey: columnnsKeys.shared.DATE,
    // },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <Text isCell text={params.row?.shop?.name} />,
      width: 90,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'client',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: params => (
        <UserCell name={params.row.client?.name} id={params.row.client?._id} email={params.row.client?.email} />
      ),
      width: 110,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'state',
      headerName: 'State',
      renderHeader: () => <MultilineTextHeaderCell text="State" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'status',
      headerName: 'Status',
      renderHeader: () => <MultilineTextHeaderCell text="Status" />,

      renderCell: params => <Text isCell text={params.value?.replaceAll?.(/_/g, ' ')} />,
      transformValueMethod: value => value?.replaceAll?.(/_/g, ' '),
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'type',
      headerName: 'Type',
      renderHeader: () => <MultilineTextHeaderCell text="Type" />,

      renderCell: params => <Text isCell text={params.value?.replace?.(/_/g, ' ')} />,
      transformValueMethod: value => value?.replace?.(/_/g, ' '),
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'targeting',
      headerName: 'Targeting',
      renderHeader: () => <MultilineTextHeaderCell text="Targeting" />,

      renderCell: params => <Text isCell text={params.value?.replace?.(/_/g, ' ')} />,
      transformValueMethod: value => value?.replace?.(/_/g, ' '),
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'campaignBiddingStrategy',
      headerName: 'Campaign bidding strategy',
      renderHeader: () => <MultilineTextHeaderCell text="Campaign bidding strategy" />,

      renderCell: params => <Text isCell text={params.value?.replace?.(/_/g, ' ')} />,
      transformValueMethod: value => value?.replace?.(/_/g, ' '),
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'startDate',
      headerName: 'Start date',
      renderHeader: () => <MultilineTextHeaderCell text="Start date" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'endDate',
      headerName: 'End date',
      renderHeader: () => <MultilineTextHeaderCell text="End date" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'budgetUsd',
      headerName: 'Budget USD',
      renderHeader: () => <MultilineTextHeaderCell text="Budget USD" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'costType',
      headerName: 'Cost type',
      renderHeader: () => <MultilineTextHeaderCell text="Cost type" />,

      renderCell: params => <Text isCell text={params.value?.replace?.(/_/g, ' ')} />,
      transformValueMethod: value => value?.replace?.(/_/g, ' '),
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'impressions',
      headerName: 'Impressions',
      renderHeader: () => <MultilineTextHeaderCell text="Impressions" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'clicks',
      headerName: 'Clicks',
      renderHeader: () => <MultilineTextHeaderCell text="Clicks" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ctr',
      headerName: 'CTR',
      renderHeader: () => <MultilineTextHeaderCell text="CTR" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'spentUsd',
      headerName: 'Spent USD',
      renderHeader: () => <MultilineTextHeaderCell text="Spent USD" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'cpcUsd',
      headerName: 'CPC USD',
      renderHeader: () => <MultilineTextHeaderCell text="CPC USD" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'orders',
      headerName: 'Orders',
      renderHeader: () => <MultilineTextHeaderCell text="Orders" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'acos',
      headerName: 'ACOS',
      renderHeader: () => <MultilineTextHeaderCell text="ACOS" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'roas',
      headerName: 'ROAS',
      renderHeader: () => <MultilineTextHeaderCell text="ROAS" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ntbOrders',
      headerName: 'NTB orders',
      renderHeader: () => <MultilineTextHeaderCell text="NTB orders" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'percentageOfOrdersNtb',
      headerName: 'Percentage of orders NTB',
      renderHeader: () => <MultilineTextHeaderCell text="Percentage of orders NTB" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ntbSalesUsd',
      headerName: 'NTB sales USD',
      renderHeader: () => <MultilineTextHeaderCell text="NTB sales USD" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'percentageOfSalesNtb',
      headerName: 'Percentage of sales NTB',
      renderHeader: () => <MultilineTextHeaderCell text="Percentage of sales NTB" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'viewableImpressions',
      headerName: 'Viewable impressions',
      renderHeader: () => <MultilineTextHeaderCell text="Viewable impressions" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'vcpmUsd',
      headerName: 'VCPM USD',
      renderHeader: () => <MultilineTextHeaderCell text="VCPM USD" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'videoFirstQuartile',
      headerName: 'Video first quartile',
      renderHeader: () => <MultilineTextHeaderCell text="Video first quartile" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'videoMidpoint',
      headerName: 'Video midpoint',
      renderHeader: () => <MultilineTextHeaderCell text="Video midpoint" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'videoThirdQuartile',
      headerName: 'Video third quartile',
      renderHeader: () => <MultilineTextHeaderCell text="Video third quartile" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'videoComplete',
      headerName: 'Video complete',
      renderHeader: () => <MultilineTextHeaderCell text="Video complete" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'videoUnmute',
      headerName: 'Video unmute',
      renderHeader: () => <MultilineTextHeaderCell text="Video unmute" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'vtr',
      headerName: 'VTR',
      renderHeader: () => <MultilineTextHeaderCell text="VTR" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'vctr',
      headerName: 'VCTR',
      renderHeader: () => <MultilineTextHeaderCell text="VCTR" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.CAMPAIGNS
    }

    column.sortable = false
  }

  return columns
}
