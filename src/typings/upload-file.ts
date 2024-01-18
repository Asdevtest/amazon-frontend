export type UploadFileType = IUploadFile | string

export interface IUploadFile {
  file: File
  data_url: string
}
