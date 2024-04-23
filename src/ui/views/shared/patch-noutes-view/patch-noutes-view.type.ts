export enum ModalNames {
  PATCH = 'showPatchNoteModal',
  CONFIRM = 'showConfirmModal',
}

export interface IPatchNoteToCreate {
  title: string
  version: string
  description: string
  role: string
}
