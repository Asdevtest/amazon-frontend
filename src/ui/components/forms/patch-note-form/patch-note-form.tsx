import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

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
    showAddRoleButton,
    disabledSubmitButton,
    onAddPatchNote,
    onRemovePatchNote,
    onChangePatchNote,
    onChangePatchNoteDescription,
    onSubmit,
  } = usePatchNoteForm(props)

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>

      <div className={styles.patchNotes}>
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
          <button disabled={!!editPatchNote} className={styles.addButton} onClick={onAddPatchNote}>
            <CustomPlusIcon />
            {t(TranslationKey['Add role'])}
          </button>
        </div>
      ) : null}

      <div className={styles.buttons}>
        <Button styleType={ButtonStyle.CASUAL} onClick={onToggleModal}>
          {t(TranslationKey.Cancel)}
        </Button>
        <Button disabled={disabledSubmitButton} onClick={onSubmit}>
          {editPatchNote ? t(TranslationKey.Edit) : t(TranslationKey.Create)}
        </Button>
      </div>
    </div>
  )
})
