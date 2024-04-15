import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { IPatchNoteToCreate } from '@views/moderator/moderator-updated-view/moderator-updated-view.type'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { IPatchNote } from '@typings/shared/patch-notes'

import { useStyles } from './patch-note-form.style'

import { PatchNote } from './patch-note'
import { EventType } from './patch-note-form.type'

interface PatchNoteFormProps {
  title: string
  onToggleModal: () => void
  onCreatePatchNotes: (data: IPatchNoteToCreate[]) => void
  onUpdatePatchNote: (id: string, data: IPatchNoteToCreate) => void
  editPatchNote?: IPatchNote
}

export const PatchNoteForm: FC<PatchNoteFormProps> = memo(props => {
  const { title, onToggleModal, onCreatePatchNotes, onUpdatePatchNote, editPatchNote } = props

  const { classes: styles } = useStyles()

  const generatePatchNote = (): IPatchNoteToCreate =>
    editPatchNote
      ? {
          title: editPatchNote.title || '',
          description: editPatchNote.description || '',
          role: String(editPatchNote.role) || '',
        }
      : {
          title: '',
          description: '',
          role: '',
        }
  const [patchNotes, setPatchNotes] = useState<IPatchNoteToCreate[]>([generatePatchNote()])

  const handleChangePatchNote = (patchNoteIndex: number, field: string) => (e: EventType) => {
    setPatchNotes(prevPatchNotes => {
      const updatedPatchNotes = [...prevPatchNotes]
      updatedPatchNotes[patchNoteIndex] = {
        ...updatedPatchNotes[patchNoteIndex],
        [field]: e.target.value,
      }

      return updatedPatchNotes
    })
  }
  const handleAddPatchNote = () => {
    setPatchNotes(prevPatchNotes => [generatePatchNote(), ...prevPatchNotes])
  }
  const handleSubmit = () =>
    editPatchNote ? onUpdatePatchNote(editPatchNote._id, patchNotes[0]) : onCreatePatchNotes(patchNotes)

  const disabledSubmitButton = patchNotes.some(patchNote => Object.values(patchNote).some(field => field.length === 0))

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>

      <div className={styles.patchNotes}>
        {patchNotes.map((patchNote, index) => (
          <PatchNote
            key={index}
            patchNote={patchNote}
            patchNoteIndex={index}
            onChangePatchNote={handleChangePatchNote}
          />
        ))}
      </div>

      {!editPatchNote ? (
        <button disabled={!!editPatchNote} className={styles.addButton} onClick={handleAddPatchNote}>
          <CustomPlusIcon />
          <span>{t(TranslationKey['Add a patch note'])}</span>
        </button>
      ) : null}

      <div className={styles.buttons}>
        <Button styleType={ButtonStyle.CASUAL} onClick={onToggleModal}>
          {t(TranslationKey.Cancel)}
        </Button>
        <Button disabled={disabledSubmitButton} onClick={handleSubmit}>
          {editPatchNote ? t(TranslationKey.Edit) : t(TranslationKey.Create)}
        </Button>
      </div>
    </div>
  )
})
