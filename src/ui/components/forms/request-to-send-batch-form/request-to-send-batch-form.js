import React, {useEffect} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button/error-button'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './request-to-send-batch-form.style'
import {RequestToSendBatchesGroupBoxes} from './request-to-send-batch-group-boxes'

const textConsts = getLocalizedTexts(texts, 'ru').requestToSendBatchModal

export const RequestToSendBatchForm = observer(
  ({
    boxesMy,
    openModal,
    setOpenModal,
    selectedBoxes,
    boxesDeliveryCosts,
    onClickSendBoxesToBatch,
    onClickRemoveBoxFromBatch,
    closeModal,
  }) => {
    const classNames = useClassNames()
    useEffect(() => {
      if (openModal && !selectedBoxes.length) {
        setOpenModal(false)
      }
    }, [selectedBoxes, openModal])

    const boxesWithPriceRequest = boxesMy.filter(el => {
      const findRequestToSendBatchPriceForCurBox = boxesDeliveryCosts.find(priceObj => priceObj.guid === el._id)
      return selectedBoxes.includes(el._id) && findRequestToSendBatchPriceForCurBox?.deliveryCost
    })
    const boxesWithoutPriceRequest = boxesMy.filter(el => {
      const findRequestToSendBatchPriceForCurBox = boxesDeliveryCosts.find(priceObj => priceObj.guid === el._id)
      return selectedBoxes.includes(el._id) && !findRequestToSendBatchPriceForCurBox?.deliveryCost
    })

    const boxesWithoutPrice = [
      {
        price: 0,
        boxes: boxesWithoutPriceRequest,
      },
    ]

    const boxesGroupedByWarehouseAndDeliveryMethod = boxesWithPriceRequest
      .reduce((acc, cur) => {
        const findGroupIndex = acc.findIndex(
          group => group.tmpWarehouses === cur.tmpWarehouses && group.deliveryMethod === cur.deliveryMethod,
        )
        if (findGroupIndex !== -1) {
          acc[findGroupIndex].boxes.push(cur)
        } else {
          acc.push({
            tmpWarehouses: cur.tmpWarehouses,
            deliveryMethod: cur.deliveryMethod,
            boxes: [cur],
          })
        }
        return acc
      }, [])
      .concat(boxesWithoutPrice)

    return (
      <div className={classNames.content}>
        <Typography className={classNames.modalTitle} variant="h4">
          {textConsts.modalTitle}
        </Typography>
        <div className={classNames.boxesWrapper}>
          {boxesGroupedByWarehouseAndDeliveryMethod.map((selectedGroup, i) => (
            <div key={i}>
              <RequestToSendBatchesGroupBoxes
                boxesMy={boxesMy}
                selectedGroup={selectedGroup}
                boxesDeliveryCosts={boxesDeliveryCosts}
                onClickRemoveBoxFromBatch={onClickRemoveBoxFromBatch}
              />
            </div>
          ))}
        </div>
        <div className={classNames.warningWrapper}>
          <Typography variant="subtitle1" className={classNames.warningText}>
            {textConsts.noPrice}
          </Typography>
        </div>
        <div className={classNames.btnsWrapper}>
          <Button disableElevation color="primary" variant="contained" onClick={onClickSendBoxesToBatch}>
            {textConsts.btnSend}
          </Button>
          <ErrorButton
            disableElevation
            className={classNames.btnClose}
            color="primary"
            variant="contained"
            onClick={closeModal}
          >
            {textConsts.btnClose}
          </ErrorButton>
        </div>
      </div>
    )
  },
)
