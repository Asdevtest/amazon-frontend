import { FC, memo } from 'react'

import { ACCESS_DENIED } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { checkAndMakeAbsoluteUrl } from '@utils/text'
import { t } from '@utils/translations'

import { LinkWithCopy } from '../link-with-copy'

interface SupplierLinkProps {
  link: string
}

export const SupplierLink: FC<SupplierLinkProps> = memo(({ link }) => {
  const convertedLink = checkAndMakeAbsoluteUrl(link)

  return link === ACCESS_DENIED ? (
    <p>{ACCESS_DENIED}</p>
  ) : link ? (
    <LinkWithCopy url={convertedLink} title={t(TranslationKey['Go to supplier site'])} valueToCopy={convertedLink} />
  ) : null
})
