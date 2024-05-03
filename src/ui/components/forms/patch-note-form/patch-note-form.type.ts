import { ChangeEvent } from 'react'

import { SelectChangeEvent } from '@mui/material'

import { IPatchNoteToCreate } from '@views/shared/patch-noutes-view/patch-noutes-view.type'

import { IPatchNote } from '@typings/shared/patch-notes'

export type EventType = ChangeEvent<HTMLInputElement> | SelectChangeEvent<HTMLInputElement>

export interface PatchNoteFormProps {
  title: string
  patchNoteVersions: string[]
  onToggleModal: () => void
  onCreatePatchNotes: (data: IPatchNoteToCreate[]) => void
  onUpdatePatchNote: (id: string, data: IPatchNoteToCreate) => void
  editPatchNote?: IPatchNote
}
