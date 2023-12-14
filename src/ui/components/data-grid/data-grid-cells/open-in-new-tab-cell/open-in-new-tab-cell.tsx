import React, { FC, memo, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Tooltip } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ShareLinkIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './open-in-new-tab-cell.style'

interface OpenInNewTabCellProps {
  onClickOpenInNewTab: () => void
  href?: string
  isFullSize?: boolean
}

export const OpenInNewTabCell: FC<OpenInNewTabCellProps> = memo(({ onClickOpenInNewTab, href, isFullSize }) => {
  const { classes: styles, cx } = useStyles()

  const [isShowTooltip, setIsShowTooltip] = useState(false)

  return (
    <NavLink style={{ ...(isFullSize && { height: '100%' }) }} to={href || ''} target="_blank">
      <div
        className={cx(styles.iconWrapper, { [styles.fullSizeIconWrapper]: isFullSize })}
        onClick={event => {
          event.stopPropagation()
          if (!href) {
            onClickOpenInNewTab()
          }
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
          <div>
            {/* Баг в mui. Если не обернуть в div, тултип не отображается. */}
            <ShareLinkIcon className={styles.shareLinkIcon} />
          </div>
        </Tooltip>
      </div>
    </NavLink>
  )
})
