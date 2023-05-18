/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { FC, CSSProperties } from 'react'

import { useClassNames } from './scroll-to-top-or-bottom.style'

interface ScrollToTopOrBottomProps {
  customStyles?: CSSProperties
  showScrollUp?: boolean
  showScrollDown?: boolean
  сomponentWillScroll: React.RefObject<HTMLInputElement>
}

// сomponentWillScroll - компонент к границам которого будет происходить скролл

export const ScrollToTopOrBottom: FC<ScrollToTopOrBottomProps> = props => {
  const { classes: classNames } = useClassNames()
  const { customStyles, showScrollUp, showScrollDown, сomponentWillScroll } = props

  const scrollTo = (block: ScrollLogicalPosition): void => {
    сomponentWillScroll?.current?.scrollIntoView({ behavior: 'smooth', block: `${block}`, inline: 'center' })
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
