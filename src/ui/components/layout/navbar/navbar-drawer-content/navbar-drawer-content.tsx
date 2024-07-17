import { FC, Fragment, memo, useEffect, useState } from 'react'

import { List } from '@mui/material'

import { appVersion } from '@constants/app-version'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { navBarActiveCategory } from '@constants/navigation/navbar-active-category'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { NavbarCategory } from '@components/layout/navbar'
import { NavbarCollapse } from '@components/layout/navbar/navbar-collapse'
import { NavbarModel } from '@components/layout/navbar/navbar.model'
import { FeedbackIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { isAdmin, isModerator } from '@typings/guards/roles'
import { IInfoCounters } from '@typings/shared/info-counters'
import { NavbarConfigTypes } from '@typings/shared/navbar-config'

import { useStyles } from './navbar-drawer-content.style'

import { getCategoryBadge } from './navbar-drawer-content.helper'

interface NavbarDrawerContentProps {
  shortNavbar: boolean
  curNavbar: NavbarConfigTypes.RootObject
  userInfo: IInfoCounters
  activeCategory: string
  unreadMessages: ChatMessageContract[]
  onClickVersion: NavbarModel['onClickVersion']
  onTriggerOpenModal: (arg: string) => void
  activeSubCategory: string
}

export const alwaysShowSubCategoryKeys = [
  navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS,
  navBarActiveCategory.NAVBAR_READY_TO_CHECK,
]

export const NavbarDrawerContent: FC<NavbarDrawerContentProps> = memo(props => {
  const {
    shortNavbar,
    curNavbar,
    userInfo,
    activeCategory,
    unreadMessages,
    activeSubCategory,
    onTriggerOpenModal,
    onClickVersion,
  } = props

  const { classes: styles, cx } = useStyles()
  const [filteredCategories, setFilteredCategories] = useState<NavbarConfigTypes.Route[]>([])
  const [filteredBottomCategories, setFilteredBottomCategories] = useState<NavbarConfigTypes.Route[]>([])

  const getFilteredCategories = () =>
    curNavbar[UserRoleCodeMap[userInfo.role as keyof typeof UserRoleCodeMap] as keyof typeof curNavbar].filter(
      el => !el.route?.includes('/messages'),
    )

  const getFilteredBottomCategories = () =>
    curNavbar[UserRoleCodeMap[userInfo.role as keyof typeof UserRoleCodeMap] as keyof typeof curNavbar].filter(el =>
      el.route?.includes('/messages'),
    )

  useEffect(() => {
    setFilteredCategories(getFilteredCategories())
    setFilteredBottomCategories(getFilteredBottomCategories())
  }, [])

  useEffect(() => {
    if (!userInfo.role) return
    setFilteredCategories(getFilteredCategories())
    setFilteredBottomCategories(getFilteredBottomCategories())
  }, [userInfo.role])

  return (
    <div className={styles.mainSubWrapper}>
      <List className={styles.categoriesWrapper}>
        {filteredCategories.map((category: NavbarConfigTypes.Route, index: number) =>
          category.checkHideBlock(userInfo) ? (
            <Fragment key={index}>
              <NavbarCategory
                // @ts-ignore
                isSelected={category.key === activeCategory}
                shortNavbar={shortNavbar}
                userInfo={userInfo}
                category={category}
                badge={getCategoryBadge(category, userInfo) || 0}
              />

              {(category.key === activeCategory || alwaysShowSubCategoryKeys.includes(category.key)) && (
                <NavbarCollapse
                  showHighPriorityNotification
                  shortNavbar={shortNavbar}
                  activeCategory={activeCategory}
                  activeSubCategory={activeSubCategory}
                  category={category}
                  index={category.key}
                  userInfo={userInfo}
                />
              )}
            </Fragment>
          ) : null,
        )}
      </List>

      <div className={styles.bottomCategories}>
        {filteredBottomCategories.map((category: NavbarConfigTypes.Route, index: number) =>
          category.checkHideBlock(userInfo) ? (
            <NavbarCategory
              key={index}
              // @ts-ignore
              shortNavbar={shortNavbar}
              isSelected={category.key === activeCategory}
              userInfo={userInfo}
              category={category}
              badge={category.route?.includes('/messages') && unreadMessages}
            />
          ) : null,
        )}

        {!isAdmin(userInfo.role) && !isModerator(userInfo.role) ? (
          <div
            className={cx(styles.feedBackButton, { [styles.shortFeedBackButton]: shortNavbar })}
            onClick={() => onTriggerOpenModal('showFeedbackModal')}
          >
            {!shortNavbar && <p>{t(TranslationKey.Feedback)}</p>}
            <FeedbackIcon className={styles.feedbackIcon} />
          </div>
        ) : null}

        <p className={cx(styles.appVersion, { [styles.smallAppVersion]: shortNavbar })} onClick={onClickVersion}>
          {appVersion}
        </p>
      </div>
    </div>
  )
})
