import {useClassNames} from './main-content.style'

export const MainContent = props => {
  const classes = useClassNames()
  return <div className={classes.root}>{props.children}</div>
}
