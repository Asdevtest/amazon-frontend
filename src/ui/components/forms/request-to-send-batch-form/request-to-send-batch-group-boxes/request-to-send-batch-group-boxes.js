import React from 'react'

import {Typography} from '@material-ui/core'

import {DeliveryTypeByCode} from '@constants/delivery-options'
import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {RequestToSendBatchBox} from '../request-to-send-batch-box'
import {useClassNames} from './request-to-send-batch-group-boxes.style'

const textConsts = getLocalizedTexts(texts, 'ru').requestToSendBatchModal

export const RequestToSendBatchesGroupBoxes = ({
  selectedGroup,
  boxesMy,
  boxesDeliveryCosts,
  onClickRemoveBoxFromBatch,
}) => {
  const classNames = useClassNames()

  const totalPrice = selectedGroup.boxes.reduce((acc, cur) => acc + cur.items[0].product.currentSupplier.lotcost, 0)
  const totalWeight = selectedGroup.boxes.reduce((acc, cur) => acc + cur.tmpGrossWeight, 0)
  const tmpWarehouses = selectedGroup.tmpWarehouses
  const deliveryMethod = selectedGroup.deliveryMethod

  return (
    <div className={classNames.tableWrapper}>
      {selectedGroup.price !== 0 && (
        <Typography className={classNames.tableWrapperInfo}>
          {`Склад: ${tmpWarehouses} , Способ доставки: ${DeliveryTypeByCode[deliveryMethod]}`}
        </Typography>
      )}

      <table border="1" className={classNames.table}>
        {selectedGroup.boxes.map((boxId, index) => {
          const findBox = boxesMy.find(box => box._id === boxId._id)
          const findRequestToSendBatchPriceForCurBox = boxesDeliveryCosts.find(
            priceObj => priceObj.guid === findBox._id,
          )

          return (
            <div key={`requestToSendBatchModalBox_${findBox._id}_${index}`} className={classNames.boxWrapper}>
              <RequestToSendBatchBox
                box={findBox}
                index={index}
                price={findRequestToSendBatchPriceForCurBox?.deliveryCost}
                onClickRemoveBoxFromBatch={() => onClickRemoveBoxFromBatch(boxId._id)}
              />
            </div>
          )
        })}
      </table>
      {selectedGroup.price !== 0 && (
        <Typography className={classNames.tableWrapperInfo}>
          {`${textConsts.totalPrice} ${totalPrice}$ , ${textConsts.totalWeight} ${totalWeight}кг`}
        </Typography>
      )}
    </div>
  )
}
