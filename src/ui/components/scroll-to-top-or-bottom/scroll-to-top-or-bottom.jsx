/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import {useClassNames} from './scroll-to-top-or-bottom.style'

export const ScrollToTopOrBottom = props => {
  const {classes: classNames} = useClassNames()
  const {customStyles, showScrollUp, showScrollDown, сomponentWillScroll} = props

  const scrollTo = block => {
    сomponentWillScroll.current.scrollIntoView({behavior: 'smooth', block: `${block}`, inline: 'center'})
  }

  return (
    <div className={classNames.root} style={customStyles}>
      {showScrollUp && (
        <div className={classNames.arrowWrapper} onClick={() => scrollTo('start')}>
          <KeyboardArrowUpIcon className={classNames.arrowIcon} />
        </div>
      )}
      {showScrollDown && (
        <div className={classNames.arrowWrapper} onClick={() => scrollTo('end')}>
          <KeyboardArrowUpIcon className={cx(classNames.arrowIcon, classNames.arrowIconRoteta)} />
        </div>
      )}
    </div>
  )
}
