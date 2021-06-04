import React from 'react'

import {Box, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './product-box.style'

const textConsts = getLocalizedTexts(texts, 'en').batchesModalEditBoxList

export const ProductBox = ({product}) => {
  const classNames = useClassNames()

  return (
    <Box className={classNames.listBox}>
      <Box className={classNames.subListBox}>
        <img className={classNames.imgBox} src={product.img} alt={product.csCode} />
        <Typography className={classNames.modalText}>{product.asin}</Typography>
      </Box>
      <Typography className={classNames.modalText}>{product.csCode}</Typography>
      <Typography className={classNames.modalText}>{`${textConsts.count} ${product.qty}`}</Typography>
    </Box>
  )
}
