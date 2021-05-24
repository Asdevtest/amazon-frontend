import {Typography} from '@material-ui/core'
import AcUnitIcon from '@material-ui/icons/AcUnit'

import {useNotificationStyles} from './notification-item.style'

export const NotificationItem = ({/*	iconComponent,*/ title, subTitle}) => {
  const classes = useNotificationStyles()
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <AcUnitIcon style={{color: 'rgb(0, 123, 255)', marginRight: '16px'}} />
      <div>
        <Typography className={classes.menuItemText}>{title}</Typography>
        <Typography className={classes.menuItemText} style={{fontSize: '13px', color: 'gray'}}>
          {subTitle}
        </Typography>
      </div>
    </div>
  )
}
