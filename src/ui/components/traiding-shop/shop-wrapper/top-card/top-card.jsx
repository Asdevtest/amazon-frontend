import { observer } from 'mobx-react'

import { useStyles } from './top-card.style'

import { BusinessInfo } from './business-info'
import { ShopInfo } from './shop-info'

export const TopCard = observer(({ userInfo, data, onClickEditBtn }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.leftCardWrapper}>
        <ShopInfo userInfo={userInfo} data={data} onClickEditBtn={onClickEditBtn} />
      </div>
      <div className={styles.rightCardWrapper}>
        <BusinessInfo data={data} />
      </div>
    </div>
  )
})
