import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ClientFreelanceViewModel } from './client-freelance-view.model'
import { styles } from './client-freelance-view.style'

export const ClientFreelanceViewRaw = props => {
  const [viewModel] = useState(() => new ClientFreelanceViewModel({ history: props.history }))

  const { classes: classNames } = props

  return (
    <>
      <p className={classNames.title}>{t(TranslationKey['Choose a section in Freelance'])}</p>

      <div className={classNames.btnsWrapper}>
        <Button
          className={classNames.button}
          color="primary"
          variant="outlined"
          onClick={viewModel.onClickServiceExchange}
        >
          <div className={classNames.btnTextWrapper}>
            <p className={classNames.btnText}>{t(TranslationKey['Service exchange'])}</p>
            <ArrowRightAltIcon color="primary" />
          </div>
        </Button>

        <Button className={classNames.button} color="primary" variant="outlined" onClick={viewModel.onClickMyRequests}>
          <div className={classNames.btnTextWrapper}>
            <p className={classNames.btnText}>{t(TranslationKey['My requests'])}</p>
            <ArrowRightAltIcon color="primary" />
          </div>
        </Button>

        {/* <Button className={classNames.button} color="primary" variant="outlined" onClick={viewModel.onClickVacRequests}>
          <div className={classNames.btnTextWrapper}>
            <p className={classNames.btnText}>{t(TranslationKey['Vacant requests'])}</p>
            <ArrowRightAltIcon color="primary" />
          </div>
        </Button> */}
        {/* <Button className={classNames.button} color="primary" variant="outlined" onClick={viewModel.onClickMyProposals}>
          <div className={classNames.btnTextWrapper}>
            <p className={classNames.btnText}>{t(TranslationKey['My proposals'])}</p>
            <ArrowRightAltIcon color="primary" />
          </div>
        </Button> */}
      </div>
    </>
  )
}

export const ClientFreelanceView = withStyles(observer(ClientFreelanceViewRaw), styles)
