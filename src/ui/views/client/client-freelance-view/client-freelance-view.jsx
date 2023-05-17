import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {MainContent} from '@components/layout/main-content'
import {Button} from '@components/shared/buttons/button'

import {t} from '@utils/translations'

import {ClientFreelanceViewModel} from './client-freelance-view.model'
import {styles} from './client-freelance-view.style'

@observer
class ClientFreelanceViewRaw extends Component {
  viewModel = new ClientFreelanceViewModel({history: this.props.history})

  render() {
    const {onClickMyRequests, onClickServiceExchange} = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <div>
            <Typography className={classNames.title}>{t(TranslationKey['Choose a section in Freelance'])}</Typography>

            <div className={classNames.btnsWrapper}>
              <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickMyRequests}>
                <div className={classNames.btnTextWrapper}>
                  <Typography className={classNames.btnText}>{t(TranslationKey['My requests'])}</Typography>
                  <ArrowRightAltIcon color="primary" />
                </div>
              </Button>

              {/* <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickVacRequests}>
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['Vacant requests'])}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button> */}
              {/* <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickMyProposals}>
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey['My proposals'])}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button> */}

              <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickServiceExchange}>
                <div className={classNames.btnTextWrapper}>
                  <Typography className={classNames.btnText}>{t(TranslationKey['Service exchange'])}</Typography>
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

export const ClientFreelanceView = withStyles(ClientFreelanceViewRaw, styles)
