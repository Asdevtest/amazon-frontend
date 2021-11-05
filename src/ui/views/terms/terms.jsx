import {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {TermsViewModel} from './terms.model'
import {styles} from './terms.style'

const textConsts = getLocalizedTexts(texts, 'en').termsScreen

@observer
class TermsRaw extends Component {
  viewModel = new TermsViewModel({history: this.props.history})
  render() {
    const {classes: classNames} = this.props

    return (
      <div className={classNames.root}>
        <Typography variant="h1">{textConsts.soon}</Typography>
      </div>
    )
  }
}

export const TermsView = withStyles(styles)(TermsRaw)
