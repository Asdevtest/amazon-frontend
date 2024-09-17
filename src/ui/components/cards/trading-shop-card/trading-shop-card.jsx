import { MdArrowDropDown, MdArrowDropUp, MdOutlineFiberManualRecord } from 'react-icons/md'

import { Grid } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'

import { getYearDate } from '@utils/date-time'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './trading-shop-card.style'

export const TradingShopCard = ({ item, onClickViewMore }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <Grid item className={styles.mainWrapper}>
      <div className={styles.cardWrapper}>
        <SlideshowGallery files={item.files} />

        <div className={styles.subWrapper}>
          <div className={styles.titleWrapper}>
            <p className={styles.title}>{item.title}</p>

            <div className={styles.statusWrapper}>
              <p className={styles.status}>{'Продается'}</p>
              <MdOutlineFiberManualRecord className={styles.statusIcon} size={12} />
            </div>
          </div>

          <div className={styles.shortInfoWrapper}>
            <Field
              labelClasses={styles.shortInfoLabel}
              containerClasses={styles.shortInfoContainer}
              label={t(TranslationKey['Total price'])}
              inputComponent={<p className={styles.shortInfoValue}>{toFixedWithDollarSign(item.price, 2)}</p>}
            />
            <Field
              labelClasses={styles.shortInfoLabel}
              containerClasses={styles.shortInfoContainer}
              label={t(TranslationKey['Average. Monthly net profit'])}
              inputComponent={
                <p className={styles.shortInfoValue}>{toFixedWithDollarSign(item.statistics.monthlyPureProfit, 2)}</p>
              }
            />
            <Field
              labelClasses={styles.shortInfoLabel}
              containerClasses={styles.shortInfoContainer}
              label={t(TranslationKey['Average. Monthly income'])}
              inputComponent={
                <p className={styles.shortInfoValue}>{toFixedWithDollarSign(item.statistics.monthlyProfit, 2)}</p>
              }
            />
            {/* <Field
              labelClasses={styles.shortInfoLabel}
              containerClasses={styles.shortInfoContainer}
              label={'Монетизация'}
              inputComponent={<p className={styles.shortInfoValue}>{item.monetization}</p>}
            /> */}
            <Field
              labelClasses={styles.shortInfoLabel}
              containerClasses={styles.shortInfoContainer}
              label={t(TranslationKey['Monthly multiplier'])}
              inputComponent={
                <p className={styles.shortInfoValue}>{`${toFixed(
                  item.price / item.statistics.monthlyPureProfit,
                  2,
                )}x`}</p>
              }
            />
            <Field
              labelClasses={styles.shortInfoLabel}
              containerClasses={styles.shortInfoContainer}
              label={t(TranslationKey['Business is made'])}
              inputComponent={<p className={styles.shortInfoValue}>{getYearDate(item.businessStartDate)}</p>}
            />
          </div>

          <p className={styles.description}>{item.shopDetails}</p>

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
                      <MdArrowDropDown size={22} className={styles.red} />
                    ) : (
                      <MdArrowDropUp size={22} className={styles.green} />
                    )}
                    <p
                      className={cx(styles.green, {
                        [styles.red]: item.statistics.monthlyPureProfitDiffPercentage < 0,
                      })}
                    >{`${toFixed(item.statistics.monthlyPureProfitDiffPercentage)} %`}</p>
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
                      <MdArrowDropDown size={22} className={styles.red} />
                    ) : (
                      <MdArrowDropUp size={22} className={styles.green} />
                    )}
                    <p
                      className={cx(styles.green, {
                        [styles.red]: item.statistics.monthlyProfitDiffPercentage < 0,
                      })}
                    >{`${toFixed(item.statistics.monthlyProfitDiffPercentage)} %`}</p>
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
                      <MdArrowDropDown size={22} className={styles.red} />
                    ) : (
                      <MdArrowDropUp size={22} className={styles.green} />
                    )}
                    <p
                      className={cx(styles.green, {
                        [styles.red]: item.statistics.webpageVisitsDiffPercentage < 0,
                      })}
                    >{`${toFixed(item.statistics.webpageVisitsDiffPercentage)} %`}</p>
                  </div>
                }
              />
            </div>

            <div className={styles.buttonWrapper}>
              <Button
                tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
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
