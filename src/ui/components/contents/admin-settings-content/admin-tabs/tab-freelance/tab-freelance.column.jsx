import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  ButtonHeaderCell,
  InputOrTextCell,
  MultilineTextHeaderCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ArchiveContent, EditContent, SaveContent } from './button-contents'

export const tabFreelanceColumns = ({
  onEditSpec,
  moveSpecToArchive,
  onChangeSpecTitle,
  onClickToggleAddOrEditTextModal,
}) => [
  {
    field: 'spec',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Title of specialty'])} />,
    renderCell: ({ row }) => (
      <InputOrTextCell
        isEdit={row.isEditSpec}
        text={row.title}
        onChange={onChangeSpecTitle}
        onCancel={() => onEditSpec(row._id, false)}
      />
    ),
    filterable: false,
    sortable: false,
    width: 200,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    renderCell: ({ row }) => (
      <ActionButtonsCell
        row
        resetStyles
        isFirstButton={row.isEditSpec}
        isSecondButton={!row.isEditSpec}
        isThirdButton={!row.isEditSpec}
        firstButtonElement={<SaveContent />}
        secondButtonElement={<EditContent />}
        thirdButtonElement={<ArchiveContent />}
        firstButtonTooltipText={t(TranslationKey.Save)}
        onClickFirstButton={() => onEditSpec(row._id, row.isEditSpec)}
        onClickSecondButton={() => onEditSpec(row._id, row.isEditSpec)}
        onClickThirdButton={() => moveSpecToArchive(row._id, row.title)}
      />
    ),
    filterable: false,
    sortable: false,
    width: 140,
  },

  {
    field: 'button',
    renderHeader: () => (
      <ButtonHeaderCell
        text={t(TranslationKey['New specialty'])}
        icon={<CustomPlusIcon />}
        onOpenModal={onClickToggleAddOrEditTextModal}
      />
    ),
    sortable: false,
    flex: 1,
  },
]
