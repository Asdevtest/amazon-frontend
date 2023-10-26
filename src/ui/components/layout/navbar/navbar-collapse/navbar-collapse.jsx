import { cx } from '@emotion/css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Collapse, List, ListItemIcon, ListItemText, Menu, Typography } from '@mui/material'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { navBarActiveCategory } from '@constants/navigation/navbar-active-category'

import { Button } from '@components/shared/buttons/button'
import { HighPriorityValue } from '@components/shared/high-priority-value'

import { getSumPropertiesObject } from '@utils/object'
import { renderAttentionTooltipTitle, renderTooltipTitle } from '@utils/renders'

import { useClassNames } from './navbar-collapse.style'

import { NavbarSubCategory } from '../navbar-sub-category'

export const NavbarCollapse = ({
  activeCategory,
  activeSubCategory,
  category,
  index,
  userInfo,
  currentViewModel,
  shortNavbar,
  showHighPriorityNotification,
}) => {
  const { classes: classNames } = useClassNames()

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
          <ListItemIcon>
            {<div className={classNames.badge}>{currentViewModel?.userInfo?.tasksNewAll}</div>}
          </ListItemIcon>
        )

      case '/warehouse/tasks/my-tasks':
        return (
          <ListItemIcon>
            {<div className={classNames.badge}>{currentViewModel?.userInfo?.tasksAtProcessAll}</div>}
          </ListItemIcon>
        )

      case '/client/notifications/ideas-notifications':
        return (
          <ListItemIcon>
            {<div className={classNames.badge}>{currentViewModel?.userInfo?.updatesOnIdeas}</div>}
          </ListItemIcon>
        )

      case '/buyer/notifications/ideas-notifications':
        return (
          <ListItemIcon>
            {<div className={classNames.badge}>{currentViewModel?.userInfo?.updatesOnIdeas}</div>}
          </ListItemIcon>
        )

      case '/client/notifications/orders-notifications':
        return (
          <ListItemIcon>
            {<div className={classNames.badge}>{currentViewModel?.userInfo?.needConfirmPriceChange?.orders}</div>}
          </ListItemIcon>
        )

      case '/client/notifications/boxes-notifications':
        return (
          <ListItemIcon>
            {<div className={classNames.badge}>{currentViewModel?.userInfo?.needConfirmPriceChange?.boxes}</div>}
          </ListItemIcon>
        )

      case '/client/notifications/tariffs-notifications':
        return (
          <ListItemIcon>
            {<div className={classNames.badge}>{currentViewModel?.userInfo?.needUpdateTariff?.boxes}</div>}
          </ListItemIcon>
        )

      case '/client/notifications/freelance-notifications':
        return (
          <ListItemIcon>
            {<div className={classNames.badge}>{currentViewModel?.userInfo?.freelanceNotices?.length}</div>}
          </ListItemIcon>
        )

      case '/freelancer/notifications/freelance-notifications':
        return (
          <ListItemIcon>
            {<div className={classNames.badge}>{currentViewModel?.userInfo?.freelanceNotices?.length}</div>}
          </ListItemIcon>
        )

      // case '/shared/general-notifications-view':
      //   return (
      //     <ListItemIcon>
      //       {<div className={classNames.badge}>{currentViewModel.userInfo.freelanceNotices.length}</div>}
      //     </ListItemIcon>
      //   )

      case '/client/my-orders/pending-orders':
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.pendingOrders}</div>}</ListItemIcon>

      case '/client/my-orders/orders':
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.orders}</div>}</ListItemIcon>

      case '/buyer/not-paid-orders':
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.notPaid}</div>}</ListItemIcon>

      case '/buyer/need-track-number-orders':
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.needTrackNumber}</div>}</ListItemIcon>

      case '/buyer/inbound-orders':
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.inbound}</div>}</ListItemIcon>

      case '/buyer/confirmation-required-orders':
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.confirmationRequired}</div>}</ListItemIcon>

      case '/buyer/closed-and-canceled-orders':
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.closedAndCanceled}</div>}</ListItemIcon>

      case '/buyer/ready-for-payment-orders':
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.readyForPayment}</div>}</ListItemIcon>

      case '/buyer/partially-paid-orders':
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.partiallyPaid}</div>}</ListItemIcon>

      case '/buyer/all-orders':
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.allOrders}</div>}</ListItemIcon>

      case '/client/ideas/new':
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.ideas?.new}</div>}</ListItemIcon>

      case '/client/ideas/on-checking':
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.ideas?.onCheck}</div>}</ListItemIcon>

      case '/client/ideas/search-suppliers':
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.ideas?.supplierSearch}</div>}</ListItemIcon>

      case '/client/ideas/create-card':
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.ideas?.productCreating}</div>}</ListItemIcon>

      case '/client/ideas/add-asin':
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.ideas?.addingAsin}</div>}</ListItemIcon>

      case '/client/ideas/realized':
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.ideas?.finished}</div>}</ListItemIcon>

      case '/client/ideas/closed':
        return (
          <ListItemIcon>{<div className={classNames.badge}>{userInfo?.ideas?.rejectedOrClosed}</div>}</ListItemIcon>
        )

      case `/${UserRoleCodeMapForRoutes[userInfo?.role]}/notifications/general-notifications-view`:
        return <ListItemIcon>{<div className={classNames.badge}>{userInfo?.notificationCounter}</div>}</ListItemIcon>

      case '/client/ideas/all':
        return (
          <ListItemIcon>
            {
              <div className={classNames.badge}>
                {userInfo?.ideas?.new +
                  userInfo?.ideas?.onCheck +
                  userInfo?.ideas?.supplierSearch +
                  userInfo?.ideas?.productCreating +
                  userInfo?.ideas?.addingAsin +
                  userInfo?.ideas?.finished +
                  userInfo?.ideas?.rejectedOrClosed}
              </div>
            }
          </ListItemIcon>
        )

      case '/freelancer/freelance/vacant-requests':
        return (
          <ListItemIcon>
            <div className={classNames.badge}>{userInfo?.vacantRequests}</div>
          </ListItemIcon>
        )

      case '/freelancer/freelance/my-proposals':
        return (
          <ListItemIcon>
            <div className={classNames.badge}>{getSumPropertiesObject(userInfo?.myProposals)}</div>
          </ListItemIcon>
        )

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
          <div className={cx(classNames.bigBadge, classNames.redBadge)}>
            {userInfo?.purchaseOrderRequired?.length ? userInfo?.purchaseOrderRequired?.length : 0}
          </div>
        )
    }
  }

  const renderSubCategory = (subIndex, subCategory) => {
    const highPriorityNotificationCount =
      showHighPriorityNotification && getNotificationCountBySubRoute(subCategory.subRoute)

    return (
      <Button
        key={subIndex}
        tooltipPosition="center"
        className={cx(classNames.menuItem, { [classNames.selected]: subIndex === activeSubCategory })}
        tooltipInfoContent={!shortNavbar && renderTooltipTitle(subCategory?.subtitle(), userInfo.role)}
        tooltipAttentionContent={!shortNavbar && renderAttentionTooltipTitle(subCategory?.subtitle(), userInfo.role)}
      >
        <NavbarSubCategory
          button
          disableGutters
          component={Link}
          className={classNames.subCategory}
          selected={subIndex === activeSubCategory}
          to={subCategory.subRoute}
          onClick={() => onClickCategory(subIndex)}
        >
          <div className={classNames.badgeContainer}>{renderNotificationBySubRoute(subCategory.subRoute)}</div>
          <ListItemText
            disableTypography
            className={cx(classNames.listItemText, { [classNames.selected]: subIndex === activeSubCategory })}
            primary={subCategory?.subtitle()}
          />
          {!!highPriorityNotificationCount && <HighPriorityValue value={highPriorityNotificationCount} />}
          {!shortNavbar && getBigBadge(subCategory.subRoute)}
        </NavbarSubCategory>
      </Button>
    )
  }

  return (
    <Collapse in={index === activeCategory || index === navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS}>
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
              className={classNames.userInfoWrapper}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Typography className={cx(classNames.collapseText, { [classNames.selected]: index === activeCategory })}>
                {'...'}
              </Typography>

              {menuAnchor ? (
                <ArrowDropUpIcon className={cx({ [classNames.selected]: index === activeCategory })} fontSize="small" />
              ) : (
                <ArrowDropDownIcon
                  className={cx({ [classNames.selected]: index === activeCategory })}
                  fontSize="small"
                />
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
          classes={{ paper: classNames.menu, list: classNames.list }}
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
