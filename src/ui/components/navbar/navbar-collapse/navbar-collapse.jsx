import {cx} from '@emotion/css'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {Collapse, List, ListItemIcon, ListItemText, Typography, Menu} from '@mui/material'

import React, {useState} from 'react'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import {Link} from 'react-router-dom'

import {navBarActiveCategory} from '@constants/navbar-active-category'

import {Button} from '@components/buttons/button'

import {renderAttentionTooltipTitle, renderTooltipTitle} from '@utils/renders'

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
  shortNavbar,
}) => {
  const {classes: classNames} = useClassNames()

  const [menuAnchor, setMenuAnchor] = useState(null)

  const handleClick = event => {
    setMenuAnchor(event.currentTarget)
  }

  const handleClose = () => {
    setMenuAnchor(null)
  }

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

      case '/client/pending-orders':
        return (
          <ListItemIcon>
            {<div className={classNames.redBadge}>{currentViewModel.userInfo.purchaseOrderRequired?.length}</div>}
          </ListItemIcon>
        )

      default:
        return null
    }
  }

  const renderSubCategory = (subIndex, subCategory) => (
    <Button
      key={subIndex}
      tooltipPosition="center"
      className={cx(classNames.menuItem, {[classNames.selected]: subIndex === activeSubCategory})}
      tooltipInfoContent={!shortNavbar && renderTooltipTitle(subCategory.subtitle, userInfo.role)}
      tooltipAttentionContent={!shortNavbar && renderAttentionTooltipTitle(subCategory.subtitle, userInfo.role)}
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
        <ListItemText
          disableTypography
          className={cx(classNames.listItemText, {[classNames.selected]: subIndex === activeSubCategory})}
          primary={subCategory.subtitle}
        />

        {renderNotificationBySubRoute(subCategory.subRoute)}
      </NavbarSubCategory>
    </Button>
  )

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
              <Typography className={cx(classNames.collapseText, {[classNames.selected]: index === activeCategory})}>
                {'...'}
              </Typography>

              {menuAnchor ? (
                <ArrowDropUpIcon className={cx({[classNames.selected]: index === activeCategory})} fontSize="small" />
              ) : (
                <ArrowDropDownIcon className={cx({[classNames.selected]: index === activeCategory})} fontSize="small" />
              )}
            </div>
          ) : null}
        </>
      )}

      <Menu
        keepMounted
        id="simple-menu"
        anchorEl={menuAnchor}
        autoFocus={false}
        open={Boolean(menuAnchor)}
        classes={{paper: classNames.menu, list: classNames.list}}
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
    </Collapse>
  )
}
