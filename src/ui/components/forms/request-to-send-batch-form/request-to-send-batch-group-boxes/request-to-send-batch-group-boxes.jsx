import React from 'react'

import {Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {calcFinalWeightForBox} from '@utils/calculation'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign, toFixedWithKg} from '@utils/text'

import {RequestToSendBatchBox} from '../request-to-send-batch-box'
import {useClassNames} from './request-to-send-batch-group-boxes.style'

const textConsts = getLocalizedTexts(texts, 'ru').requestToSendBatchModal

export const RequestToSendBatchesGroupBoxes = ({
  volumeWeightCoefficient,
  selectedGroup,
  boxesMy,
  boxesDeliveryCosts,
  onClickRemoveBoxFromBatch,
}) => {
  const classNames = useClassNames()

  const totalPrice = selectedGroup.boxes.reduce(
    (acc, cur) => (acc += boxesDeliveryCosts.find(priceObj => priceObj.guid === cur._id).deliveryCost),
    0,
  )

  const totalWeight = selectedGroup.boxes.reduce((acc, cur) => acc + calcFinalWeightForBox(cur), 0)

  return (
    <div className={classNames.tableWrapper}>
      {selectedGroup.price !== 0 && (
        <div>
          <Typography className={classNames.tableWrapperInfo}>
            {`Destination: ${selectedGroup.destination?.name} , Промежуточный склад: ${selectedGroup.storekeeper?.name} , Тариф: ${selectedGroup.logicsTariff?.name}`}
          </Typography>
        </div>
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
                volumeWeightCoefficient={volumeWeightCoefficient}
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
          {`${textConsts.totalPrice} ${toFixedWithDollarSign(totalPrice, 2)} , ${
            textConsts.totalWeight
          } ${toFixedWithKg(totalWeight, 2)}`}
        </Typography>
      )}
    </div>
  )
}
