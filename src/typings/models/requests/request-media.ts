import { UploadFileType } from '@typings/shared/upload-file'

export interface IRequestMedia {
  _id: string
  fileLink: UploadFileType
  commentByClient: string
  commentByPerformer: string
}
