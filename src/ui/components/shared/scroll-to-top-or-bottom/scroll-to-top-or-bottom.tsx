import { CSSProperties, FC } from 'react'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { useStyles } from './scroll-to-top-or-bottom.style'

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
          <KeyboardArrowUpIcon className={styles.arrowIcon} />
        </div>
      )}
      {showScrollDown && (
        <div className={styles.arrowWrapper} onClick={() => scrollTo('end')}>
          <KeyboardArrowUpIcon className={cx(styles.arrowIcon, styles.arrowIconRoteta)} />
        </div>
      )}
    </div>
  )
}
