import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineRequestStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ShortDateCell,
} from '@components/data-grid/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

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
    field: 'spec',
    headerName: t(TranslationKey['Request type']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey['Request type'])}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell threeLines text={params.row.spec?.title} />,
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
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 115,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    renderCell: params => <ShortDateCell value={params.value} />,
    width: 115,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'allProposals',
    headerName: t(TranslationKey['Total proposals']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total proposals'])} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 115,
  },

  {
    field: 'acceptedProposals',
    headerName: t(TranslationKey.Accepted),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Accepted)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 90,
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    renderCell: params => {
      const disableSecondButton =
        !params.row.originalData.countProposalsByStatuses.acceptedProposals &&
        !params.row.originalData.countProposalsByStatuses.atWorkProposals &&
        !params.row.originalData.countProposalsByStatuses.verifyingProposals

      return (
        <ActionButtonsCell
          isFirstButton
          isSecondButton
          firstButtonElement={t(TranslationKey['Open a request'])}
          firstButtonStyle={ButtonStyle.PRIMARY}
          secondButtonElement={t(TranslationKey['Open result'])}
          secondButtonStyle={ButtonStyle.SUCCESS}
          disabledSecondButton={disableSecondButton}
          onClickFirstButton={() => handlers.onClickOpenRequest(params.row.originalData._id)}
          onClickSecondButton={() => handlers.onClickOpenResult(params.row.originalData)}
        />
      )
    },
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    width: 200,
  },
]
