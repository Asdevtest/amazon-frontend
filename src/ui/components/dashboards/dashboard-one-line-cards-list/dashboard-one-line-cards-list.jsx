/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import React, { useEffect, useState } from 'react'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CircularProgress, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { useClassNames } from '@components/dashboards/dashboard-one-line-cards-list/dashboard-one-line-cards-list.style'
import { Button } from '@components/shared/buttons/button'
import { InventoryIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

export const DashboardOneLineCardsList = ({ config, valuesData, onClickViewMore, onClickAddProduct, isClient }) => {
  const { classes: classNames } = useClassNames()
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
            <img src="/assets/icons/white-plus.svg" className={classNames.iconBtn} />
          </Button>
        ) : null}
      </div>

      <div className={classNames.cardsWrapper}>
        <Swiper
          navigation={config.items.length > 4 || window.innerWidth > 768}
          slidesPerView={
            currentScreenWidth > 768 ? 4 : currentScreenWidth >= 320 && currentScreenWidth <= 360 ? 1.2 : 1.3
          }
          spaceBetween={40}
          modules={[Navigation]}
          className={classNames.swiper}
        >
          {config.items.map(item => (
            <SwiperSlide key={item.dataKey}>
              <div
                className={cx(classNames.cardWrapper, {
                  [classNames.cardErrorWrapper]: item.isNegative,
                })}
                onClick={() => onClickViewMore(item.route, item.dataGridFilter)}
              >
                <InventoryIcon classes={{ root: classNames.icon }} />
                <div className={classNames.cardSubWrapper}>
                  <Typography className={classNames.cardSubTitle}>{item.title}</Typography>

                  {valuesData[item.dataKey] === 0 || valuesData[item.dataKey] === '-' || !valuesData[item.dataKey] ? (
                    <Typography className={classNames.cardValueTitle}>{0}</Typography>
                  ) : valuesData[item.dataKey] ? (
                    <Typography className={classNames.cardValueTitle}>{valuesData[item.dataKey]}</Typography>
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
