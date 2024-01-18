import { Typography } from '@mui/material'

import { useStyles } from './fall-back.style'

export const FallBack = () => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <img className={styles.logo} alt="company logo" src={'/assets/icons/logo-var-2.svg'} />
      </div>
      <div className={styles.main}>
        <Typography className={styles.title}>{'Иногда, чтобы идти вперёд, нужно сделать шаг назад.'}</Typography>

        <Typography>{'Вернитесь назад и перезагрузите страницу.'}</Typography>
      </div>
    </div>
  )
}
