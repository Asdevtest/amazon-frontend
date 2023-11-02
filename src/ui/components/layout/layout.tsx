import { cx } from '@emotion/css'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { overallRoutesConfigs, privateRoutesConfigs } from '@constants/navigation/routes'

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

  const [shortNavbar, setShortNavbar] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 1024) {
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

  const [isHovering, setIsHovering] = useState(false)
  const handleMouseOver = () => setIsHovering(true)
  const handleMouseOut = () => setIsHovering(false)

  return (
    <div className={cx(classNames.wrapper, { [classNames.wrapperShort]: shortNavbar })}>
      <Navbar
        isOpenModal={isOpenModal}
        isHovering={isHovering}
        shortNavbar={shortNavbar}
        activeCategory={currentPageInfo?.activeCategory}
        activeSubCategory={currentPageInfo?.activeSubCategory}
        onToggleModal={handleToggleModal}
        onShowNavbar={handleShowNavbar}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />

      <Header
        shortNavbar={shortNavbar}
        title={currentPageInfo.title}
        onToggleModal={handleToggleModal}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />

      <main className={classNames.main}>
        <BreadCrumbsLine />

        <div className={classNames.content}>{children}</div>
      </main>
    </div>
  )
}
