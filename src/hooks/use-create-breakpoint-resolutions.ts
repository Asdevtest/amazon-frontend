import { useMediaQuery, useTheme } from '@mui/material'

import { mobileResolution, tabletResolution } from '@constants/configs/window-resolutions'

export const useCreateBreakpointResolutions = () => {
  const theme = useTheme()
  const isMobileResolution = useMediaQuery(theme.breakpoints.down(mobileResolution))
  const isTabletResolution = useMediaQuery(theme.breakpoints.down(tabletResolution))

  return {
    theme,
    isMobileResolution,
    isTabletResolution,
  }
}
