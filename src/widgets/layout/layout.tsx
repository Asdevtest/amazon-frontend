import { Layout as AntLayout, Breadcrumb } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { FC, PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../header'
import { Sider } from '../sider'

import classes from './layout.module.scss'

export const Layout: FC<PropsWithChildren> = () => {
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

          <Content>
            <Outlet />
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  )
}
