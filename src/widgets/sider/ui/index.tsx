import { MenuProps } from 'antd'
import AntSider from 'antd/es/layout/Sider'
import { FC, memo, useState } from 'react'

import { CustomMenu } from '@components/shared/custom-menu/ui/custom-menu'
import { DashboardIcon, FreelanceIcon, IdeasIcon, MyProductsIcon, TasksIcon } from '@components/shared/svg-icons'

import classes from './styles.module.scss'

interface SiderProps {}

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  { key: '1', icon: <DashboardIcon />, label: 'Dashboard' },
  {
    key: 'sub1',
    label: 'Freelance',
    icon: <FreelanceIcon />,
    children: [
      { key: '5', icon: <MyProductsIcon />, label: 'Freelance First' },
      { key: '6', icon: <IdeasIcon />, label: 'Freelance second' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <TasksIcon />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
    ],
  },
]

export const Sider: FC<SiderProps> = memo(() => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <AntSider
      collapsible
      trigger={null}
      width={240}
      collapsedWidth={80}
      collapsed={collapsed}
      className={classes.sider}
      prefixCls={classes.theme}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      {/*  TODO: styles */}
      <div className={`${classes.logotip} ${collapsed ? classes.collapsedLogotip : classes.fullLogotip}`} />
      <CustomMenu mode="inline" items={items} className={classes.menu} />
    </AntSider>
  )
})
