import {cx} from '@emotion/css'
import {Checkbox, Link, Typography} from '@mui/material'

import React from 'react'

import {TaskOperationType} from '@constants/task-operation-type'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value/copy-value'
import {Field} from '@components/field'
import {Text} from '@components/text'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {checkAndMakeAbsoluteUrl} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './box-item-card.style'

export const BoxItemCard = ({
  box,
  item,
  index,
  superCount,
  isNewBox,
  onChangeBarCode,
  boxId,
  readOnly,
  taskType,
  needAccent,
  referenceEditingBox,
  boxIndex,
  onApplyGluedBarcodeToAllBoxes,
}) => {
  const {classes: classNames} = useClassNames()

  return (
    <div className={classNames.root}>
      <div className={classNames.mainWrapper}>
        <img className={classNames.img} src={getAmazonImageUrl(item.product.images[0], true)} />

        <div className={classNames.attributeWrapper}>
          <div className={classNames.attributeHeaderWrapper}>
            <div className={classNames.countWrapper}>
              <div className={classNames.countSubWrapper}>
                <Text
                  tooltipInfoContent={t(TranslationKey['Number of products in the box'])}
                  className={classNames.subTitle}
                >
                  {t(TranslationKey.Quantity) + ':'}
                </Text>
                <Typography className={classNames.subValue}>{item.amount}</Typography>
              </div>
            </div>
            {superCount > 1 && (
              <div className={classNames.countSuperBoxWrapper}>
                <Typography className={classNames.subTitle}>{t(TranslationKey['Boxes in group']) + ':'}</Typography>
                <Typography className={classNames.subValue}>{`x${superCount}`}</Typography>
              </div>
            )}

            {(readOnly && taskType === TaskOperationType.RECEIVE) ||
            (!isNewBox && taskType !== TaskOperationType.RECEIVE && index === 0) ||
            (taskType === TaskOperationType.MERGE && index === 0) ||
            (taskType === TaskOperationType.SPLIT && index === 0) ||
            taskType === TaskOperationType.EDIT ||
            taskType === TaskOperationType.EDIT_BY_STOREKEEPER ? (
              <div className={classNames.countSubWrapper}>
                <Typography className={classNames.subTitle}>{`${t(TranslationKey.Box)} №:`}</Typography>
                <Typography className={classNames.subValue}>{boxId}</Typography>
              </div>
            ) : (
              <div className={classNames.countSubWrapper} />
            )}
          </div>

          <div className={classNames.attributeFooterWrapper}>
            <div className={classNames.attributeFooterSubWrapper}>
              <div
                className={cx(classNames.barCodeWrapper, {
                  [classNames.editAccent]: needAccent && item.barCode !== referenceEditingBox.items[index].barCode,
                })}
              >
                <Text tooltipInfoContent={t(TranslationKey['Product barcode'])} className={classNames.subTitle}>
                  {t(TranslationKey.BarCode) + ':'}
                </Text>

                {item.barCode ? (
                  <div className={classNames.barCode}>
                    <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(item.barCode)}>
                      <Typography className={classNames.barCodeField}>{t(TranslationKey.View)}</Typography>
                    </Link>

                    <CopyValue text={item.barCode} />
                  </div>
                ) : (
                  <Typography className={classNames.miss}>{t(TranslationKey['Not available'])}</Typography>
                )}
              </div>

              <div className={classNames.countSubWrapper}>
                <Typography className={classNames.subTitle}>{t(TranslationKey['Order number'])}</Typography>
                <Typography className={classNames.subValue}>{item.order.id}</Typography>
              </div>

              <div className={classNames.countSubWrapper}>
                <Typography className={classNames.subTitle}>{'item'}</Typography>
                <Typography className={classNames.subValue}>{item.order.item}</Typography>
              </div>

              {taskType === TaskOperationType.RECEIVE ? (
                <div className={classNames.priorityWrapper}>
                  <Typography className={classNames.countSubWrapper}>{`${t(TranslationKey.Priority)}:`}</Typography>
                  {item.order.priority === '40' ? (
                    <div className={classNames.rushOrderWrapper}>
                      <img className={classNames.rushOrderImg} src="/assets/icons/fire.svg" />
                      <Typography className={classNames.subValue}>{t(TranslationKey['Rush order'])}</Typography>
                    </div>
                  ) : null}
                  {item.order.priority !== '40' /* && !item.order.expressChinaDelivery  */ ? (
                    <div className={classNames.rushOrderWrapper}>
                      <Typography className={classNames.subValue}>{t(TranslationKey['Medium priority'])}</Typography>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* <div className={classNames.countSubWrapper}>
                <Typography className={classNames.subTitle}>{t(TranslationKey['Track number'])}</Typography>
                <Tooltip title={item.order.trackingNumberChina}>
                  <Typography className={classNames.subValue}>
                    {item.order.trackingNumberChina || t(TranslationKey['Not available'])}
                  </Typography>
                </Tooltip>
              </div> */}
            </div>

            <div>
              <div className={classNames.chipWrapper}>
                {item.barCode && (
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
                )}
              </div>
              {taskType === TaskOperationType.RECEIVE ? (
                <div className={classNames.copyValueWrapper}>
                  <div className={classNames.asinWrapper}>
                    <Typography className={classNames.asin}>{'PREP ID:'}</Typography>
                    <Typography className={classNames.asinTitle}>{box.prepId || t(TranslationKey.Missing)}</Typography>
                    {box.prepId ? <CopyValue text={box.prepId} /> : null}
                  </div>
                </div>
              ) : null}

              <div className={classNames.copyValueWrapper}>
                <div className={classNames.asinWrapper}>
                  <Typography className={classNames.asin}>{t(TranslationKey.ASIN)}</Typography>
                  <Typography className={classNames.asinTitle}>{item.product?.asin}</Typography>
                  {item.product?.asin ? <CopyValue text={item.product?.asin} /> : null}
                </div>
                {/* {item.product?.asin ? <CopyValue text={item.product?.asin} /> : null} */}
              </div>

              <Typography className={classNames.title}>{item.product?.amazonTitle}</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames.attributeFooterWrapperMobile}>
        <div
          className={cx(classNames.barCodeWrapper, {
            [classNames.editAccent]: needAccent && item.barCode !== referenceEditingBox.items[index].barCode,
          })}
        >
          <Text tooltipInfoContent={t(TranslationKey['Product barcode'])} className={classNames.subTitle}>
            {t(TranslationKey.BarCode) + ':'}
          </Text>

          {item.barCode ? (
            <div className={classNames.barCode}>
              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(item.barCode)}>
                <Typography className={classNames.barCodeField}>{t(TranslationKey.View)}</Typography>
              </Link>
              <CopyValue text={item.barCode} />
            </div>
          ) : (
            <Typography className={classNames.barCodeField}>{t(TranslationKey['Not available'])}</Typography>
          )}
        </div>
        <div>
          <div className={classNames.chipWrapper}>
            {item.barCode && (
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
                      containerClasses={classNames.checkboxContainer}
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
            )}
          </div>
          <div className={classNames.asinWrapper}>
            <Typography className={classNames.asin}>{t(TranslationKey.ASIN)}</Typography>
            <Typography className={classNames.asinTitle}>{item.product?.asin}</Typography>
          </div>
          <Typography className={classNames.title}>{item.product?.amazonTitle}</Typography>
        </div>
      </div>
    </div>
  )
}
