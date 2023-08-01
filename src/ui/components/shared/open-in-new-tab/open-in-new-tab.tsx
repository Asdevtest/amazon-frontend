import { observer } from 'mobx-react'
import { ShareLinkIcon } from '@components/shared/svg-icons'
import { t } from '@utils/translations'
import { TranslationKey } from '@constants/translations/translation-key'
import { useClassNames } from './open-in-new-tab.styles'

import { FC } from 'react'

interface OpenInNewTabProps {
  onClickOpenNewTab: () => void
}

export const OpenInNewTab: FC<OpenInNewTabProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const { onClickOpenNewTab } = props

  return (
    <div className={classNames.shareWrapper} onClick={onClickOpenNewTab}>
      <ShareLinkIcon className={classNames.shareLinkIcon} />
      <p className={classNames.shareLinkText}>{t(TranslationKey['Open in a new tab'])}</p>
    </div>
  )
})
