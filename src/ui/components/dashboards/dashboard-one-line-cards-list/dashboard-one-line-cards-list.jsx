/* eslint-disable no-unused-vars */
import React from 'react'

import {CircularProgress, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'

import {InventoryIcon} from '@constants/navbar-svg-icons'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {useClassNames} from '@components/dashboards/dashboard-one-line-cards-list/dashboard-one-line-cards-list.style'

import {checkIsPositiveNum} from '@utils/checks'
import {t} from '@utils/translations'

export const DashboardOneLineCardsList = ({config, valuesData, onClickViewMore, isClient}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.cardListWrapper}>
      <div className={classNames.cardHeaderWrapper}>
        <div>
          <Typography className={classNames.cardListTitle}>{config.title}</Typography>
          <Typography className={classNames.cardListSubTitle}>{config.subTitle}</Typography>
        </div>
        {isClient ? (
          <Button success className={classNames.addButton} onClick={() => onClickViewMore(config.route)}>
            {t(TranslationKey['Add product'])}
          </Button>
        ) : null}
      </div>

      <div className={classNames.cardsWrapper}>
        <Swiper
          // loop
          // loopFillGroupWithBlank
          navigation={config.items.length > 4 || window.innerWidth > 768}
          slidesPerView={window.innerWidth > 768 ? 4 : 1}
          spaceBetween={window.innerWidth > 768 ? 50 : -20}
          // slidesPerGroup={1}
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
                    {valuesData[item.dataKey] ? (
                      valuesData[item.dataKey]
                    ) : (
                      <CircularProgress color="success" thickness={2} />
                    )}
                  </Typography>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
