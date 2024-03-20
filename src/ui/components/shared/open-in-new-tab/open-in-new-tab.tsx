import { observer } from 'mobx-react'
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ShareIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './open-in-new-tab.style'

interface OpenInNewTabProps {
  onClickOpenNewTab: () => void
}

export const OpenInNewTab: FC<OpenInNewTabProps> = observer(props => {
  const { classes: styles } = useStyles()

  const { onClickOpenNewTab } = props

  return (
    <div className={styles.shareWrapper} onClick={onClickOpenNewTab}>
      <ShareIcon className={styles.shareLinkIcon} />
      <p className={styles.shareLinkText}>{t(TranslationKey['Open in a new tab'])}</p>
    </div>
  )
})
