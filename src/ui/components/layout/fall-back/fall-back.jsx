import { useStyles } from './fall-back.style'

export const FallBack = () => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <img className={styles.logo} alt="company logo" src={'/assets/icons/logo-var-2.svg'} />
      </div>
      <div className={styles.main}>
        <p className={styles.title}>{'Иногда, чтобы идти вперёд, нужно сделать шаг назад.'}</p>

        <p>{'Вернитесь назад и перезагрузите страницу.'}</p>
      </div>
    </div>
  )
}
