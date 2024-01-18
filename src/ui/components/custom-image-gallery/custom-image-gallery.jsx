/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

// import ImageGallery from 'react-image-gallery'
// import 'react-image-gallery/styles/css/image-gallery.css'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './custom-image-gallery.style'

export const CustomImageGallery = ({ images, imgIndex = 0 }) => {
  const { classes: styles } = useStyles()

  const [curItems, setCurItems] = useState(
    images.map(el => ({
      original: getAmazonImageUrl(el, true),
      thumbnail: getAmazonImageUrl(el, true),
      originalClass: styles.imgBox,
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
        originalClass: styles.imgBox,
        // sizes: {width: '50vw', height: '70vh'},
        // sizes: {width: '100%', height: '50%'},

        // originalWidth: '300px',
      })),
    )
  }, [images])

  return (
    <div className={styles.carouselWrapper}></div>
    // <ImageGallery
    //   items={curItems}
    //   startIndex={imgIndex}
    //   thumbnailPosition="left"
    //   additionalClass={styles.mainWrapper}
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
