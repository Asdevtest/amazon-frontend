/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRequestMedia } from '@typings/models/requests/request-media'
import { UploadFileType } from '@typings/shared/upload-file'

export type UploadFilesOrMediaRequestsType = UploadFileType[] | IRequestMedia[]

export interface UploadFilesInputProps {
  images: UploadFilesOrMediaRequestsType
  setImages: any
  maxNumber?: number
  acceptTypes?: string[]
  disabled?: boolean
  dragAndDropButtonHeight?: number
  maxHeight?: number
  minimized?: boolean
  title?: string
  withComment?: boolean
  withoutLinks?: boolean
  withoutTitles?: boolean
  withoutActionsButtons?: boolean
}
