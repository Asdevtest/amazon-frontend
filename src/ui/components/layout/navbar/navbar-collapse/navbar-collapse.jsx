import { useState } from 'react'
import { Link } from 'react-router-dom'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Collapse, List, ListItemIcon, ListItemText, Menu, Typography } from '@mui/material'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'

import { Button } from '@components/shared/buttons/button'
import { HighPriorityValue } from '@components/shared/high-priority-value'

import { getSumPropertiesObject } from '@utils/object'
import { renderAttentionTooltipTitle, renderTooltipTitle } from '@utils/renders'

import { ButtonType } from '@typings/types/button.type'

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
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.tasksNewAll || 0}</div>}</ListItemIcon>

      case '/warehouse/tasks/my-tasks':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.tasksAtProcessAll || 0}</div>}</ListItemIcon>

      case '/client/notifications/ideas-notifications':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.updatesOnIdeas || 0}</div>}</ListItemIcon>

      case '/buyer/notifications/ideas-notifications':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.updatesOnIdeas || 0}</div>}</ListItemIcon>

      case '/client/notifications/orders-notifications':
        return (
          <ListItemIcon>
            {<div className={styles.badge}>{userInfo?.needConfirmPriceChange?.orders || 0}</div>}
          </ListItemIcon>
        )

      case '/client/notifications/boxes-notifications':
        return (
          <ListItemIcon>
            {<div className={styles.badge}>{userInfo?.needConfirmPriceChange?.boxes || 0}</div>}
          </ListItemIcon>
        )

      case '/client/notifications/tariffs-notifications':
        return (
          <ListItemIcon>{<div className={styles.badge}>{userInfo?.needUpdateTariff?.boxes || 0}</div>}</ListItemIcon>
        )

      case '/client/notifications/freelance-notifications':
        return (
          <ListItemIcon>{<div className={styles.badge}>{userInfo?.freelanceNotices?.length || 0}</div>}</ListItemIcon>
        )

      case '/freelancer/notifications/freelance-notifications':
        return (
          <ListItemIcon>{<div className={styles.badge}>{userInfo?.freelanceNotices?.length || 0}</div>}</ListItemIcon>
        )

      // case '/shared/general-notifications-view':
      //   return (
      //     <ListItemIcon>
      //       {<div className={styles.badge}>{currentViewModel.userInfo.freelanceNotices.length}</div>}
      //     </ListItemIcon>
      //   )

      case '/client/my-orders/pending-orders':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.pendingOrders || 0}</div>}</ListItemIcon>

      case '/client/my-orders/orders':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.orders || 0}</div>}</ListItemIcon>

      case '/buyer/not-paid-orders':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.notPaid || 0}</div>}</ListItemIcon>

      case '/buyer/need-track-number-orders':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.needTrackNumber || 0}</div>}</ListItemIcon>

      case '/buyer/inbound-orders':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.inbound || 0}</div>}</ListItemIcon>

      case '/buyer/confirmation-required-orders':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.confirmationRequired || 0}</div>}</ListItemIcon>

      case '/buyer/closed-and-canceled-orders':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.closedAndCanceled || 0}</div>}</ListItemIcon>

      case '/buyer/ready-for-payment-orders':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.readyForPayment || 0}</div>}</ListItemIcon>

      case '/buyer/partially-paid-orders':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.partiallyPaid || 0}</div>}</ListItemIcon>

      case '/buyer/all-orders':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.allOrders || 0}</div>}</ListItemIcon>

      case '/client/ideas/new':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.ideas?.new || 0}</div>}</ListItemIcon>

      case '/client/ideas/on-checking':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.ideas?.onCheck || 0}</div>}</ListItemIcon>

      case '/client/ideas/search-suppliers':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.ideas?.supplierSearch || 0}</div>}</ListItemIcon>

      case '/client/ideas/create-card':
        return (
          <ListItemIcon>{<div className={styles.badge}>{userInfo?.ideas?.productCreating || 0}</div>}</ListItemIcon>
        )

      case '/client/ideas/add-asin':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.ideas?.addingAsin || 0}</div>}</ListItemIcon>

      case '/client/ideas/realized':
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.ideas?.finished || 0}</div>}</ListItemIcon>

      case '/client/ideas/closed':
        return (
          <ListItemIcon>
            {<div className={styles.badge}>{userInfo?.ideas?.rejectedOrClosed || 0 || 0}</div>}
          </ListItemIcon>
        )

      case `/${UserRoleCodeMapForRoutes[userInfo?.role]}/notifications/general-notifications-view`:
        return <ListItemIcon>{<div className={styles.badge}>{userInfo?.notificationCounter || 0}</div>}</ListItemIcon>

      case '/client/ideas/all':
        return (
          <ListItemIcon>
            {
              <div className={styles.badge}>
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
            <div className={styles.badge}>{userInfo?.vacantRequests}</div>
          </ListItemIcon>
        )

      case '/freelancer/freelance/my-proposals':
        return (
          <ListItemIcon>
            <div className={styles.badge}>{getSumPropertiesObject(userInfo?.myProposals)}</div>
          </ListItemIcon>
        )

      case '/buyer/search-supplier-by-supervisor':
        return (
          <ListItemIcon>
            <div className={styles.badge}>{userInfo?.searchFromSupervisor}</div>
          </ListItemIcon>
        )

      case '/buyer/search-supplier-by-client':
        return (
          <ListItemIcon>
            <div className={styles.badge}>{userInfo?.searchFromClient}</div>
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
          <div className={cx(styles.bigBadge, styles.redBadge)}>
            {userInfo?.purchaseOrderRequired?.length ? userInfo?.purchaseOrderRequired?.length : 0}
          </div>
        )

      case '/supervisor/ready-to-check':
        return <div className={cx(styles.bigBadge, styles.redBadge)}>{userInfo?.vacFromResearcher}</div>

      case '/supervisor/ready-to-check-by-client':
        return <div className={cx(styles.bigBadge, styles.redBadge)}>{userInfo?.vacFromClient}</div>

      default:
        return null
    }
  }

  const renderSubCategory = (subIndex, subCategory) => {
    const highPriorityNotificationCount =
      showHighPriorityNotification && getNotificationCountBySubRoute(subCategory.subRoute)

    return (
      <Button
        key={subIndex}
        tooltipPosition="center"
        className={cx(styles.menuItem, { [styles.selected]: subIndex === activeSubCategory })}
        type={ButtonType.TRANSPARENT}
        tooltipInfoContent={!shortNavbar && renderTooltipTitle(subCategory?.subtitle(), userInfo.role)}
        tooltipAttentionContent={!shortNavbar && renderAttentionTooltipTitle(subCategory?.subtitle(), userInfo.role)}
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
              <Typography className={cx(styles.collapseText, { [styles.selected]: index === activeCategory })}>
                {'...'}
              </Typography>

              {menuAnchor ? (
                <ArrowDropUpIcon className={cx({ [styles.selected]: index === activeCategory })} fontSize="small" />
              ) : (
                <ArrowDropDownIcon className={cx({ [styles.selected]: index === activeCategory })} fontSize="small" />
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
