export type UploadFileType = IUploadFile | string

export interface IUploadFile {
  file: File
  data_url: string
}

export interface IMediaRequest {
  image: UploadFileType
  comment: string
  commentByClient: string
  _id: string
}
