import { FC, memo } from 'react'
import { FiPlus } from 'react-icons/fi'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './patch-note-form.style'

import { PatchNote } from './patch-note'
import { PatchNoteFormProps } from './patch-note-form.type'
import { usePatchNoteForm } from './use-patch-note-form'

export const PatchNoteForm: FC<PatchNoteFormProps> = memo(props => {
  const { title, patchNoteVersions, onToggleModal, editPatchNote } = props

  const { classes: styles } = useStyles()
  const {
    patchNotes,
    patchNotesRoles,
    error,
    disabledAddButton,
    showAddRoleButton,
    disabledSubmitButton,
    patchNotesRef,
    onAddPatchNote,
    onRemovePatchNote,
    onChangePatchNote,
    onChangePatchNoteDescription,
    onSubmit,
  } = usePatchNoteForm(props)

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>

      <div ref={patchNotesRef} className={styles.patchNotes}>
        {patchNotes.map((patchNote, index) => (
          <PatchNote
            key={index}
            error={error}
            patchNote={patchNote}
            patchNoteIndex={index}
            patchNotesRoles={patchNotesRoles}
            patchNoteVersions={patchNoteVersions}
            onRemovePatchNote={onRemovePatchNote}
            onChangePatchNote={onChangePatchNote}
            onChangePatchNoteDescription={onChangePatchNoteDescription}
          />
        ))}
      </div>

      {showAddRoleButton ? (
        <div className={styles.buttonContainer}>
          <CustomButton
            type="link"
            icon={<FiPlus />}
            disabled={!!editPatchNote || disabledAddButton}
            className={styles.addButton}
            onClick={onAddPatchNote}
          >
            {t(TranslationKey['Add role'])}
          </CustomButton>
        </div>
      ) : null}

      <div className={styles.buttons}>
        <CustomButton size="large" onClick={onToggleModal}>
          {t(TranslationKey.Close)}
        </CustomButton>
        <CustomButton size="large" type="primary" disabled={disabledSubmitButton} onClick={onSubmit}>
          {editPatchNote ? t(TranslationKey.Edit) : t(TranslationKey.Create)}
        </CustomButton>
      </div>
    </div>
  )
})
