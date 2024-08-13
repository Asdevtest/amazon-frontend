import { observer } from 'mobx-react'

import { CustomSelect } from '@components/shared/custom-select'

import { useStyles } from './parsing-reports.style'

export const ParsingReports = observer(() => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.container}>
      <CustomSelect />
    </div>
  )
})
