import { memo, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Box, ListItemIcon, ListItemText, SvgIcon } from '@mui/material'
import MuiListItem from '@mui/material/ListItem'

import { Button } from '@components/shared/buttons/button'
import { HighPriorityValue } from '@components/shared/high-priority-value'

import { renderTooltipTitle } from '@utils/renders'

import { HintsContext } from '@contexts/hints-context'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './navbar-category.style'

export const NavbarCategory = memo(({ badge, isSelected, userInfo, category, shortNavbar, onToggleModal }) => {
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
      case '/client/my-orders/orders':
        return (
          <div className={cx(styles.bigBadge, styles.redBadge)}>
            {userInfo.purchaseOrderRequired?.length ? userInfo.purchaseOrderRequired.length : 0}
          </div>
        )
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

  return (
    <Button
      tooltipPosition="center"
      tooltipInfoContent={hints && !shortNavbar && renderTooltipTitle(category.title(), userInfo.role)}
      className={styles.menuItem}
      type={ButtonType.TRANSPARENT}
      onClick={onToggleModal}
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
          <SvgIcon
            inheritviewbox="true"
            className={cx(styles.icon, { [styles.selectedIcon]: isSelected })}
            component={category.icon}
          />

          {badge ? <div className={cx(styles.badge, { [styles.redBadge]: isRedBadge })}>{badge}</div> : undefined}
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
