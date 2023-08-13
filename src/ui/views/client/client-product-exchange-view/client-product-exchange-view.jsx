import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { styles } from './client-product-exchange-view.style'

import { ClientProductExchangeViewModel } from './client-product-exchange-view.model'

export const ClientProductExchangeViewRaw = props => {
  const [viewModel] = useState(() => new ClientProductExchangeViewModel({ history: this.props.history }))
  const { classes: classNames } = props

  return (
    <React.Fragment>
      <div>
        <div>
          <Typography className={classNames.title}>{t(TranslationKey['Choose a section in Freelance'])}</Typography>

          <div className={classNames.btnsWrapper}>
            <Button
              className={classNames.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickForksExchange}
            >
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey['Deal exchange'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button
              className={classNames.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickPrivateLabel}
            >
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey['Private Label'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export const ClientProductExchangeView = withStyles(observer(ClientProductExchangeViewRaw), styles)
