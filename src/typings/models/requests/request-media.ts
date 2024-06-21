import { UploadFileType } from '@typings/shared/upload-file'

export interface IRequestMedia {
  _id: string | null
  fileLink: UploadFileType
  commentByClient?: string
  commentByPerformer?: string
}
