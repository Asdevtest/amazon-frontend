import Bowser from 'bowser'

import { LaptopIcon, MobileIcon } from '@components/shared/svg-icons'

import { Device } from '@typings/enums/device'

export const getDeviceIcon = (userAgent: string): JSX.Element => {
  const platformType = Bowser.getParser(userAgent).getPlatformType(true) // flag true - return result in lower case

  return platformType === Device.MOBILE ? <MobileIcon /> : <LaptopIcon />
}
