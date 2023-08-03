import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { styles } from './supervisor-freelance-view.style'

import { SupervisorFreelanceViewModel } from './supervisor-freelance-view.model'

export const SupervisorFreelanceViewRaw = props => {
  const [viewModel] = useState(() => new SupervisorFreelanceViewModel({ history: props.history }))
  const { classes: classNames } = props

  return (
    <React.Fragment>
      <div>
        <div>
          <Typography className={classNames.title}>{t(TranslationKey['Choose a section in Freelance'])}</Typography>

          <div className={classNames.btnsWrapper}>
            <Button
              className={classNames.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickVacantDeals}
            >
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey['Vacant deals'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button
              className={classNames.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickDealsOnReview}
            >
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey['Deals on review'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export const SupervisorFreelanceView = withStyles(observer(SupervisorFreelanceViewRaw), styles)
