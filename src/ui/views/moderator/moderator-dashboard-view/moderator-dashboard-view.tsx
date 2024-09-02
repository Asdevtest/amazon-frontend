import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { useStyles } from './moderator-dashboard-view.style'

import { ModeratorDashboardViewModel } from './moderator-dashboard-view.model'

export const ModeratorDashboardView = observer(() => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new ModeratorDashboardViewModel())

  return (
    <>
      <p className={styles.inProcess}>{'В разработке...'}</p>

      {viewModel.userInfo.masterUser && (
        <div className={styles.masterUserWrapper}>
          <p>{t(TranslationKey['Master user']) + ':'}</p>

          <UserLink blackText name={viewModel.userInfo.masterUser?.name} userId={viewModel.userInfo.masterUser?._id} />
        </div>
      )}
    </>
  )
})
