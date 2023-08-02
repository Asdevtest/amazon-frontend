import { FC, PropsWithChildren, memo } from 'react'

interface Props extends PropsWithChildren {
  value: number | string
  index: number | string
}

export const TabPanel: FC<Props> = memo(({ children, value, index, ...restProps }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    style={{ paddingTop: 10 }}
    {...restProps}
  >
    {value === index && children}
  </div>
))
