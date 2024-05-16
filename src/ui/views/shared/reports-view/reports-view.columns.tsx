import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  LaunchesCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ShortDateCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'
import { EditIcon } from '@components/shared/svg-icons'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const reportsViewColumns = () => [
  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    renderCell: ({ row }: GridRowModel) =>
      row.isActive ? (
        <ActionButtonsCell
          iconButton
          fullWidth
          isFirstButton
          firstButtonElement={<EditIcon />}
          firstButtonStyle={ButtonStyle.PRIMARY}
          // onClickFirstButton={() => onClickEditBtn(row._id)}
        />
      ) : null,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    width: 95,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
    renderCell: ({ row }: GridRowModel) => <ShortDateCell value={row.createdAt} />,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    width: 100,
  },

  {
    field: 'launchType',
    headerName: t(TranslationKey['Launch type']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Launch type'])} />,
    renderCell: ({ row }: GridRowModel) => <LaunchesCell launches={row.listingLaunches || []} />,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    width: 330,
  },

  {
    field: 'newProductPrice',
    headerName: t(TranslationKey['New product price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['New product price'])} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={toFixedWithDollarSign(row.newProductPrice)} />,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    width: 140,
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,
    renderCell: ({ row }: GridRowModel) => (
      <UserMiniCell
        userName={row.sub ? row.sub.name : row.createdBy.name}
        userId={row.sub ? row.sub._id : row.createdBy._id}
      />
    ),
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    width: 180,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
    renderCell: ({ row }: GridRowModel) => (
      <MultilineTextCell leftAlign threeLines maxLength={200} text={row.description} />
    ),
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    flex: 1,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: ({ row }: GridRowModel) => <ShortDateCell value={row.updatedAt} />,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    width: 105,
  },
]
