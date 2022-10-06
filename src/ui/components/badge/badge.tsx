import {Badge as MuiBadge} from '@mui/material'

import {withStyles} from 'tss-react/mui'

import {StyleClass} from '../../../typings/class-name-types'
import {styles} from './badge.style'

interface Props {
  badgeContent: number
  classes: StyleClass
  showZero: boolean
}

const BadgeRaw: React.FC<Props> = props => <MuiBadge {...props} />

export const Badge = withStyles(BadgeRaw, styles)
