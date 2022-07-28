import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'

import React from 'react'

import {Box, Link, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {Button} from '@components/buttons/button'
import {PhotoCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field/field'

import {toFixed} from '@utils/text'

import {LinesChart} from '../../charts/lines-chart/lines-chart'
import {useClassNames} from './shop-info.style'

export const ShopInfo = observer(({data}) => {
  const classNames = useClassNames()
  const avgProfit = toFixed(
    data?.profitForTheReportingPeriod?.reduce((acc, cur) => acc + cur.pv, 0) /
      data?.profitForTheReportingPeriod?.length,
    2,
  )

  const avgRevenue = toFixed(
    data?.profitForTheReportingPeriod?.reduce((acc, cur) => acc + cur.uv, 0) /
      data?.profitForTheReportingPeriod?.length,
    2,
  )
  const profitability = toFixed(avgRevenue / avgProfit, 2) * 100
  return (
    <Box className={classNames.shopInfoWrapper}>
      <div className={classNames.shopInfoTopWrapper}>
        <div className={classNames.photosWrapper}>
          <PhotoCarousel
            files={['https://monarti.ru/wa-data/public/shop/products/00/41/4100/images/4825/4825.970.jpg']}
          />
        </div>
        <div className={classNames.rightSideWrapper}>
          <div className={classNames.rightSideHeader}>
            <Typography className={classNames.shopTitle}>{'Магазин столовых принадлежностей'}</Typography>
            <div className={classNames.statusWrapper}>
              <Typography className={classNames.cardTitle}>{'Продается'}</Typography>
              <FiberManualRecordRoundedIcon color="success" />
            </div>
          </div>
          <div>
            <Link target="__blank" href={'https://aliexpress.ru/'} className={classNames.link}>
              {'Перейти на сайт магазина '}
            </Link>
          </div>
          <div className={classNames.shortInfoWrapper}>
            <div>
              <Field
                labelClasses={classNames.shortInfoLabel}
                containerClasses={classNames.shortInfoContainer}
                label={'Ценовой период'}
                inputComponent={
                  <Typography className={classNames.shortInfoValue}>{`${data?.pricePeriod} месяцев`}</Typography>
                }
              />
            </div>
            <div>
              <Field
                labelClasses={classNames.shortInfoLabel}
                containerClasses={classNames.shortInfoContainer}
                label={'Ежемесячный множитель'}
                inputComponent={
                  <Typography className={classNames.shortInfoValue}>{`${data?.multiplier} х`}</Typography>
                }
              />
            </div>

            <div>
              <Field
                labelClasses={classNames.shortInfoLabel}
                containerClasses={classNames.shortInfoContainer}
                label={'Стоимость'}
                inputComponent={<Typography className={classNames.shortInfoValue}>{`${data?.cost} $`}</Typography>}
              />
            </div>
          </div>
          <div className={classNames.buttonsWrapper}>
            <Button className={classNames.editButton}>{'Редактировать'}</Button>
            <Button danger className={classNames.deleteButton}>
              {'Удалить объявление'}
            </Button>
          </div>
        </div>
      </div>
      <div className={classNames.shopInfoBottomWrapper}>
        <div className={classNames.chartsWrapper}>
          <div className={classNames.chartWrapper}>
            <Field
              label={'Сред. Ежемесечная чистая прибыль'}
              labelClasses={classNames.chartLabel}
              inputComponent={
                <div className={classNames.chart}>
                  <Typography className={classNames.profit}>{avgRevenue + ' $'}</Typography>
                  <LinesChart data={data.profitForTheReportingPeriod} />
                </div>
              }
            />
          </div>
          <div className={classNames.chartWrapper}>
            <Field
              label={'Сред. Ежемесячный доход'}
              labelClasses={classNames.chartLabel}
              inputComponent={
                <div className={classNames.chart}>
                  <Typography className={classNames.profit}>{avgProfit + ' $'}</Typography>
                  <LinesChart profit data={data.profitForTheReportingPeriod} />
                </div>
              }
            />
          </div>
          <div className={classNames.chartWrapper}>
            <Field
              label={'Рентабельность'}
              labelClasses={classNames.chartLabel}
              inputComponent={
                <div className={classNames.chart}>
                  <Typography className={classNames.profitability}>{profitability + ' %'}</Typography>
                  <Link>{'Посмотреть прибыль'}</Link>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </Box>
  )
})
