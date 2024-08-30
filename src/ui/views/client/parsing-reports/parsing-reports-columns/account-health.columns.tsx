import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, UserLinkCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const accountHealthColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'accountHealth',
      headerName: 'Account health',
      renderHeader: () => <MultilineTextHeaderCell text="Account health" />,

      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'suspectedIntPropViolations',
      headerName: 'Suspected int prop violations',
      renderHeader: () => <MultilineTextHeaderCell text="Suspected int prop violations" />,

      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'receivedIntPropComplaints',
      headerName: 'Received int prop complaints',
      renderHeader: () => <MultilineTextHeaderCell text="Received int prop complaints" />,

      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'productAuthenticityCustomerComplaints',
      headerName: 'Product authenticity customer complaints',
      renderHeader: () => <MultilineTextHeaderCell text="Product authenticity customer complaints" />,

      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      width: 180,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'productConditionCustomerComplaints',
      headerName: 'Product condition customer complaints',
      renderHeader: () => <MultilineTextHeaderCell text="Product condition customer complaints" />,

      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      width: 140,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'foodAndProductSafetyIssues',
      headerName: 'Food and product safety issues',
      renderHeader: () => <MultilineTextHeaderCell text="Food and product safety issues" />,

      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      width: 140,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'listingPolicyViolations',
      headerName: 'Listing policy violations',
      renderHeader: () => <MultilineTextHeaderCell text="Listing policy violations" />,

      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      width: 140,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'restrictedProductPolicyViolations',
      headerName: 'Restricted product policy violations',
      renderHeader: () => <MultilineTextHeaderCell text="Restricted product policy violations" />,

      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'customerProductReviewsPolicyViolations',
      headerName: 'Customer product reviews policy violations',
      renderHeader: () => <MultilineTextHeaderCell text="Customer product reviews policy violations" />,

      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      width: 190,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'otherPolicyViolations',
      headerName: 'Other policy violations',
      renderHeader: () => <MultilineTextHeaderCell text="Other policy violations" />,

      renderCell: params => <Text isCell text={toFixed(params.value, 2)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
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

      renderCell: params => <UserLinkCell blackText name={params.row.client?.name} userId={params.row.client?._id} />,
      width: 110,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.ACCOUNT_HEALTH
    }

    column.sortable = false
  }

  return columns
}
