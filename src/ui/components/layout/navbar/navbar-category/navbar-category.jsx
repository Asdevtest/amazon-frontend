import { Badge } from 'antd'
import { memo, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Box, ListItemIcon, ListItemText } from '@mui/material'
import MuiListItem from '@mui/material/ListItem'

import { Button } from '@components/shared/button'
import { HighPriorityValue } from '@components/shared/high-priority-value'

import { renderTooltipTitle } from '@utils/renders'

import { HintsContext } from '@contexts/hints-context'

import '@typings/enums/button-style'

import { useStyles } from './navbar-category.style'

export const NavbarCategory = memo(({ badge, isSelected, userInfo, category, shortNavbar }) => {
  const { classes: styles, cx, theme } = useStyles()

  const [subRoutes, setSubRoutes] = useState([])
  const isRedBadge = category.route?.includes('/buyer/free-orders')
  const backgroundColorForBadge = isRedBadge ? theme.palette.error.main : theme.palette.primary.main

  const { hints } = useContext(HintsContext)

  const getHighPriorityValue = route => {
    switch (route) {
      case '/warehouse/tasks':
        return userInfo.tasksNewHigh + userInfo.tasksAtProcessHigh
      default:
        return null
    }
  }

  const getCountByRoute = route => {
    switch (route) {
      case '/buyer/pending-orders':
        return userInfo.pendingOrdersByDeadline
      case '/buyer/ideas':
        return userInfo.ideas?.supplierSearch
      case '/client/my-orders/orders':
        return userInfo.purchaseOrderRequired?.length || 0
      case '/client/freelance/service-exchange':
        return userInfo.freelanceNotices?.length || 0
      default:
        return 0
    }
  }

  const getBigBadge = route => {
    const count = getCountByRoute(route)
    return count ? (
      <Badge count={count} color={theme.palette.error.main} className={styles.bigBadge} overflowCount={100000} />
    ) : null
  }

  const getSubRoutes = () => {
    return category.subtitles
      ?.map(subCategory =>
        subCategory.checkHideSubBlock
          ? subCategory.checkHideSubBlock(userInfo)
            ? subCategory.subRoute
            : null
          : subCategory.subRoute,
      )
      .filter(el => el !== null)
  }

  const highPriorityValue = getHighPriorityValue(category.route)

  useEffect(() => {
    setSubRoutes(getSubRoutes())
  }, [category])
  // ! replace Button after swich to ant
  return (
    <Button
      tooltipPosition="center"
      tooltipInfoContent={hints && !shortNavbar && renderTooltipTitle(category.title(), userInfo.role)}
      className={styles.menuItem}
      styleType="transparent"
    >
      <MuiListItem
        disableGutters
        selected={isSelected}
        component={Link}
        to={subRoutes?.[0] || category.route}
        classes={{
          root: cx(styles.root, { [styles.shortNavbarRoot]: shortNavbar }),
          selected: styles.selected,
        }}
      >
        <ListItemIcon
          className={cx(styles.iconWrapper, {
            [styles.selectedIcon]: isSelected,
            [styles.notSelected]: !isSelected,
          })}
        >
          <category.icon className={cx(styles.icon, { [styles.selectedIcon]: isSelected })} />

          {Number(badge) > 0 ? (
            <Badge
              count={badge}
              color={backgroundColorForBadge}
              size="small"
              className={styles.badge}
              overflowCount={100000}
            />
          ) : null}
        </ListItemIcon>
        {!shortNavbar && (
          <ListItemText
            disableTypography
            className={cx({ [styles.listItemSelected]: isSelected })}
            primary={category.title()}
          />
        )}

        {highPriorityValue >= 1 && !shortNavbar && (
          <Box pr="30px">
            <HighPriorityValue value={highPriorityValue} />
          </Box>
        )}

        {!shortNavbar && (
          <div className={cx({ [styles.bigBadgePadding]: category.title })}>
            {getBigBadge(subRoutes?.[0] || category.route)}
          </div>
        )}
      </MuiListItem>
    </Button>
  )
})
