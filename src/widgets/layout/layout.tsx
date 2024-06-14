import { Layout as AntLayout, Breadcrumb } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { FC, PropsWithChildren } from 'react'

import { Header } from './header'
import classes from './layout.module.scss'
import { Sider } from './sider'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AntLayout className={classes.root}>
      <Sider />

      <AntLayout>
        <Header title="TEST" />

        <AntLayout className={classes.content}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>

          <Content>{children}</Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  )
}
