import React from 'react'

import {Box, Divider, Paper, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './box-list.style'
import {ProductBox} from './product-box'

const textConsts = getLocalizedTexts(texts, 'en').batchesModalEditBoxList

export const BoxList = ({selectedBoxes, warehouse, delivery}) => {
  const classNames = useClassNames()

  return (
    <Paper elevation={0} className={classNames.mainPaperWrapper}>
      <Typography className={classNames.modalText}>{textConsts.listBoxes}</Typography>
      <Typography className={(classNames.modalText, classNames.typoSure)}>{textConsts.checkBoxes}</Typography>

      {selectedBoxes.map((box, boxIndex) => (
        <Paper key={boxIndex} elevation={0} className={classNames.subPaperWrapper}>
          <Typography className={classNames.modalText}>{textConsts.boxNum}</Typography>
          <Divider className={classNames.divider} />

          <Box mt={1}>
            <Typography
              className={(classNames.modalText, classNames.boxDataTypo)}
            >{`${textConsts.typoWarehouse} ${warehouse}`}</Typography>
            <Typography className={(classNames.modalText, classNames.boxDataTypo)}>{textConsts.typoStatus}</Typography>
            <Typography
              className={(classNames.modalText, classNames.boxDataTypo)}
            >{`${textConsts.typoDeliveryMethod} ${delivery}`}</Typography>
            <Typography className={(classNames.modalText, classNames.boxDataTypo)}>
              {textConsts.typoShippingLabel}
            </Typography>
            <Typography className={(classNames.modalText, classNames.boxDataTypo)}>
              {textConsts.typoGabarits}
            </Typography>
            <Typography className={(classNames.modalText, classNames.boxDataTypo)}>{textConsts.typoWeight}</Typography>
            <Typography className={(classNames.modalText, classNames.boxDataTypo)}>
              {textConsts.typoVolumeWeight}
            </Typography>
            <Typography className={(classNames.modalText, classNames.boxDataTypo)}>
              {textConsts.typoWeightFinal}
            </Typography>
          </Box>

          <Box>
            {box.map((product, productIndex) => (
              <ProductBox key={productIndex} product={product} />
            ))}
          </Box>
        </Paper>
      ))}
    </Paper>
  )
}
