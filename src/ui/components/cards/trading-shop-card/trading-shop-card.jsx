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
          <PhotoCarousel files={item.files} alignButtons="end" />
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
              label={t(TranslationKey['Total price'])}
              inputComponent={
                <Typography className={classNames.shortInfoValue}>{toFixedWithDollarSign(item.price, 2)}</Typography>
              }
            />
            <Field
              labelClasses={classNames.shortInfoLabel}
              containerClasses={classNames.shortInfoContainer}
              label={t(TranslationKey['Average. Monthly net profit'])}
              inputComponent={
                <Typography className={classNames.shortInfoValue}>
                  {toFixedWithDollarSign(item.monthlyPureProfit, 2)}
                </Typography>
              }
            />
            <Field
              labelClasses={classNames.shortInfoLabel}
              containerClasses={classNames.shortInfoContainer}
              label={t(TranslationKey['Average. Monthly income'])}
              inputComponent={
                <Typography className={classNames.shortInfoValue}>
                  {toFixedWithDollarSign(item.monthlyProfit, 2)}
                </Typography>
              }
            />
            {/* <Field
              labelClasses={classNames.shortInfoLabel}
              containerClasses={classNames.shortInfoContainer}
              label={'Монетизация'}
              inputComponent={<Typography className={classNames.shortInfoValue}>{item.monetization}</Typography>}
            /> */}
            <Field
              labelClasses={classNames.shortInfoLabel}
              containerClasses={classNames.shortInfoContainer}
              label={t(TranslationKey['Monthly multiplier'])}
              inputComponent={
                <Typography className={classNames.shortInfoValue}>{`${item.monthlyMultiplier}x`}</Typography>
              }
            />
            <Field
              labelClasses={classNames.shortInfoLabel}
              containerClasses={classNames.shortInfoContainer}
              label={t(TranslationKey['Business is made'])}
              inputComponent={<Typography className={classNames.shortInfoValue}>{item.businessStartYear}</Typography>}
            />
          </div>

          <Typography className={classNames.description}>{item.shopDetails}</Typography>

          <div className={classNames.footer}>
            <div className={classNames.footerInfoWrapper}>
              <Field
                oneLine
                labelClasses={classNames.shortInfoLabel}
                containerClasses={classNames.footerInfoContainer}
                label={t(TranslationKey['Profit (12 months)'])}
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
                label={t(TranslationKey['Income (12 months)'])}
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
                label={t(TranslationKey['Traffic (12 months)'])}
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
