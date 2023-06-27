import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import { Box, Link, Typography } from '@mui/material'

import React from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { LinesChart } from '@components/shared/charts/lines-chart/lines-chart'
import { PhotoCarousel } from '@components/shared/photo-carousel'
import { Field } from '@components/shared/field/field'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './shop-info.style'

export const ShopInfo = observer(({ userInfo, data, onClickEditBtn }) => {
  const { classes: classNames } = useClassNames()

  const averageGrossIncome =
    data.statistics.reduce((acc, cur) => (acc += +cur.grossIncome), 0) /
      data.statistics.reduce((acc, cur) => (acc += cur.grossIncome ? 1 : 0), 0) || 0

  const averagePureIncome =
    data.statistics.reduce((acc, cur) => (acc += +cur.pureIncome), 0) /
      data.statistics.reduce((acc, cur) => (acc += cur.pureIncome ? 1 : 0), 0) || 0

  const profitability = averagePureIncome / (averageGrossIncome / 100) || 0

  const monthlyMultiplier = data.price / averagePureIncome || 0

  return (
    <Box className={classNames.shopInfoWrapper}>
      <div className={classNames.shopInfoTopWrapper}>
        <div className={classNames.photosWrapper}>
          <PhotoCarousel files={data.files} />
        </div>
        <div className={classNames.rightSideWrapper}>
          <div className={classNames.rightSideHeader}>
            <Typography className={classNames.shopTitle}>{data.title}</Typography>
            <div className={classNames.statusWrapper}>
              <Typography className={classNames.cardTitle}>{t(TranslationKey['For sale'])}</Typography>
              <FiberManualRecordRoundedIcon color="success" />
            </div>
          </div>
          <div>
            <Link target="__blank" href={data.shopLink} className={classNames.link}>
              {t(TranslationKey['Go to the store website'])}
            </Link>
          </div>
          <div className={classNames.shortInfoWrapper}>
            <div>
              <Field
                labelClasses={classNames.shortInfoLabel}
                containerClasses={classNames.shortInfoContainer}
                label={t(TranslationKey['Price period'])}
                inputComponent={
                  <Typography className={classNames.shortInfoValue}>{`${data.statistics.length} месяцев`}</Typography>
                }
              />
            </div>
            <div>
              <Field
                labelClasses={classNames.shortInfoLabel}
                containerClasses={classNames.shortInfoContainer}
                label={t(TranslationKey['Monthly multiplier'])}
                inputComponent={
                  <Typography className={classNames.shortInfoValue}>{`${toFixed(monthlyMultiplier, 2)} х`}</Typography>
                }
              />
            </div>

            <div>
              <Field
                labelClasses={classNames.shortInfoLabel}
                containerClasses={classNames.shortInfoContainer}
                label={t(TranslationKey.Price)}
                inputComponent={<Typography className={classNames.shortInfoValue}>{`${data.price} $`}</Typography>}
              />
            </div>
          </div>
          <div className={classNames.buttonsWrapper}>
            {userInfo._id === data.ownerId ? (
              <>
                <Button className={classNames.editButton} onClick={onClickEditBtn}>
                  {t(TranslationKey.Edit)}
                </Button>
                <Button disabled danger className={classNames.deleteButton}>
                  {t(TranslationKey['Delete ad'])}
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className={classNames.shopInfoBottomWrapper}>
        <div className={classNames.chartsWrapper}>
          <div>
            <Field
              label={t(TranslationKey['Average. Monthly net profit'])}
              labelClasses={classNames.chartLabel}
              inputComponent={
                <div className={classNames.chart}>
                  <Typography className={classNames.profit}>{toFixed(averageGrossIncome, 2) + ' $'}</Typography>
                  <LinesChart data={data.profitForTheReportingPeriod} />
                </div>
              }
            />
          </div>
          <div>
            <Field
              label={t(TranslationKey['Average. Monthly income'])}
              labelClasses={classNames.chartLabel}
              inputComponent={
                <div className={classNames.chart}>
                  <Typography className={classNames.profit}>{toFixed(averagePureIncome, 2) + ' $'}</Typography>
                  <LinesChart profit data={data.profitForTheReportingPeriod} />
                </div>
              }
            />
          </div>
          <div>
            <Field
              label={t(TranslationKey.Profitability)}
              labelClasses={classNames.chartLabel}
              inputComponent={
                <div className={classNames.chart}>
                  <Typography className={classNames.profitability}>{toFixed(profitability, 2) + ' %'}</Typography>
                  <Link>{t(TranslationKey['View profit'])}</Link>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </Box>
  )
})
