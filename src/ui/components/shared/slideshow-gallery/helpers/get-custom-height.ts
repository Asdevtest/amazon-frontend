import {
  DEFAULT_PREVIEWS_SLIDE_GAP,
  DEFAULT_PREVIEWS_SLIDE_HEIGHT,
  DEFAULT_QUANTITY_SLIDES,
  DIFFERENCE_BETWEEN_QUANTITY_SLIDES_AND_GAP,
  PADDING_WITH_ARROWS,
  PREVIEWS_SLIDE_GAP_IN_MODAL,
  PREVIEWS_SLIDE_HEIGHT_IN_MODAL,
  QUANTITY_SLIDES_INSTEAD_OF_ARROWS,
} from '../slideshow-gallery.constants'

export const getCustomHeightSubjectToQuantitySlides = (
  isSlidesFitOnScreenWithoutArrows: boolean,
  slidesToShow?: number,
  isModalSize?: boolean,
): number => {
  const positiveSlidesToShow = slidesToShow && slidesToShow > 0 ? slidesToShow : DEFAULT_QUANTITY_SLIDES
  const finalSlideHeight = isModalSize ? PREVIEWS_SLIDE_HEIGHT_IN_MODAL : DEFAULT_PREVIEWS_SLIDE_HEIGHT
  const finalSlidesGap = isModalSize ? PREVIEWS_SLIDE_GAP_IN_MODAL : DEFAULT_PREVIEWS_SLIDE_GAP

  return isSlidesFitOnScreenWithoutArrows
    ? (positiveSlidesToShow + QUANTITY_SLIDES_INSTEAD_OF_ARROWS) * finalSlideHeight +
        positiveSlidesToShow * finalSlidesGap
    : positiveSlidesToShow * finalSlideHeight +
        (positiveSlidesToShow - DIFFERENCE_BETWEEN_QUANTITY_SLIDES_AND_GAP) * finalSlidesGap +
        PADDING_WITH_ARROWS
}
