import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { overallRoutesConfigs, privateRoutesConfigs } from '@constants/navigation/routes'

import { SettingsModel } from '@models/settings-model'

import { useClassNames } from './layout.styles'

import { BreadCrumbsLine } from './bread-crumbs-line'
import { Header } from './header'
import { Navbar } from './navbar'

interface CurrentPageInfo {
  activeCategory: string
  activeSubCategory: string | number
  title: string
}

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { classes: classNames } = useClassNames()
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

    if (!currentPath?.navigationInfo) return

    setCurrentPageInfo({
      activeCategory: currentPath?.navigationInfo.activeCategory,
      activeSubCategory: currentPath?.navigationInfo.activeSubCategory,
      title: currentPath?.crumbNameKey,
    })
  }, [location.pathname])

  const savedLastCrumbAdditionalText = localStorage.getItem('lastBreadcrumbsText')
  const breadcrumbsAdditionalText = SettingsModel.lastCrumbAdditionalText

  useEffect(() => {
    if (location.pathname !== '/profile') {
      SettingsModel.setBreadcrumbsForProfile(location.pathname)
    }
  }, [location.pathname])

  useEffect(() => {
    if (breadcrumbsAdditionalText !== undefined) {
      localStorage.setItem('lastBreadcrumbsText', breadcrumbsAdditionalText)
    }
  }, [breadcrumbsAdditionalText])

  const [shortNavbar, setShortNavbar] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 768) {
      setShortNavbar(false)
    }
  }, [])

  const handleShowNavbar = () => {
    setShortNavbar(!shortNavbar)
  }

  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleToggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <>
      <Header shortNavbar={shortNavbar} title={currentPageInfo.title} onToggleModal={handleToggleModal} />

      <div className={classNames.mainWrapper}>
        <Navbar
          isOpenModal={isOpenModal}
          shortNavbar={shortNavbar}
          activeCategory={currentPageInfo?.activeCategory}
          activeSubCategory={currentPageInfo?.activeSubCategory}
          onShowNavbar={handleShowNavbar}
          onToggleModal={handleToggleModal}
        />

        <main className={classNames.main}>
          <div className={classNames.breadCrumbsWrapper}>
            <BreadCrumbsLine
              lastCrumbAdditionalText={breadcrumbsAdditionalText}
              savedLastCrumbAdditionalText={savedLastCrumbAdditionalText}
            />
          </div>

          <div className={classNames.content}>{children}</div>
        </main>
      </div>
    </>
  )
}
