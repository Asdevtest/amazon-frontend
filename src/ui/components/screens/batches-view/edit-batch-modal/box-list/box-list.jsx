import React from 'react'

import {Box, Divider, Paper, Typography} from '@material-ui/core'

import {DeliveryTypeByCode} from '@constants/delivery-options'
import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {withKg} from '@utils/text'

import {useClassNames} from './box-list.style'
import {OrderBox} from './order-box'

const textConsts = getLocalizedTexts(texts, 'en').batchesModalEditBoxList

export const BoxList = ({selectedBoxes, warehouse, delivery}) => {
  const classNames = useClassNames()

  return (
    <Paper elevation={0} className={classNames.mainPaperWrapper}>
      <Typography className={classNames.modalText}>{textConsts.listBoxes}</Typography>
      <Typography className={(classNames.modalText, classNames.typoSure)}>{textConsts.checkBoxes}</Typography>

      {selectedBoxes.map((box, boxIndex) => (
        <Paper key={boxIndex} elevation={0} className={classNames.subPaperWrapper}>
          <Typography className={classNames.modalText}>{`${textConsts.boxNum} ${box._id}`}</Typography>
          <Divider className={classNames.divider} />

          <Box mt={1}>
            <Typography
              className={(classNames.modalText, classNames.boxDataTypo)}
            >{`${textConsts.typoWarehouse} ${warehouses[warehouse]}`}</Typography>
            <Typography className={(classNames.modalText, classNames.boxDataTypo)}>{textConsts.typoStatus}</Typography>
            <Typography
              className={(classNames.modalText, classNames.boxDataTypo)}
            >{`${textConsts.typoDeliveryMethod} ${DeliveryTypeByCode[delivery]}`}</Typography>
            <Typography className={(classNames.modalText, classNames.boxDataTypo)}>
              {textConsts.typoShippingLabel}
            </Typography>
            <Typography className={(classNames.modalText, classNames.boxDataTypo)}>
              {`${textConsts.typoGabarits}: ${box.lengthCmSupplier} х ${box.widthCmSupplier} х ${box.heightCmSupplier} см`}
            </Typography>
            <Typography className={(classNames.modalText, classNames.boxDataTypo)}>
              {`${textConsts.typoWeight}: ${withKg(box.weighGrossKgSupplier)}`}
            </Typography>
            <Typography className={(classNames.modalText, classNames.boxDataTypo)}>
              {`${textConsts.typoVolumeWeight}: ${withKg(box.volumeWeightKgSupplier)}`}
            </Typography>
            <Typography className={(classNames.modalText, classNames.boxDataTypo)}>
              {`${textConsts.typoWeightFinal}: ${withKg(box.weightFinalAccountingKgSupplier)}`}
            </Typography>
          </Box>

          <Box>
            {box.items.map((order, productIndex) => (
              <OrderBox key={productIndex} order={order} />
            ))}
          </Box>
        </Paper>
      ))}
    </Paper>
  )
}
