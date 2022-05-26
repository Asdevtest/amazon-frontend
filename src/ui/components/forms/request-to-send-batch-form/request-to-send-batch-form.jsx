import React, {useEffect, useState} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button/error-button'

import {findTariffInStorekeepersData} from '@utils/checks'
import {t} from '@utils/translations'

import {useClassNames} from './request-to-send-batch-form.style'
import {RequestToSendBatchesGroupBoxes} from './request-to-send-batch-group-boxes'

export const RequestToSendBatchForm = observer(
  ({
    storekeepersData,
    volumeWeightCoefficient,
    boxesMy,
    selectedBoxes,
    boxesDeliveryCosts,
    onClickSendBoxesToBatch,
    onClickRemoveBoxFromBatch,
    closeModal,
  }) => {
    const classNames = useClassNames()
    useEffect(() => {
      if (!selectedBoxes.length) {
        closeModal()
      }
    }, [selectedBoxes])

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
          group =>
            group.destination?._id === cur.destination?._id &&
            group.storekeeper?._id === cur.storekeeper?._id &&
            group.logicsTariff?._id === cur.logicsTariff?._id,
        )
        if (findGroupIndex !== -1) {
          acc[findGroupIndex].boxes.push(cur)
        } else {
          acc.push({
            destination: cur.destination,
            storekeeper: cur.storekeeper,
            logicsTariff: cur.logicsTariff,
            boxes: [cur],
          })
        }
        return acc
      }, [])
      .concat(boxesWithoutPrice)
      .filter(obj => obj.boxes.length)

    const [submitIsClicked, setSubmitIsClicked] = useState(false)

    const onClickSubmit = () => {
      onClickSendBoxesToBatch()
      setSubmitIsClicked(true)
    }

    const onClickRemoveBtn = boxId => {
      onClickRemoveBoxFromBatch(boxId)
      setSubmitIsClicked(false)
    }

    const disabledSubmit =
      boxesWithPriceRequest.length < 1 ||
      boxesWithPriceRequest.some(el => !el.shippingLabel) ||
      boxesGroupedByWarehouseAndDeliveryMethod.some(
        selectedGroup =>
          !findTariffInStorekeepersData(
            storekeepersData,
            selectedGroup.storekeeper?._id,
            selectedGroup.logicsTariff?._id,
          ),
      ) ||
      submitIsClicked

    return (
      <div className={classNames.content}>
        <Typography className={classNames.modalTitle} variant="h5">
          {t(TranslationKey['Sending boxes'])}
        </Typography>
        <div className={classNames.boxesWrapper}>
          {boxesGroupedByWarehouseAndDeliveryMethod.map((selectedGroup, i) => (
            <div key={i}>
              <RequestToSendBatchesGroupBoxes
                storekeepersData={storekeepersData}
                volumeWeightCoefficient={volumeWeightCoefficient}
                boxesMy={boxesMy}
                selectedGroup={selectedGroup}
                boxesDeliveryCosts={boxesDeliveryCosts}
                onClickRemoveBoxFromBatch={onClickRemoveBtn}
              />
            </div>
          ))}
        </div>
        <div className={classNames.warningWrapper}>
          <Typography variant="subtitle1" className={classNames.warningText}>
            {'*' +
              t(
                TranslationKey[
                  'Boxes marked in red will not be shipped because they have no dimensions or insufficient data'
                ],
              )}
          </Typography>
        </div>
        <div className={classNames.btnsWrapper}>
          <Button
            disableElevation
            disabled={disabledSubmit}
            color="primary"
            variant="contained"
            onClick={onClickSubmit}
          >
            {t(TranslationKey.Send)}
          </Button>
          <ErrorButton
            disableElevation
            className={classNames.btnClose}
            color="primary"
            variant="contained"
            onClick={closeModal}
          >
            {t(TranslationKey.Close)}
          </ErrorButton>
        </div>
      </div>
    )
  },
)
