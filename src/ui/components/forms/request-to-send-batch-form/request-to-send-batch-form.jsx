import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { findTariffInStorekeepersData } from '@utils/checks'
import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './request-to-send-batch-form.style'

import { RequestToSendBatchesGroupBoxes } from './request-to-send-batch-group-boxes'

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
    setCurrentOpenedBox,
  }) => {
    const { classes: styles, cx } = useStyles()
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
            variationTariff: cur.variationTariff,

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

    const isHasTransparencyDoesntHasImages = boxesMy.some(box =>
      box.items.some(item => item?.product?.transparency && !box?.images?.length),
    )

    const disabledSubmit =
      boxesWithPriceRequest.length < 1 ||
      boxesWithPriceRequest.some(
        el => (!el.shippingLabel && !el.destination?.storekeeperId) || el.items.some(e => !e.barCode),
      ) ||
      boxesGroupedByWarehouseAndDeliveryMethod.some(
        selectedGroup =>
          !findTariffInStorekeepersData(
            storekeepersData,
            selectedGroup.storekeeper?._id,
            selectedGroup.logicsTariff?._id,
          ),
      ) ||
      submitIsClicked ||
      boxesMy.some(
        box =>
          (!box.shippingLabel && !box.destination?.storekeeperId) ||
          box.items.some(
            item =>
              (!item?.transparencyFile ||
                (!item?.isTransparencyFileAlreadyAttachedByTheSupplier &&
                  !item?.isTransparencyFileAttachedByTheStorekeeper)) &&
              item?.product?.transparency,
          ),
      ) ||
      isHasTransparencyDoesntHasImages

    return (
      <div className={styles.content}>
        <Typography className={styles.modalTitle} variant="h5">
          {t(TranslationKey['Sending boxes'])}
        </Typography>
        <div className={styles.boxesWrapper}>
          {boxesGroupedByWarehouseAndDeliveryMethod.map((selectedGroup, i) => (
            <div key={i}>
              <RequestToSendBatchesGroupBoxes
                storekeepersData={storekeepersData}
                volumeWeightCoefficient={volumeWeightCoefficient}
                boxesMy={boxesMy}
                selectedGroup={selectedGroup}
                boxesDeliveryCosts={boxesDeliveryCosts}
                setCurrentOpenedBox={setCurrentOpenedBox}
                onClickRemoveBoxFromBatch={onClickRemoveBtn}
              />
            </div>
          ))}
        </div>
        <div className={styles.warningWrapper}>
          <Typography
            variant="subtitle1"
            className={cx(styles.warningText, { [styles.noWarningText]: !disabledSubmit })}
          >
            {'*' +
              t(
                TranslationKey[
                  'Boxes marked in red will not be shipped because they have no dimensions or insufficient data'
                ],
              )}
          </Typography>
        </div>

        <div className={styles.btnsWrapper}>
          {isHasTransparencyDoesntHasImages ? (
            <p className={styles.warningText}>
              {t(
                TranslationKey[
                  'Attention, it is necessary to add a photo of the product with glued transparency to the box'
                ],
              )}
            </p>
          ) : null}

          <Button
            disabled={disabledSubmit}
            tooltipAttentionContent={t(
              TranslationKey['Create a request to send to the batch, freeze funds, then see "My batches"'],
            )}
            onClick={onClickSubmit}
          >
            {t(TranslationKey.Send)}
          </Button>
          <Button
            type={ButtonType.DANGER}
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            onClick={closeModal}
          >
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>
    )
  },
)
