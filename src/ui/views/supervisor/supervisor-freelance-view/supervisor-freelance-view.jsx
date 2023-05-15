import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {MainContent} from '@components/layout/main-content'
import {Button} from '@components/shared/buttons/button'

import {t} from '@utils/translations'

import {SupervisorFreelanceViewModel} from './supervisor-freelance-view.model'
import {styles} from './supervisor-freelance-view.style'

@observer
class SupervisorFreelanceViewRaw extends Component {
  viewModel = new SupervisorFreelanceViewModel({history: this.props.history})

  render() {
    const {onClickVacantDeals, onClickDealsOnReview} = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <div>
            <Typography className={classNames.title}>{t(TranslationKey['Choose a section in Freelance'])}</Typography>

            <div className={classNames.btnsWrapper}>
              <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickVacantDeals}>
                <div className={classNames.btnTextWrapper}>
                  <Typography className={classNames.btnText}>{t(TranslationKey['Vacant deals'])}</Typography>
                  <ArrowRightAltIcon color="primary" />
                </div>
              </Button>

              <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickDealsOnReview}>
                <div className={classNames.btnTextWrapper}>
                  <Typography className={classNames.btnText}>{t(TranslationKey['Deals on review'])}</Typography>
                  <ArrowRightAltIcon color="primary" />
                </div>
              </Button>
            </div>
          </div>
        </MainContent>
      </React.Fragment>
    )
  }
}

export const SupervisorFreelanceView = withStyles(SupervisorFreelanceViewRaw, styles)
