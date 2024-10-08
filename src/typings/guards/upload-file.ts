import { TypeGuard } from '@typings/guards/type-guard'
import { IUploadFile, UploadFileType } from '@typings/shared/upload-file'

import { isString } from './string'

export const isUploadFile: TypeGuard<IUploadFile> = (value: unknown): value is IUploadFile => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'file' in value &&
    value.file instanceof File &&
    'data_url' in value &&
    typeof value.data_url === 'string'
  )
}

export const isUploadFileType: TypeGuard<UploadFileType> = (value: unknown): value is UploadFileType => {
  return isUploadFile(value) || isString(value)
}
