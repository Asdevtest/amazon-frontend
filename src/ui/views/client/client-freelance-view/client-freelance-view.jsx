import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { styles } from './client-freelance-view.style'

import { ClientFreelanceViewModel } from './client-freelance-view.model'

export const ClientFreelanceViewRaw = props => {
  const [viewModel] = useState(() => new ClientFreelanceViewModel({ history: props.history }))

  const { classes: styles } = props

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Freelance'])}</p>

      <div className={styles.btnsWrapper}>
        <Button className={styles.button} variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickServiceExchange}>
          <div className={styles.btnTextWrapper}>
            <p className={styles.btnText}>{t(TranslationKey['Service exchange'])}</p>
            <ArrowRightAltIcon color="primary" />
          </div>
        </Button>

        <Button className={styles.button} variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickMyRequests}>
          <div className={styles.btnTextWrapper}>
            <p className={styles.btnText}>{t(TranslationKey['My requests'])}</p>
            <ArrowRightAltIcon color="primary" />
          </div>
        </Button>
      </div>
    </>
  )
}

export const ClientFreelanceView = withStyles(observer(ClientFreelanceViewRaw), styles)
