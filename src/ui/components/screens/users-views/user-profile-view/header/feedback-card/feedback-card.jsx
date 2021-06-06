import React from 'react'

import {Paper, Typography} from '@material-ui/core'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './feedback-card.style'

const textConsts = getLocalizedTexts(texts, 'ru').buerUserFeedbackCard

export const FeedbackCard = ({isPositive, counter}) => {
  const classNames = useClassNames()
  return (
    <Paper
      className={clsx(classNames.paper, {
        [classNames.selected]: isPositive === true,
      })}
    >
      <div className={classNames.thumbContainer}>
        <Typography
          className={clsx(classNames.countTypo, {
            [classNames.selectedCount]: isPositive === true,
          })}
        >
          {isPositive ? '+' + counter : '-' + counter}
        </Typography>

        <ThumbUpAltOutlinedIcon
          className={clsx(classNames.thumbUpAltOutlinedIcon, {
            [classNames.selectedThumbUpAlt]: isPositive === true,
          })}
        />
      </div>
      <Typography className={classNames.text}>
        {isPositive ? textConsts.positiveReview : textConsts.negativeReview}
      </Typography>
    </Paper>
  )
}
