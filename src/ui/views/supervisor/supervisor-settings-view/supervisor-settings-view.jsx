import { withStyles } from 'tss-react/mui'

import { SupervisorSettingsContent } from '@components/contents/supervisor-settings-content'
import { MainContent } from '@components/layout/main-content'

import { styles } from './supervisor-settings-view.style'

export const SupervisorSettingsViewRaw = () => (
  <>
    <MainContent>
      <SupervisorSettingsContent />
    </MainContent>
  </>
)

export const SupervisorSettingsView = withStyles(SupervisorSettingsViewRaw, styles)
