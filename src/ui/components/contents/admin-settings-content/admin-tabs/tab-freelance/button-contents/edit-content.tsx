import { FC, memo } from 'react'

import { EditPenIcon } from '@components/shared/svg-icons'

import { useStyles } from '../tab-freelance.style'

export const EditContent: FC = memo(() => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.buttonContent}>
      <EditPenIcon className={styles.editIcon} />
    </div>
  )
})
