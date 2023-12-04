import React, { FC } from 'react'

import { RedFlags } from '@components/shared/redFlags/red-flags'

import { Flag } from '@typings/flag'

import { useStyles } from './red-flags-cell.style'

interface RedFlagsCellProps {
  flags: Flag[]
}

export const RedFlagsCell: FC<RedFlagsCellProps> = React.memo(({ flags }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.redFlags}>
      <RedFlags activeFlags={flags} />
    </div>
  )
})
