import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import {Children, cloneElement, useEffect, useState} from 'react'

import {Typography} from '@material-ui/core'

import {SettingsModel} from '@models/settings-model'

import {useClassNames} from './custom-carousel.style'

export const RIGHT_BLOCK_WIDTH = 100

export const CustomCarousel = ({children, title}) => {
  const classNames = useClassNames()
  const [clides, setClides] = useState([])
  const [offset, setOffset] = useState(0)

  const firstSlide = parseInt(children[0].key) + 1
  const [slideCount, setSlideCount] = useState(firstSlide)

  const handleLeftArrowClick = () => {
    setOffset(currentOffset => {
      const newOffset = currentOffset + RIGHT_BLOCK_WIDTH

      return Math.min(newOffset, 0)
    })

    if (slideCount > 1) {
      setSlideCount(prev => prev - 1)
    }
  }

  const handleRightArrowClick = () => {
    setOffset(currentOffset => {
      const newOffset = currentOffset - RIGHT_BLOCK_WIDTH

      const maxOffset = -(RIGHT_BLOCK_WIDTH * (clides.length - 1))

      return Math.max(newOffset, maxOffset)
    })

    if (slideCount < children.length) {
      setSlideCount(prev => prev + 1)
    }
  }

  useEffect(() => {
    setClides(
      Children.map(children, child =>
        cloneElement(child, {
          style: {
            height: '100%',
            minWidth: `${RIGHT_BLOCK_WIDTH}%`,
            maxWidth: `${RIGHT_BLOCK_WIDTH}%`,
          },
        }),
      ),
    )
  }, [SettingsModel.languageTag])
  return (
    <div className={classNames.mainContainer}>
      <div className={classNames.headerCarouselWrapper}>
        <div className={classNames.buttonWrapper}>
          <ArrowLeftIcon
            style={{cursor: 'pointer'}}
            color="primary"
            disabled={offset === 0}
            className={classNames.carouselBtn}
            onClick={handleLeftArrowClick}
          />
          <Typography className={classNames.proposalCount}>{`${title} №${slideCount}`}</Typography>

          <ArrowRightIcon
            style={{cursor: 'pointer'}}
            color="primary"
            disabled={offset === -(RIGHT_BLOCK_WIDTH * children.length) + 100}
            onClick={handleRightArrowClick}
          />
        </div>
        <div className={classNames.numberOfProposals}>
          <Typography color="primary">{`${slideCount}/${children.length}`}</Typography>
        </div>
      </div>

      <div className={classNames.window}>
        <div className={classNames.allPages} style={{transform: `translateX(${offset}%)`}}>
          {clides}
        </div>
      </div>
    </div>
  )
}
