/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {Typography, Avatar} from '@mui/material'
import Rating from '@mui/material/Rating'

import React from 'react'

import {
  RequestProposalStatus,
  RequestProposalStatusColor,
  RequestProposalStatusTranslate,
} from '@constants/request-proposal-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {PhotoCarousel} from '@components/custom-carousel/custom-carousel'
import {UserLink} from '@components/user-link'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {minsToTime, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './scroll-to-top-or-bottom.style'

export const ScrollToTopOrBottom = ({customStyles}) => {
  const {classes: classNames} = useClassNames()

  return (
    <div style={customStyles} className={classNames.root}>
      <KeyboardArrowUpIcon className={classNames.arrowIcon} />
    </div>
  )
}
