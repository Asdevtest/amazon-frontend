import { UploadFileType } from '@typings/shared/upload-file'

export interface ISupplier {
  _id: string
  images: string[]
}

export type IState = Record<string, string[]>

export interface IData {
  productImages: string[]
  latestSeoFiles: string[]
  currentSupplierImage: string[]
  supplierImage: ISupplier[]
}

export interface IMediaFileWithCommentFromRequest {
  file: UploadFileType
  comment: string
  commentByPerformer: string
  _id: string
}
