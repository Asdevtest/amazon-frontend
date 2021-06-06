import {ListItemIcon, ListItemText, SvgIcon} from '@material-ui/core'
import MuiListItem from '@material-ui/core/ListItem'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'
import {Link} from 'react-router-dom'

import {styles} from './navbar-category.style'

const NavBarCategoryRaw = ({title, icon, classes: classNames, isSelected, to}) => {
  console.log(classNames.listItemSelected)
  return (
    <MuiListItem
      disableGutters
      selected={isSelected}
      component={Link}
      to={to}
      classes={{root: classNames.listItemRoot, selected: classNames.listItemSelected}}
    >
      <ListItemIcon
        className={clsx(classNames.iconWrapper, {
          [classNames.listItemSelected]: isSelected,
        })}
      >
        <SvgIcon className={classNames.icon} component={icon} />
      </ListItemIcon>
      <ListItemText disableTypography className={clsx({[classNames.listItemSelected]: isSelected})} primary={title} />
    </MuiListItem>
  )
}

export const NavbarCategory = withStyles(styles)(NavBarCategoryRaw)
