import { cx } from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import { Grid, Typography } from '@mui/material'

import React from 'react'

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { PhotoCarousel } from '@components/shared/photo-carousel'
import { Field } from '@components/shared/field'

import { getYearDate } from '@utils/date-time'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './trading-shop-card.style'

export const TradingShopCard = ({ item, onClickViewMore }) => {
  const { classes: classNames } = useClassNames()

  return (
    <Grid item className={classNames.mainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.photoWrapper}>
          <PhotoCarousel files={item.files} alignButtons="end" imageClass={classNames.carouselImage} />
        </div>

        <div className={classNames.subWrapper}>
          <div className={classNames.titleWrapper}>
            <Typography className={classNames.title}>{item.title}</Typography>

            <div className={classNames.statusWrapper}>
              <Typography className={classNames.status}>{'Продается'}</Typography>
              <FiberManualRecordRoundedIcon classes={{ root: classNames.statusIcon }} fontSize="small" />
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
                  {toFixedWithDollarSign(item.statistics.monthlyPureProfit, 2)}
                </Typography>
              }
            />
            <Field
              labelClasses={classNames.shortInfoLabel}
              containerClasses={classNames.shortInfoContainer}
              label={t(TranslationKey['Average. Monthly income'])}
              inputComponent={
                <Typography className={classNames.shortInfoValue}>
                  {toFixedWithDollarSign(item.statistics.monthlyProfit, 2)}
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
                <Typography className={classNames.shortInfoValue}>{`${toFixed(
                  item.price / item.statistics.monthlyPureProfit,
                  2,
                )}x`}</Typography>
              }
            />
            <Field
              labelClasses={classNames.shortInfoLabel}
              containerClasses={classNames.shortInfoContainer}
              label={t(TranslationKey['Business is made'])}
              inputComponent={
                <Typography className={classNames.shortInfoValue}>{getYearDate(item.businessStartDate)}</Typography>
              }
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
                  <div className={classNames.percentWrapper}>
                    {item.statistics.monthlyPureProfitDiffPercentage < 0 ? (
                      <ArrowDropDownIcon color="error" />
                    ) : (
                      <ArrowDropUpIcon className={classNames.green} />
                    )}
                    <Typography
                      className={cx(classNames.green, {
                        [classNames.red]: item.statistics.monthlyPureProfitDiffPercentage < 0,
                      })}
                    >{`${toFixed(item.statistics.monthlyPureProfitDiffPercentage)} %`}</Typography>
                  </div>
                }
              />
              <Field
                oneLine
                labelClasses={classNames.shortInfoLabel}
                containerClasses={classNames.footerInfoContainer}
                label={t(TranslationKey['Income (12 months)'])}
                inputComponent={
                  <div className={classNames.percentWrapper}>
                    {item.statistics.monthlyProfitDiffPercentage < 0 ? (
                      <ArrowDropDownIcon color="error" />
                    ) : (
                      <ArrowDropUpIcon className={classNames.green} />
                    )}
                    <Typography
                      className={cx(classNames.green, {
                        [classNames.red]: item.statistics.monthlyProfitDiffPercentage < 0,
                      })}
                    >{`${toFixed(item.statistics.monthlyProfitDiffPercentage)} %`}</Typography>
                  </div>
                }
              />
              <Field
                oneLine
                labelClasses={classNames.shortInfoLabel}
                containerClasses={classNames.footerInfoContainer}
                label={t(TranslationKey['Traffic (12 months)'])}
                inputComponent={
                  <div className={classNames.percentWrapper}>
                    {item.statistics.webpageVisitsDiffPercentage < 0 ? (
                      <ArrowDropDownIcon color="error" />
                    ) : (
                      <ArrowDropUpIcon className={classNames.green} />
                    )}
                    <Typography
                      className={cx(classNames.green, {
                        [classNames.red]: item.statistics.webpageVisitsDiffPercentage < 0,
                      })}
                    >{`${toFixed(item.statistics.webpageVisitsDiffPercentage)} %`}</Typography>
                  </div>
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
