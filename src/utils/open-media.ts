import { UploadFileType } from '@typings/shared/upload-file'

import { getAmazonImageUrl } from './get-amazon-image-url'

export const openMedia = (file: UploadFileType) => {
  window.open(getAmazonImageUrl(file, true), '_blank')?.focus()
}
