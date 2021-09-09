import {Badge as MuiBadge} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {StyleClass} from '../../../typings/class-name-types'
import {styles} from './badge.style'

interface Props {
  badgeContent: number
  classes: StyleClass
  showZero: boolean
}

const BadgeRaw: React.FC<Props> = props => <MuiBadge {...props} />

export const Badge = withStyles(styles)(BadgeRaw)
