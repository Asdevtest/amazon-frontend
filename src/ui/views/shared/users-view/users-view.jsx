import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { styles } from './users-view.style'

import { UsersViewModel } from './users-view.model'

export const UsersViewRaw = props => {
  const [viewModel] = useState(() => new UsersViewModel({ history: props.history }))
  const { classes: styles } = props

  return (
    <>
      <div>
        <Typography className={styles.title}>{t(TranslationKey['Choose a section in Users'])}</Typography>

        <div className={styles.btnsWrapper}>
          <Button className={styles.button} styleType={ButtonType.SUCCESS} onClick={viewModel.onClickSubUsers}>
            <div className={styles.btnTextWrapper}>
              <Typography className={styles.btnText}>{t(TranslationKey['My users'])}</Typography>
              <ArrowRightAltIcon color="primary" />
            </div>
          </Button>
        </div>
      </div>
    </>
  )
}

export const UsersView = withStyles(observer(UsersViewRaw), styles)
