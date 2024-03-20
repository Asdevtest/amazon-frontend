import { Dispatch, FC, SetStateAction, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { DEFAULT_ANIMATION_DELAY } from '@components/shared/slideshow-gallery/slideshow-gallery.constants'
import { ArrowLeftIcon, ArrowRightIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './arrows.style'

import { FIRST_SLIDE } from '../../gallery-modal.constants'

interface ArrowsProps {
  currentPage: number
  pageСount: number
  disableArrows: boolean
  setIsTransitioning: Dispatch<SetStateAction<boolean>>
  onChangeSlide: (increment: number) => void
}

enum ArrowsIncrement {
  RIGHT_ARROW = 1,
  LEFT_ARROW = -1,
}

export const Arrows: FC<ArrowsProps> = memo(props => {
  const { currentPage, pageСount, disableArrows, setIsTransitioning, onChangeSlide } = props

  const { classes: styles, cx } = useStyles()

  const handleArrowClick = (increment: ArrowsIncrement) => {
    setIsTransitioning(true)

    setTimeout(() => {
      onChangeSlide(increment)

      setIsTransitioning(false)
    }, DEFAULT_ANIMATION_DELAY)
  }

  const pageTitle = `${t(TranslationKey.Page)} ${currentPage} ${t(TranslationKey.of)} ${pageСount}`
  const isLeftArrowDisable = disableArrows || currentPage === FIRST_SLIDE
  const isRightArrowDisable = disableArrows || currentPage === pageСount
  const showArrows = pageСount > FIRST_SLIDE

  return (
    <div className={cx(styles.wrapper, { [styles.fixedHeight]: !showArrows })}>
      {showArrows && (
        <>
          <button
            disabled={isLeftArrowDisable}
            className={styles.iconButton}
            onClick={() => handleArrowClick(ArrowsIncrement.LEFT_ARROW)}
          >
            <ArrowLeftIcon className={styles.icon} />
          </button>

          <p className={styles.title}>{pageTitle}</p>

          <button
            disabled={isRightArrowDisable}
            className={styles.iconButton}
            onClick={() => handleArrowClick(ArrowsIncrement.RIGHT_ARROW)}
          >
            <ArrowRightIcon className={styles.icon} />
          </button>
        </>
      )}
    </div>
  )
})
