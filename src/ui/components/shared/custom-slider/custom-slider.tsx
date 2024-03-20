/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, useEffect, useState } from 'react'

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Typography } from '@mui/material'

import { RIGHT_BLOCK_WIDTH } from '@constants/configs/sizes-settings'

import { SettingsModel } from '@models/settings-model'

import { useStyles } from './custom-slider.style'

interface CustomSliderProps {
  children: Array<ReactNode>
  title?: string
  view?: string
  alignButtons?: string
  arrowSize?: string
  index?: number
  onChangeIndex?: (index: number) => void
  isHideCounter?: boolean
  isModal?: boolean
}

export const CustomSlider: FC<CustomSliderProps> = props => {
  const {
    title,
    view = 'simple',
    alignButtons = 'center',
    index,
    onChangeIndex,
    arrowSize,
    children,
    isHideCounter,
    isModal = false,
  } = props
  const { classes: styles, cx } = useStyles()
  const [clides, setClides] = useState<ReactNode[]>([])
  const [offset, setOffset] = useState(index ? -RIGHT_BLOCK_WIDTH * index : 0)

  const [slideCount, setSlideCount] = useState(index ? index + 1 : 1)

  const isFirstSlide = offset === 0
  const isLastSlide = offset === -(RIGHT_BLOCK_WIDTH * children?.length) + 100

  useEffect(() => {
    setClides(
      children?.map((child, indexChild) => (
        <div
          key={indexChild}
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: `${RIGHT_BLOCK_WIDTH}%`,
            maxWidth: `${RIGHT_BLOCK_WIDTH}%`,
          }}
        >
          {child}
        </div>
      )),
    )
  }, [SettingsModel.languageTag, children])

  useEffect(() => {
    if (index !== undefined) {
      setSlideCount(index + 1)
      setOffset(-RIGHT_BLOCK_WIDTH * index)
    }
  }, [index])

  useEffect(() => {
    if (onChangeIndex) {
      onChangeIndex(slideCount - 1)
    }
  }, [slideCount])

  const handleLeftArrowClick = (e: any) => {
    e.stopPropagation()
    setOffset(currentOffset => {
      const newOffset = currentOffset + RIGHT_BLOCK_WIDTH
      return Math.min(newOffset, 0)
    })

    if (slideCount > 1) {
      setSlideCount(prev => prev - 1)
    }
  }

  const handleRightArrowClick = (e: any) => {
    e.stopPropagation()
    setOffset(currentOffset => {
      const newOffset = currentOffset - RIGHT_BLOCK_WIDTH
      const maxOffset = -(RIGHT_BLOCK_WIDTH * (clides.length - 1))
      return Math.max(newOffset, maxOffset)
    })

    if (slideCount < children.length) {
      setSlideCount(prev => prev + 1)
    }
  }

  return (
    <div className={styles.mainContainer}>
      {view === 'simple' && !!children?.length && (
        <div className={styles.headerCarouselDocumentsWrapper}>
          <div className={cx(styles.buttonDocumentsWrapper, { [styles.modal]: isModal })}>
            {alignButtons === 'center' && (
              <ArrowLeftIcon
                style={{
                  width: arrowSize,
                  height: arrowSize,
                }}
                className={cx(styles.arrowIcon, { [styles.arrowDisabledIcon]: isFirstSlide })}
                onClick={handleLeftArrowClick}
              />
            )}

            <div className={styles.window}>
              <div className={styles.allClides} style={{ transform: `translateX(${offset}%)` }}>
                {clides}
              </div>
            </div>
            {alignButtons === 'center' && (
              <ArrowRightIcon
                style={{
                  width: arrowSize,
                  height: arrowSize,
                }}
                className={cx(styles.arrowIcon, {
                  [styles.arrowDisabledIcon]: isLastSlide,
                })}
                onClick={handleRightArrowClick}
              />
            )}
          </div>
          {alignButtons === 'center' ? (
            <div className={styles.numberOfFiles}>
              {!isHideCounter && <Typography color="primary">{`${slideCount}/${children?.length}`}</Typography>}
            </div>
          ) : (
            <div className={styles.numberOfFilesFlex}>
              <ArrowLeftIcon
                style={{ width: arrowSize, height: arrowSize }}
                className={cx(styles.arrowIcon, { [styles.arrowDisabledIcon]: isFirstSlide })}
                onClick={handleLeftArrowClick}
              />
              <Typography color="primary">{`${slideCount}/${children?.length}`}</Typography>
              <ArrowRightIcon
                style={{
                  width: arrowSize,
                  height: arrowSize,
                }}
                className={cx(styles.arrowIcon, {
                  [styles.arrowDisabledIcon]: isLastSlide,
                })}
                onClick={handleRightArrowClick}
              />
            </div>
          )}
        </div>
      )}
      {view === 'complex' && children?.length !== 0 && (
        <div>
          <div className={styles.headerCarouselWrapper}>
            <div className={styles.buttonWrapper}>
              <ArrowLeftIcon
                style={{ width: arrowSize, height: arrowSize }}
                className={cx(styles.arrowIcon, { [styles.arrowDisabledIcon]: isFirstSlide })}
                onClick={handleLeftArrowClick}
              />
              <Typography className={styles.proposalCount}>{`${title} №${slideCount}`}</Typography>

              <ArrowRightIcon
                style={{ width: arrowSize, height: arrowSize }}
                className={cx(styles.arrowIcon, {
                  [styles.arrowDisabledIcon]: isLastSlide,
                })}
                onClick={handleRightArrowClick}
              />
            </div>

            <Typography color="primary">{`${slideCount}/${children?.length}`}</Typography>
          </div>

          <div className={styles.window}>
            <div className={styles.allPages} style={{ transform: `translateX(${offset}%)` }}>
              {clides}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
