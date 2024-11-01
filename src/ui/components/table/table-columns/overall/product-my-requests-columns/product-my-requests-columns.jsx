import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

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
    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'xid',
    headerName: 'ID',
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={'ID'}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <Text isCell text={String(params.value)} />,
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
    renderCell: params => (
      <Text isCell text={MyRequestStatusTranslate(params.value)} color={colorByStatus(params.value)} />
    ),
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
    renderCell: params => <Text isCell text={params.value} />,
    width: 390,
    columnKey: columnnsKeys.shared.STRING,
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
    renderCell: params => <Text isCell text={params.row.spec?.title} />,
    width: 110,
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
    renderCell: params => <Text isCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 115,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'executor',
    headerName: t(TranslationKey.Executor),
    renderHeader: params => <MultilineTextHeaderCell text={t(TranslationKey.Executor)} />,
    renderCell: params => (
      <UserCell name={params.row.executor?.name} id={params.row.executor?._id} email={params.row.executor?.email} />
    ),
    width: 160,
    columnKey: columnnsKeys.shared.OBJECT_VALUE,
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    width: 115,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'allProposals',
    headerName: t(TranslationKey['Total proposals']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total proposals'])} />,
    renderCell: params => <Text isCell text={params.value} />,
    width: 115,
  },

  {
    field: 'acceptedProposals',
    headerName: t(TranslationKey.Accepted),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Accepted)} />,
    renderCell: params => <Text isCell text={params.value} />,
    width: 90,
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    renderCell: params => {
      const secondDisabled =
        !params.row.countProposalsByStatuses.acceptedProposals &&
        !params.row.countProposalsByStatuses.atWorkProposals &&
        !params.row.countProposalsByStatuses.verifyingProposals

      return (
        <ActionButtonsCell
          showFirst
          showSecond
          firstContent={t(TranslationKey['Open a request'])}
          secondContent={t(TranslationKey['Open result'])}
          secondDisabled={secondDisabled}
          onClickFirst={() => handlers.onClickOpenRequest(params.row._id)}
          onClickSecond={() => handlers.onClickOpenResult(params.row)}
        />
      )
    },
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    width: 200,
  },
]
