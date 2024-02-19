import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { styles } from './supervisor-freelance-view.style'

import { SupervisorFreelanceViewModel } from './supervisor-freelance-view.model'

export const SupervisorFreelanceViewRaw = props => {
  const [viewModel] = useState(() => new SupervisorFreelanceViewModel({ history: props.history }))
  const { classes: styles } = props

  return (
    <>
      <div>
        <div>
          <Typography className={styles.title}>{t(TranslationKey['Choose a section in Freelance'])}</Typography>

          <div className={styles.btnsWrapper}>
            <Button className={styles.button} type={ButtonType.SUCCESS} onClick={viewModel.onClickVacantDeals}>
              <div className={styles.btnTextWrapper}>
                <Typography className={styles.btnText}>{t(TranslationKey['Vacant deals'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button className={styles.button} type={ButtonType.SUCCESS} onClick={viewModel.onClickDealsOnReview}>
              <div className={styles.btnTextWrapper}>
                <Typography className={styles.btnText}>{t(TranslationKey['Deals on review'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export const SupervisorFreelanceView = withStyles(observer(SupervisorFreelanceViewRaw), styles)
