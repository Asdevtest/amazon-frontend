import {cx} from '@emotion/css'
import {Typography} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'

import {findTariffInStorekeepersData} from '@utils/checks'
import {t} from '@utils/translations'

import {useClassNames} from './request-to-send-batch-form.style'
import {RequestToSendBatchesGroupBoxes} from './request-to-send-batch-group-boxes'

export const RequestToSendBatchForm = observer(
  ({
    userInfo,
    storekeepersData,
    volumeWeightCoefficient,
    boxesMy,
    selectedBoxes,
    boxesDeliveryCosts,
    onClickSendBoxesToBatch,
    onClickRemoveBoxFromBatch,
    closeModal,
    onSubmitChangeBoxFields,
  }) => {
    const {classes: classNames} = useClassNames()
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
      boxesWithPriceRequest.some(el => !el.shippingLabel || el.items.some(e => !e.barCode)) ||
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
                userInfo={userInfo}
                storekeepersData={storekeepersData}
                volumeWeightCoefficient={volumeWeightCoefficient}
                boxesMy={boxesMy}
                selectedGroup={selectedGroup}
                boxesDeliveryCosts={boxesDeliveryCosts}
                onClickRemoveBoxFromBatch={onClickRemoveBtn}
                onSubmitChangeBoxFields={onSubmitChangeBoxFields}
              />
            </div>
          ))}
        </div>
        <div className={classNames.warningWrapper}>
          <Typography
            variant="subtitle1"
            className={cx(classNames.warningText, {[classNames.noWarningText]: !disabledSubmit})}
          >
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
            tooltipAttentionContent={t(
              TranslationKey['Create a request to send to the batch, freeze funds, then see "My batches"'],
            )}
            color="primary"
            variant="contained"
            onClick={onClickSubmit}
          >
            {t(TranslationKey.Send)}
          </Button>
          <Button
            danger
            disableElevation
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            className={classNames.btnClose}
            color="primary"
            variant="contained"
            onClick={closeModal}
          >
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>
    )
  },
)
