import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useClassNames } from './image-zoom-form.style'

export const ImageZoomForm = ({ item }) => {
  const { classes: classNames } = useClassNames()

  return (
    <img
      className={classNames.image}
      src={
        typeof item === 'string'
          ? getAmazonImageUrl(item, true)
          : item?.file.type.includes('image')
          ? item?.data_url
          : '/assets/icons/file.png'
      }
    />
  )
}
