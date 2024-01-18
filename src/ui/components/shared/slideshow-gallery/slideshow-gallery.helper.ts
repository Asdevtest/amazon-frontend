import {
  DEFAULT_PREVIEWS_SLIDE_GAP,
  DEFAULT_PREVIEWS_SLIDE_HEIGHT,
  DEFAULT_QUANTITY_SLIDES,
  QUANTITY_SLIDES_INSTEAD_OF_ARROWS,
} from './slideshow-gallery.constants'

export const getCustomDimensionMainSlideSubjectToQuantitySlides = (slidesToShow: number): number => {
  const positiveSlidesToShow = slidesToShow > 0 ? slidesToShow : DEFAULT_QUANTITY_SLIDES

  return (
    (positiveSlidesToShow + QUANTITY_SLIDES_INSTEAD_OF_ARROWS) * DEFAULT_PREVIEWS_SLIDE_HEIGHT +
    positiveSlidesToShow * DEFAULT_PREVIEWS_SLIDE_GAP
  )
}
