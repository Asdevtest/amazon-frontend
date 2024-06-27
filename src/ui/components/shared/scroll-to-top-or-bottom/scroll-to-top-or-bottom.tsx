import { CSSProperties, FC } from 'react'

import { useStyles } from './scroll-to-top-or-bottom.style'

import { ArrowUpIcon } from '../svg-icons'

interface ScrollToTopOrBottomProps {
  customStyles?: CSSProperties
  showScrollUp?: boolean
  showScrollDown?: boolean
  сomponentWillScroll: React.RefObject<HTMLInputElement>
}

// сomponentWillScroll - компонент к границам которого будет происходить скролл

export const ScrollToTopOrBottom: FC<ScrollToTopOrBottomProps> = props => {
  const { classes: styles, cx } = useStyles()
  const { customStyles, showScrollUp, showScrollDown, сomponentWillScroll } = props

  const scrollTo = (block: ScrollLogicalPosition): void => {
    сomponentWillScroll?.current?.scrollIntoView({ behavior: 'smooth', block: `${block}`, inline: 'center' })
  }

  return (
    <div className={styles.root} style={customStyles}>
      {showScrollUp && (
        <div className={styles.arrowWrapper} onClick={() => scrollTo('start')}>
          <ArrowUpIcon className={styles.arrowIcon} />
        </div>
      )}
      {showScrollDown && (
        <div className={styles.arrowWrapper} onClick={() => scrollTo('end')}>
          <ArrowUpIcon className={cx(styles.arrowIcon, styles.arrowIconRoteta)} />
        </div>
      )}
    </div>
  )
}
