import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { Tooltip } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ShareLinkIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useDataGridCellStyles } from './open-in-new-tab-cell.style'

interface OpenInNewTabCellProps {
  onClickOpenInNewTab: () => void
  href?: string
  isFullSize?: boolean
}

export const OpenInNewTabCell: FC<OpenInNewTabCellProps> = React.memo(({ onClickOpenInNewTab, href, isFullSize }) => {
  const { classes: styles, cx } = useDataGridCellStyles()

  return (
    <Tooltip
      arrow
      title={t(TranslationKey['Open in a new tab'])}
      placement="top"
      classes={{ tooltip: styles.tooltip, arrow: styles.arrow }}
    >
      <div
        className={cx(styles.iconWrapper, { [styles.fullSizeIconWrapper]: isFullSize })}
        onClick={event => {
          event.stopPropagation()
          if (!href) {
            onClickOpenInNewTab()
          }
        }}
      >
        {href ? (
          <NavLink to={href || ''} target="_blank">
            <ShareLinkIcon className={styles.shareLinkIcon} />
          </NavLink>
        ) : (
          <ShareLinkIcon className={styles.shareLinkIcon} />
        )}
      </div>
    </Tooltip>
  )
})
