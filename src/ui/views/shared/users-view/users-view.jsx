import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {MainContent} from '@components/layout/main-content'
import {Button} from '@components/shared/buttons/button'

import {t} from '@utils/translations'

import {UsersViewModel} from './users-view.model'
import {styles} from './users-view.style'

@observer
class UsersViewRaw extends Component {
  viewModel = new UsersViewModel({history: this.props.history})

  render() {
    const {onClickSubUsers} = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <div>
            <Typography className={classNames.title}>{t(TranslationKey['Choose a section in Users'])}</Typography>

            <div className={classNames.btnsWrapper}>
              <Button className={classNames.button} color="primary" variant="outlined" onClick={onClickSubUsers}>
                <div className={classNames.btnTextWrapper}>
                  <Typography className={classNames.btnText}>{t(TranslationKey['My users'])}</Typography>
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

export const UsersView = withStyles(UsersViewRaw, styles)
