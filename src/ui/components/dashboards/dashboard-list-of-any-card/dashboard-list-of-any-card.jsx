import { MdArrowForwardIos } from 'react-icons/md'

import { useStyles } from '@components/dashboards/dashboard-list-of-any-card/dashboard-list-of-any-card.style'

export const DashboardListOfAnyCard = ({ config, configSubTitle, valuesData, onClickViewMore }) => {
  const { classes: styles } = useStyles()

  const CardItem = ({ item }) => (
    <div className={styles.cardWrapper} onClick={() => onClickViewMore(item.route, item.dataGridFilter)}>
      <p className={styles.cardSubTitle}>{item.title}</p>
      <div className={styles.cardValueWrapper}>
        <p className={styles.cardValueTitle}>{valuesData[item.dataKey] && valuesData[item.dataKey]}</p>

        <MdArrowForwardIos size={18} />
      </div>
    </div>
  )

  return (
    <div className={styles.cardListWrapper}>
      <p className={styles.cardListTitle}>{config.title}</p>
      <p className={styles.cardListSubTitle}>{configSubTitle}</p>
      <div className={styles.cardsWrapper}>
        {config.items.map(item => (
          <CardItem key={item.dataKey} item={item} />
        ))}
      </div>
    </div>
  )
}
