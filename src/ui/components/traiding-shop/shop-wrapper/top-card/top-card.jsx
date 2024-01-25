import { observer } from 'mobx-react'

import { Paper } from '@mui/material'

import { useStyles } from './top-card.style'

import { BusinessInfo } from './business-info'
import { ShopInfo } from './shop-info'

export const TopCard = observer(({ userInfo, data, onClickEditBtn }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.mainWrapper}>
      <Paper className={styles.leftCardWrapper}>
        <ShopInfo userInfo={userInfo} data={data} onClickEditBtn={onClickEditBtn} />
      </Paper>
      <Paper className={styles.rightCardWrapper}>
        <BusinessInfo data={data} />
      </Paper>
    </div>
  )
})
