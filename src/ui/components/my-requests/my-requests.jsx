import {Box, Tabs} from '@mui/material'

import React from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {ITab} from '@components/i-tab/i-tab'

import {t} from '@utils/translations'

import {MyRequestsView} from './my-requests-view'
// import {GroupPermissions} from './group-permissions'
import {useClassNames} from './my-requests.style'

// import {SinglePermissions} from './single-permissions'

const TabPanel = ({children, value, index, ...other}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box paddingTop={3}>{children}</Box>}
  </div>
)

export const MyRequests = observer(({history, location}) => {
  const {classes: classNames} = useClassNames()

  const [tabIndex, setTabIndex] = React.useState(0)

  return (
    <React.Fragment>
      {SettingsModel.languageTag && (
        <Tabs
          variant={'fullWidth'}
          classes={{
            root: classNames.row,
            indicator: classNames.indicator,
          }}
          value={tabIndex}
          onChange={(e, index) => setTabIndex(index)}
        >
          <ITab label={t(TranslationKey['Requests in progress'])} />
          <ITab label={t(TranslationKey['Completed requests'])} />
        </Tabs>
      )}

      <TabPanel value={tabIndex} index={0}>
        <MyRequestsView isRequestsAtWork location={location} history={history} />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <MyRequestsView location={location} history={history} />
      </TabPanel>
    </React.Fragment>
  )
})
