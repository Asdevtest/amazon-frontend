import { observer } from 'mobx-react'
import { useState } from 'react'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { ArrowRightIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './users-view.style'

import { UsersViewModel } from './users-view.model'

export const UsersView = observer(props => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new UsersViewModel({ history: props.history }))

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Users'])}</p>

      <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickSubUsers}>
        {t(TranslationKey['My users'])}
        <ArrowRightIcon />
      </Button>
    </>
  )
})
