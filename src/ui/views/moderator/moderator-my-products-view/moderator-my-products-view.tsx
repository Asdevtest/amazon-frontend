import { useStyles } from './moderator-my-products-view.style'

export const ModeratorMyProductsView = () => {
  const { classes: styles } = useStyles()

  return <p className={styles.inProcess}>{'В разработке...'}</p>
}
