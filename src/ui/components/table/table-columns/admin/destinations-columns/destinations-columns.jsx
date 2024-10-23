import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, MultilineTextHeaderCell, UserCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

export const destinationsColumns = handlers => [
  {
    field: 'storekeeper',
    headerName: t(TranslationKey.Account),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Account)} />,

    width: 150,
    renderCell: params => (
      <UserCell
        name={params?.row?.originalData?.storekeeper?.name}
        id={params?.row?.originalData?.storekeeper?._id}
        email={params?.row?.originalData?.storekeeper?.email}
      />
    ),
  },

  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    width: 240,
    renderCell: params => <Text isCell text={params.value} />,
  },

  {
    field: 'country',
    headerName: t(TranslationKey.Country),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Country)} />,

    width: 120,
    renderCell: params => <Text isCell text={params.value} />,
  },

  {
    field: 'zipCode',
    headerName: t(TranslationKey['ZIP code']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ZIP code'])} />,

    width: 100,
    renderCell: params => <Text isCell text={params.value} />,
  },

  {
    field: 'city',
    headerName: t(TranslationKey.City),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.City)} />,

    width: 140,
    renderCell: params => <Text isCell text={params.value} />,
  },

  {
    field: 'state',
    headerName: t(TranslationKey.State),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.State)} />,

    width: 150,
    renderCell: params => <Text isCell text={params.value} />,
  },

  {
    field: 'address',
    headerName: t(TranslationKey.Address),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Address)} />,

    width: 350,
    renderCell: params => <Text isCell text={params.value} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    width: 130,
    renderCell: params => (
      <ActionButtonsCell
        row
        showFirst
        showSecond
        secondDanger
        firstGhost
        secondGhost
        firstIcon={<MdOutlineEdit size={16} />}
        secondIcon={<MdOutlineDelete size={16} />}
        onClickFirst={() => handlers.onClickEditBtn(params.row.originalData)}
        onClickSecond={() => handlers.onClickRemoveBtn(params.row.originalData)}
      />
    ),
    filterable: false,
    sortable: false,
    align: 'center',
  },
]
