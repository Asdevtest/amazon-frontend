

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import { Grid, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { getYearDate } from '@utils/date-time'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './trading-shop-card.style'

export const TradingShopCard = ({ item, onClickViewMore }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <Grid item className={styles.mainWrapper}>
      <div className={styles.cardWrapper}>
        <div className={styles.photoWrapper}>
          <PhotoAndFilesSlider withoutFiles files={item.files} />
        </div>

        <div className={styles.subWrapper}>
          <div className={styles.titleWrapper}>
            <Typography className={styles.title}>{item.title}</Typography>

            <div className={styles.statusWrapper}>
              <Typography className={styles.status}>{'Продается'}</Typography>
              <FiberManualRecordRoundedIcon classes={{ root: styles.statusIcon }} fontSize="small" />
            </div>
          </div>

          <div className={styles.shortInfoWrapper}>
            <Field
              labelClasses={styles.shortInfoLabel}
              containerClasses={styles.shortInfoContainer}
              label={t(TranslationKey['Total price'])}
              inputComponent={
                <Typography className={styles.shortInfoValue}>{toFixedWithDollarSign(item.price, 2)}</Typography>
              }
            />
            <Field
              labelClasses={styles.shortInfoLabel}
              containerClasses={styles.shortInfoContainer}
              label={t(TranslationKey['Average. Monthly net profit'])}
              inputComponent={
                <Typography className={styles.shortInfoValue}>
                  {toFixedWithDollarSign(item.statistics.monthlyPureProfit, 2)}
                </Typography>
              }
            />
            <Field
              labelClasses={styles.shortInfoLabel}
              containerClasses={styles.shortInfoContainer}
              label={t(TranslationKey['Average. Monthly income'])}
              inputComponent={
                <Typography className={styles.shortInfoValue}>
                  {toFixedWithDollarSign(item.statistics.monthlyProfit, 2)}
                </Typography>
              }
            />
            {/* <Field
              labelClasses={styles.shortInfoLabel}
              containerClasses={styles.shortInfoContainer}
              label={'Монетизация'}
              inputComponent={<Typography className={styles.shortInfoValue}>{item.monetization}</Typography>}
            /> */}
            <Field
              labelClasses={styles.shortInfoLabel}
              containerClasses={styles.shortInfoContainer}
              label={t(TranslationKey['Monthly multiplier'])}
              inputComponent={
                <Typography className={styles.shortInfoValue}>{`${toFixed(
                  item.price / item.statistics.monthlyPureProfit,
                  2,
                )}x`}</Typography>
              }
            />
            <Field
              labelClasses={styles.shortInfoLabel}
              containerClasses={styles.shortInfoContainer}
              label={t(TranslationKey['Business is made'])}
              inputComponent={
                <Typography className={styles.shortInfoValue}>{getYearDate(item.businessStartDate)}</Typography>
              }
            />
          </div>

          <Typography className={styles.description}>{item.shopDetails}</Typography>

          <div className={styles.footer}>
            <div className={styles.footerInfoWrapper}>
              <Field
                oneLine
                labelClasses={styles.shortInfoLabel}
                containerClasses={styles.footerInfoContainer}
                label={t(TranslationKey['Profit (12 months)'])}
                inputComponent={
                  <div className={styles.percentWrapper}>
                    {item.statistics.monthlyPureProfitDiffPercentage < 0 ? (
                      <ArrowDropDownIcon color="error" />
                    ) : (
                      <ArrowDropUpIcon className={styles.green} />
                    )}
                    <Typography
                      className={cx(styles.green, {
                        [styles.red]: item.statistics.monthlyPureProfitDiffPercentage < 0,
                      })}
                    >{`${toFixed(item.statistics.monthlyPureProfitDiffPercentage)} %`}</Typography>
                  </div>
                }
              />
              <Field
                oneLine
                labelClasses={styles.shortInfoLabel}
                containerClasses={styles.footerInfoContainer}
                label={t(TranslationKey['Income (12 months)'])}
                inputComponent={
                  <div className={styles.percentWrapper}>
                    {item.statistics.monthlyProfitDiffPercentage < 0 ? (
                      <ArrowDropDownIcon color="error" />
                    ) : (
                      <ArrowDropUpIcon className={styles.green} />
                    )}
                    <Typography
                      className={cx(styles.green, {
                        [styles.red]: item.statistics.monthlyProfitDiffPercentage < 0,
                      })}
                    >{`${toFixed(item.statistics.monthlyProfitDiffPercentage)} %`}</Typography>
                  </div>
                }
              />
              <Field
                oneLine
                labelClasses={styles.shortInfoLabel}
                containerClasses={styles.footerInfoContainer}
                label={t(TranslationKey['Traffic (12 months)'])}
                inputComponent={
                  <div className={styles.percentWrapper}>
                    {item.statistics.webpageVisitsDiffPercentage < 0 ? (
                      <ArrowDropDownIcon color="error" />
                    ) : (
                      <ArrowDropUpIcon className={styles.green} />
                    )}
                    <Typography
                      className={cx(styles.green, {
                        [styles.red]: item.statistics.webpageVisitsDiffPercentage < 0,
                      })}
                    >{`${toFixed(item.statistics.webpageVisitsDiffPercentage)} %`}</Typography>
                  </div>
                }
              />
            </div>

            <div className={styles.buttonWrapper}>
              <Button
                tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
                variant="contained"
                color="primary"
                className={styles.actionButton}
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
