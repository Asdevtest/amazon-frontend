import { Popover } from 'antd'
import { FC, memo } from 'react'

import { RedFlags } from '@components/shared/redFlags/red-flags'

import { IRedFlag } from '@typings/shared/red-flag'

import { useStyles } from './red-flags-cell.style'

interface RedFlagsCellProps {
  flags: IRedFlag[]
}

export const RedFlagsCell: FC<RedFlagsCellProps> = memo(({ flags }) => {
  const { classes: styles } = useStyles()

  const visibleFlags = flags.slice(0, 5)
  const hiddenFlags = flags.slice(5)
  const hiddenFlagsCount = hiddenFlags.length

  return (
    <Popover
      content={
        hiddenFlagsCount > 0 && (
          <div className={styles.hiddenFlagsPopover}>
            <RedFlags activeFlags={hiddenFlags} />
          </div>
        )
      }
      trigger="hover"
      placement="top"
    >
      <div className={styles.redFlags}>
        <RedFlags activeFlags={visibleFlags} />
        {hiddenFlagsCount > 0 && <span className={styles.moreFlags}>+{hiddenFlagsCount}</span>}
      </div>
    </Popover>
  )
})
