import {ListItemIcon, ListItemText, SvgIcon} from '@material-ui/core'
import MuiListItem from '@material-ui/core/ListItem'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import {TranslationKey} from '@constants/translations/translation-key'
import {UserRole, UserRoleCodeMap} from '@constants/user-roles'

import {Button} from '@components/buttons/button'

import {t} from '@utils/translations'

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

  const renderTooltipTitle = (categoryTitle, userRole) => {
    if (UserRoleCodeMap[userRole] === UserRole.BUYER) {
      switch (categoryTitle) {
        case t(TranslationKey.Dashboard):
          return t(TranslationKey['Statistics on goods/orders/finances'])
        case t(TranslationKey['Free Orders']):
          return t(TranslationKey['All orders available for pickup'])
        case t(TranslationKey['Supplier search']):
          return t(TranslationKey['All available tasks for finding a supplier'])
        case t(TranslationKey.Users):
          return t(TranslationKey['Manage the list of employees'])
        case t(TranslationKey.Finances):
          return t(TranslationKey["Detailed description of the movement of the user's money"])
        case t(TranslationKey['My products']):
          return t(TranslationKey['List of items taken by Bayer to find a supplier'])
        case t(TranslationKey['My orders']):
          return t(TranslationKey['Management of all orders assigned to Bayer'])
      }
    } else if (UserRoleCodeMap[userRole] === UserRole.RESEARCHER) {
      switch (categoryTitle) {
        case t(TranslationKey.Dashboard):
          return t(TranslationKey['Statistics on goods/orders/finances'])
        case t(TranslationKey['My products']):
          return t(TranslationKey['List of products created by the Researcher'])
        case t(TranslationKey.Users):
          return t(TranslationKey['Manage the list of employees'])
        case t(TranslationKey.Finances):
          return t(TranslationKey["Detailed description of the movement of the user's money"])
      }
    } else if (UserRoleCodeMap[userRole] === UserRole.SUPERVISOR) {
      switch (categoryTitle) {
        case t(TranslationKey.Dashboard):
          return t(TranslationKey['Statistics on goods/orders/finances'])
        case t(TranslationKey['Ready to check']):
          return t(TranslationKey['All product cards available for checking'])
        case t(TranslationKey.Users):
          return t(TranslationKey['Manage the list of employees'])
        case t(TranslationKey.Finances):
          return t(TranslationKey["Detailed description of the movement of the user's money"])
        case t(TranslationKey['My products']):
          return t(TranslationKey['The list of goods cards assigned to the supervisor for verification'])
      }
    }
  }

  return (
    <Button tooltipInfoContent={renderTooltipTitle(category.title, userInfo.role)} className={classNames.menuItem}>
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
          <SvgIcon className={classNames.icon} component={category.icon} />
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
