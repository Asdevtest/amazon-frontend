import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

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
        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickServiceExchange}>
          {t(TranslationKey['Service exchange'])}
        </Button>

        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickMyRequests}>
          {t(TranslationKey['My requests'])}
        </Button>
      </div>
    </>
  )
}

export const ClientFreelanceView = withStyles(observer(ClientFreelanceViewRaw), styles)
