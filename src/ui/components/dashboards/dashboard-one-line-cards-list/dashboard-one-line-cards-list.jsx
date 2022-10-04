/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'

import {CircularProgress, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'

import {InventoryIcon} from '@constants/navbar-svg-icons'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {useClassNames} from '@components/dashboards/dashboard-one-line-cards-list/dashboard-one-line-cards-list.style'

import {t} from '@utils/translations'

export const DashboardOneLineCardsList = ({config, valuesData, onClickViewMore, onClickAddProduct, isClient}) => {
  const classNames = useClassNames()
  const [currentScreenWidth, setCurrentScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const resizeScreen = () => {
      setCurrentScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', resizeScreen)
  }, [window.innerWidth])

  return (
    <div className={classNames.cardListWrapper}>
      <div className={classNames.cardHeaderWrapper}>
        <div>
          <Typography className={classNames.cardListTitle}>{config.title}</Typography>
          <Typography className={classNames.cardListSubTitle}>{config.subTitle}</Typography>
        </div>
        {isClient ? (
          <Button success className={classNames.addButton} onClick={() => onClickAddProduct(config.route)}>
            {t(TranslationKey['Add product'])}
          </Button>
        ) : null}
      </div>

      <div className={classNames.cardsWrapper}>
        <Swiper
          navigation={config.items.length > 4 || window.innerWidth > 768}
          slidesPerView={currentScreenWidth > 768 ? 4 : 2}
          spaceBetween={
            currentScreenWidth <= 370 ? 220 : currentScreenWidth > 370 && currentScreenWidth <= 480 ? 170 : 50
          }
          modules={[Navigation]}
          className={classNames.swiper}
        >
          {config.items.map(item => (
            <SwiperSlide key={item.dataKey}>
              <div
                className={clsx(classNames.cardWrapper, {
                  [classNames.cardErrorWrapper]: item.isNegative,
                })}
                onClick={() => onClickViewMore(item.route, item.dataGridFilter)}
              >
                <InventoryIcon classes={{root: classNames.icon}} />
                <div className={classNames.cardSubWrapper}>
                  <Typography className={classNames.cardSubTitle}>{item.title}</Typography>
                  <Typography className={classNames.cardValueTitle}>
                    {valuesData[item.dataKey] ? valuesData[item.dataKey] : null}
                  </Typography>
                  {!valuesData[item.dataKey] && <CircularProgress color="primary" thickness={2} />}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
