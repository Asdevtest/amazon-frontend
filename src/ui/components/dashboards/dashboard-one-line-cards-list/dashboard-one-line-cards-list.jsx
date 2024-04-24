import { useEffect, useState } from 'react'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CircularProgress, Typography } from '@mui/material'

import { useStyles } from '@components/dashboards/dashboard-one-line-cards-list/dashboard-one-line-cards-list.style'
import { InventoryIcon } from '@components/shared/svg-icons'

export const DashboardOneLineCardsList = props => {
  const { config, valuesData, onClickViewMore } = props

  const { classes: styles, cx } = useStyles()

  const [currentScreenWidth, setCurrentScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const resizeScreen = () => {
      setCurrentScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', resizeScreen)
  }, [window.innerWidth])

  return (
    <div className={styles.cardListWrapper}>
      <div className={styles.cardHeaderWrapper}>
        <div>
          <Typography className={styles.cardListTitle}>{config.title}</Typography>
          <Typography className={styles.cardListSubTitle}>{config.subTitle}</Typography>
        </div>
      </div>

      <div className={styles.cardsWrapper}>
        <Swiper
          navigation={config.items.length > 4 || window.innerWidth > 768}
          slidesPerView={
            currentScreenWidth > 768 ? 4 : currentScreenWidth >= 320 && currentScreenWidth <= 360 ? 1.2 : 1.3
          }
          spaceBetween={40}
          modules={[Navigation]}
          className={styles.swiper}
        >
          {config.items.map(item => (
            <SwiperSlide key={item.dataKey}>
              <div
                className={cx(styles.cardWrapper, {
                  [styles.cardErrorWrapper]: item.isNegative,
                })}
                onClick={() => onClickViewMore(item.route, item.dataGridFilter)}
              >
                <InventoryIcon classes={{ root: styles.icon }} />
                <div className={styles.cardSubWrapper}>
                  <Typography className={styles.cardSubTitle}>{item.title}</Typography>

                  {valuesData[item.dataKey] === 0 || valuesData[item.dataKey] === '-' || !valuesData[item.dataKey] ? (
                    <Typography className={styles.cardValueTitle}>{0}</Typography>
                  ) : valuesData[item.dataKey] ? (
                    <Typography className={styles.cardValueTitle}>{valuesData[item.dataKey]}</Typography>
                  ) : (
                    <CircularProgress color="primary" thickness={2} />
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
