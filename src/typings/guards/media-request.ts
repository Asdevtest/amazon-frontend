import { IRequestMedia } from '@typings/models/requests/request-media'
import { TypeGuard } from '@typings/type-guard'

import { isUploadFileType } from './upload-file'

export const isRequestMedia: TypeGuard<IRequestMedia> = (value: unknown): value is IRequestMedia => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const { fileLink, commentByPerformer, commentByClient, _id } = value as IRequestMedia

  return (
    isUploadFileType(fileLink) &&
    (typeof commentByPerformer === 'string' || commentByPerformer === null) &&
    (typeof commentByClient === 'string' || commentByClient === null) &&
    typeof _id === 'string'
  )
}
