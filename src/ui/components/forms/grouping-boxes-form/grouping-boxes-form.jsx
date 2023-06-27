/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { IconButton, Link, Radio, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'

import {
  getConversion,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { Field } from '@components/shared/field'

import { calcFinalWeightForBox, calcVolumeWeightForBox } from '@utils/calculation'
import { checkIsPositiveNum, checkIsStringFilesSame } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getObjectFilteredByKeyArrayBlackList } from '@utils/object'
import { checkAndMakeAbsoluteUrl, getFullTariffTextForBoxOrOrder, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './grouping-boxes-form.style'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Input } from '@components/shared/input'
import { BigPlusIcon } from '@components/shared/svg-icons'

const WarehouseDemensions = ({ orderBox, sizeSetting }) => {
  const { classes: classNames } = useClassNames()

  const lengthConversion = getConversion(sizeSetting, inchesCoefficient)
  const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)
  const totalWeightConversion = getConversion(sizeSetting, 12 / poundsWeightCoefficient, 12)
  const weightSizesType = getWeightSizesType(sizeSetting)

  return (
    <div className={classNames.demensionsWrapper}>
      <Typography className={classNames.standartText}>
        {t(TranslationKey.Length) + ': '}

        {toFixed(orderBox.lengthCmWarehouse / lengthConversion, 2)}
      </Typography>
      <Typography className={classNames.standartText}>
        {t(TranslationKey.Width) + ': '}
        {toFixed(orderBox.widthCmWarehouse / lengthConversion, 2)}
      </Typography>
      <Typography className={classNames.standartText}>
        {t(TranslationKey.Height) + ': '}
        {toFixed(orderBox.heightCmWarehouse / lengthConversion, 2)}
      </Typography>

      <Typography className={classNames.standartText}>
        {t(TranslationKey.Weight) + ': '}
        {toFixed(orderBox.weighGrossKgWarehouse / weightConversion, 2) || 0}
        {' ' + weightSizesType}
      </Typography>

      <Typography className={classNames.standartText}>
        {t(TranslationKey['Volume weight']) + ': '}
        {toFixed(orderBox.volumeWeightKgWarehouse / weightConversion, 2) || 0}
        {' ' + weightSizesType}
      </Typography>

      <Typography
        className={cx(classNames.standartText, {
          [classNames.alertText]: orderBox.weightFinalAccountingKgWarehouse / weightConversion < totalWeightConversion,
        })}
      >
        {t(TranslationKey['Final weight']) + ': '}
        {toFixed(orderBox.weightFinalAccountingKgWarehouse / weightConversion, 2) || 0}
        {' ' + weightSizesType}
      </Typography>

      {orderBox.weightFinalAccountingKgWarehouse / weightConversion < totalWeightConversion ? (
        <span className={classNames.alertText}>{`${t(TranslationKey['Weight less than'])} ${toFixed(
          totalWeightConversion,
          2,
        )} ${weightSizesType}!`}</span>
      ) : null}
    </div>
  )
}

const Box = ({ isNewBox, destinations, box, onChangeField, onRemoveBox, index, basicBox, onClickBasicBoxRadio }) => {
  const { classes: classNames } = useClassNames()

  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

  const [showFullCard, setShowFullCard] = useState(isNewBox ? false : true)

  return (
    <div className={classNames.box}>
      {!isNewBox && (
        <div className={classNames.headerWrapper}>
          {/* <Typography className={classNames.boxNum}>{`${t(TranslationKey.Box)} № ${box.humanFriendlyId}`}</Typography> */}

          <div className={classNames.radioWrapper}>
            {(basicBox?._id === box._id || !basicBox) && (
              <Radio checked={box._id === basicBox?._id} onClick={() => onClickBasicBoxRadio(box)} />
            )}

            <Typography className={classNames.standartText}>{t(TranslationKey['Basic box'])}</Typography>
          </div>
        </div>
      )}

      <div className={classNames.orderWrapper}>
        <div className={classNames.boxHeaderWrapper}>
          <div className={classNames.iconWrapperAndboxNum}>
            {box.amount > 1 ? (
              <div className={classNames.iconWrapper}>
                <img src="/assets/icons/mini-box.svg" />
                <Typography className={classNames.iconText}>{'SuperBox'}</Typography>
              </div>
            ) : (
              <div className={cx(classNames.iconWrapper, classNames.standartIconWrapper)}>
                <img src="/assets/icons/mini-box.svg" />
                <Typography className={cx(classNames.iconText, classNames.standartText)}>{'Box'}</Typography>
              </div>
            )}

            <Typography className={classNames.boxNum}>{`№ ${box.humanFriendlyId || '-'}`}</Typography>
          </div>

          <Field
            oneLine
            disabled={!isNewBox}
            label={t(TranslationKey['Boxes in group']) + ':'}
            inputProps={{ maxLength: 5 }}
            // tooltipInfoContent={t(TranslationKey['Number of product units in the box'])}
            containerClasses={classNames.amountField}
            className={classNames.orderInput}
            labelClasses={[classNames.label, classNames.amountLabel]}
            value={box.amount}
            onChange={e => onChangeField(e, 'amount', index)}
          />
        </div>

        {box.items.map((order, orderIndex) => (
          <div key={`box_${box._id}_${orderIndex}`} /* className={classNames.orderWrapper}*/>
            <div key={orderIndex} className={classNames.order}>
              <img className={classNames.img} src={getAmazonImageUrl(order.product.images[0])} />
              <div>
                <div className={classNames.asinWrapper}>
                  <Typography className={classNames.asinTitle}>{`${t(TranslationKey.Order)} / item`}</Typography>
                  <Typography className={classNames.asinValue}>{`${order.order.id} / ${
                    Number(order.order.item) ? order.order.item : '-'
                  }`}</Typography>
                </div>

                <div className={classNames.asinWrapper}>
                  <Typography className={classNames.asinTitle}>{t(TranslationKey.ASIN)}</Typography>
                  <Typography className={classNames.asinValue}>{order.product.asin}</Typography>

                  {order.product.asin ? <CopyValue text={order.product.asin} /> : null}
                </div>

                <div className={classNames.asinWrapper}>
                  <Typography className={classNames.asinTitle}>{t(TranslationKey.SKU)}</Typography>
                  <Typography className={classNames.asinValue}>
                    {order.product.skusByClient?.length ? order.product.skusByClient[0] : '-'}
                  </Typography>

                  {order.product.skusByClient?.length ? <CopyValue text={order.product.skusByClient[0]} /> : null}
                </div>

                <Typography className={classNames.title}>{order.product.amazonTitle}</Typography>

                <Field
                  oneLine
                  labelClasses={classNames.label}
                  label={t(TranslationKey.BarCode)}
                  inputComponent={
                    <div className={classNames.barCodeWrapper}>
                      {order.barCode ? (
                        <div className={classNames.barCode}>
                          <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(order.barCode)}>
                            <Typography className={classNames.barCodeField}>{t(TranslationKey.View)}</Typography>
                          </Link>

                          <CopyValue text={order.barCode} />
                        </div>
                      ) : (
                        <Typography className={classNames.miss}>{t(TranslationKey['Not available'])}</Typography>
                      )}
                    </div>
                  }
                />
              </div>

              <div>
                {/* <Field
                  disabled={!isNewBox}
                  label={t(TranslationKey['Boxes in group'])}
                  containerClasses={classNames.field}
                  className={classNames.orderInput}
                  labelClasses={classNames.label}
                  value={box.amount}
                  onChange={e => onChangeField(e, 'amount', index)}
                /> */}

                <Field
                  disabled
                  containerClasses={classNames.field}
                  label={t(TranslationKey.Quantity)}
                  className={classNames.orderInput}
                  labelClasses={[classNames.label, classNames.quantityLabel]}
                  value={order.amount}
                  tooltipInfoContent={t(TranslationKey['Number of product units in the box'])}
                />

                <Field
                  disabled
                  containerClasses={classNames.field}
                  label={t(TranslationKey['Quantity in group'])}
                  className={classNames.orderInput}
                  labelClasses={[classNames.label, classNames.quantityLabel]}
                  value={order.amount * box.amount}
                  // tooltipInfoContent={t(TranslationKey['Number of product units in the box'])}
                />
              </div>
            </div>
          </div>
        ))}
        {showFullCard ? (
          <div className={classNames.itemSubWrapper}>
            <div>
              <div className={classNames.sizesTitleWrapper}>
                <Typography className={classNames.label}>{t(TranslationKey.Dimensions)}</Typography>

                <CustomSwitcher
                  condition={sizeSetting}
                  nameFirstArg={unitsOfChangeOptions.EU}
                  nameSecondArg={unitsOfChangeOptions.US}
                  firstArgValue={unitsOfChangeOptions.EU}
                  secondArgValue={unitsOfChangeOptions.US}
                  changeConditionHandler={condition => setSizeSetting(condition)}
                />
              </div>

              <WarehouseDemensions orderBox={box} sizeSetting={sizeSetting} />
            </div>
            <div>
              <Field
                containerClasses={classNames.field}
                tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the USA, available for change"])}
                label={t(TranslationKey.Destination)}
                labelClasses={classNames.label}
                inputComponent={
                  <Typography className={classNames.standartText}>
                    {destinations.find(el => el._id === box.destinationId)?.name || t(TranslationKey['Not chosen'])}
                  </Typography>
                }
              />

              <Field
                containerClasses={classNames.field}
                tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
                label={`${t(TranslationKey['Int warehouse'])} / ` + t(TranslationKey.Tariff)}
                labelClasses={classNames.label}
                inputComponent={
                  <Typography className={classNames.standartText}>{`${
                    box.storekeeper?.name
                  } / ${getFullTariffTextForBoxOrOrder(box)}`}</Typography>
                }
              />

              <Field
                inputProps={{ maxLength: 255 }}
                tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                containerClasses={classNames.field}
                labelClasses={classNames.label}
                className={classNames.fieldInput}
                label={t(TranslationKey['FBA Shipment'])}
                value={box.fbaShipment}
                inputComponent={
                  <Typography className={classNames.standartText}>
                    {box.fbaShipment || t(TranslationKey.Missing)}
                  </Typography>
                }
              />

              <Field
                label={t(TranslationKey['Shipping label']) + ':'}
                tooltipInfoContent={t(TranslationKey['Add or replace the shipping label'])}
                labelClasses={classNames.label}
                inputComponent={
                  <>
                    {box.shippingLabel ? (
                      <div className={classNames.barCode}>
                        <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(box.shippingLabel)}>
                          <Typography className={classNames.barCodeField}>{t(TranslationKey.View)}</Typography>
                        </Link>

                        <CopyValue text={box.shippingLabel} />
                      </div>
                    ) : (
                      <Typography className={classNames.miss}>{t(TranslationKey['Not available'])}</Typography>
                    )}
                  </>
                }
              />

              {!isNewBox && (
                <Field
                  inputProps={{ maxLength: 255 }}
                  containerClasses={classNames.field}
                  labelClasses={classNames.label}
                  className={classNames.fieldInput}
                  label={'Prep ID'}
                  value={box.fbaShipment}
                  inputComponent={
                    <div className={classNames.prepIdWrapper}>
                      <Typography className={classNames.standartText}>
                        {box.prepId || t(TranslationKey.Missing)}
                      </Typography>
                      {box.prepId && <CopyValue text={box.prepId} />}
                    </div>
                  }
                />
              )}
            </div>
          </div>
        ) : null}

        <div className={classNames.bottomBlockWrapper}>
          <IconButton classes={{ root: classNames.icon }} onClick={() => onRemoveBox(isNewBox ? index : box._id)}>
            <DeleteOutlineOutlinedIcon className={classNames.deleteBtn} />
          </IconButton>
          {isNewBox && (
            <div className={classNames.prepId}>
              <Typography>Prep ID</Typography>
              <Input value={box.prepId || ''} onChange={e => onChangeField(e, 'prepId', index)} />
            </div>
          )}
          <div className={classNames.incomingBtnWrapper}>
            <div className={classNames.tablePanelSortWrapper} onClick={() => setShowFullCard(!showFullCard)}>
              <Typography className={classNames.tablePanelViewText}>
                {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
              </Typography>

              {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const GroupingBoxesForm = observer(
  ({ destinations, storekeepers, onSubmit, onCloseModal, volumeWeightCoefficient, selectedBoxes }) => {
    const { classes: classNames } = useClassNames()
    const [newPrepIds, setNewPrepIds] = useState()
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
      // Новое условие для блокировки кнопки
      newBoxes.some(box => box.amount === 0)

    return (
      <div className={classNames.root}>
        <div className={classNames.modalTitleWrapper}>
          <div className={classNames.modalTitleSubWrapper}>
            <Typography className={classNames.modalTitle}>{t(TranslationKey['Group boxes'])}</Typography>

            <div className={classNames.iconWrapper}>
              <img src="/assets/icons/mini-box.svg" />
              <Typography className={classNames.iconText}>{'SuperBox'}</Typography>
            </div>
          </div>

          <div className={classNames.leftToRedistributeWrapper}>
            <Typography className={classNames.leftToRedistribute}>
              {t(TranslationKey['Left to redistribute']) + ':'}
            </Typography>

            <Typography className={classNames.leftToRedistributeCount}>
              {basicBox ? leftToRedistribute : '-'}
            </Typography>

            <img src="/assets/icons/mini-box.svg" />
          </div>
        </div>

        <div className={classNames.boxesWrapper}>
          <div className={classNames.currentBox}>
            <div className={classNames.newBoxes}>
              {oldBoxes.map((box, boxIndex) => (
                <div key={boxIndex} className={cx({ [classNames.marginBox]: newBoxes.length > 1 })}>
                  <Box
                    basicBox={basicBox}
                    destinations={destinations}
                    storekeepers={storekeepers}
                    index={boxIndex}
                    box={box}
                    onRemoveBox={onRemoveOldBox}
                    onClickBasicBoxRadio={onClickBasicBoxRadio}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={classNames.newBoxes}>
            {
              /* newBoxes.length && */ basicBox ? (
                <div className={classNames.newBoxesWrapper}>
                  {newBoxes.map((box, boxIndex) => (
                    <div key={boxIndex} className={cx({ [classNames.marginBox]: newBoxes.length > 1 })}>
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
                  <BigPlusIcon className={classNames.bigPlus} onClick={onClickAddBox} />
                </div>
              ) : (
                <Typography className={classNames.needChooseMainBox}>
                  {t(TranslationKey['Select the basic box'])}
                </Typography>
              )
            }
          </div>
        </div>

        <div className={classNames.buttonsWrapper}>
          {/* <Button disabled={!basicBox} className={classNames.button} onClick={onClickAddBox}>
            {t(TranslationKey['Add a box'])}
          </Button> */}

          <Button disabled={disabledSubmitBtn} className={classNames.button} onClick={onClickSubmit}>
            {t(TranslationKey.Grouping)}
          </Button>

          <Button
            variant="text"
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            className={cx(classNames.button, classNames.cancelButton)}
            onClick={onCloseModal}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  },
)
