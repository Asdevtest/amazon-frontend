import React from 'react'

import {useStyles} from './main.style'

export const Main = props => {
  const classes = useStyles(props.drawerWidth)()
  return <div className={classes.root}>{props.children}</div>
}
