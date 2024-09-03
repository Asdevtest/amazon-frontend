import { ProfileStatus } from '@typings/enums/request/profile-request-status'

import { useStyles } from '../parsing-profile-view.style'

export const getProfileStatusColor = (status: ProfileStatus) => {
  const { theme } = useStyles()

  switch (status) {
    case ProfileStatus.VACANT:
      return theme.palette.fileIcons.doc
    case ProfileStatus.IN_USE:
      return theme.palette.fileIcons.xls
    default:
      return theme.palette.fileIcons.txt
  }
}
