import { FC, memo, useState } from 'react'

import { Tooltip } from '@mui/material'

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

  const [isShowTooltip, setIsShowTooltip] = useState(false)

  return (
    <div
      className={cx(styles.iconWrapper, { [styles.fullSizeIconWrapper]: isFullSize })}
      onClick={event => {
        event.stopPropagation()

        onClickOpenInNewTab()
      }}
      onMouseEnter={() => setIsShowTooltip(true)}
      onMouseLeave={() => setIsShowTooltip(false)}
    >
      <Tooltip
        arrow
        open={isShowTooltip}
        title={t(TranslationKey['Open in a new tab'])}
        placement="top"
        classes={{ tooltip: styles.tooltip, arrow: styles.arrow }}
      >
        <span>
          {/* Баг в mui. Если не обернуть в div, тултип не отображается. */}
          <ShareIcon className={styles.shareLinkIcon} />
        </span>
      </Tooltip>
    </div>
  )
})
