import { forwardRef } from 'react'

import { observer } from 'mobx-react'

import { useClassNames } from './main-content.style'

export const MainContent = observer(
  forwardRef((props, ref) => {
    const { classes } = useClassNames()
    return (
      <div ref={ref} className={classes.root}>
        {props.children}
      </div>
    )
  }),
)
