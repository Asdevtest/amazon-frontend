import { PropsWithChildren, FC, memo } from 'react'

import { useClassNames } from './tab-panel.style'

interface TabPanelProps extends PropsWithChildren {
  value: number
  index: number
}

export const TabPanel: FC<TabPanelProps> = memo(({ children, value, index, ...restProps }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={classNames.tabPanelWrapper}
      {...restProps}
    >
      {value === index && children}
    </div>
  )
})
