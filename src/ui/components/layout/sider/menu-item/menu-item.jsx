import { Badge } from 'antd'
import { memo, useEffect, useState } from 'react'
import { BsFire } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { CustomButton } from '@components/shared/custom-button'

import { renderTooltipTitle } from '@utils/renders'

import { useStyles } from './menu-item.style'

export const MenuItem = memo(props => {
  const { badge, isSelected, userInfo, category, shortNavbar } = props

  const { classes: styles, cx, theme } = useStyles()
  const [subRoutes, setSubRoutes] = useState([])

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
        return userInfo.pendingOrdersByDeadline
      case '/client/my-orders/orders':
        return userInfo.purchaseOrderRequired?.length
      case '/client/freelance/service-exchange':
        return userInfo.freelanceNotices?.length
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
    <Link to={subRoutes?.[0] || category.route}>
      <CustomButton
        block
        textAlign="left"
        color="primary"
        variant={isSelected ? 'outlined' : 'text'}
        size="large"
        icon={
          <Badge size="small" count={badge} overflowCount={99999} offset={[5, 0]} color={theme.palette.primary.main}>
            <category.icon />
          </Badge>
        }
        title={renderTooltipTitle(category.title(), userInfo.role)}
        className={styles.menuItem}
      >
        <span className={styles.text}>{category.title()}</span>

        {highPriorityValue >= 1 ? <BsFire size={20} color="red" /> : null}

        <Badge count={getBigBadge(subRoutes?.[0] || category.route)} />
      </CustomButton>
    </Link>
  )
})
