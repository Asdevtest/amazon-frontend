import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { styles } from './client-freelance-view.style'

import { ClientFreelanceViewModel } from './client-freelance-view.model'

export const ClientFreelanceViewRaw = props => {
  const viewModel = useMemo(() => new ClientFreelanceViewModel({ history: props.history }), [])

  const { classes: styles } = props

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Freelance'])}</p>

      <div className={styles.btnsWrapper}>
        <CustomButton variant="outlined" onClick={viewModel.onClickServiceExchange}>
          {t(TranslationKey['Service exchange'])}
        </CustomButton>

        <CustomButton variant="outlined" onClick={viewModel.onClickMyRequests}>
          {t(TranslationKey['My requests'])}
        </CustomButton>
      </div>
    </>
  )
}

export const ClientFreelanceView = withStyles(observer(ClientFreelanceViewRaw), styles)
