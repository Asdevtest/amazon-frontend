import { FiPlus } from 'react-icons/fi'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  InputOrTextCell,
  MultilineTextHeaderCell,
  TableDataControlsButtonsCell,
  TextCell,
} from '@components/data-grid/data-grid-cells'
import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

export const tabFreelanceColumns = ({
  onEditSpec,
  onMoveSpecToArchive,
  onChangeSpecTitle,
  onClickToggleAddOrEditTextModal,
}) => [
  {
    field: 'spec',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Title of specialty'])} />,
    renderCell: ({ row }) => (
      <InputOrTextCell
        text={row.title}
        isEdit={row.isEditSpec}
        tooltipTextLength={20}
        maxInputValueLength={64}
        onChange={onChangeSpecTitle}
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
    renderCell: ({ row }) => {
      const onClickSaveButton = row.isEditSpec ? () => onEditSpec(row) : undefined
      const onClickEditButton = !row.isEditSpec ? () => onEditSpec(row) : undefined
      const onClickCancelButton = row.isEditSpec ? () => onEditSpec({ ...row, isEditSpec: !row.isEditSpec }) : undefined
      const onClickSendButton =
        !row.isEditSpec && !row.archive
          ? () => onMoveSpecToArchive({ ...row, isEditSpec: !row.isEditSpec, archive: !row.archive })
          : undefined
      const onClickReturnButton =
        !row.isEditSpec && row.archive
          ? () => onEditSpec({ ...row, isEditSpec: !row.isEditSpec, archive: !row.archive })
          : undefined

      return (
        <TableDataControlsButtonsCell
          onClickSaveButton={onClickSaveButton}
          onClickEditButton={onClickEditButton}
          onClickCancelButton={onClickCancelButton}
          onClickSendButton={onClickSendButton}
          onClickReturnButton={onClickReturnButton}
        />
      )
    },
    filterable: false,
    sortable: false,
    width: 100,
  },

  {
    field: 'archive',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Archive)} />,
    renderCell: ({ row }) => <TextCell text={row.archive ? t(TranslationKey.Archive) : ''} />,
    filterable: false,
    sortable: false,
    flex: 1,
  },

  {
    field: 'button',
    renderHeader: () => (
      <CustomButton type="primary" icon={<FiPlus size={16} />} onClick={onClickToggleAddOrEditTextModal}>
        {t(TranslationKey['New specialty'])}
      </CustomButton>
    ),
    sortable: false,
    minWidth: 230,
  },
]
