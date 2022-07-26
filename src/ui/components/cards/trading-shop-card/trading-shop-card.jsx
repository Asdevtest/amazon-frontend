/* eslint-disable no-unused-vars */
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import Rating from '@mui/material/Rating'

import React from 'react'

import {Grid, Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {PhotoCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field'

import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './trading-shop-card.style'

export const TradingShopCard = ({item, onClickViewMore}) => {
  const classNames = useClassNames()

  return (
    <Grid item className={classNames.mainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.photoWrapper}>
          <PhotoCarousel files={item.images} alignButtons="end" />
        </div>
        <div className={classNames.subWrapper}>
          <div className={classNames.titleWrapper}>
            <Typography className={classNames.title}>{item.title}</Typography>

            <div className={classNames.statusWrapper}>
              <Typography className={classNames.cardTitle}>{'Продается'}</Typography>
              <FiberManualRecordRoundedIcon color="#007bff" />
            </div>
          </div>

          <div className={classNames.shortInfoWrapper}>
            <Field
              labelClasses={classNames.shortInfoLabel}
              containerClasses={classNames.shortInfoContainer}
              label={'Стоимость'}
              inputComponent={
                <Typography className={classNames.shortInfoValue}>{toFixedWithDollarSign(item.cost, 2)}</Typography>
              }
            />
            <Field
              labelClasses={classNames.shortInfoLabel}
              containerClasses={classNames.shortInfoContainer}
              label={'Ежемесечная чистая прибыль'}
              inputComponent={
                <Typography className={classNames.shortInfoValue}>
                  {toFixedWithDollarSign(item.monthClearProfit, 2)}
                </Typography>
              }
            />
            <Field
              labelClasses={classNames.shortInfoLabel}
              containerClasses={classNames.shortInfoContainer}
              label={'Ежемесячный доход'}
              inputComponent={
                <Typography className={classNames.shortInfoValue}>
                  {toFixedWithDollarSign(item.monthProfit, 2)}
                </Typography>
              }
            />
            <Field
              labelClasses={classNames.shortInfoLabel}
              containerClasses={classNames.shortInfoContainer}
              label={'Монетизация'}
              inputComponent={<Typography className={classNames.shortInfoValue}>{item.monetization}</Typography>}
            />
            <Field
              labelClasses={classNames.shortInfoLabel}
              containerClasses={classNames.shortInfoContainer}
              label={'Ежемесячный множитель'}
              inputComponent={<Typography className={classNames.shortInfoValue}>{`${item.multiplier}x`}</Typography>}
            />
            <Field
              labelClasses={classNames.shortInfoLabel}
              containerClasses={classNames.shortInfoContainer}
              label={'Бизнес создан'}
              inputComponent={<Typography className={classNames.shortInfoValue}>{item.createBusinesData}</Typography>}
            />
          </div>

          <Typography className={classNames.description}>{item.description}</Typography>

          <div className={classNames.footer}>
            <div className={classNames.footerInfoWrapper}>
              <Field
                oneLine
                labelClasses={classNames.shortInfoLabel}
                containerClasses={classNames.footerInfoContainer}
                label={'Прибыль (12 месяцев)'}
                inputComponent={
                  <>
                    <ArrowDropDownIcon color="success" />
                    <Typography className={classNames.green}>{item.profit12Monthes}</Typography>
                  </>
                }
              />
              <Field
                oneLine
                labelClasses={classNames.shortInfoLabel}
                containerClasses={classNames.footerInfoContainer}
                label={'Доход (12 месяцев)'}
                inputComponent={
                  <>
                    <ArrowDropDownIcon color="success" />
                    <Typography className={classNames.green}>{item.income12Monthes}</Typography>
                  </>
                }
              />
              <Field
                oneLine
                labelClasses={classNames.shortInfoLabel}
                containerClasses={classNames.footerInfoContainer}
                label={'Трафик (12 месяцев)'}
                inputComponent={
                  <>
                    <ArrowDropDownIcon color="error" />
                    <Typography className={classNames.red}>{item.traffic}</Typography>
                  </>
                }
              />
            </div>

            <div className={classNames.buttonWrapper}>
              <Button
                tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
                variant="contained"
                color="primary"
                className={classNames.actionButton}
                onClick={() => onClickViewMore(item._id)}
              >
                {t(TranslationKey.Details)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  )
}
