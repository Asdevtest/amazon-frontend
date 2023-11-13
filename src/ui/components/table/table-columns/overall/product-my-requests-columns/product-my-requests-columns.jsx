import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineRequestStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductMyRequestsBtnsCell,
  ShortDateCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const productMyRequestsViewColumns = (handlers, getColumnMenuSettings, getOnHover) => [
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
    width: 120,
    headerAlign: 'center',

    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'humanFriendlyId',
    headerName: 'ID',
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={'ID'}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell text={String(params.value)} />,
    width: 65,

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
    renderCell: params => <MultilineRequestStatusCell status={params.value} />,
    width: 140,

    columnKey: columnnsKeys.client.FREELANCE_MY_REQUESTS,
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
    renderCell: params => <MultilineTextCell leftAlign text={params.value} />,
    width: 390,

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
    width: 140,

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
    type: 'number',
    width: 115,
    headerAlign: 'center',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    renderCell: params => <ShortDateCell value={params.value} />,
    width: 115,
    headerAlign: 'center',

    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'allProposals',
    headerName: t(TranslationKey['Total proposals']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total proposals'])} />, // ПРИМЕР МНОГОСТРОЧНОГО ХЕДЕРА
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 115,
    headerAlign: 'center',
  },

  {
    field: 'acceptedProposals',
    headerName: t(TranslationKey.Accepted),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Accepted)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 90,
    headerAlign: 'center',
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    renderCell: params => <ProductMyRequestsBtnsCell data={params.row.originalData} handlers={handlers} />,
    filterable: false,
    sortable: false,
    flex: 1,
  },
]
