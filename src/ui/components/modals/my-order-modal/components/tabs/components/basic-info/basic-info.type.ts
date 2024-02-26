import { UploadFileType } from '@typings/shared/upload-file'

export interface IFieldConfig {
  title?: string
  text?: string
  element?: JSX.Element
  files?: UploadFileType[]
}
