export enum ModalNames {
  PATCH = 'showPatchNoteModal',
}

export interface IPatchNoteToCreate {
  title: string
  description: string
  role: string
}
