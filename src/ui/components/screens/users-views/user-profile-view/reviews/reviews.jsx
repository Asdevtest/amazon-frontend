import React from 'react'

import {Tab, Tabs, Typography, Paper} from '@material-ui/core'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './reviews.style'

const textConsts = getLocalizedTexts(texts, 'ru').buerUserReviews

export const Reviews = ({tabReview, setTabReview}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.mainWrapper}>
      <Typography variant="h6" className={classNames.mainTitle}>
        {textConsts.mainTitle}
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
            className={clsx(classNames.text, {
              [classNames.selected]: tabReview === 0,
            })}
            index={0}
            label={textConsts.all}
          />
          <Tab
            className={clsx(classNames.text, {
              [classNames.selected]: tabReview === 1,
            })}
            index={1}
            label={textConsts.fromBuyers}
          />

          <Tab
            className={clsx(classNames.text, {
              [classNames.selected]: tabReview === 2,
            })}
            index={2}
            label={textConsts.fromSellers}
          />
        </Tabs>

        <div className={classNames.tabContent} role="tabpanel">
          <div className={classNames.subTabWrapper}>
            <Typography className={(classNames.text, classNames.typoNoReviews)}>{textConsts.noReviews}</Typography>
          </div>
        </div>
      </Paper>
    </div>
  )
}
