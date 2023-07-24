import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { MainContent } from '@components/layout/main-content'
import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { styles } from './freelancer-freelance-view.style'

import { FreelancerFreelanceViewModel } from './freelancer-freelance-view.model'

export const FreelancerFreelanceViewRaw = props => {
  const [viewModel] = useState(() => new FreelancerFreelanceViewModel({ history: props.history }))
  const { classes: classNames } = props

  return (
    <React.Fragment>
      <MainContent>
        <div>
          <Typography className={classNames.title}>{t(TranslationKey['Choose a section in Freelance'])}</Typography>

          <div className={classNames.btnsWrapper}>
            <Button
              className={classNames.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickVacRequests}
            >
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey['Vacant requests'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
            <Button
              className={classNames.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickMyProposals}
            >
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey['My proposals'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
          </div>
        </div>
      </MainContent>
    </React.Fragment>
  )
}

export const FreelancerFreelanceView = withStyles(observer(FreelancerFreelanceViewRaw), styles)
