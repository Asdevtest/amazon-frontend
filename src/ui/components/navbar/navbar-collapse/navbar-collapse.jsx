import React from 'react'

import {Collapse, List, ListItemIcon, ListItemText} from '@material-ui/core'
import clsx from 'clsx'
import {Link} from 'react-router-dom'

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
      case '/client/orders-notifications':
        return (
          <ListItemIcon>
            {<div className={classNames.badge}>{currentViewModel.ordersNotificationsAmount}</div>}
          </ListItemIcon>
        )

      case '/client/boxes-notifications':
        return (
          <ListItemIcon>
            {<div className={classNames.badge}>{currentViewModel.boxesNotificationsAmount}</div>}
          </ListItemIcon>
        )

      default:
        return null
    }
  }

  const renderSubCategory = (subIndex, subCategory) => (
    <NavbarSubCategory
      key={subIndex}
      button
      disableGutters
      component={Link}
      selected={subIndex === activeSubCategory}
      to={subCategory.subRoute}
      onClick={() => onClickCategory(subIndex)}
    >
      <ListItemText
        disableTypography
        className={clsx(classNames.listItemText, {[classNames.selected]: subIndex === activeSubCategory})}
        primary={subCategory.subtitle}
      />

      {renderNotificationBySubRoute(subCategory.subRoute)}
    </NavbarSubCategory>
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
