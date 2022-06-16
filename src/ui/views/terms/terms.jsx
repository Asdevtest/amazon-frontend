import {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {t} from '@utils/translations'

import {TermsViewModel} from './terms.model'
import {styles} from './terms.style'

@observer
class TermsRaw extends Component {
  viewModel = new TermsViewModel({history: this.props.history})
  render() {
    const {classes: classNames} = this.props

    return (
      <div className={classNames.root}>
        <Typography variant="h1">{t(TranslationKey['Coming soon...'])}</Typography>
      </div>
    )
  }
}

export const TermsView = withStyles(styles)(TermsRaw)
