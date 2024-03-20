import { Paper, Tab, Tabs, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './purchase-history.style'

export const PurchaseHistory = ({ user, tabHistory, setTabHistory }) => {
  const { classes: styles, cx } = useStyles()
  return (
    <>
      <Typography variant="h6" className={styles.mainTitle}>
        {t(TranslationKey['The history of your purchases from']) + ((user && user.username) || '')}
      </Typography>
      <Paper>
        <Tabs
          value={tabHistory}
          aria-label="label tabs"
          classes={{
            flexContainer: styles.tabsHeadContainer,
            indicator: styles.tabsIndicator,
          }}
          onChange={(e, newValue) => setTabHistory(newValue)}
        >
          <Tab
            className={cx(styles.text, {
              [styles.selected]: tabHistory === 0,
            })}
            index={0}
            label={t(TranslationKey.All)}
          />

          <Tab
            className={cx(styles.text, {
              [styles.selected]: tabHistory === 1,
            })}
            index={1}
            label={t(TranslationKey['From buyers'])}
          />
          <Tab
            className={cx(styles.text, {
              [styles.selected]: tabHistory === 2,
            })}
            index={2}
            label={t(TranslationKey['From the sellers'])}
          />
        </Tabs>
        <div className={styles.tabContent} role="tabpanel">
          <div className={styles.subTabWrapper}>
            <Typography className={cx(styles.text, styles.typoNoHistory)}>
              {t(TranslationKey['No transaction history found'])}
            </Typography>
          </div>
        </div>
      </Paper>
    </>
  )
}
