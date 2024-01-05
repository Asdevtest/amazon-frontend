import { Checkbox, Typography } from '@mui/material'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { Field } from '@components/shared/field'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { Text } from '@components/shared/text'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useClassNames } from './box-item-card.style'

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
  const { classes: classNames, cx } = useClassNames()

  return (
    <div className={classNames.root}>
      <div className={classNames.mainWrapper}>
        <img className={classNames.img} src={getAmazonImageUrl(item.product.images[0], true)} />

        <div className={classNames.attributeWrapper}>
          <div className={classNames.attributeHeaderWrapper}>
            <div className={classNames.countWrapper}>
              <div className={classNames.countSubWrapper}>
                <Text
                  tooltipInfoContent={window.innerWidth > 1281 && t(TranslationKey['Number of products in the box'])}
                  className={classNames.subTitle}
                >
                  {t(TranslationKey.Quantity) + ':'}
                </Text>
                <Typography className={classNames.subValue}>{item.amount}</Typography>
              </div>
            </div>
            {window.innerWidth > 1281 && superCount > 1 && (
              <div className={classNames.countSuperBoxWrapper}>
                <Typography className={classNames.subTitle}>{t(TranslationKey['Boxes in group']) + ':'}</Typography>
                <Typography className={classNames.subValue}>{`x${superCount}`}</Typography>
              </div>
            )}

            {window.innerWidth > 1281 &&
            (taskType === TaskOperationType.EDIT_BY_STOREKEEPER ||
              (taskType === TaskOperationType.MERGE && index === 0) ||
              (taskType === TaskOperationType.SPLIT && index === 0) ||
              taskType === TaskOperationType.EDIT ||
              (readOnly && taskType === TaskOperationType.RECEIVE) ||
              (!isNewBox && taskType !== TaskOperationType.RECEIVE && index === 0)) ? (
              // eslint-disable-next-line react/jsx-indent
              <div className={classNames.countSubWrapper}>
                <Typography className={classNames.subTitle}>{`${t(TranslationKey.Box)} №:`}</Typography>
                <Typography className={classNames.subValue}>{boxId}</Typography>
              </div>
            ) : null}
            {window.innerWidth < 1282 && (
              <div className={classNames.copyValueMainWrapper}>
                <div className={classNames.copyValueWrapper}>
                  <div className={classNames.asinWrapper}>
                    <Typography className={classNames.asin}>{t(TranslationKey.ASIN)}</Typography>
                    <Typography className={classNames.asinTitle}>{item.product?.asin}</Typography>
                    {item.product?.asin ? <CopyValue text={item.product?.asin} /> : null}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={classNames.attributeFooterWrapper}>
            <div className={classNames.attributeFooterSubWrapper}>
              <div
                className={cx(classNames.barCodeWrapper, {
                  [classNames.editAccent]: needAccent && item.barCode !== referenceEditingBox.items[index].barCode,
                })}
              >
                <LabelWithCopy
                  labelTitleColor={'gray'}
                  labelTitle={t(TranslationKey.BarCode)}
                  labelValue={item.barCode}
                  lableLinkTitle={t(TranslationKey.View)}
                />
              </div>

              <div
                className={cx(classNames.barCodeWrapper, {
                  [classNames.editAccent]:
                    needAccent && item.transparencyFile !== referenceEditingBox.items[index].transparencyFile,
                })}
              >
                <LabelWithCopy
                  labelTitleColor={'gray'}
                  labelTitle={t(TranslationKey.Transparency)}
                  labelValue={item.transparencyFile}
                  lableLinkTitle={t(TranslationKey.View)}
                />
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
            </div>

            <div>
              <div className={classNames.chipWrapper}>
                {window.innerWidth > 1281 && item.barCode && (
                  <div
                    className={cx(classNames.barCodeActionsWrapper, {
                      [classNames.successAccent]:
                        isNewBox &&
                        (item.isBarCodeAlreadyAttachedByTheSupplier || item.isBarCodeAttachedByTheStorekeeper),
                      [classNames.warningAccent]:
                        isNewBox &&
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

                    {item.isTransparencyFileAttachedByTheStorekeeper === false && item?.transparencyFile && (
                      <Field
                        oneLine
                        containerClasses={classNames.checkboxContainer}
                        label={t(TranslationKey['Transparency codes glued by the supplier'])}
                        labelClasses={cx(classNames.label, classNames.redText)}
                        inputComponent={
                          <Checkbox
                            color="primary"
                            disabled={!isNewBox || readOnly}
                            checked={item.isTransparencyFileAlreadyAttachedByTheSupplier}
                            onChange={e =>
                              onChangeBarCode(e.target.checked, 'isTransparencyFileAlreadyAttachedByTheSupplier', index)
                            }
                          />
                        }
                      />
                    )}

                    {item.isTransparencyFileAlreadyAttachedByTheSupplier === false && item?.transparencyFile && (
                      <Field
                        oneLine
                        containerClasses={classNames.checkboxContainer}
                        label={t(TranslationKey['Transparency codes are glued by storekeeper'])}
                        labelClasses={cx(classNames.label, classNames.redText)}
                        inputComponent={
                          <Checkbox
                            color="primary"
                            disabled={!isNewBox || readOnly}
                            checked={item.isTransparencyFileAttachedByTheStorekeeper}
                            onChange={e =>
                              onChangeBarCode(e.target.checked, 'isTransparencyFileAttachedByTheStorekeeper', index)
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
                                  item.isTransparencyFileAlreadyAttachedByTheSupplier,
                                  item.isTransparencyFileAttachedByTheStorekeeper,
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
                    <Typography className={classNames.asin}>{'PREP ID' + ':'}</Typography>
                    <Typography className={classNames.asinTitle}>{box.prepId || t(TranslationKey.Missing)}</Typography>
                    {box.prepId ? <CopyValue text={box.prepId} /> : null}
                  </div>
                </div>
              ) : null}

              {window.innerWidth > 1281 && (
                <>
                  <div className={classNames.asinWrapper}>
                    <Typography className={classNames.asin}>{'PREP ID' + ':'}</Typography>
                    <Typography className={classNames.asinTitle}>{box.prepId || t(TranslationKey.Missing)}</Typography>
                    {box.prepId ? <CopyValue text={box.prepId} /> : null}
                  </div>
                  <div className={classNames.copyValueWrapper}>
                    <div className={classNames.asinWrapper}>
                      <Typography className={classNames.asin}>{t(TranslationKey.ASIN)}</Typography>
                      <Typography className={classNames.asinTitle}>{item.product?.asin}</Typography>
                      {item.product?.asin ? <CopyValue text={item.product?.asin} /> : null}
                    </div>
                  </div>
                </>
              )}

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
          <LabelWithCopy
            labelTitleColor={'gray'}
            labelTitle={t(TranslationKey.BarCode)}
            labelValue={item.barCode}
            lableLinkTitle={t(TranslationKey.View)}
          />
        </div>

        <div
          className={cx(classNames.barCodeWrapper, {
            [classNames.editAccent]:
              needAccent && item.transparencyFile !== referenceEditingBox.items[index].transparencyFile,
          })}
        >
          <LabelWithCopy
            labelTitleColor={'gray'}
            labelTitle={t(TranslationKey.Transparency)}
            labelValue={item.transparencyFile}
            lableLinkTitle={t(TranslationKey.View)}
          />
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
