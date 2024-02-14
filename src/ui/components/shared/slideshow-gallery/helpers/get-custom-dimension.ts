import {
  DEFAULT_PREVIEWS_SLIDE_GAP,
  DEFAULT_PREVIEWS_SLIDE_HEIGHT,
  DEFAULT_QUANTITY_SLIDES,
  PREVIEWS_SLIDE_GAP_IN_MODAL,
  PREVIEWS_SLIDE_HEIGHT_IN_MODAL,
  QUANTITY_SLIDES_INSTEAD_OF_ARROWS,
} from '../slideshow-gallery.constants'

export const getCustomDimensionMainSlideSubjectToQuantitySlides = (
  slidesToShow?: number,
  isModalSize?: boolean,
): number => {
  const positiveSlidesToShow = slidesToShow && slidesToShow > 0 ? slidesToShow : DEFAULT_QUANTITY_SLIDES
  const finalSlideHeight = isModalSize ? PREVIEWS_SLIDE_HEIGHT_IN_MODAL : DEFAULT_PREVIEWS_SLIDE_HEIGHT
  const finalSlidesGap = isModalSize ? PREVIEWS_SLIDE_GAP_IN_MODAL : DEFAULT_PREVIEWS_SLIDE_GAP

  return (
    (positiveSlidesToShow + QUANTITY_SLIDES_INSTEAD_OF_ARROWS) * finalSlideHeight +
    positiveSlidesToShow * finalSlidesGap
  )
}
