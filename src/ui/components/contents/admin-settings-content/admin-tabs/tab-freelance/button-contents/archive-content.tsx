import { FC, memo } from 'react'

import { ArchiveOutlinedIcon } from '@components/shared/svg-icons'

import { useStyles } from '../tab-freelance.style'

export const ArchiveContent: FC = memo(() => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.buttonContent}>
      <ArchiveOutlinedIcon className={styles.archiveIcon} />
    </div>
  )
})
