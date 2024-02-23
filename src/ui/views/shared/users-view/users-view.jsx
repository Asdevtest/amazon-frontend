import { observer } from 'mobx-react'
import { useState } from 'react'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './users-view.style'

import { UsersViewModel } from './users-view.model'

export const UsersView = observer(props => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new UsersViewModel({ history: props.history }))

  return (
    <>
      <Typography className={styles.title}>{t(TranslationKey['Choose a section in Users'])}</Typography>

      <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickSubUsers}>
        {t(TranslationKey['My users'])}
        <ArrowRightAltIcon />
      </Button>
    </>
  )
})
