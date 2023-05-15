import React, {FC, useEffect, useState} from 'react'

import {useLocation} from 'react-router-dom'

import {privateRoutesConfigs} from '@constants/navigation/routes'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {Navbar} from '@components/layout/navbar'

import {t} from '@utils/translations'

interface LayoutProps {
  children: React.ReactNode
}

interface CurrentPageInfo {
  activeCategory: string
  activeSubCategory: string
  title: string
}

export const Layout: FC<LayoutProps> = props => {
  const [currentPageInfo, setCurrentPageInfo] = useState<CurrentPageInfo>({
    activeCategory: '',
    activeSubCategory: '',
    title: '',
  })
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true)
  const location = useLocation()

  useEffect(() => {
    const navigationInfo = privateRoutesConfigs.find(el => el.routePath === location.pathname)
      ?.navigationInfo as CurrentPageInfo
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
        <Appbar
          setDrawerOpen={() => setIsDrawerOpen(!isDrawerOpen)}
          title={currentPageInfo.title}
          lastCrumbAdditionalText={SettingsModel.lastCrumbAdditionalText}
        >
          {props.children}
        </Appbar>
      </Main>
    </React.Fragment>
  )
}
