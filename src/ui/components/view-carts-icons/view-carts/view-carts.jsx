import {ReactComponent as ViewCartsIcon} from '../assets/view-carts.svg'
import {useClassNames} from './view-carts.style'

export const ViewCarts = ({fill}) => {
  const {classes: classNames} = useClassNames()

  return <ViewCartsIcon className={classNames.icon} fill={fill} />
}
