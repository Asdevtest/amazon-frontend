/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Avatar, Checkbox, Divider, Link, Paper, Tooltip, Typography } from '@mui/material'

import React, { useState } from 'react'

import { observer } from 'mobx-react'

import {
  getConversion,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
  sizesType,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { TaskOperationType } from '@constants/task/task-operation-type'
import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { BigImagesModal } from '@components/modals/big-images-modal'
import { Button } from '@components/shared/buttons/button'
import { ToggleBtnGroup } from '@components/shared/buttons/toggle-btn-group/toggle-btn-group'
import { ToggleBtn } from '@components/shared/buttons/toggle-btn-group/toggle-btn/toggle-btn'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { Text } from '@components/shared/text'
import { BoxArrow } from '@components/shared/svg-icons'

import {
  checkAndMakeAbsoluteUrl,
  getFullTariffTextForBoxOrOrder,
  getNewTariffTextForBoxOrOrder,
  getShortenStringIfLongerThanCount,
  toFixed,
  toFixedWithKg,
} from '@utils/text'
import { t } from '@utils/translations'

import { EditBoxTasksModal } from '../edit-task-modal/edit-box-tasks-modal'
import { useClassNames } from './before-after-block.style'
import { BoxItemCard } from './box-item-card'
import { ShortBoxItemCard } from './short-box-item-card'
import { CustomSlider } from '@components/shared/custom-slider'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { calcVolumeWeightForBox } from '@utils/calculation'

const Box = observer(
  ({
    box,
    boxIndex,
    setCurBox,
    isNewBox = false,
    isCurrentBox = false,
    onClickEditBox,
    isEdit,
    taskType,
    setNewBoxes,
    readOnly,
    newBoxes,
    volumeWeightCoefficient,
    referenceEditingBox,
    onClickApplyAllBtn,
  }) => {
    const { classes: classNames } = useClassNames()

    const [showFullCard, setShowFullCard] = useState(true /* && newBoxes[0]?._id === box._id ? true : false*/)

    const [showPhotosModal, setShowPhotosModal] = useState(false)

    const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 })

    const onChangeField = (value, field) => {
      const targetBox = newBoxes.filter(newBox => newBox._id === box._id)[0]
      const updatedTargetBox = { ...targetBox, [field]: value }
      const updatedNewBoxes = newBoxes.map(newBox => (newBox._id === box._id ? updatedTargetBox : newBox))
      setNewBoxes(updatedNewBoxes)
    }

    const onApplyGluedBarcodeToAllBoxes = (
      isBarCodeAlreadyAttachedByTheSupplier,
      isBarCodeAttachedByTheStorekeeper,
    ) => {
      const updatedNewBoxes = newBoxes.map(newBox => ({
        ...newBox,
        items: newBox.items.map(el => ({
          ...el,
          isBarCodeAlreadyAttachedByTheSupplier,
          isBarCodeAttachedByTheStorekeeper,
        })),
      }))
      setNewBoxes(updatedNewBoxes)
    }

    const onChangeBarCode = (value, field, itemIndex) => {
      const targetBox = newBoxes.filter(newBox => newBox._id === box._id)[0]

      targetBox.items[itemIndex][field] = value

      const updatedNewBoxes = newBoxes.map(newBox => (newBox._id === box._id ? targetBox : newBox))

      setNewBoxes(updatedNewBoxes)
    }

    const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

    const lengthConversion = getConversion(sizeSetting, inchesCoefficient)
    const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)
    const weightSizesType = getWeightSizesType(sizeSetting)

    const volumeWeightWarehouse =
      ((parseFloat(box.lengthCmWarehouse) || 0) *
        (parseFloat(box.heightCmWarehouse) || 0) *
        (parseFloat(box.widthCmWarehouse) || 0)) /
      volumeWeightCoefficient

    const volumeWeightSupplier =
      ((parseFloat(box.lengthCmSupplier) || 0) *
        (parseFloat(box.heightCmSupplier) || 0) *
        (parseFloat(box.widthCmSupplier) || 0)) /
      volumeWeightCoefficient

    const renderImageInfo = (img, imgName) => (
      <div className={classNames.tooltipWrapper}>
        <Avatar
          variant="square"
          alt={imgName}
          src={img ? img : '/assets/icons/file.png'}
          className={classNames.tooltipImg}
        />

        {typeof img === 'string' ? (
          <Typography className={classNames.linkTypo}>{imgName}</Typography>
        ) : (
          <Typography className={classNames.tooltipText}>{imgName}</Typography>
        )}
      </div>
    )

    const needAccent =
      (taskType === TaskOperationType.EDIT || taskType === TaskOperationType.EDIT_BY_STOREKEEPER) && isNewBox

    return (
      <div className={classNames.mainPaper}>
        <div className={classNames.fieldsWrapper}>
          <div>
            <Field
              disabled
              tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the United States"])}
              label={t(TranslationKey.Destination)}
              labelClasses={classNames.smallLabel}
              inputClasses={cx(classNames.field, {
                [classNames.editAccent]: needAccent && box.destination?.name !== referenceEditingBox.destination?.name,
              })}
              value={box.destination?.name ? box.destination?.name : t(TranslationKey['Not available'])}
            />
          </div>

          <div>
            <Field
              disabled
              tooltipInfoContent={t(TranslationKey['Selected shipping tariff to USA'])}
              label={t(TranslationKey.Tariff)}
              labelClasses={classNames.smallLabel}
              value={getNewTariffTextForBoxOrOrder(box, true)}
              inputClasses={cx(classNames.field, {
                [classNames.editAccent]:
                  needAccent &&
                  getNewTariffTextForBoxOrOrder(box, true) !== getNewTariffTextForBoxOrOrder(referenceEditingBox, true),
              })}
            />
          </div>
        </div>

        {(!showFullCard && isEdit) || (!showFullCard && taskType === TaskOperationType.MERGE) ? (
          <Paper
            className={cx(classNames.boxWrapper, {
              [classNames.boxWrapperWithShadow]: SettingsModel.uiTheme === UiTheme.light,
            })}
          >
            <div className={classNames.itemsWrapper}>
              {box.items?.map((item, index) => (
                <div key={`boxItem_${box.items?.[0].product?._id}_${index}`}>
                  <ShortBoxItemCard
                    readOnly={readOnly}
                    taskType={taskType}
                    item={item}
                    boxId={box.humanFriendlyId}
                    superCount={box.amount}
                    onChangeBarCode={onChangeBarCode}
                  />
                </div>
              ))}
            </div>
          </Paper>
        ) : (
          <Paper
            className={cx(classNames.boxWrapper, {
              [classNames.boxWrapperWithShadow]: SettingsModel.uiTheme === UiTheme.light,
            })}
          >
            <div className={classNames.itemsWrapper}>
              {box.items?.map((item, index) => (
                <div key={`boxItem_${box.items?.[0].product?._id}_${index}`}>
                  <BoxItemCard
                    box={box}
                    boxIndex={boxIndex}
                    needAccent={needAccent}
                    taskType={taskType}
                    readOnly={readOnly}
                    referenceEditingBox={referenceEditingBox}
                    item={item}
                    boxId={box.humanFriendlyId}
                    index={index}
                    superCount={box.amount}
                    isNewBox={isNewBox}
                    onChangeBarCode={onChangeBarCode}
                    onApplyGluedBarcodeToAllBoxes={onApplyGluedBarcodeToAllBoxes}
                  />
                </div>
              ))}
            </div>
            <div className={cx(classNames.boxInfoWrapper)}>
              <div>
                <Typography className={classNames.categoryTitle}>
                  {taskType === TaskOperationType.RECEIVE
                    ? isCurrentBox
                      ? t(TranslationKey['Sizes from buyer']) + ':'
                      : t(TranslationKey['Sizes from storekeeper:'])
                    : t(TranslationKey['Sizes from storekeeper:'])}
                </Typography>

                <div className={classNames.sizesSubWrapper}>
                  <CustomSwitcher
                    condition={sizeSetting}
                    nameFirstArg={unitsOfChangeOptions.EU}
                    nameSecondArg={unitsOfChangeOptions.US}
                    firstArgValue={unitsOfChangeOptions.EU}
                    secondArgValue={unitsOfChangeOptions.US}
                    changeConditionHandler={condition => setSizeSetting(condition)}
                  />
                </div>

                {
                  /* isCurrentBox &&*/ taskType === TaskOperationType.RECEIVE ? (
                    <div className={classNames.demensionsWrapper}>
                      <Typography className={cx(classNames.standartText, classNames.mobileDemensions)}>
                        {t(TranslationKey.Length) + ': '}

                        {isCurrentBox
                          ? toFixed(box.lengthCmSupplier / lengthConversion, 2)
                          : toFixed(box.lengthCmWarehouse / lengthConversion, 2)}
                      </Typography>
                      <Typography className={cx(classNames.standartText, classNames.mobileDemensions)}>
                        {t(TranslationKey.Width) + ': '}
                        {isCurrentBox
                          ? toFixed(box.widthCmSupplier / lengthConversion, 2)
                          : toFixed(box.widthCmWarehouse / lengthConversion, 2)}
                      </Typography>
                      <Typography className={cx(classNames.standartText, classNames.mobileDemensions)}>
                        {t(TranslationKey.Height) + ': '}
                        {isCurrentBox
                          ? toFixed(box.heightCmSupplier / lengthConversion, 2)
                          : toFixed(box.heightCmWarehouse / lengthConversion, 2)}
                      </Typography>

                      <Typography className={cx(classNames.standartText, classNames.mobileDemensions)}>
                        {t(TranslationKey.Weight) + ': '}
                        {isCurrentBox
                          ? toFixed(box.weighGrossKgSupplier / weightConversion, 2)
                          : toFixed(box.weighGrossKgWarehouse / weightConversion, 2)}
                        {' ' + weightSizesType}
                      </Typography>

                      <Typography className={cx(classNames.standartText, classNames.mobileDemensions)}>
                        {t(TranslationKey['Volume weight']) + ': '}
                        {isCurrentBox
                          ? toFixed(volumeWeightSupplier / weightConversion, 2)
                          : toFixed(volumeWeightWarehouse / weightConversion, 2)}
                        {' ' + weightSizesType}
                      </Typography>

                      <Typography className={cx(classNames.standartText, classNames.mobileDemensions)}>
                        {t(TranslationKey['Final weight']) + ': '}
                        {isCurrentBox
                          ? toFixed(
                              box.weighGrossKgSupplier > volumeWeightSupplier
                                ? box.weighGrossKgSupplier / weightConversion
                                : volumeWeightWarehouse / weightConversion,
                              2,
                            )
                          : toFixed(
                              box.weighGrossKgWarehouse > volumeWeightSupplier
                                ? box.weighGrossKgWarehouse / weightConversion
                                : volumeWeightWarehouse / weightConversion,
                              2,
                            )}
                        {' ' + weightSizesType}
                      </Typography>
                    </div>
                  ) : (
                    <div
                      className={cx(classNames.demensionsWrapper, {
                        [classNames.editAccent]:
                          isNewBox &&
                          (taskType === TaskOperationType.EDIT || taskType === TaskOperationType.EDIT_BY_STOREKEEPER) &&
                          (box.heightCmWarehouse !== referenceEditingBox.heightCmWarehouse ||
                            box.weighGrossKgWarehouse !== referenceEditingBox.weighGrossKgWarehouse ||
                            box.widthCmWarehouse !== referenceEditingBox.widthCmWarehouse ||
                            box.lengthCmWarehouse !== referenceEditingBox.lengthCmWarehouse),
                      })}
                    >
                      <Typography className={cx(classNames.standartText, classNames.mobileDemensions)}>
                        {t(TranslationKey.Length) + ': '}
                        {toFixed(box.lengthCmWarehouse / lengthConversion, 2)}
                      </Typography>
                      <Typography className={cx(classNames.standartText, classNames.mobileDemensions)}>
                        {t(TranslationKey.Width) + ': '}
                        {toFixed(box.widthCmWarehouse / lengthConversion, 2)}
                      </Typography>
                      <Typography className={cx(classNames.standartText, classNames.mobileDemensions)}>
                        {t(TranslationKey.Height) + ': '}
                        {toFixed(box.heightCmWarehouse / lengthConversion, 2)}
                      </Typography>

                      <Typography className={cx(classNames.standartText, classNames.mobileDemensions)}>
                        {t(TranslationKey.Weight) + ': '}
                        {toFixed(box.weighGrossKgWarehouse / weightConversion, 2)}
                        {' ' + weightSizesType}
                      </Typography>
                      <Typography className={cx(classNames.standartText, classNames.mobileDemensions)}>
                        {t(TranslationKey['Volume weight']) + ': '}
                        {toFixed(volumeWeightWarehouse / weightConversion, 2)}
                        {' ' + weightSizesType}
                      </Typography>
                      <Typography className={cx(classNames.standartText, classNames.mobileDemensions)}>
                        {t(TranslationKey['Final weight']) + ': '}
                        {toFixed(
                          box.weighGrossKgWarehouse > volumeWeightWarehouse
                            ? box.weighGrossKgWarehouse / weightConversion
                            : volumeWeightWarehouse / weightConversion,
                          2,
                        )}
                        {' ' + weightSizesType}
                      </Typography>
                    </div>
                  )
                }
              </div>

              <Divider flexItem className={classNames.divider} orientation="vertical" />

              <div className={classNames.imagesWrapper}>
                {window.innerWidth > 1281 && box.images && (
                  <div className={classNames.photoWrapper}>
                    <Typography className={classNames.photoAndFilesTitle}>{`${t(
                      TranslationKey['Photos and documents of the box'],
                    )}:`}</Typography>
                    <div className={classNames.photoSubWrapper}>
                      <PhotoAndFilesCarousel
                        small
                        direction={window.screen.width < 768 ? 'column' : 'row'}
                        files={box.images}
                        width={window.screen.width < 768 ? '375px' : '340px'}
                      />
                    </div>

                    {isNewBox && box.tmpImages?.length ? (
                      <div>
                        <Typography className={classNames.greenText}>{`${t(TranslationKey['New files'])}: (+ ${
                          box.tmpImages?.length
                        })`}</Typography>
                        <CustomSlider>
                          {box.tmpImages?.map((image, index) =>
                            typeof image === 'string' ? (
                              <div key={index} className={classNames.imageLinkListItem}>
                                <Tooltip
                                  title={renderImageInfo(image, image)}
                                  classes={{ popper: classNames.imgTooltip }}
                                >
                                  <Avatar className={classNames.image} src={image} alt={image} variant="square" />
                                </Tooltip>

                                <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(image)}>
                                  <Typography className={classNames.linkName}>{image}</Typography>
                                </Link>
                              </div>
                            ) : (
                              <div key={index} className={classNames.imageListItem}>
                                <Tooltip
                                  title={renderImageInfo(image.data_url, image.file.name)}
                                  classes={{ popper: classNames.imgTooltip }}
                                >
                                  <img
                                    className={classNames.image}
                                    src={image.file.type.includes('image') ? image.data_url : '/assets/icons/file.png'}
                                    alt={image.file.name}
                                  />
                                </Tooltip>

                                <Typography className={classNames.fileName}>{image.file.name} </Typography>
                              </div>
                            ),
                          )}
                        </CustomSlider>
                      </div>
                    ) : null}
                  </div>
                )}

                {window.innerWidth > 1281 && box.items[0].order.images && (
                  <div className={classNames.photoWrapper}>
                    <Typography className={classNames.photoAndFilesTitle}>{`${t(
                      TranslationKey['Photos and order documents'],
                    )}:`}</Typography>
                    <div className={classNames.photoSubWrapper}>
                      <PhotoAndFilesCarousel
                        small
                        direction={window.screen.width < 768 ? 'column' : 'row'}
                        files={box.items[0].order.images}
                        width={window.screen.width < 768 ? '380px' : '340px'}
                      />
                    </div>
                  </div>
                )}

                {window.innerWidth < 1282 && (
                  <div className={classNames.footerSubWrapper}>
                    <div
                      className={cx(classNames.chipWrapper, {
                        [classNames.chipWrapperEditAccent]:
                          needAccent && box.shippingLabel !== referenceEditingBox.shippingLabel,
                      })}
                    >
                      <Text
                        tooltipInfoContent={t(TranslationKey['Availability of shipping label'])}
                        className={classNames.subTitle}
                      >
                        {t(TranslationKey['Shipping label']) + ':'}
                      </Text>

                      {box.shippingLabel ? (
                        <div className={classNames.barCode}>
                          <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(box.shippingLabel)}>
                            <Typography className={classNames.barCodeField}>{t(TranslationKey.View)}</Typography>
                          </Link>
                          <CopyValue text={box.shippingLabel} />
                        </div>
                      ) : (
                        <Typography className={classNames.link}>{t(TranslationKey['Not available'])}</Typography>
                      )}
                    </div>
                    <div>
                      <Field
                        oneLine
                        containerClasses={classNames.checkboxContainer}
                        labelClasses={classNames.label}
                        label={t(TranslationKey['Shipping label was glued to the warehouse'])}
                        inputComponent={
                          <Checkbox
                            color="primary"
                            disabled={!box.shippingLabel || !isNewBox || readOnly}
                            checked={box.isShippingLabelAttachedByStorekeeper}
                            onClick={() =>
                              onChangeField(
                                !box.isShippingLabelAttachedByStorekeeper,
                                'isShippingLabelAttachedByStorekeeper',
                              )
                            }
                          />
                        }
                      />
                    </div>
                  </div>
                )}

                {window.innerWidth < 1282 &&
                  box.items?.map((item, index) => (
                    <React.Fragment key={index}>
                      <>
                        {window.innerWidth < 1282 && box.amount > 1 && (
                          <div className={classNames.countSuperBoxWrapper}>
                            <Typography className={classNames.subTitle}>
                              {t(TranslationKey['Boxes in group']) + ':'}
                            </Typography>
                            <Typography className={classNames.subTitleOne}>{`x${box.amount}`}</Typography>
                          </div>
                        )}

                        {window.innerWidth < 1282 &&
                          (taskType === TaskOperationType.EDIT_BY_STOREKEEPER ||
                            (taskType === TaskOperationType.MERGE && index === 0) ||
                            (taskType === TaskOperationType.SPLIT && index === 0) ||
                            taskType === TaskOperationType.EDIT ||
                            (readOnly && taskType === TaskOperationType.RECEIVE) ||
                            (!isNewBox && taskType !== TaskOperationType.RECEIVE && index === 0)) && (
                            // eslint-disable-next-line react/jsx-indent
                            <div className={classNames.countSubWrapper}>
                              <Typography className={classNames.subTitle}>{`${t(TranslationKey.Box)} №:`}</Typography>
                              <Typography className={classNames.subTitleOne}>{box.humanFriendlyId}</Typography>
                            </div>
                          )}
                      </>

                      <div
                        className={cx(classNames.barCodeActionsWrapper, {
                          [classNames.successAccent]:
                            isNewBox &&
                            // taskType === TaskOperationType.RECEIVE &&
                            (item.isBarCodeAlreadyAttachedByTheSupplier || item.isBarCodeAttachedByTheStorekeeper),
                          [classNames.warningAccent]:
                            isNewBox &&
                            // taskType === TaskOperationType.RECEIVE &&
                            !item.isBarCodeAlreadyAttachedByTheSupplier &&
                            !item.isBarCodeAttachedByTheStorekeeper,
                        })}
                      >
                        {item.isBarCodeAttachedByTheStorekeeper === false && (
                          <Field
                            oneLine
                            containerClasses={classNames.checkboxContainer}
                            labelClasses={classNames.label}
                            label={t(TranslationKey['BarCode is glued by supplier'])}
                            tooltipInfoContent={t(TranslationKey['The supplier has glued the barcode before shipment'])}
                            inputComponent={
                              <Checkbox
                                disabled={!isNewBox || readOnly}
                                color="primary"
                                checked={item.isBarCodeAlreadyAttachedByTheSupplier}
                                onClick={() =>
                                  onChangeBarCode(
                                    !item.isBarCodeAlreadyAttachedByTheSupplier,
                                    'isBarCodeAlreadyAttachedByTheSupplier',
                                    index,
                                  )
                                }
                              />
                            }
                          />
                        )}

                        {item.isBarCodeAlreadyAttachedByTheSupplier === false && (
                          <Field
                            oneLine
                            containerClasses={classNames.checkboxContainer}
                            label={t(TranslationKey['BarCode is glued by storekeeper'])}
                            labelClasses={classNames.label}
                            tooltipInfoContent={t(
                              TranslationKey['The barcode was glued on when the box was accepted at the prep center'],
                            )}
                            inputComponent={
                              <Checkbox
                                disabled={!isNewBox || readOnly}
                                color="primary"
                                checked={item.isBarCodeAttachedByTheStorekeeper}
                                onClick={() =>
                                  onChangeBarCode(
                                    !item.isBarCodeAttachedByTheStorekeeper,
                                    'isBarCodeAttachedByTheStorekeeper',
                                    index,
                                  )
                                }
                              />
                            }
                          />
                        )}

                        {isNewBox &&
                          !readOnly &&
                          boxIndex === 0 &&
                          index === 0 &&
                          taskType !== 'merge' &&
                          taskType !== 'edit' && (
                            <Field
                              oneLine
                              // containerClasses={classNames.checkboxContainer}
                              labelClasses={classNames.label}
                              label={t(TranslationKey['Apply to all boxes'])}
                              tooltipInfoContent={t(TranslationKey['Apply barcode sticker values to all boxes'])}
                              inputComponent={
                                <Button
                                  className={classNames.applyButton}
                                  onClick={() =>
                                    onApplyGluedBarcodeToAllBoxes(
                                      item.isBarCodeAlreadyAttachedByTheSupplier,
                                      item.isBarCodeAttachedByTheStorekeeper,
                                    )
                                  }
                                >
                                  {t(TranslationKey.Apply)}
                                </Button>
                              }
                            />
                          )}
                      </div>
                    </React.Fragment>
                  ))}

                {window.innerWidth < 1282 && (
                  <div className={classNames.footerTrackNumberWrapper}>
                    <Field
                      // oneLine
                      // containerClasses={classNames.countSubWrapper}
                      label={t(TranslationKey['Track number'])}
                      labelClasses={classNames.label}
                      inputComponent={
                        <Tooltip title={box.trackNumberText}>
                          <Typography className={classNames.trackNum}>
                            {getShortenStringIfLongerThanCount(box.trackNumberText, 70) ||
                              t(TranslationKey['Not available'])}
                          </Typography>
                        </Tooltip>
                      }
                    />

                    <div className={classNames.trackNumberPhotoWrapper}>
                      {box.trackNumberFile.length ? (
                        <CustomSlider>
                          {box.trackNumberFile.map((el, index) => (
                            <img
                              key={index}
                              className={classNames.trackNumberPhoto}
                              src={box.trackNumberFile[index]}
                              onClick={() => {
                                setShowPhotosModal(!showPhotosModal)
                                setBigImagesOptions({
                                  ...bigImagesOptions,

                                  images: box.trackNumberFile,
                                })
                              }}
                            />
                          ))}
                        </CustomSlider>
                      ) : (
                        <Typography className={classNames.trackNumberNoPhotoText}>
                          {'no photo track number...'}
                        </Typography>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={classNames.footerWrapper}>
              {window.innerWidth > 1281 && (
                <div className={classNames.footerSubWrapper}>
                  <div
                    className={cx(classNames.chipWrapper, {
                      [classNames.chipWrapperEditAccent]:
                        needAccent && box.shippingLabel !== referenceEditingBox.shippingLabel,
                    })}
                  >
                    <Text
                      tooltipInfoContent={t(TranslationKey['Availability of shipping label'])}
                      className={classNames.subTitle}
                    >
                      {t(TranslationKey['Shipping label']) + ':'}
                    </Text>

                    {box.shippingLabel ? (
                      <div className={classNames.barCode}>
                        <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(box.shippingLabel)}>
                          <Typography className={classNames.barCodeField}>{t(TranslationKey.View)}</Typography>
                        </Link>
                        <CopyValue text={box.shippingLabel} />
                      </div>
                    ) : (
                      <Typography className={classNames.link}>{t(TranslationKey['Not available'])}</Typography>
                    )}
                  </div>
                  <div>
                    <Field
                      oneLine
                      containerClasses={classNames.checkboxContainer}
                      labelClasses={classNames.label}
                      label={t(TranslationKey['Shipping label was glued to the warehouse'])}
                      inputComponent={
                        <Checkbox
                          color="primary"
                          disabled={!box.shippingLabel || !isNewBox || readOnly}
                          checked={box.isShippingLabelAttachedByStorekeeper}
                          onClick={() =>
                            onChangeField(
                              !box.isShippingLabelAttachedByStorekeeper,
                              'isShippingLabelAttachedByStorekeeper',
                            )
                          }
                        />
                      }
                    />
                  </div>
                </div>
              )}

              {window.innerWidth > 1281 && (
                <div className={classNames.footerTrackNumberWrapper}>
                  <Field
                    // oneLine
                    // containerClasses={classNames.countSubWrapper}
                    label={t(TranslationKey['Track number'])}
                    labelClasses={classNames.label}
                    inputComponent={
                      <Tooltip title={box.trackNumberText}>
                        <Typography className={classNames.trackNum}>
                          {getShortenStringIfLongerThanCount(box.trackNumberText, 70) ||
                            t(TranslationKey['Not available'])}
                        </Typography>
                      </Tooltip>
                    }
                  />

                  <div className={classNames.trackNumberPhotoWrapper}>
                    {box.trackNumberFile.length ? (
                      <CustomSlider>
                        {box.trackNumberFile.map((el, index) => (
                          <img
                            key={index}
                            className={classNames.trackNumberPhoto}
                            src={box.trackNumberFile[index]}
                            onClick={() => {
                              setShowPhotosModal(!showPhotosModal)
                              setBigImagesOptions({
                                ...bigImagesOptions,

                                images: box.trackNumberFile,
                              })
                            }}
                          />
                        ))}
                      </CustomSlider>
                    ) : (
                      <Typography className={classNames.trackNumberNoPhotoText}>
                        {'no photo track number...'}
                      </Typography>
                    )}
                  </div>
                </div>
              )}

              {window.innerWidth < 1282 && box.images && (
                <div className={classNames.photoWrapper}>
                  <Typography className={classNames.photoAndFilesTitle}>{`${t(
                    TranslationKey['Photos and documents of the box'],
                  )}:`}</Typography>
                  <div className={classNames.photoSubWrapper}>
                    <PhotoAndFilesCarousel
                      small
                      direction={window.screen.width < 768 ? 'column' : 'row'}
                      files={box.images}
                      width={window.screen.width < 768 ? '375px' : '340px'}
                    />
                  </div>

                  {isNewBox && box.tmpImages?.length ? (
                    <div>
                      <Typography className={classNames.greenText}>{`${t(TranslationKey['New files'])}: (+ ${
                        box.tmpImages?.length
                      })`}</Typography>
                      <CustomSlider>
                        {box.tmpImages?.map((image, index) =>
                          typeof image === 'string' ? (
                            <div key={index} className={classNames.imageLinkListItem}>
                              <Tooltip
                                title={renderImageInfo(image, image)}
                                classes={{ popper: classNames.imgTooltip }}
                              >
                                <Avatar className={classNames.image} src={image} alt={image} variant="square" />
                              </Tooltip>

                              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(image)}>
                                <Typography className={classNames.linkName}>{image}</Typography>
                              </Link>
                            </div>
                          ) : (
                            <div key={index} className={classNames.imageListItem}>
                              <Tooltip
                                title={renderImageInfo(image.data_url, image.file.name)}
                                classes={{ popper: classNames.imgTooltip }}
                              >
                                <img
                                  className={classNames.image}
                                  src={image.file.type.includes('image') ? image.data_url : '/assets/icons/file.png'}
                                  alt={image.file.name}
                                />
                              </Tooltip>

                              <Typography className={classNames.fileName}>{image.file.name} </Typography>
                            </div>
                          ),
                        )}
                      </CustomSlider>
                    </div>
                  ) : null}
                </div>
              )}

              {window.innerWidth < 1282 && box.items[0].order.images && (
                <div className={classNames.photoWrapper}>
                  <Typography className={classNames.photoAndFilesTitle}>{`${t(
                    TranslationKey['Photos and order documents'],
                  )}:`}</Typography>
                  <div className={classNames.photoSubWrapper}>
                    <PhotoAndFilesCarousel
                      small
                      direction={window.screen.width < 768 ? 'column' : 'row'}
                      files={box.items[0].order.images}
                      width={window.screen.width < 768 ? '380px' : '340px'}
                    />
                  </div>
                </div>
              )}
            </div>
          </Paper>
        )}

        {isNewBox && (
          <div className={classNames.bottomBlockWrapper}>
            <div className={cx(classNames.editBtnWrapper, { [classNames.noEditBtnWrapper]: readOnly })}>
              {isEdit && !readOnly && (
                <div className={classNames.btnsWrapper}>
                  <Button
                    className={classNames.editBtn}
                    tooltipInfoContent={t(TranslationKey['Edit box parameters'])}
                    onClick={() => {
                      setCurBox(box)
                      onClickEditBox(box)
                    }}
                  >
                    {t(TranslationKey.Edit)}
                  </Button>

                  <Button
                    disabled={
                      !box.widthCmWarehouse ||
                      !box.weighGrossKgWarehouse ||
                      !box.lengthCmWarehouse ||
                      !box.heightCmWarehouse
                    }
                    className={classNames.applyAllBtn}
                    onClick={() => {
                      onClickApplyAllBtn(box)
                    }}
                  >
                    {t(TranslationKey['Apply to all'])}
                  </Button>
                </div>
              )}
              <div className={classNames.tablePanelSortWrapper} onClick={() => setShowFullCard(!showFullCard)}>
                <Typography className={classNames.tablePanelViewText}>
                  {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
                </Typography>

                {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
              </div>
            </div>
          </div>
        )}
        {!isNewBox && taskType === TaskOperationType.MERGE && (
          <div className={classNames.bottomBlockWrapper}>
            <div className={classNames.incomingBtnWrapper}>
              <div className={classNames.tablePanelSortWrapper} onClick={() => setShowFullCard(!showFullCard)}>
                <Typography className={classNames.tablePanelViewText}>
                  {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
                </Typography>

                {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
              </div>
            </div>
          </div>
        )}

        <BigImagesModal
          openModal={showPhotosModal}
          setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          images={bigImagesOptions.images}
          imgIndex={bigImagesOptions.imgIndex}
          setImageIndex={imgIndex => setBigImagesOptions(() => ({ ...bigImagesOptions, imgIndex }))}
        />
      </div>
    )
  },
)

const ReceiveBoxes = ({ taskType, onClickOpenModal }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.receiveBoxWrapper}>
      <div className={classNames.boxImageContainer}>
        <img src="/assets/icons/big-box.svg" className={classNames.bigBoxSvg} />
        <BoxArrow className={classNames.boxArrowSvg} />
      </div>

      <Typography className={classNames.receiveBoxTitle}>
        {t(TranslationKey['Add boxes that have arrived in stock'])}
      </Typography>

      {taskType === TaskOperationType.RECEIVE && (
        <Button
          disableElevation
          className={classNames.button}
          // tooltipInfoContent={newBoxes.length === 0 && t(TranslationKey['Create new box parameters'])}
          color="primary"
          variant="contained"
          onClick={onClickOpenModal}
        >
          {t(TranslationKey.Receive)}
        </Button>
      )}
    </div>
  )
}

const NewBoxes = observer(
  ({
    referenceEditingBoxes,
    newBoxes,
    onClickEditBox,
    isEdit,
    isNewBox,
    taskType,
    showEditBoxModal,
    onTriggerShowEditBoxModal,
    setNewBoxes,
    volumeWeightCoefficient,
    readOnly,
    onClickApplyAllBtn,
  }) => {
    const { classes: classNames } = useClassNames()

    const [curBox, setCurBox] = useState({})

    return (
      <div className={classNames.newBoxes}>
        <div className={classNames.titleWrapper}>
          <Text
            tooltipInfoContent={t(TranslationKey['New box condition'])}
            className={classNames.sectionTitle}
            containerClasses={classNames.sectionTitleWrapper}
          >
            {t(TranslationKey['New boxes'])}
          </Text>

          <Typography>{`${t(TranslationKey['Total number of boxes'])}: ${newBoxes.reduce(
            (acc, cur) => (acc += cur.amount),
            0,
          )}`}</Typography>
        </div>

        <div className={classNames.newBoxesWrapper}>
          {newBoxes.map((box, boxIndex) => (
            <Box
              key={boxIndex}
              boxIndex={boxIndex}
              readOnly={readOnly}
              volumeWeightCoefficient={volumeWeightCoefficient}
              isNewBox={isNewBox}
              referenceEditingBox={referenceEditingBoxes[0]}
              box={box}
              curBox={curBox}
              setCurBox={setCurBox}
              isEdit={isEdit}
              taskType={taskType}
              newBoxes={newBoxes}
              setNewBoxes={setNewBoxes}
              showEditBoxModal={showEditBoxModal}
              onTriggerShowEditBoxModal={onTriggerShowEditBoxModal}
              onClickEditBox={onClickEditBox}
              onClickApplyAllBtn={onClickApplyAllBtn}
            />
          ))}
        </div>

        <Modal openModal={showEditBoxModal} setOpenModal={onTriggerShowEditBoxModal}>
          <EditBoxTasksModal
            isReceive={taskType === TaskOperationType.RECEIVE}
            primarySizeSuitableCheckbox={taskType === TaskOperationType.RECEIVE || taskType === TaskOperationType.EDIT}
            volumeWeightCoefficient={volumeWeightCoefficient}
            setEditModal={onTriggerShowEditBoxModal}
            box={curBox}
            newBoxes={newBoxes}
            setNewBoxes={setNewBoxes}
            operationType={taskType}
          />
        </Modal>
      </div>
    )
  },
)

export const BeforeAfterBlock = observer(
  ({
    incomingBoxes,
    desiredBoxes,
    onEditBox,
    taskType,
    isEdit = true,
    showEditBoxModal,
    onTriggerShowEditBoxModal,
    setNewBoxes,
    setAmountFieldNewBox,
    volumeWeightCoefficient,
    onClickOpenModal,
    readOnly,
    onClickApplyAllBtn,
  }) => {
    const { classes: classNames } = useClassNames()

    const onClickEditBox = box => {
      onEditBox(box)
    }

    return (
      <div className={classNames.boxesWrapper}>
        <div className={classNames.currentBox}>
          <div className={classNames.titleWrapper}>
            <Text
              tooltipInfoContent={t(TranslationKey['Previous condition of the box'])}
              className={classNames.sectionTitle}
              containerClasses={classNames.sectionTitleWrapper}
            >
              {t(TranslationKey.Incoming)}
            </Text>

            <Typography>{`${t(TranslationKey['Total number of boxes'])}: ${incomingBoxes.reduce(
              (acc, cur) => (acc += cur.amount),
              0,
            )}`}</Typography>
          </div>

          <div className={classNames.newBoxesWrapper}>
            {incomingBoxes &&
              incomingBoxes.map((box, boxIndex) => (
                <React.Fragment key={boxIndex}>
                  <Box
                    isCurrentBox
                    readOnly={readOnly}
                    box={box}
                    taskType={taskType}
                    volumeWeightCoefficient={volumeWeightCoefficient}
                  />
                </React.Fragment>
              ))}
          </div>
        </div>

        {desiredBoxes.length > 0 && <Divider flexItem className={classNames.divider} orientation="vertical" />}

        {desiredBoxes.length > 0 && (
          <NewBoxes
            isNewBox
            readOnly={readOnly}
            isEdit={isEdit}
            volumeWeightCoefficient={volumeWeightCoefficient}
            referenceEditingBoxes={incomingBoxes}
            newBoxes={desiredBoxes}
            taskType={taskType}
            setNewBoxes={setNewBoxes}
            setAmountFieldNewBox={setAmountFieldNewBox}
            showEditBoxModal={showEditBoxModal}
            onTriggerShowEditBoxModal={onTriggerShowEditBoxModal}
            onClickEditBox={onClickEditBox}
            onClickApplyAllBtn={onClickApplyAllBtn}
          />
        )}
        {taskType === TaskOperationType.RECEIVE &&
          desiredBoxes.length === 0 &&
          incomingBoxes.length > 0 &&
          !readOnly && <ReceiveBoxes taskType={taskType} onClickOpenModal={onClickOpenModal} />}
      </div>
    )
  },
)
