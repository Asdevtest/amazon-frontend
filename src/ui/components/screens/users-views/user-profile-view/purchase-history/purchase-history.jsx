import React from 'react'

import {Tab, Tabs, Typography, Paper} from '@material-ui/core'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './purchase-history.style'

const textConsts = getLocalizedTexts(texts, 'ru').buerUserPurchaseHistory

export const PurchaseHistory = ({user, tabHistory, setTabHistory}) => {
  const classNames = useClassNames()
  return (
    <React.Fragment>
      <Typography variant="h3" className={classNames.mainTitle}>
        {textConsts.mainTitle + user.username}
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
            className={clsx(classNames.text, {
              [classNames.selected]: tabHistory === 0,
            })}
            index={0}
            label={textConsts.buyInfo}
          />
          <Tab
            className={clsx(classNames.text, {
              [classNames.selected]: tabHistory === 1,
            })}
            index={1}
            label={textConsts.pushedGoods}
          />
        </Tabs>
        <div className={classNames.tabContent} role="tabpanel">
          <div className={classNames.subTabWrapper}>
            <Typography className={(classNames.text, classNames.typoNoHistory)}>{textConsts.noHistory}</Typography>
          </div>
        </div>
      </Paper>
    </React.Fragment>
  )
}
