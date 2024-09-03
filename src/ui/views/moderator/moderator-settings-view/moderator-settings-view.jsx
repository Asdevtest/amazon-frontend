import { useStyles } from './moderator-settings-view.style'

export const ModeratorSettingsView = props => {
  const { classes: styles } = useStyles()

  return <p className={styles.inProcess}>{'В разработке...'}</p>
}
