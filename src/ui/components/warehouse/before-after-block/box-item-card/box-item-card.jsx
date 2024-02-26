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

import { useStyles } from './box-item-card.style'

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
  const { classes: styles, cx } = useStyles()

  const disableGlueCheckbox = !isNewBox || readOnly
  const disableBarCodeCheckbox = disableGlueCheckbox || !item.barCode
  const disableTransparencyCheckbox = disableGlueCheckbox || !item.transparencyFile
  const isSuccessAccent =
    isNewBox &&
    (item.isBarCodeAlreadyAttachedByTheSupplier || item.isBarCodeAttachedByTheStorekeeper) &&
    (item.isTransparencyFileAlreadyAttachedByTheSupplier || item.isTransparencyFileAttachedByTheStorekeeper)

  const isWarningAccent =
    isNewBox &&
    ((!item.isBarCodeAlreadyAttachedByTheSupplier && !item.isBarCodeAttachedByTheStorekeeper) ||
      (!item.isTransparencyFileAlreadyAttachedByTheSupplier && !item.isTransparencyFileAttachedByTheStorekeeper))

  return (
    <div className={styles.root}>
      <div className={styles.mainWrapper}>
        <img className={styles.img} src={getAmazonImageUrl(item.product.images[0], true)} />

        <div className={styles.attributeWrapper}>
          <div className={styles.attributeHeaderWrapper}>
            <div className={styles.countWrapper}>
              <div className={styles.countSubWrapper}>
                <Text
                  tooltipInfoContent={t(TranslationKey['Number of products in the box'])}
                  className={styles.subTitle}
                >
                  {t(TranslationKey.Quantity) + ':'}
                </Text>
                <Typography className={styles.subValue}>{item.amount}</Typography>
              </div>
            </div>
            {superCount > 1 && (
              <div className={styles.countSuperBoxWrapper}>
                <Typography className={styles.subTitle}>{t(TranslationKey['Boxes in group']) + ':'}</Typography>
                <Typography className={styles.subValue}>{`x${superCount}`}</Typography>
              </div>
            )}

            {taskType === TaskOperationType.EDIT_BY_STOREKEEPER ||
            (taskType === TaskOperationType.MERGE && index === 0) ||
            (taskType === TaskOperationType.SPLIT && index === 0) ||
            taskType === TaskOperationType.EDIT ||
            (readOnly && taskType === TaskOperationType.RECEIVE) ||
            (!isNewBox && taskType !== TaskOperationType.RECEIVE && index === 0) ? (
              <div className={styles.countSubWrapper}>
                <Typography className={styles.subTitle}>{`${t(TranslationKey.Box)} №:`}</Typography>
                <Typography className={styles.subValue}>{boxId}</Typography>
              </div>
            ) : null}
          </div>

          <div className={styles.attributeFooterWrapper}>
            <div className={styles.attributeFooterSubWrapper}>
              <div
                className={cx(styles.barCodeWrapper, {
                  [styles.editAccent]: needAccent && item.barCode !== referenceEditingBox.items[index].barCode,
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
                className={cx(styles.barCodeWrapper, {
                  [styles.editAccent]:
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

              <div className={styles.countSubWrapper}>
                <Typography className={styles.subTitle}>{t(TranslationKey['Order number'])}</Typography>
                <Typography className={styles.subValue}>{item.order.id}</Typography>
              </div>

              <div className={styles.countSubWrapper}>
                <Typography className={styles.subTitle}>{'item'}</Typography>
                <Typography className={styles.subValue}>{item.order.item}</Typography>
              </div>

              {taskType === TaskOperationType.RECEIVE ? (
                <div className={styles.priorityWrapper}>
                  <Typography className={styles.countSubWrapper}>{`${t(TranslationKey.Priority)}:`}</Typography>
                  {item.order.priority === '40' ? (
                    <div className={styles.rushOrderWrapper}>
                      <img className={styles.rushOrderImg} src="/assets/icons/fire.svg" />
                      <Typography className={styles.subValue}>{t(TranslationKey['Rush order'])}</Typography>
                    </div>
                  ) : null}
                  {item.order.priority !== '40' /* && !item.order.expressChinaDelivery  */ ? (
                    <div className={styles.rushOrderWrapper}>
                      <Typography className={styles.subValue}>{t(TranslationKey['Medium priority'])}</Typography>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div>
              <div className={styles.chipWrapper}>
                <div
                  className={cx(styles.barCodeActionsWrapper, {
                    [styles.successAccent]: isSuccessAccent,
                    [styles.warningAccent]: isWarningAccent,
                  })}
                >
                  {item.isBarCodeAttachedByTheStorekeeper === false && (
                    <Field
                      oneLine
                      containerClasses={styles.checkboxContainer}
                      labelClasses={styles.label}
                      label={t(TranslationKey['BarCode is glued by supplier'])}
                      tooltipInfoContent={t(TranslationKey['The supplier has glued the barcode before shipment'])}
                      inputComponent={
                        <Checkbox
                          disabled={disableBarCodeCheckbox}
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
                      containerClasses={styles.checkboxContainer}
                      label={t(TranslationKey['BarCode is glued by storekeeper'])}
                      labelClasses={styles.label}
                      tooltipInfoContent={t(
                        TranslationKey['The barcode was glued on when the box was accepted at the prep center'],
                      )}
                      inputComponent={
                        <Checkbox
                          disabled={disableBarCodeCheckbox}
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

                  {item.isTransparencyFileAttachedByTheStorekeeper === false && (
                    <Field
                      oneLine
                      containerClasses={styles.checkboxContainer}
                      label={t(TranslationKey['Transparency codes glued by the supplier'])}
                      labelClasses={cx(styles.label, styles.redText)}
                      inputComponent={
                        <Checkbox
                          color="primary"
                          disabled={disableTransparencyCheckbox}
                          checked={item.isTransparencyFileAlreadyAttachedByTheSupplier}
                          onChange={e =>
                            onChangeBarCode(e.target.checked, 'isTransparencyFileAlreadyAttachedByTheSupplier', index)
                          }
                        />
                      }
                    />
                  )}

                  {item.isTransparencyFileAlreadyAttachedByTheSupplier === false && (
                    <Field
                      oneLine
                      containerClasses={styles.checkboxContainer}
                      label={t(TranslationKey['Transparency codes are glued by storekeeper'])}
                      labelClasses={cx(styles.label, styles.redText)}
                      inputComponent={
                        <Checkbox
                          color="primary"
                          disabled={disableTransparencyCheckbox}
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
                        // containerClasses={styles.checkboxContainer}
                        labelClasses={styles.label}
                        label={t(TranslationKey['Apply to all boxes'])}
                        tooltipInfoContent={t(TranslationKey['Apply barcode sticker values to all boxes'])}
                        inputComponent={
                          <Button
                            disabled={disableBarCodeCheckbox}
                            className={styles.applyButton}
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
              </div>
              {taskType === TaskOperationType.RECEIVE ? (
                <div className={styles.copyValueWrapper}>
                  <div className={styles.asinWrapper}>
                    <Typography className={styles.asin}>{'PREP ID' + ':'}</Typography>
                    <Typography className={styles.asinTitle}>{box.prepId || t(TranslationKey.Missing)}</Typography>
                    {box.prepId ? <CopyValue text={box.prepId} /> : null}
                  </div>
                </div>
              ) : null}

              <>
                {taskType !== TaskOperationType.RECEIVE && (
                  <div className={styles.asinWrapper}>
                    <Typography className={styles.asin}>{'PREP ID' + ':'}</Typography>
                    <Typography className={styles.asinTitle}>{box.prepId || t(TranslationKey.Missing)}</Typography>
                    {box.prepId ? <CopyValue text={box.prepId} /> : null}
                  </div>
                )}
                <div className={styles.copyValueWrapper}>
                  <div className={styles.asinWrapper}>
                    <Typography className={styles.asin}>{t(TranslationKey.ASIN)}</Typography>
                    <Typography className={styles.asinTitle}>{item.product?.asin}</Typography>
                    {item.product?.asin ? <CopyValue text={item.product?.asin} /> : null}
                  </div>
                </div>
              </>

              <Typography className={styles.title}>{item.product?.amazonTitle}</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.attributeFooterWrapperMobile}>
        <div
          className={cx(styles.barCodeWrapper, {
            [styles.editAccent]: needAccent && item.barCode !== referenceEditingBox.items[index].barCode,
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
          className={cx(styles.barCodeWrapper, {
            [styles.editAccent]:
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
          <div className={styles.chipWrapper}>
            {item.barCode && (
              <div
                className={cx(styles.barCodeActionsWrapper, {
                  [styles.successAccent]:
                    isNewBox &&
                    // taskType === TaskOperationType.RECEIVE &&
                    (item.isBarCodeAlreadyAttachedByTheSupplier || item.isBarCodeAttachedByTheStorekeeper),
                  [styles.warningAccent]:
                    isNewBox &&
                    // taskType === TaskOperationType.RECEIVE &&
                    !item.isBarCodeAlreadyAttachedByTheSupplier &&
                    !item.isBarCodeAttachedByTheStorekeeper,
                })}
              >
                {item.isBarCodeAttachedByTheStorekeeper === false && (
                  <Field
                    oneLine
                    containerClasses={styles.checkboxContainer}
                    labelClasses={styles.label}
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
                    containerClasses={styles.checkboxContainer}
                    label={t(TranslationKey['BarCode is glued by storekeeper'])}
                    labelClasses={styles.label}
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
                      containerClasses={styles.checkboxContainer}
                      labelClasses={styles.label}
                      label={t(TranslationKey['Apply to all boxes'])}
                      tooltipInfoContent={t(TranslationKey['Apply barcode sticker values to all boxes'])}
                      inputComponent={
                        <Button
                          disabled={disableBarCodeCheckbox}
                          className={styles.applyButton}
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
          <div className={styles.asinWrapper}>
            <Typography className={styles.asin}>{t(TranslationKey.ASIN)}</Typography>
            <Typography className={styles.asinTitle}>{item.product?.asin}</Typography>
          </div>
          <Typography className={styles.title}>{item.product?.amazonTitle}</Typography>
        </div>
      </div>
    </div>
  )
}
