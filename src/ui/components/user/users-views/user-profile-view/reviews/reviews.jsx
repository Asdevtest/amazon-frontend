import { cx } from '@emotion/css'
import { Tab, Tabs, Typography, Paper } from '@mui/material'

import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useClassNames } from './reviews.style'

export const Reviews = ({ tabReview, setTabReview }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.mainWrapper}>
      <Typography variant="h6" className={classNames.mainTitle}>
        {t(TranslationKey.Reviews)}
      </Typography>
      <Paper>
        <Tabs
          value={tabReview}
          aria-label="label tabs"
          classes={{
            flexContainer: classNames.tabsHeadContainer,
            indicator: classNames.tabsIndicator,
          }}
          onChange={(e, newValue) => setTabReview(newValue)}
        >
          <Tab
            className={cx(classNames.text, {
              [classNames.selected]: tabReview === 0,
            })}
            index={0}
            label={t(TranslationKey.All)}
          />
          <Tab
            className={cx(classNames.text, {
              [classNames.selected]: tabReview === 1,
            })}
            index={1}
            label={t(TranslationKey['From buyers'])}
          />

          <Tab
            className={cx(classNames.text, {
              [classNames.selected]: tabReview === 2,
            })}
            index={2}
            label={t(TranslationKey['From the sellers'])}
          />
        </Tabs>

        <div className={classNames.tabContent} role="tabpanel">
          <div className={classNames.subTabWrapper}>
            <Typography className={cx(classNames.text, classNames.typoNoReviews)}>
              {t(TranslationKey['No transaction history found'])}
            </Typography>
          </div>
        </div>
      </Paper>
    </div>
  )
}
