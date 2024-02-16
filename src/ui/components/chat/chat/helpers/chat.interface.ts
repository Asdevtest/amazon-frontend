import { UploadFileType } from '@typings/shared/upload-file'

export interface RenderAdditionalButtonsParams {
  message: string
  files: UploadFileType[]
}

export interface OnEmojiSelectEvent {
  id: string
  keywords: string[]
  name: string
  native: string
  shortcodes: string
  unified: string
}

export interface IMessageState {
  message: string
  files: UploadFileType[]
}
