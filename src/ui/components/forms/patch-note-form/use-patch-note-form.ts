import { useState } from 'react'

import { IPatchNoteToCreate } from '@views/shared/patch-noutes-view/patch-noutes-view.type'

import { parseTextString } from '@utils/text'

import { UserRolesForPatchNote } from './patch-note-form.constants'
import { EventType, PatchNoteFormProps } from './patch-note-form.type'

export const usePatchNoteForm = ({ onUpdatePatchNote, onCreatePatchNotes, editPatchNote }: PatchNoteFormProps) => {
  const generatePatchNote = (): IPatchNoteToCreate =>
    editPatchNote
      ? {
          title: editPatchNote.title || '',
          version: editPatchNote.version || '',
          description: editPatchNote.description || '',
          role: String(editPatchNote.role) || '',
        }
      : {
          title: '',
          version: '',
          description: '',
          role: '',
        }
  const [patchNotes, setPatchNotes] = useState<IPatchNoteToCreate[]>([generatePatchNote()])
  const [error, setError] = useState(false)

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

  const handleChangePatchNoteDescription = (patchNoteIndex: number) => (value: string) => {
    setPatchNotes(prevPatchNotes => {
      const updatedPatchNotes = [...prevPatchNotes]
      updatedPatchNotes[patchNoteIndex] = {
        ...updatedPatchNotes[patchNoteIndex],
        description: value,
      }

      return updatedPatchNotes
    })
  }

  const handleAddPatchNote = () => {
    if (patchNotes?.[0]?.title.length === 0 || patchNotes?.[0]?.version.length === 0) {
      setError(true)

      setTimeout(() => {
        setError(false)
      }, 3000)
    } else {
      setPatchNotes(prevPatchNotes => [
        ...prevPatchNotes,
        {
          title: patchNotes?.[0]?.title,
          version: patchNotes?.[0]?.version,
          description: '',
          role: '',
        },
      ])
    }
  }

  const handleRemovePatchNote = (patchNoteIndex: number) => {
    setPatchNotes(prevPatchNotes => prevPatchNotes.filter((_, index) => index !== patchNoteIndex))
  }

  const handleSubmit = () => {
    const transmittedPatchNotes = patchNotes.map(patchNote => ({
      ...patchNote,
      title: patchNotes?.[0]?.title.trim(),
      version: patchNotes?.[0]?.version.trim(),
    }))

    return editPatchNote
      ? onUpdatePatchNote(editPatchNote._id, transmittedPatchNotes[0])
      : onCreatePatchNotes(transmittedPatchNotes)
  }

  const disabledSubmitButton = patchNotes.some(patchNote =>
    Object.values(patchNote).some(field => parseTextString(field).length === 0),
  )
  const showAddRoleButton = !editPatchNote && patchNotes.length !== Object.keys(UserRolesForPatchNote).length

  return {
    patchNotes,
    patchNotesRoles: patchNotes.map(({ role }) => role),
    error,
    showAddRoleButton,
    disabledSubmitButton,
    onAddPatchNote: handleAddPatchNote,
    onRemovePatchNote: handleRemovePatchNote,
    onChangePatchNote: handleChangePatchNote,
    onChangePatchNoteDescription: handleChangePatchNoteDescription,
    onSubmit: handleSubmit,
  }
}
