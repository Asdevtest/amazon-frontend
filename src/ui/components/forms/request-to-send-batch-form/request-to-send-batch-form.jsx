import { observer } from 'mobx-react'
import { useEffect } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { findTariffInStorekeepersData } from '@utils/checks'
import { t } from '@utils/translations'

import '@typings/enums/button-style'

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

    const onClickSubmit = () => {
      onClickSendBoxesToBatch()
    }

    const onClickRemoveBtn = boxId => {
      onClickRemoveBoxFromBatch(boxId)
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
      boxesMy.some(box => box.heightCmWarehouse < 10 || box.lengthCmWarehouse < 10 || box.widthCmWarehouse < 10) ||
      isHasTransparencyDoesntHasImages

    return (
      <div className={styles.content}>
        <h5 className={styles.modalTitle}>{t(TranslationKey['Sending boxes'])}</h5>
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
          <p className={cx(styles.warningText, { [styles.noWarningText]: !disabledSubmit })}>
            {'*' +
              t(
                TranslationKey[
                  'Boxes marked in red will not be shipped because they have no dimensions or insufficient data'
                ],
              )}
          </p>
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

          <CustomButton
            disabled={disabledSubmit}
            title={t(TranslationKey['Create a request to send to the batch, freeze funds, then see "My batches"'])}
            onClick={onClickSubmit}
          >
            {t(TranslationKey.Send)}
          </CustomButton>
          <CustomButton onClick={closeModal}>{t(TranslationKey.Close)}</CustomButton>
        </div>
      </div>
    )
  },
)
