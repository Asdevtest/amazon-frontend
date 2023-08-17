import { cx } from '@emotion/css'
import { FC, ReactNode, useEffect, useState } from 'react'

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Typography } from '@mui/material'

import { RIGHT_BLOCK_WIDTH } from '@constants/configs/sizes-settings'

import { SettingsModel } from '@models/settings-model'

import { useClassNames } from './custom-slider.style'

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
  const { classes: classNames } = useClassNames()
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
    <div className={classNames.mainContainer}>
      {view === 'simple' && !!children?.length && (
        <div className={classNames.headerCarouselDocumentsWrapper}>
          <div className={cx(classNames.buttonDocumentsWrapper, { [classNames.modal]: isModal })}>
            {alignButtons === 'center' && (
              <ArrowLeftIcon
                style={{
                  width: arrowSize,
                  height: arrowSize,
                }}
                className={cx(classNames.arrowIcon, { [classNames.arrowDisabledIcon]: isFirstSlide })}
                onClick={handleLeftArrowClick}
              />
            )}

            <div className={classNames.window}>
              <div className={classNames.allClides} style={{ transform: `translateX(${offset}%)` }}>
                {clides}
              </div>
            </div>
            {alignButtons === 'center' && (
              <ArrowRightIcon
                style={{
                  width: arrowSize,
                  height: arrowSize,
                }}
                className={cx(classNames.arrowIcon, {
                  [classNames.arrowDisabledIcon]: isLastSlide,
                })}
                onClick={handleRightArrowClick}
              />
            )}
          </div>
          {alignButtons === 'center' ? (
            <div className={classNames.numberOfFiles}>
              {!isHideCounter && <Typography color="primary">{`${slideCount}/${children?.length}`}</Typography>}
            </div>
          ) : (
            <div className={classNames.numberOfFilesFlex}>
              <ArrowLeftIcon
                style={{ width: arrowSize, height: arrowSize }}
                className={cx(classNames.arrowIcon, { [classNames.arrowDisabledIcon]: isFirstSlide })}
                onClick={handleLeftArrowClick}
              />
              <Typography color="primary">{`${slideCount}/${children?.length}`}</Typography>
              <ArrowRightIcon
                style={{
                  width: arrowSize,
                  height: arrowSize,
                }}
                className={cx(classNames.arrowIcon, {
                  [classNames.arrowDisabledIcon]: isLastSlide,
                })}
                onClick={handleRightArrowClick}
              />
            </div>
          )}
        </div>
      )}
      {view === 'complex' && children?.length !== 0 && (
        <div>
          <div className={classNames.headerCarouselWrapper}>
            <div className={classNames.buttonWrapper}>
              <ArrowLeftIcon
                style={{ width: arrowSize, height: arrowSize }}
                className={cx(classNames.arrowIcon, { [classNames.arrowDisabledIcon]: isFirstSlide })}
                onClick={handleLeftArrowClick}
              />
              <Typography className={classNames.proposalCount}>{`${title} №${slideCount}`}</Typography>

              <ArrowRightIcon
                style={{ width: arrowSize, height: arrowSize }}
                className={cx(classNames.arrowIcon, {
                  [classNames.arrowDisabledIcon]: isLastSlide,
                })}
                onClick={handleRightArrowClick}
              />
            </div>

            <Typography color="primary">{`${slideCount}/${children?.length}`}</Typography>
          </div>

          <div className={classNames.window}>
            <div className={classNames.allPages} style={{ transform: `translateX(${offset}%)` }}>
              {clides}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
