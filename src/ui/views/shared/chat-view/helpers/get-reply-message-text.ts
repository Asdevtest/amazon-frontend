import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const getReplyMessageText = ({
  images,
  video,
  files,
  text,
}: {
  images?: string[]
  video?: string[]
  files?: string[]
  text?: string
}) => {
  const result: { messageText: string; includesFiles: string[] } = {
    messageText: '',
    includesFiles: [],
  }

  if (text) {
    result.messageText = text

    return result
  }

  if (images?.length) {
    result.includesFiles?.push(t(TranslationKey.Images))
  }

  if (video?.length) {
    result.includesFiles?.push(t(TranslationKey.Videos))
  }

  if (files?.length) {
    result.includesFiles?.push(t(TranslationKey.Files))
  }

  return result
}
