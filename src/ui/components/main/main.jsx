import {useClassNames} from './main.style'

export const Main = props => {
  const classes = useClassNames(props.drawerWidth)
  return <div className={classes.root}>{props.children}</div>
}
