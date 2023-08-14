import { observer } from 'mobx-react'
import React from 'react'

import { Paper } from '@mui/material'

import { useClassNames } from './top-card.style'

import { BusinessInfo } from './business-info'
import { ShopInfo } from './shop-info'

export const TopCard = observer(({ userInfo, data, onClickEditBtn }) => {
  const { classes: classNames } = useClassNames()

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
