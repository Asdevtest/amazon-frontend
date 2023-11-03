import { FC, PropsWithChildren, memo } from 'react'

interface Props extends PropsWithChildren {
  value: number | string
  index: number | string
  className?: string
}

export const TabPanel: FC<Props> = memo(({ children, value, index, className, ...restProps }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    className={value === index ? className : ''}
    {...restProps}
  >
    {value === index && children}
  </div>
))
