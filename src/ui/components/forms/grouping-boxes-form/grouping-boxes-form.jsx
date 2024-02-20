import { memo, useEffect, useState } from 'react'

import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { BigPlusIcon } from '@components/shared/svg-icons'

import { calcFinalWeightForBox, calcVolumeWeightForBox } from '@utils/calculation'
import { checkIsPositiveNum, checkIsStringFilesSame } from '@utils/checks'
import { getObjectFilteredByKeyArrayBlackList } from '@utils/object'
import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './grouping-boxes-form.style'

import { Box } from './box/box'

export const GroupingBoxesForm = memo(props => {
  const { classes: styles, cx } = useStyles()

  const { destinations, storekeepers, onSubmit, onCloseModal, volumeWeightCoefficient, selectedBoxes } = props

  const sourceOldBoxes = selectedBoxes.map(el => ({
    ...el,
    destinationId: el.destination?._id || null,
    storekeeperId: el.storekeeper?._id || '',
    logicsTariffId: el.logicsTariff?._id || '',

    volumeWeightKgWarehouse: calcVolumeWeightForBox(el, volumeWeightCoefficient),
    weightFinalAccountingKgWarehouse: calcFinalWeightForBox(el, volumeWeightCoefficient),
  }))

  const [oldBoxes, setOldBoxes] = useState(sourceOldBoxes)

  const [newBoxes, setNewBoxes] = useState([])

  const [basicBox, setBasicBox] = useState(null)
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false)

  const isActiveOneBox = oldBoxes.length === 1 && !basicBox

  const onClickBasicBoxRadio = box => {
    if (basicBox?._id !== box._id) {
      setBasicBox(box)

      const newOldBoxes = sourceOldBoxes.filter(
        el =>
          el.destinationId === box.destinationId &&
          el.storekeeperId === box.storekeeperId &&
          el.logicsTariffId === box.logicsTariffId &&
          el.fbaShipment === box.fbaShipment &&
          (checkIsStringFilesSame(el.shippingLabel, box.shippingLabel) ||
            (!box.shippingLabel && !!el.shippingLabel === !!box.shippingLabel)) &&
          el.heightCmWarehouse === box.heightCmWarehouse &&
          el.lengthCmWarehouse === box.lengthCmWarehouse &&
          el.weighGrossKgWarehouse === box.weighGrossKgWarehouse &&
          el.widthCmWarehouse === box.widthCmWarehouse &&
          JSON.stringify(
            el.items.map(el => ({
              ...getObjectFilteredByKeyArrayBlackList({ ...el, productId: el.product._id, orderId: el.order._id }, [
                'isBarCodeAlreadyAttachedByTheSupplier',
                'isBarCodeAttachedByTheStorekeeper',
                'order',
                'product',
                '_id',
              ]),
            })),
          ) ===
            JSON.stringify(
              box.items.map(el => ({
                ...getObjectFilteredByKeyArrayBlackList({ ...el, productId: el.product._id, orderId: el.order._id }, [
                  'isBarCodeAlreadyAttachedByTheSupplier',
                  'isBarCodeAttachedByTheStorekeeper',
                  'order',
                  'product',
                  '_id',
                ]),
              })),
            ),
      )

      setNewBoxes([
        newOldBoxes.length > 1
          ? {
              ...box,
              amount:
                newOldBoxes.reduce((ac, cur) => (ac += cur.amount), 0) -
                newBoxes.reduce((ac, cur) => (ac += cur.amount), 0),
            }
          : box,
      ])

      setOldBoxes(newOldBoxes)
    } else {
      setBasicBox(null)

      setNewBoxes([])
      setOldBoxes(sourceOldBoxes)
    }
  }

  const onClickAddBox = () => {
    setNewBoxes([...newBoxes, { ...basicBox, amount: 1, humanFriendlyId: '' }])
  }
  const onRemoveOldBox = boxId => {
    const arr = oldBoxes.filter(box => box._id !== boxId)
    setOldBoxes([...arr])
  }

  const onRemoveNewBox = index => {
    const arr = newBoxes.filter((box, i) => i !== index)
    setNewBoxes([...arr])
  }

  useEffect(() => {
    if (!oldBoxes.length) {
      onCloseModal()
    }
  }, [oldBoxes.length])

  const onChangeField = (e, field, index) => {
    const targetBox = newBoxes.filter((newBox, i) => i === index)[0]
    let updatedTargetBox = {}

    if (field === 'prepId') {
      updatedTargetBox = {
        ...targetBox,
        [field]: e.target.value ? e.target.value : '',
      }
    } else if (!checkIsPositiveNum(e.target.value)) {
      return
    }

    if (checkIsPositiveNum(e.target.value)) {
      updatedTargetBox = {
        ...targetBox,
        [field]: e.target.value ? parseInt(e.target.value) : 0,
      }
    }

    const updatedNewBoxes = newBoxes.map((newBox, i) => (i === index ? updatedTargetBox : newBox))

    setNewBoxes(updatedNewBoxes)
  }

  const onClickSubmit = () => {
    onSubmit({ oldBoxes, newBoxes })
  }

  const leftToRedistribute =
    oldBoxes.reduce((ac, cur) => (ac += cur.amount), 0) - newBoxes.reduce((ac, cur) => (ac += cur.amount), 0)

  const disabledSubmitBtn =
    !basicBox ||
    (basicBox && leftToRedistribute !== 0) ||
    JSON.stringify(oldBoxes.map(el => el.amount).sort()) === JSON.stringify(newBoxes.map(el => el.amount).sort()) ||
    newBoxes.some(box => box.amount === 0) ||
    selectedBoxes.some(box => box?.status !== BoxStatus.IN_STOCK) ||
    disableSubmitBtn

  return (
    <div className={styles.root}>
      <div className={styles.modalTitleWrapper}>
        <div className={styles.modalTitleSubWrapper}>
          <p className={styles.modalTitle}>{t(TranslationKey['Group boxes'])}</p>

          <div className={styles.iconWrapper}>
            <img src="/assets/icons/mini-box.svg" />
            <p className={styles.iconText}>{'SuperBox'}</p>
          </div>
        </div>

        <div className={styles.leftToRedistributeWrapper}>
          <p className={styles.leftToRedistribute}>{t(TranslationKey['Left to redistribute']) + ':'}</p>

          <p className={styles.leftToRedistributeCount}>{basicBox ? leftToRedistribute : '-'}</p>

          <img src="/assets/icons/mini-box.svg" />
        </div>
      </div>

      <div className={styles.boxesWrapper}>
        <div className={styles.currentBox}>
          <div className={styles.newBoxes}>
            {oldBoxes.map((box, boxIndex) => (
              <div key={boxIndex} className={cx({ [styles.marginBox]: newBoxes.length > 1 })}>
                <Box
                  basicBox={basicBox}
                  destinations={destinations}
                  storekeepers={storekeepers}
                  index={boxIndex}
                  box={box}
                  isActiveOneBox={isActiveOneBox}
                  onRemoveBox={onRemoveOldBox}
                  onClickBasicBoxRadio={onClickBasicBoxRadio}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.newBoxes}>
          {basicBox ? (
            <div className={styles.newBoxesWrapper}>
              {newBoxes.map((box, boxIndex) => (
                <div key={boxIndex} className={cx({ [styles.marginBox]: newBoxes.length > 1 })}>
                  <Box
                    isNewBox
                    destinations={destinations}
                    index={boxIndex}
                    box={box}
                    onChangeField={onChangeField}
                    onRemoveBox={onRemoveNewBox}
                  />
                </div>
              ))}
              <BigPlusIcon className={styles.bigPlus} onClick={onClickAddBox} />
            </div>
          ) : (
            <p className={styles.needChooseMainBox}>{t(TranslationKey['Select the basic box'])}</p>
          )}
        </div>
      </div>

      <div className={styles.buttonsWrapper}>
        <Button
          disabled={disabledSubmitBtn}
          className={styles.button}
          onClick={() => {
            setDisableSubmitBtn(true)
            onClickSubmit()
          }}
        >
          {t(TranslationKey.Grouping)}
        </Button>

        <Button
          variant={ButtonVariant.OUTLINED}
          tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
          className={cx(styles.button, styles.cancelButton)}
          onClick={onCloseModal}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
