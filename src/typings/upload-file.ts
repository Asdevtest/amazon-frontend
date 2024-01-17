export type IUploadFile = IUploadFiles | string

export interface IUploadFiles {
  file: File
  data_url: string
}
