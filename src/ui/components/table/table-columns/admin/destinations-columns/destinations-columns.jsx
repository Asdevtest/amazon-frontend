import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'
import { CrossIcon, EditIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const destinationsColumns = handlers => [
  {
    field: 'storekeeper',
    headerName: t(TranslationKey.Account),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Account)} />,

    width: 150,
    renderCell: params => (
      <UserLinkCell
        name={params?.row?.originalData?.storekeeper?.name}
        userId={params?.row?.originalData?.storekeeper?._id}
      />
    ),
  },

  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    width: 240,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'country',
    headerName: t(TranslationKey.Country),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Country)} />,

    width: 120,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'zipCode',
    headerName: t(TranslationKey['ZIP code']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ZIP code'])} />,

    width: 100,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'city',
    headerName: t(TranslationKey.City),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.City)} />,

    width: 140,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'state',
    headerName: t(TranslationKey.State),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.State)} />,

    width: 150,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'address',
    headerName: t(TranslationKey.Address),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Address)} />,

    width: 350,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    width: 130,
    renderCell: params => (
      <ActionButtonsCell
        isFirstButton
        isSecondButton
        iconButton
        row
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        firstButtonTooltipText={t(TranslationKey.Edit)}
        firstButtonElement={<EditIcon />}
        firstButtonStyle={ButtonStyle.PRIMARY}
        secondButtonTooltipText={t(TranslationKey.Remove)}
        secondButtonElement={<CrossIcon />}
        secondButtonStyle={ButtonStyle.DANGER}
        onClickFirstButton={() => handlers.onClickEditBtn(params.row.originalData)}
        onClickSecondButton={() => handlers.onClickRemoveBtn(params.row.originalData)}
      />
    ),
    filterable: false,
    sortable: false,
    align: 'center',
  },
]
