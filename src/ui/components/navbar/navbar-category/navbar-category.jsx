import {ListItemIcon, ListItemText, SvgIcon} from '@material-ui/core'
import MuiListItem from '@material-ui/core/ListItem'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import {styles} from './navbar-category.style'

const NavBarCategoryRaw = observer(({badge, title, icon, classes: classNames, isSelected, to}) => (
  <MuiListItem
    disableGutters
    selected={isSelected}
    component={Link}
    to={to}
    classes={{root: classNames.root, selected: classNames.selected}}
  >
    <ListItemIcon
      className={clsx(classNames.iconWrapper, {
        [classNames.selected]: isSelected,
        [classNames.notSelected]: !isSelected,
      })}
    >
      <SvgIcon className={classNames.icon} component={icon} />
      {badge ? <div className={classNames.badge}>{badge}</div> : undefined}
    </ListItemIcon>
    <ListItemText disableTypography className={clsx({[classNames.listItemSelected]: isSelected})} primary={title} />
  </MuiListItem>
))

export const NavbarCategory = withStyles(styles)(NavBarCategoryRaw)
