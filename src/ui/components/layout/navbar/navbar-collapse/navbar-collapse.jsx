import { Badge } from 'antd'
import { useState } from 'react'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { Collapse, List, ListItemIcon, ListItemText, Menu } from '@mui/material'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'

import { Button } from '@components/shared/button'
import { HighPriorityValue } from '@components/shared/high-priority-value'

import { getSumPropertiesObject } from '@utils/object'
import { renderAttentionTooltipTitle, renderTooltipTitle } from '@utils/renders'

import '@typings/enums/button-style'

import { useStyles } from './navbar-collapse.style'

import { alwaysShowSubCategoryKeys } from '../navbar-drawer-content/navbar-drawer-content'
import { NavbarSubCategory } from '../navbar-sub-category'

export const NavbarCollapse = ({
  activeCategory,
  activeSubCategory,
  category,
  index,
  userInfo,
  shortNavbar,
  showHighPriorityNotification,
}) => {
  const { classes: styles, cx, theme } = useStyles()

  const [menuAnchor, setMenuAnchor] = useState(null)

  const handleClick = event => {
    setMenuAnchor(event.currentTarget)
  }

  const handleClose = () => {
    setMenuAnchor(null)
  }

  const onClickCategory = () => {
    shortNavbar && handleClose()
  }

  const getBadgeCountForSubRoute = subRoute => {
    switch (subRoute) {
      case '/warehouse/tasks/vacant-tasks':
        return userInfo?.tasksNewAll || 0

      case '/warehouse/tasks/my-tasks':
        return userInfo?.tasksAtProcessAll || 0

      case '/client/notifications/ideas-notifications':
      case '/buyer/notifications/ideas-notifications':
        return userInfo?.updatesOnIdeas || 0

      case '/client/notifications/orders-notifications':
        return userInfo?.needConfirmPriceChange?.orders || 0

      case '/client/notifications/boxes-notifications':
        return userInfo?.needConfirmPriceChange?.boxes || 0

      case '/client/notifications/tariffs-notifications':
        return userInfo?.needUpdateTariff?.boxes || 0

      case '/client/notifications/freelance-notifications':
      case '/freelancer/notifications/freelance-notifications':
        return userInfo?.freelanceNotices?.length || 0

      case '/client/my-orders/pending-orders':
        return userInfo?.pendingOrders || 0

      case '/client/my-orders/orders':
        return userInfo?.orders || 0

      case '/buyer/not-paid-orders':
        return userInfo?.notPaid || 0

      case '/buyer/need-track-number-orders':
        return userInfo?.needTrackNumber || 0

      case '/buyer/inbound-orders':
        return userInfo?.inbound || 0

      case '/buyer/confirmation-required-orders':
        return userInfo?.confirmationRequired || 0

      case '/buyer/closed-and-canceled-orders':
        return userInfo?.closedAndCanceled || 0

      case '/buyer/ready-for-payment-orders':
        return userInfo?.readyForPayment || 0

      case '/buyer/partially-paid-orders':
        return userInfo?.partiallyPaid || 0

      case '/buyer/all-orders':
        return userInfo?.allOrders || 0

      case '/client/ideas/new':
        return userInfo?.ideas?.new || 0

      case '/client/ideas/on-checking':
        return userInfo?.ideas?.onCheck || 0

      case '/client/ideas/search-suppliers':
        return userInfo?.ideas?.supplierSearch || 0

      case '/client/ideas/create-card':
        return userInfo?.ideas?.productCreating || 0

      case '/client/ideas/add-asin':
        return userInfo?.ideas?.addingAsin || 0

      case '/client/ideas/realized':
        return userInfo?.ideas?.finished || 0

      case '/client/ideas/closed':
        return userInfo?.ideas?.rejectedOrClosed || 0

      case `/${UserRoleCodeMapForRoutes[userInfo?.role]}/notifications/general-notifications-view`:
        return userInfo?.notificationCounter || 0

      case '/client/ideas/all':
        return (
          (userInfo?.ideas?.new || 0) +
          (userInfo?.ideas?.onCheck || 0) +
          (userInfo?.ideas?.supplierSearch || 0) +
          (userInfo?.ideas?.productCreating || 0) +
          (userInfo?.ideas?.addingAsin || 0) +
          (userInfo?.ideas?.finished || 0) +
          (userInfo?.ideas?.rejectedOrClosed || 0)
        )

      case '/freelancer/freelance/vacant-requests':
        return userInfo?.vacantRequests || 0

      case '/freelancer/freelance/my-proposals':
        return getSumPropertiesObject(userInfo?.myProposals) || 0

      case '/buyer/search-supplier-by-supervisor':
        return userInfo?.searchFromSupervisor || 0

      case '/buyer/search-supplier-by-client':
        return userInfo?.searchFromClient || 0

      default:
        return 0
    }
  }

  const renderNotificationBySubRoute = subRoute => {
    const count = getBadgeCountForSubRoute(subRoute)
    return count ? (
      <Badge className={styles.badge} count={count} color={theme.palette.primary.main} overflowCount={100000} />
    ) : null
  }

  const getBigBadgeCount = route => {
    switch (route) {
      case '/client/my-orders/pending-orders':
        return userInfo?.purchaseOrderRequired?.length || 0

      case '/supervisor/ready-to-check-by-researcher':
        return userInfo?.vacFromResearcher || 0

      case '/supervisor/ready-to-check-by-client':
        return userInfo?.vacFromClient || 0

      case '/client/freelance/my-requests':
      case '/freelancer/freelance/my-proposals':
        return userInfo?.freelanceNotices?.length || 0

      default:
        return 0
    }
  }

  const getBigBadge = route => {
    const count = getBigBadgeCount(route)
    return count ? (
      <Badge count={count} color={theme.palette.error.main} className={styles.bigBadge} overflowCount={100000} />
    ) : null
  }

  const getNotificationCountBySubRoute = subRoute => {
    switch (subRoute) {
      case '/warehouse/tasks/vacant-tasks':
        return userInfo?.tasksNewHigh
      case '/warehouse/tasks/my-tasks':
        return userInfo?.tasksAtProcessHigh
      default:
        return null
    }
  }

  const renderSubCategory = (subIndex, subCategory) => {
    const highPriorityNotificationCount =
      showHighPriorityNotification && getNotificationCountBySubRoute(subCategory.subRoute)
    const subCategoryTitle = subCategory?.subtitle()
    const isTooltipVisible = !shortNavbar && subCategoryTitle !== category?.title()
    // ! replace Button after swich to ant
    return (
      <Button
        key={subIndex}
        tooltipPosition="center"
        className={cx(styles.menuItem, { [styles.selected]: subIndex === activeSubCategory })}
        styleType="transparent"
        tooltipInfoContent={isTooltipVisible && renderTooltipTitle(subCategoryTitle, userInfo.role)}
        tooltipAttentionContent={isTooltipVisible && renderAttentionTooltipTitle(subCategoryTitle, userInfo.role)}
      >
        <NavbarSubCategory
          button
          disableGutters
          component={Link}
          className={styles.subCategory}
          selected={subIndex === activeSubCategory}
          to={subCategory.subRoute}
          onClick={() => onClickCategory(subIndex)}
        >
          <div className={styles.badgeContainer}>{renderNotificationBySubRoute(subCategory.subRoute)}</div>
          <ListItemText
            disableTypography
            className={cx(styles.listItemText, { [styles.selected]: subIndex === activeSubCategory })}
            primary={subCategory?.subtitle()}
          />
          {!!highPriorityNotificationCount && <HighPriorityValue value={highPriorityNotificationCount} />}
          {!shortNavbar && getBigBadge(subCategory.subRoute)}
        </NavbarSubCategory>
      </Button>
    )
  }

  return (
    <Collapse in={index === activeCategory || alwaysShowSubCategoryKeys.includes(index)}>
      {!shortNavbar ? (
        <List disablePadding>
          {category.subtitles?.map((subCategory, subIndex) =>
            subCategory.checkHideSubBlock
              ? subCategory.checkHideSubBlock(userInfo)
                ? renderSubCategory(subCategory.key ? subCategory.key : subIndex, subCategory)
                : null
              : renderSubCategory(subCategory.key ? subCategory.key : subIndex, subCategory),
          )}
        </List>
      ) : (
        <>
          {category.subtitles?.length ? (
            <div
              className={styles.userInfoWrapper}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <p className={cx(styles.collapseText, { [styles.selected]: index === activeCategory })}>{'...'}</p>

              {menuAnchor ? (
                <MdArrowDropUp size={24} className={cx({ [styles.selected]: index === activeCategory })} />
              ) : (
                <MdArrowDropDown size={24} className={cx({ [styles.selected]: index === activeCategory })} />
              )}
            </div>
          ) : null}
        </>
      )}

      {Boolean(menuAnchor) && (
        <Menu
          keepMounted
          id="simple-menu"
          anchorEl={menuAnchor}
          autoFocus={false}
          open={Boolean(menuAnchor)}
          classes={{ paper: styles.menu, list: styles.list }}
          onClose={handleClose}
        >
          <List disablePadding>
            {category.subtitles?.map((subCategory, subIndex) =>
              subCategory.checkHideSubBlock
                ? subCategory.checkHideSubBlock(userInfo)
                  ? renderSubCategory(subCategory.key ? subCategory.key : subIndex, subCategory)
                  : null
                : renderSubCategory(subCategory.key ? subCategory.key : subIndex, subCategory),
            )}
          </List>
        </Menu>
      )}
    </Collapse>
  )
}
