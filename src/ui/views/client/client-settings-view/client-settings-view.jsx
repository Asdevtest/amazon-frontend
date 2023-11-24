import { observer } from 'mobx-react'
import React from 'react'

import { UserSettingsForm } from '@components/forms/user-settings-form'

export const ClientSettingsView = observer(() => (
  <React.Fragment>
    <div>
      <UserSettingsForm />
    </div>
  </React.Fragment>
))
