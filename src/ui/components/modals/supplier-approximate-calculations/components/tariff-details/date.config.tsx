import { ClsIcon, EtaIcon, EtdIcon } from '@components/shared/svg-icons'

export const dateConfig = [
  {
    param: 'cls',
    icon: <ClsIcon />,
    tooltipText: 'CLS (batch closing date)',
  },
  {
    param: 'etd',
    icon: <EtdIcon />,
    tooltipText: 'ETD (date of shipment)',
  },
  {
    param: 'eta',
    icon: <EtaIcon />,
    tooltipText: 'ETA (arrival date)',
  },
]
