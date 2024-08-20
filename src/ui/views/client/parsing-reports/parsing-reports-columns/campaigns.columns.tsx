import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, TextCell, UserLinkCell } from '@components/data-grid/data-grid-cells'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const campaignsColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    {
      field: 'dateUpdated',
      headerName: 'Date updated',
      renderHeader: () => <MultilineTextHeaderCell text="Date updated" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <TextCell text={params.row?.shop?.name} />,
      width: 90,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'client',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: params => <UserLinkCell blackText name={params.row.client?.name} userId={params.row.client?._id} />,
      width: 110,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'state',
      headerName: 'State',
      renderHeader: () => <MultilineTextHeaderCell text="State" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'status',
      headerName: 'Status',
      renderHeader: () => <MultilineTextHeaderCell text="Status" />,

      renderCell: params => <TextCell text={params.value?.replaceAll?.(/_/g, ' ')} />,
      transformValueMethod: value => value?.replaceAll?.(/_/g, ' '),
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'type',
      headerName: 'Type',
      renderHeader: () => <MultilineTextHeaderCell text="Type" />,

      renderCell: params => <TextCell text={params.value?.replace?.(/_/g, ' ')} />,
      transformValueMethod: value => value?.replace?.(/_/g, ' '),
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'targeting',
      headerName: 'Targeting',
      renderHeader: () => <MultilineTextHeaderCell text="Targeting" />,

      renderCell: params => <TextCell text={params.value?.replace?.(/_/g, ' ')} />,
      transformValueMethod: value => value?.replace?.(/_/g, ' '),
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'campaignBiddingStrategy',
      headerName: 'Campaign bidding strategy',
      renderHeader: () => <MultilineTextHeaderCell text="Campaign bidding strategy" />,

      renderCell: params => <TextCell text={params.value?.replace?.(/_/g, ' ')} />,
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
      headerName: 'Budget usd',
      renderHeader: () => <MultilineTextHeaderCell text="Budget usd" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'costType',
      headerName: 'Cost type',
      renderHeader: () => <MultilineTextHeaderCell text="Cost type" />,

      renderCell: params => <TextCell text={params.value?.replace?.(/_/g, ' ')} />,
      transformValueMethod: value => value?.replace?.(/_/g, ' '),
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'impressions',
      headerName: 'Impressions',
      renderHeader: () => <MultilineTextHeaderCell text="Impressions" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'clicks',
      headerName: 'Clicks',
      renderHeader: () => <MultilineTextHeaderCell text="Clicks" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ctr',
      headerName: 'Ctr',
      renderHeader: () => <MultilineTextHeaderCell text="Ctr" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'spentUsd',
      headerName: 'Spent usd',
      renderHeader: () => <MultilineTextHeaderCell text="Spent usd" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'cpcUsd',
      headerName: 'Cpc usd',
      renderHeader: () => <MultilineTextHeaderCell text="Cpc usd" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'orders',
      headerName: 'Orders',
      renderHeader: () => <MultilineTextHeaderCell text="Orders" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'acos',
      headerName: 'Acos',
      renderHeader: () => <MultilineTextHeaderCell text="Acos" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'roas',
      headerName: 'Roas',
      renderHeader: () => <MultilineTextHeaderCell text="Roas" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ntbOrders',
      headerName: 'Ntb orders',
      renderHeader: () => <MultilineTextHeaderCell text="Ntb orders" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'percentageOfOrdersNtb',
      headerName: 'Percentage of orders ntb',
      renderHeader: () => <MultilineTextHeaderCell text="Percentage of orders ntb" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'ntbSalesUsd',
      headerName: 'Ntb sales usd',
      renderHeader: () => <MultilineTextHeaderCell text="Ntb sales usd" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'percentageOfSalesNtb',
      headerName: 'Percentage of sales ntb',
      renderHeader: () => <MultilineTextHeaderCell text="Percentage of sales ntb" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'viewableImpressions',
      headerName: 'Viewable impressions',
      renderHeader: () => <MultilineTextHeaderCell text="Viewable impressions" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'vcpmUsd',
      headerName: 'Vcpm usd',
      renderHeader: () => <MultilineTextHeaderCell text="Vcpm usd" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'videoFirstQuartile',
      headerName: 'Video first quartile',
      renderHeader: () => <MultilineTextHeaderCell text="Video first quartile" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'videoMidpoint',
      headerName: 'Video midpoint',
      renderHeader: () => <MultilineTextHeaderCell text="Video midpoint" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'videoThirdQuartile',
      headerName: 'Video third quartile',
      renderHeader: () => <MultilineTextHeaderCell text="Video third quartile" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'videoComplete',
      headerName: 'Video complete',
      renderHeader: () => <MultilineTextHeaderCell text="Video complete" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'videoUnmute',
      headerName: 'Video unmute',
      renderHeader: () => <MultilineTextHeaderCell text="Video unmute" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'vtr',
      headerName: 'Vtr',
      renderHeader: () => <MultilineTextHeaderCell text="Vtr" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'vctr',
      headerName: 'Vctr',
      renderHeader: () => <MultilineTextHeaderCell text="Vctr" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
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
