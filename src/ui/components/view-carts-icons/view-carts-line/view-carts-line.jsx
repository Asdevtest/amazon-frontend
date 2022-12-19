import {ReactComponent as ViewCartsLineIcon} from '../assets/view-carts-line.svg'
import {useClassNames} from './view-carts-line.style'

export const ViewCartsLine = ({fill}) => {
  const {classes: classNames} = useClassNames()

  return <ViewCartsLineIcon className={classNames.icon} fill={fill} />
}
