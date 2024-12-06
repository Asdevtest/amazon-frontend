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
  const { classes: styles, cx } = useStyles()

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

  const renderNotificationBySubRoute = subRoute => {
    switch (subRoute) {
      case '/warehouse/tasks/vacant-tasks':
        return (
          <div>
            <Badge className={styles.badge} count={userInfo?.tasksNewAll || 0} color="blue" />
          </div>
        )

      case '/warehouse/tasks/my-tasks':
        return <Badge className={styles.badge} count={userInfo?.tasksAtProcessAll || 0} color="blue" />

      case '/client/notifications/ideas-notifications':
      case '/buyer/notifications/ideas-notifications':
        return <Badge className={styles.badge} count={userInfo?.updatesOnIdeas || 0} color="blue" />

      case '/client/notifications/orders-notifications':
        return <Badge className={styles.badge} count={userInfo?.needConfirmPriceChange?.orders || 0} color="blue" />

      case '/client/notifications/boxes-notifications':
        return <Badge className={styles.badge} count={userInfo?.needConfirmPriceChange?.boxes || 0} color="blue" />

      case '/client/notifications/tariffs-notifications':
        return <Badge className={styles.badge} count={userInfo?.needUpdateTariff?.boxes || 0} color="blue" />

      case '/client/notifications/freelance-notifications':
      case '/freelancer/notifications/freelance-notifications':
        return <Badge className={styles.badge} count={userInfo?.freelanceNotices?.length || 0} color="blue" />

      case '/client/my-orders/pending-orders':
        return <Badge className={styles.badge} count={userInfo?.pendingOrders || 0} color="blue" />

      case '/client/my-orders/orders':
        return <Badge className={styles.badge} count={userInfo?.orders || 0} color="blue" />

      case '/buyer/not-paid-orders':
        return <Badge className={styles.badge} count={userInfo?.notPaid || 0} color="blue" />

      case '/buyer/need-track-number-orders':
        return <Badge className={styles.badge} count={userInfo?.needTrackNumber || 0} color="blue" />

      case '/buyer/inbound-orders':
        return <Badge className={styles.badge} count={userInfo?.inbound || 0} color="blue" />

      case '/buyer/confirmation-required-orders':
        return <Badge className={styles.badge} count={userInfo?.confirmationRequired || 0} color="blue" />

      case '/buyer/closed-and-canceled-orders':
        return <Badge className={styles.badge} count={userInfo?.closedAndCanceled || 0} color="blue" />

      case '/buyer/ready-for-payment-orders':
        return <Badge className={styles.badge} count={userInfo?.readyForPayment || 0} color="blue" />

      case '/buyer/partially-paid-orders':
        return <Badge className={styles.badge} count={userInfo?.partiallyPaid || 0} color="blue" />

      case '/buyer/all-orders':
        return <Badge className={styles.badge} count={userInfo?.allOrders || 0} color="blue" />

      case '/client/ideas/new':
        return <Badge className={styles.badge} count={userInfo?.ideas?.new || 0} color="blue" />

      case '/client/ideas/on-checking':
        return <Badge className={styles.badge} count={userInfo?.ideas?.onCheck || 0} color="blue" />

      case '/client/ideas/search-suppliers':
        return <Badge className={styles.badge} count={userInfo?.ideas?.supplierSearch || 0} color="blue" />

      case '/client/ideas/create-card':
        return <Badge className={styles.badge} count={userInfo?.ideas?.productCreating || 0} color="blue" />

      case '/client/ideas/add-asin':
        return <Badge className={styles.badge} count={userInfo?.ideas?.addingAsin || 0} color="blue" />

      case '/client/ideas/realized':
        return <Badge className={styles.badge} count={userInfo?.ideas?.finished || 0} color="blue" />

      case '/client/ideas/closed':
        return <Badge className={styles.badge} count={userInfo?.ideas?.rejectedOrClosed || 0} color="blue" />

      case `/${UserRoleCodeMapForRoutes[userInfo?.role]}/notifications/general-notifications-view`:
        return <Badge className={styles.badge} count={userInfo?.notificationCounter || 0} color="blue" />

      case '/client/ideas/all':
        return (
          <Badge
            className={styles.badge}
            count={
              (userInfo?.ideas?.new || 0) +
              (userInfo?.ideas?.onCheck || 0) +
              (userInfo?.ideas?.supplierSearch || 0) +
              (userInfo?.ideas?.productCreating || 0) +
              (userInfo?.ideas?.addingAsin || 0) +
              (userInfo?.ideas?.finished || 0) +
              (userInfo?.ideas?.rejectedOrClosed || 0)
            }
            color="blue"
          />
        )

      case '/freelancer/freelance/vacant-requests':
        return <Badge className={styles.badge} count={userInfo?.vacantRequests || 0} color="blue" />

      case '/freelancer/freelance/my-proposals':
        return (
          <Badge className={styles.badge} count={getSumPropertiesObject(userInfo?.myProposals) || 0} color="blue" />
        )

      case '/buyer/search-supplier-by-supervisor':
        return <Badge className={styles.badge} count={userInfo?.searchFromSupervisor || 0} color="blue" />

      case '/buyer/search-supplier-by-client':
        return <Badge className={styles.badge} count={userInfo?.searchFromClient || 0} color="blue" />

      default:
        return null
    }
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

  const getBigBadge = route => {
    switch (route) {
      case '/client/my-orders/pending-orders':
        return (
          <Badge
            count={userInfo?.purchaseOrderRequired?.length ? userInfo?.purchaseOrderRequired?.length : 0}
            color="red"
            className={styles.bigBadge}
          />
        )
      case '/supervisor/ready-to-check-by-researcher':
        return <Badge count={userInfo?.vacFromResearcher} color="red" className={styles.bigBadge} />
      case '/supervisor/ready-to-check-by-client':
        return <Badge count={userInfo?.vacFromClient} color="red" className={styles.bigBadge} />
      case '/client/freelance/my-requests':
      case '/freelancer/freelance/my-proposals':
        return userInfo?.freelanceNotices.length > 0 ? (
          <Badge count={userInfo?.freelanceNotices.length} color="red" className={styles.bigBadge} />
        ) : null
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
