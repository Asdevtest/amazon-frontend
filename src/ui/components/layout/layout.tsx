import { FC, PropsWithChildren, memo, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { overallRoutesConfigs, privateRoutesConfigs } from '@constants/navigation/routes'

import { useStyles } from './layout.style'

import { BreadCrumbsLine } from './bread-crumbs-line'
import { Header } from './header'
import { Navbar } from './navbar'

interface CurrentPageInfo {
  activeCategory: string
  activeSubCategory: string | number
  title: string
}

export const Layout: FC<PropsWithChildren> = memo(({ children }) => {
  const { classes: styles, cx } = useStyles()
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

  return (
    <div className={cx(styles.wrapper, { [styles.wrapperShort]: shortNavbar })}>
      <Navbar
        isOpenModal={isOpenModal}
        shortNavbar={shortNavbar}
        activeCategory={currentPageInfo?.activeCategory}
        activeSubCategory={currentPageInfo?.activeSubCategory}
        onToggleModal={handleToggleModal}
        onShowNavbar={handleShowNavbar}
      />

      <Header title={currentPageInfo.title} onToggleModal={handleToggleModal} />

      <main className={styles.main}>
        <BreadCrumbsLine />

        <div className={styles.content}>{children}</div>
      </main>
    </div>
  )
})
