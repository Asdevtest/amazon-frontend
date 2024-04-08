import { FC, memo, useState } from 'react'

import { useStyles } from './slider-components.style'

import { ArrowLeftIcon, ArrowRightIcon } from '../svg-icons'

interface SliderComponentsProps {
  slides: JSX.Element[]
  customGap?: number
  quantitySlides?: number
}

export const SliderComponents: FC<SliderComponentsProps> = memo(props => {
  const { slides, customGap = 20, quantitySlides = 4 } = props

  const { classes: styles } = useStyles()
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }
  const handleNextSlide = () => {
    if (currentIndex < slides.length - quantitySlides) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const showButton = slides.length > quantitySlides
  const disabledPrevButton = currentIndex === 0
  const disabledNextButton = currentIndex === slides.length - quantitySlides

  return (
    <div className={styles.wrapper}>
      {showButton ? (
        <button disabled={disabledPrevButton} className={styles.button} onClick={handlePrevSlide}>
          <ArrowLeftIcon className={styles.icon} />
        </button>
      ) : null}

      <div className={styles.sliderContainer}>
        <div
          className={styles.sliderWrapper}
          style={{
            transform: `translateX(-${currentIndex * (100 / quantitySlides)}%)`,
            gap: customGap,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{
                flex: `0 0 calc(${100 / quantitySlides}% - ${customGap}px)`,
                width: `calc(${100 / quantitySlides}% - ${customGap}px)`,
              }}
              className={styles.slide}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showButton ? (
        <button disabled={disabledNextButton} className={styles.button} onClick={handleNextSlide}>
          <ArrowRightIcon className={styles.icon} />
        </button>
      ) : null}
    </div>
  )
})
