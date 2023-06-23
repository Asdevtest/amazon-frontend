import { PropsWithChildren, FC, memo } from 'react'

interface TabPanelProps extends PropsWithChildren {
  value: number
  index: number
}

export const TabPanel: FC<TabPanelProps> = memo(({ children, value, index, ...restProps }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...restProps}
  >
    {value === index && children}
  </div>
))
