import { cx } from '@emotion/css'
import React from 'react'

import { Paper, Tab, Tabs, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useClassNames } from './purchase-history.style'

export const PurchaseHistory = ({ user, tabHistory, setTabHistory }) => {
  const { classes: classNames } = useClassNames()
  return (
    <React.Fragment>
      <Typography variant="h6" className={classNames.mainTitle}>
        {t(TranslationKey['The history of your purchases from']) + ((user && user.username) || '')}
      </Typography>
      <Paper>
        <Tabs
          value={tabHistory}
          aria-label="label tabs"
          classes={{
            flexContainer: classNames.tabsHeadContainer,
            indicator: classNames.tabsIndicator,
          }}
          onChange={(e, newValue) => setTabHistory(newValue)}
        >
          <Tab
            className={cx(classNames.text, {
              [classNames.selected]: tabHistory === 0,
            })}
            index={0}
            label={t(TranslationKey.All)}
          />

          <Tab
            className={cx(classNames.text, {
              [classNames.selected]: tabHistory === 1,
            })}
            index={1}
            label={t(TranslationKey['From buyers'])}
          />
          <Tab
            className={cx(classNames.text, {
              [classNames.selected]: tabHistory === 2,
            })}
            index={2}
            label={t(TranslationKey['From the sellers'])}
          />
        </Tabs>
        <div className={classNames.tabContent} role="tabpanel">
          <div className={classNames.subTabWrapper}>
            <Typography className={cx(classNames.text, classNames.typoNoHistory)}>
              {t(TranslationKey['No transaction history found'])}
            </Typography>
          </div>
        </div>
      </Paper>
    </React.Fragment>
  )
}
