import { Layout as AntLayout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { FC, PropsWithChildren, memo, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { overallRoutesConfigs, privateRoutesConfigs } from '@constants/navigation/routes'

import { useStyles } from './layout.style'

import { BreadCrumbsLine } from './bread-crumbs-line'
import { Header } from './header'
import { Sider } from './sider'

interface CurrentPageInfo {
  activeCategory: string
  activeSubCategory: string | number
  title: string
}

export const Layout: FC<PropsWithChildren> = memo(({ children }) => {
  const { classes: styles } = useStyles()
  const [currentPageInfo, setCurrentPageInfo] = useState<CurrentPageInfo>({
    activeCategory: '',
    activeSubCategory: '',
    title: '',
  })
  const location = useLocation()

  useEffect(() => {
    const currentPath = [...overallRoutesConfigs, ...privateRoutesConfigs].find(
      el => el.routePath === location.pathname,
    )

    if (!currentPath?.navigationInfo) {
      return
    }

    setCurrentPageInfo({
      activeCategory: currentPath?.navigationInfo.activeCategory,
      activeSubCategory: currentPath?.navigationInfo.activeSubCategory,
      title: currentPath?.crumbNameKey,
    })
  }, [location.pathname])

  return (
    <AntLayout className={styles.root}>
      <Sider activeCategory={currentPageInfo?.activeCategory} activeSubCategory={currentPageInfo?.activeSubCategory} />

      <AntLayout>
        <Header title={currentPageInfo.title} />

        <Content className={styles.content}>
          <BreadCrumbsLine />

          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  )
})
