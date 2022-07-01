import React from 'react'

import {Collapse, List, ListItemIcon, ListItemText} from '@material-ui/core'
import clsx from 'clsx'
import {Link} from 'react-router-dom'

import {Button} from '@components/buttons/button'

import {renderTooltipTitle} from '@utils/renders'

import {NavbarSubCategory} from '../navbar-sub-category'
import {useClassNames} from './navbar-collapse.style'

export const NavbarCollapse = ({
  activeCategory,
  activeSubCategory,
  category,
  index,
  userInfo,
  onChangeSubCategory,
  currentViewModel,
}) => {
  const classNames = useClassNames()

  const onClickCategory = subIndex => {
    onChangeSubCategory && onChangeSubCategory(subIndex)
  }

  const renderNotificationBySubRoute = subRoute => {
    switch (subRoute) {
      case '/client/notifications/orders-notifications':
        return (
          <ListItemIcon>
            {<div className={classNames.badge}>{currentViewModel.userInfo.needConfirmPriceChange.orders}</div>}
          </ListItemIcon>
        )

      case '/client/notifications/boxes-notifications':
        return (
          <ListItemIcon>
            {<div className={classNames.badge}>{currentViewModel.userInfo.needConfirmPriceChange.boxes}</div>}
          </ListItemIcon>
        )

      case '/client/notifications/tariffs-notifications':
        return (
          <ListItemIcon>
            {<div className={classNames.badge}>{currentViewModel.userInfo.needUpdateTariff.boxes}</div>}
          </ListItemIcon>
        )

      default:
        return null
    }
  }

  const renderSubCategory = (subIndex, subCategory) => (
    <Button
      tooltipPosition="center"
      className={clsx(classNames.menuItem, {[classNames.selected]: subIndex === activeSubCategory})}
      tooltipInfoContent={renderTooltipTitle(subCategory.subtitle, userInfo.role)}
    >
      <NavbarSubCategory
        key={subIndex}
        button
        disableGutters
        component={Link}
        className={classNames.subCategory}
        selected={subIndex === activeSubCategory}
        to={subCategory.subRoute}
        onClick={() => onClickCategory(subIndex)}
      >
        <ListItemText disableTypography className={clsx(classNames.listItemText)} primary={subCategory.subtitle} />

        {renderNotificationBySubRoute(subCategory.subRoute)}
      </NavbarSubCategory>
    </Button>
  )

  return (
    <Collapse in={index === activeCategory}>
      <List disablePadding>
        {category.subtitles?.map((subCategory, subIndex) =>
          subCategory.checkHideSubBlock
            ? subCategory.checkHideSubBlock(userInfo)
              ? renderSubCategory(subCategory.key ? subCategory.key : subIndex, subCategory)
              : null
            : renderSubCategory(subCategory.key ? subCategory.key : subIndex, subCategory),
        )}
      </List>
    </Collapse>
  )
}
