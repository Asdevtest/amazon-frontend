import { Tooltip } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ShareIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './open-in-new-tab-cell.style'

interface OpenInNewTabCellProps {
  onClickOpenInNewTab: () => void
  isFullSize?: boolean
}

export const OpenInNewTabCell: FC<OpenInNewTabCellProps> = memo(({ onClickOpenInNewTab, isFullSize }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div
      className={cx(styles.iconWrapper, { [styles.fullSizeIconWrapper]: isFullSize })}
      onClick={event => {
        event.stopPropagation()
        onClickOpenInNewTab()
      }}
    >
      <Tooltip arrow title={t(TranslationKey['Open in a new tab'])} placement="top">
        <ShareIcon className={styles.shareLinkIcon} />
      </Tooltip>
    </div>
  )
})
