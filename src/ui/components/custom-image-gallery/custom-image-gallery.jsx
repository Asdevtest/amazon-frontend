/* eslint-disable no-unused-vars */
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import React, { useEffect, useState } from 'react'

// import ImageGallery from 'react-image-gallery'
// import 'react-image-gallery/styles/css/image-gallery.css'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useClassNames } from './custom-image-gallery.style'

export const CustomImageGallery = ({ images, imgIndex = 0 }) => {
  const { classes: classNames } = useClassNames()

  const [curItems, setCurItems] = useState(
    images.map(el => ({
      original: getAmazonImageUrl(el, true),
      thumbnail: getAmazonImageUrl(el, true),
      originalClass: classNames.imgBox,
      sizes: { width: '50vw', height: '70vh' },

      // sizes: {width: '100%', height: '50%'},
      // originalWidth: '300px',
    })),
  )

  useEffect(() => {
    setCurItems(
      images.map(el => ({
        original: getAmazonImageUrl(el, true),
        thumbnail: getAmazonImageUrl(el, true),
        originalClass: classNames.imgBox,
        // sizes: {width: '50vw', height: '70vh'},
        // sizes: {width: '100%', height: '50%'},

        // originalWidth: '300px',
      })),
    )
  }, [images])

  return (
    <div className={classNames.carouselWrapper}></div>
    // <ImageGallery
    //   items={curItems}
    //   startIndex={imgIndex}
    //   thumbnailPosition="left"
    //   additionalClass={classNames.mainWrapper}
    //   renderCustomControls={() => (
    //     <DeleteOutlineOutlinedIcon
    //       onClick={(event1, event2) => {
    //         console.log(event1, event1)
    //         console.log(event2, event2)
    //       }}
    //     />
    //   )}
    // />
  )
}
