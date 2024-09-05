import { observer } from 'mobx-react'
import { useState } from 'react'

import { getResearcherDashboardCardConfig } from '@constants/navigation/dashboard-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { DashboardBalance } from '@components/dashboards/dashboard-balance'
import { DashboardButtons } from '@components/dashboards/dashboard-buttons'
import { DashboardOneLineCardsList } from '@components/dashboards/dashboard-one-line-cards-list'
import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { isResearcher } from '@typings/guards/roles'
import { HistoryType } from '@typings/types/history'

import { useStyles } from './researcher-dashboard-view.style'

import { ResearcherDashboardViewModel } from './researcher-dashboard-view.model'

export const ResearcherDashboardView = observer(({ history }: { history: HistoryType }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new ResearcherDashboardViewModel(history))

  return (
    <>
      <div className={styles.userInfoWrapper}>
        <div className={styles.flexContainer}>
          <img src={getUserAvatarSrc(viewModel.userInfo._id)} className={styles.cardImg} />

          {!isResearcher(viewModel.userInfo.role) && <DashboardBalance user={viewModel.userInfo} />}
        </div>

        <DashboardButtons user={viewModel.userInfo} />

        {viewModel.userInfo.masterUser && (
          <div className={styles.flexContainer}>
            <p>{t(TranslationKey['Master user']) + ':'}</p>

            <UserLink
              blackText
              name={viewModel.userInfo.masterUser?.name}
              userId={viewModel.userInfo.masterUser?._id}
            />
          </div>
        )}
      </div>

      {getResearcherDashboardCardConfig().map(item => (
        <DashboardOneLineCardsList
          key={item.key}
          // @ts-ignore
          config={item}
          valuesData={viewModel.dashboardData}
          onClickViewMore={viewModel.onClickInfoCardViewMode}
        />
      ))}
    </>
  )
})
