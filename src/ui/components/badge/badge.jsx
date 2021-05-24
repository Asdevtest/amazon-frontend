import {Badge as MuiBadge} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {styles} from './badge.style'

const BadgeRaw = props => <MuiBadge {...props} />

export const Badge = withStyles(styles)(BadgeRaw)
