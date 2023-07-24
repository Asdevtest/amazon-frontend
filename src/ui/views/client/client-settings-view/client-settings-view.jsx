import { observer } from 'mobx-react'
import React from 'react'
import { withStyles } from 'tss-react/mui'

import { UserSettingsForm } from '@components/forms/user-settings-form'
import { MainContent } from '@components/layout/main-content'

import { styles } from './client-settings-view.style'

export const ClientSettingsViewRaw = () => (
  // const [viewModel] = useState(() => new ClientSettingsViewModel({ history: props.history }));

  <React.Fragment>
    <MainContent>
      <UserSettingsForm />
    </MainContent>
  </React.Fragment>
)

export const ClientSettingsView = withStyles(observer(ClientSettingsViewRaw), styles)
