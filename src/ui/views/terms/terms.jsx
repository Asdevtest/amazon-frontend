import { withStyles } from 'tss-react/mui'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { styles } from './terms.style'

export const TermsRaw = props => {
  // const [viewModel] = useState(() => new TermsViewModel({ history: props.history }));
  const { classes: classNames } = props

  return (
    <div className={classNames.root}>
      <Typography variant="h1">{t(TranslationKey['Coming soon...'])}</Typography>
    </div>
  )
}

export const TermsView = withStyles(TermsRaw, styles)
