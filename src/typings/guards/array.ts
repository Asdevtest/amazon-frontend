import { IRequestMedia } from '@typings/models/requests/request-media'
import { UploadFileType } from '@typings/shared/upload-file'
import { TypeGuard } from '@typings/type-guard'

import { isRequestMedia } from './media-request'
import { isUploadFileType } from './upload-file'

export const isArrayOfString: TypeGuard<string[]> = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(item => typeof item === 'string')

export const isArrayOfUploadFileType: TypeGuard<UploadFileType[]> = (value: unknown): value is UploadFileType[] =>
  Array.isArray(value) && value.every(item => isUploadFileType(item))

export const isArrayOfRequestMedia: TypeGuard<IRequestMedia[]> = (value: unknown): value is IRequestMedia[] =>
  Array.isArray(value) && value.every(item => isRequestMedia(item))
