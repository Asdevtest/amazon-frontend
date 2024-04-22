export enum ModalNames {
  PATCH = 'showPatchNoteModal',
}

export interface IPatchNoteToCreate {
  title: string
  version: string
  description: string
  role: string
}
