import {ListItemIcon, ListItemText, SvgIcon} from '@material-ui/core'
import MuiListItem from '@material-ui/core/ListItem'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

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
          className={clsx(classNames.iconWrapper, {
            [classNames.selectedIcon]: isSelected,
            [classNames.notSelected]: !isSelected,
          })}
        >
          <SvgIcon inheritViewBox className={classNames.icon} component={category.icon} />

          {badge ? <div className={classNames.badge}>{badge}</div> : undefined}
        </ListItemIcon>
        <ListItemText
          disableTypography
          className={clsx({[classNames.listItemSelected]: isSelected})}
          primary={category.title}
        />
      </MuiListItem>
    </Button>
  )
})

export const NavbarCategory = withStyles(styles)(NavBarCategoryRaw)
