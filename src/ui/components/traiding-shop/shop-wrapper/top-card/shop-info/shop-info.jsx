import { memo } from 'react'

import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import { Link, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { LinesChart } from '@components/shared/charts/lines-chart/lines-chart'
import { Field } from '@components/shared/field/field'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { checkAndMakeAbsoluteUrl, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './shop-info.style'

export const ShopInfo = memo(({ userInfo, data, onClickEditBtn }) => {
  const { classes: styles } = useStyles()

  const averageGrossIncome =
    data.statistics.reduce((acc, cur) => (acc += +cur.grossIncome), 0) /
      data.statistics.reduce((acc, cur) => (acc += cur.grossIncome ? 1 : 0), 0) || 0

  const averagePureIncome =
    data.statistics.reduce((acc, cur) => (acc += +cur.pureIncome), 0) /
      data.statistics.reduce((acc, cur) => (acc += cur.pureIncome ? 1 : 0), 0) || 0

  const profitability = averagePureIncome / (averageGrossIncome / 100) || 0

  const monthlyMultiplier = data.price / averagePureIncome || 0

  return (
    <div>
      <div className={styles.shopInfoTopWrapper}>
        <div className={styles.photosWrapper}>
          <PhotoAndFilesSlider withoutFiles files={data.files} />
        </div>
        <div className={styles.rightSideWrapper}>
          <div className={styles.rightSideHeader}>
            <Typography className={styles.shopTitle}>{data.title}</Typography>
            <div className={styles.statusWrapper}>
              <Typography className={styles.cardTitle}>{t(TranslationKey['For sale'])}</Typography>
              <FiberManualRecordRoundedIcon color="success" />
            </div>
          </div>
          <div>
            <Link target="__blank" href={checkAndMakeAbsoluteUrl(data.shopLink)} className={styles.link}>
              {t(TranslationKey['Go to the store website'])}
            </Link>
          </div>
          <div className={styles.shortInfoWrapper}>
            <div>
              <Field
                labelClasses={styles.shortInfoLabel}
                containerClasses={styles.shortInfoContainer}
                label={t(TranslationKey['Price period'])}
                inputComponent={
                  <Typography className={styles.shortInfoValue}>{`${data.statistics.length} месяцев`}</Typography>
                }
              />
            </div>
            <div>
              <Field
                labelClasses={styles.shortInfoLabel}
                containerClasses={styles.shortInfoContainer}
                label={t(TranslationKey['Monthly multiplier'])}
                inputComponent={
                  <Typography className={styles.shortInfoValue}>{`${toFixed(monthlyMultiplier, 2)} х`}</Typography>
                }
              />
            </div>

            <div>
              <Field
                labelClasses={styles.shortInfoLabel}
                containerClasses={styles.shortInfoContainer}
                label={t(TranslationKey.Price)}
                inputComponent={<Typography className={styles.shortInfoValue}>{`${data.price} $`}</Typography>}
              />
            </div>
          </div>
          <div className={styles.buttonsWrapper}>
            {userInfo._id === data.ownerId ? (
              <>
                <Button className={styles.editButton} onClick={onClickEditBtn}>
                  {t(TranslationKey.Edit)}
                </Button>
                <Button disabled type={ButtonType.DANGER} className={styles.deleteButton}>
                  {t(TranslationKey['Delete ad'])}
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.shopInfoBottomWrapper}>
        <div className={styles.chartsWrapper}>
          <div>
            <Field
              label={t(TranslationKey['Average. Monthly net profit'])}
              labelClasses={styles.chartLabel}
              inputComponent={
                <div className={styles.chart}>
                  <Typography className={styles.profit}>{toFixed(averageGrossIncome, 2) + ' $'}</Typography>
                  <LinesChart data={data.profitForTheReportingPeriod} />
                </div>
              }
            />
          </div>
          <div>
            <Field
              label={t(TranslationKey['Average. Monthly income'])}
              labelClasses={styles.chartLabel}
              inputComponent={
                <div className={styles.chart}>
                  <Typography className={styles.profit}>{toFixed(averagePureIncome, 2) + ' $'}</Typography>
                  <LinesChart profit data={data.profitForTheReportingPeriod} />
                </div>
              }
            />
          </div>
          <div>
            <Field
              label={t(TranslationKey.Profitability)}
              labelClasses={styles.chartLabel}
              inputComponent={
                <div className={styles.chart}>
                  <Typography className={styles.profitability}>{toFixed(profitability, 2) + ' %'}</Typography>
                  <Link>{t(TranslationKey['View profit'])}</Link>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
})
