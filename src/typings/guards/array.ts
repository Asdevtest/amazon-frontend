import { IMediaRequest, UploadFileType } from '@typings/shared/upload-file'
import { TypeGuard } from '@typings/type-guard'

import { isMediaRequest } from './media-request'
import { isUploadFileType } from './upload-file'

export const isArrayOfString: TypeGuard<string[]> = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(item => typeof item === 'string')

export const isArrayOfUploadFileType: TypeGuard<UploadFileType[]> = (value: unknown): value is UploadFileType[] =>
  Array.isArray(value) && value.every(item => isUploadFileType(item))

export const isArrayOfMediaRequest: TypeGuard<IMediaRequest[]> = (value: unknown): value is IMediaRequest[] =>
  Array.isArray(value) && value.every(item => isMediaRequest(item))
