import { useMediaQuery, useTheme } from '@mui/material'

import { Resolutions } from '@typings/enums/resolutions'

export const useCreateBreakpointResolutions = () => {
  const theme = useTheme()
  const isMobileResolution = useMediaQuery(theme.breakpoints.down(Resolutions.Mobile))
  const isTabletResolution = useMediaQuery(theme.breakpoints.down(Resolutions.Tablet))
  const isPcSmallResolution = useMediaQuery(theme.breakpoints.down(Resolutions.PcSmall))
  const isPcMiddleResolution = useMediaQuery(theme.breakpoints.down(Resolutions.PcMiddle))
  const isPcBigResolution = useMediaQuery(theme.breakpoints.down(Resolutions.PcBig))

  return {
    theme,
    isMobileResolution,
    isTabletResolution,
    isPcSmallResolution,
    isPcMiddleResolution,
    isPcBigResolution,
  }
}
