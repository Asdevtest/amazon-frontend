import React from 'react'

import {Paper} from '@material-ui/core'
import {observer} from 'mobx-react'

import {BusinessInfo} from './business-info'
import {ShopInfo} from './shop-info'
import {useClassNames} from './top-card.style'

export const TopCard = observer(({userInfo, data, onClickEditBtn}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.mainWrapper}>
      <Paper className={classNames.leftCardWrapper}>
        <ShopInfo userInfo={userInfo} data={data} onClickEditBtn={onClickEditBtn} />
      </Paper>
      <Paper className={classNames.rightCardWrapper}>
        <BusinessInfo data={data} />
      </Paper>
    </div>
  )
})
