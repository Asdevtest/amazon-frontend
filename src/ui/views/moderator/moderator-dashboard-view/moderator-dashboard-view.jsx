import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { styles } from './moderator-dashboard-view.style'

import { ModeratorDashboardViewModel } from './moderator-dashboard-view.model'

export const ModeratorDashboardViewRaw = props => {
  const [viewModel] = useState(() => new ModeratorDashboardViewModel({ history: props.history }))
  const { classes: styles } = props

  return (
    <>
      <div>
        <Typography className={styles.inProcess}>{'В разработке...'}</Typography>

        {viewModel.userInfo.masterUser && (
          <div className={styles.masterUserWrapper}>
            <Typography>{t(TranslationKey['Master user']) + ':'}</Typography>

            <UserLink
              blackText
              name={viewModel.userInfo.masterUser?.name}
              userId={viewModel.userInfo.masterUser?._id}
            />
          </div>
        )}
      </div>
    </>
  )
}

export const ModeratorDashboardView = withStyles(observer(ModeratorDashboardViewRaw), styles)
