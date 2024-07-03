import AntSider from 'antd/es/layout/Sider'
import { FC, memo } from 'react'

import classes from './Sider.module.scss'

interface SiderProps {}

export const Sider: FC<SiderProps> = memo(() => {
  return (
    <AntSider className={classes.sider} prefixCls={classes.theme}>
      <div className={classes.logotip} />
    </AntSider>
  )
})
