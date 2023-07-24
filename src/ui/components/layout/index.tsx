/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC, useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { overallRoutesConfigs, privateRoutesConfigs } from '@constants/navigation/routes'

import { Appbar } from '@components/layout/appbar'
import { Main } from '@components/layout/main'
import { Navbar } from '@components/layout/navbar'

interface LayoutProps {
  children: React.ReactNode
}

interface CurrentPageInfo {
  activeCategory: string
  activeSubCategory: string
  title: () => void
}

export const Layout: FC<LayoutProps> = props => {
  const [currentPageInfo, setCurrentPageInfo] = useState<CurrentPageInfo>({
    activeCategory: '',
    activeSubCategory: '',
    title: () => 'Title',
  })
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true)
  const location = useLocation()

  useEffect(() => {
    const navigationInfo = [...overallRoutesConfigs, ...privateRoutesConfigs].find(
      el => el.routePath === location.pathname,
    )?.navigationInfo as CurrentPageInfo
    if (!navigationInfo) return

    setCurrentPageInfo(navigationInfo)
  }, [location.pathname])

  return (
    <React.Fragment>
      <Navbar
        activeCategory={currentPageInfo?.activeCategory}
        activeSubCategory={currentPageInfo?.activeSubCategory}
        drawerOpen={isDrawerOpen}
        setDrawerOpen={() => setIsDrawerOpen(!isDrawerOpen)}
        onChangeSubCategory={undefined}
      />
      <Main>
        <Appbar setDrawerOpen={() => setIsDrawerOpen(!isDrawerOpen)} title={currentPageInfo.title}>
          {/* @ts-ignore */}
          {props.children}
        </Appbar>
      </Main>
    </React.Fragment>
  )
}
