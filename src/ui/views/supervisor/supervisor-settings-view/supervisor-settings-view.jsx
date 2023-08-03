import { withStyles } from 'tss-react/mui'

import { SupervisorSettingsContent } from '@components/contents/supervisor-settings-content'

import { styles } from './supervisor-settings-view.style'

export const SupervisorSettingsViewRaw = () => (
  <>
    <div>
      <SupervisorSettingsContent />
    </div>
  </>
)

export const SupervisorSettingsView = withStyles(SupervisorSettingsViewRaw, styles)
