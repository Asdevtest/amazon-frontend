import { Badge as MuiBadge } from '@mui/material'

import { withStyles } from 'tss-react/mui'

import { styles } from './badge.style'

interface Props {
  badgeContent: number
  classes: {
    [key: string]: string
  }
  showZero: boolean
}

const BadgeRaw: React.FC<Props> = props => <MuiBadge {...props} />

export const Badge = withStyles(BadgeRaw, styles)
