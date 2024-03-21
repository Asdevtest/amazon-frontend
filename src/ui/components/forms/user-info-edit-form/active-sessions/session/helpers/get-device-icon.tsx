import { LaptopIcon, MobileIcon } from '@components/shared/svg-icons'

export const getDeviceIcon = (session: string): JSX.Element => {
  return /mobile/i.test(session) ? <MobileIcon /> : <LaptopIcon />
}
