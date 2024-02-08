import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Typography } from '@mui/material'

import { useStyles } from '@components/dashboards/dashboard-list-of-any-card/dashboard-list-of-any-card.style'

export const DashboardListOfAnyCard = ({ config, configSubTitle, valuesData, onClickViewMore }) => {
  const { classes: styles } = useStyles()

  const CardItem = ({ item }) => (
    <div className={styles.cardWrapper} onClick={() => onClickViewMore(item.route, item.dataGridFilter)}>
      <Typography className={styles.cardSubTitle}>{item.title}</Typography>
      <div className={styles.cardValueWrapper}>
        <Typography className={styles.cardValueTitle}>
          {valuesData[item.dataKey] && valuesData[item.dataKey]}
        </Typography>

        <ArrowForwardIosIcon fontSize="small" />
      </div>
    </div>
  )

  return (
    <div className={styles.cardListWrapper}>
      <Typography className={styles.cardListTitle}>{config.title}</Typography>
      <Typography className={styles.cardListSubTitle}>{configSubTitle}</Typography>
      <div className={styles.cardsWrapper}>
        {config.items.map(item => (
          <CardItem key={item.dataKey} item={item} />
        ))}
      </div>
    </div>
  )
}
