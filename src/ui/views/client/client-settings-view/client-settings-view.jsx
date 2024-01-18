import { observer } from 'mobx-react'

import { UserSettingsForm } from '@components/forms/user-settings-form'

export const ClientSettingsView = observer(() => (
  <>
    <div>
      <UserSettingsForm />
    </div>
  </>
))
