import { UploadFileType } from '@typings/upload-file'

export interface IFieldConfig {
  title?: string
  text?: string
  element?: JSX.Element
  files?: UploadFileType[]
}
