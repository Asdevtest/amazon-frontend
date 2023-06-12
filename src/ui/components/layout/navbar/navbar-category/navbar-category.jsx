import { cx } from '@emotion/css'
import { Box, ListItemIcon, ListItemText, SvgIcon } from '@mui/material'
import MuiListItem from '@mui/material/ListItem'

import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { withStyles } from 'tss-react/mui'

import { Button } from '@components/shared/buttons/button'
import { HighPriorityValue } from '@components/shared/high-priority-value'

import { renderTooltipTitle } from '@utils/renders'

import { styles } from './navbar-category.style'

const NavBarCategoryRaw = observer(({ badge, classes: classNames, isSelected, userInfo, category, shortNavbar }) => {
  const subRoutes = category.subtitles
    ?.map(subCategory =>
      subCategory.checkHideSubBlock
        ? subCategory.checkHideSubBlock(userInfo)
          ? subCategory.subRoute
          : null
        : subCategory.subRoute,
    )
    .filter(el => el !== null)

  const isRedBadge = category.route?.includes('/buyer/free-orders')

  const getHighPriorityValue = route => {
    switch (route) {
      case '/warehouse/tasks':
        return userInfo.tasksNewHigh + userInfo.tasksAtProcessHigh
      default:
        return null
    }
  }

  const getBigBadge = route => {
    switch (route) {
      case '/buyer/pending-orders':
        return <div className={cx(classNames.bigBadge, classNames.redBadge)}>{userInfo.pendingOrdersByDeadline}</div>
      case '/client/my-orders/orders':
        return (
          <div className={cx(classNames.bigBadge, classNames.redBadge)}>
            {userInfo.purchaseOrderRequired?.length ? userInfo.purchaseOrderRequired.length : 0}
          </div>
        )
    }
  }

  const highPriorityValue = getHighPriorityValue(category.route)
  // console.log('badge', badge, category)

  return (
    <Button
      tooltipPosition="center"
      tooltipInfoContent={!shortNavbar && renderTooltipTitle(category.title, userInfo.role)}
      className={classNames.menuItem}
    >
      <MuiListItem
        disableGutters
        selected={isSelected}
        component={Link}
        to={subRoutes?.[0] || category.route}
        classes={{
          root: cx(classNames.root, { [classNames.shortNavbarRoot]: shortNavbar }),
          selected: classNames.selected,
        }}
      >
        <ListItemIcon
          className={cx(classNames.iconWrapper, {
            [classNames.selectedIcon]: isSelected,
            [classNames.notSelected]: !isSelected,
          })}
        >
          <SvgIcon
            inheritviewbox="true"
            className={cx(classNames.icon, { [classNames.selectedIcon]: isSelected })}
            component={category.icon}
          />

          {badge ? (
            <div className={cx(classNames.badge, { [classNames.redBadge]: isRedBadge })}>{badge}</div>
          ) : undefined}
        </ListItemIcon>
        {!shortNavbar && ( // убрать условие если нужно вернуть старый вид
          <ListItemText
            disableTypography
            className={cx({ [classNames.listItemSelected]: isSelected })}
            primary={category.title}
          />
        )}

        {highPriorityValue >= 1 && !shortNavbar && (
          <Box pr="30px">
            <HighPriorityValue value={highPriorityValue} />
          </Box>
        )}
        {/* {subRoutes?.[0] || category.route} */}
        {!shortNavbar && (
          <div className={cx({ [classNames.bigBadgePadding]: category.title })}>
            {getBigBadge(subRoutes?.[0] || category.route)}
          </div>
        )}
      </MuiListItem>
    </Button>
  )
})

export const NavbarCategory = withStyles(NavBarCategoryRaw, styles)
