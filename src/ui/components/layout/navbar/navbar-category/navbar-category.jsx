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
  const { classes: styles, cx } = useStyles()

  const [subRoutes, setSubRoutes] = useState([])
  const isRedBadge = category.route?.includes('/buyer/free-orders')

  const { hints } = useContext(HintsContext)

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
        return <div className={cx(styles.bigBadge, styles.redBadge)}>{userInfo.pendingOrdersByDeadline}</div>
      case '/buyer/ideas':
        return <div className={cx(styles.bigBadge, styles.redBadge)}>{userInfo.ideas?.supplierSearch}</div>
      case '/client/my-orders/orders':
        return (
          <div className={cx(styles.bigBadge, styles.redBadge)}>
            {userInfo.purchaseOrderRequired?.length ? userInfo.purchaseOrderRequired?.length : 0}
          </div>
        )
      case '/client/freelance/service-exchange':
        return userInfo.freelanceNotices?.length > 0 ? (
          <div className={cx(styles.bigBadge, styles.redBadge)}>{userInfo.freelanceNotices?.length}</div>
        ) : null
    }
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
            <div className={cx(styles.badge, { [styles.redBadge]: isRedBadge })}>{badge}</div>
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
