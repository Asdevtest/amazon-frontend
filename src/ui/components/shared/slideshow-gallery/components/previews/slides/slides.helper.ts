import {
  DEFAULT_PREVIEWS_SLIDE_GAP,
  DEFAULT_PREVIEWS_SLIDE_HEIGHT,
  DEFAULT_QUANTITY_SLIDES,
  DIFFERENCE_BETWEEN_QUANTITY_SLIDES_AND_GAP,
  PADDING_WITH_ARROWS,
  QUANTITY_SLIDES_INSTEAD_OF_ARROWS,
} from '../../../slideshow-gallery.constants'

export const getCustomHeightSubjectToQuantitySlides = (
  isSlidesFitOnScreenWithoutArrows: boolean,
  slidesToShow: number,
): number => {
  const positiveSlidesToShow = slidesToShow > 0 ? slidesToShow : DEFAULT_QUANTITY_SLIDES

  return isSlidesFitOnScreenWithoutArrows
    ? (positiveSlidesToShow + QUANTITY_SLIDES_INSTEAD_OF_ARROWS) * DEFAULT_PREVIEWS_SLIDE_HEIGHT +
        positiveSlidesToShow * DEFAULT_PREVIEWS_SLIDE_GAP
    : positiveSlidesToShow * DEFAULT_PREVIEWS_SLIDE_HEIGHT +
        (positiveSlidesToShow - DIFFERENCE_BETWEEN_QUANTITY_SLIDES_AND_GAP) * DEFAULT_PREVIEWS_SLIDE_GAP +
        PADDING_WITH_ARROWS
}
