import {cx} from '@emotion/css'
import {ListItemIcon, ListItemText, SvgIcon} from '@mui/material'
import MuiListItem from '@mui/material/ListItem'

import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'
import {withStyles} from 'tss-react/mui'

import {Button} from '@components/buttons/button'

import {renderTooltipTitle} from '@utils/renders'

import {styles} from './navbar-category.style'

const NavBarCategoryRaw = observer(({badge, classes: classNames, isSelected, userInfo, category}) => {
  const subRoutes = category.subtitles
    ?.map(subCategory =>
      subCategory.checkHideSubBlock
        ? subCategory.checkHideSubBlock(userInfo)
          ? subCategory.subRoute
          : null
        : subCategory.subRoute,
    )
    .filter(el => el !== null)

  return (
    <Button
      tooltipPosition="center"
      tooltipInfoContent={renderTooltipTitle(category.title, userInfo.role)}
      className={classNames.menuItem}
    >
      <MuiListItem
        disableGutters
        selected={isSelected}
        component={Link}
        to={subRoutes?.[0] || category.route}
        classes={{root: classNames.root, selected: classNames.selected}}
      >
        <ListItemIcon
          className={cx(classNames.iconWrapper, {
            [classNames.selectedIcon]: isSelected,
            [classNames.notSelected]: !isSelected,
          })}
        >
          <SvgIcon
            inheritviewbox="true"
            className={cx(classNames.icon, {[classNames.selectedIcon]: isSelected})}
            component={category.icon}
          />

          {badge ? <div className={classNames.badge}>{badge}</div> : undefined}
        </ListItemIcon>
        <ListItemText
          disableTypography
          className={cx({[classNames.listItemSelected]: isSelected})}
          primary={category.title}
        />
      </MuiListItem>
    </Button>
  )
})

export const NavbarCategory = withStyles(NavBarCategoryRaw, styles)
