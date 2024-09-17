import { Checkbox } from '@mui/material'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { Field } from '@components/shared/field'
import { LabelWithCopy } from '@components/shared/label-with-copy'

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
          <div className={styles.attributeFooterWrapper}>
            <div className={styles.attributeFooterSubWrapper}>
              <div className={styles.countSubWrapper}>
                <p title={t(TranslationKey['Number of products in the box'])} className={styles.subTitle}>
                  {t(TranslationKey.Quantity) + ':'}
                </p>
                <p className={styles.subValue}>{item.amount}</p>
              </div>
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
                <p className={styles.subTitle}>{t(TranslationKey['Order number'])}</p>
                <p className={styles.subValue}>{item.order.id}</p>
              </div>

              <div className={styles.countSubWrapper}>
                <p className={styles.subTitle}>{'item'}</p>
                <p className={styles.subValue}>{item.order.item}</p>
              </div>

              {taskType === TaskOperationType.RECEIVE ? (
                <div className={styles.priorityWrapper}>
                  <p className={styles.countSubWrapper}>{`${t(TranslationKey.Priority)}:`}</p>
                  {item.order.priority === '40' ? (
                    <div className={styles.rushOrderWrapper}>
                      <img className={styles.rushOrderImg} src="/assets/icons/fire.svg" />
                      <p className={styles.subValue}>{t(TranslationKey['Rush order'])}</p>
                    </div>
                  ) : null}
                  {item.order.priority !== '40' /* && !item.order.expressChinaDelivery  */ ? (
                    <div className={styles.rushOrderWrapper}>
                      <p className={styles.subValue}>{t(TranslationKey['Medium priority'])}</p>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className={styles.attributeFooterSubWrapper}>
              <div className={styles.attributeHeaderWrapper}>
                {superCount > 1 && (
                  <div className={styles.countSuperBoxWrapper}>
                    <p className={styles.subTitle}>{t(TranslationKey['Boxes in group']) + ':'}</p>
                    <p className={styles.subValue}>{`x${superCount}`}</p>
                  </div>
                )}

                {taskType === TaskOperationType.EDIT_BY_STOREKEEPER ||
                (taskType === TaskOperationType.MERGE && index === 0) ||
                (taskType === TaskOperationType.SPLIT && index === 0) ||
                taskType === TaskOperationType.EDIT ||
                (readOnly && taskType === TaskOperationType.RECEIVE) ||
                (!isNewBox && taskType !== TaskOperationType.RECEIVE && index === 0) ? (
                  <div className={styles.countSubWrapper}>
                    <p className={styles.subTitle}>{`${t(TranslationKey.Box)} №:`}</p>
                    <p className={styles.subValue}>{boxId}</p>
                  </div>
                ) : null}
              </div>
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
                      label={t(TranslationKey['Transparency Codes glued by the supplier'])}
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
                      label={t(TranslationKey['Transparency Codes are glued by storekeeper'])}
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
                        labelClasses={styles.label}
                        label={t(TranslationKey['Apply to all boxes'])}
                        tooltipInfoContent={t(TranslationKey['Apply barcode sticker values to all boxes'])}
                        inputComponent={
                          <Button
                            disabled={disableBarCodeCheckbox}
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
                    <p className={styles.asin}>{'PREP ID' + ':'}</p>
                    <p className={styles.asinTitle}>{box.prepId || t(TranslationKey.Missing)}</p>
                    {box.prepId ? <CopyValue text={box.prepId} /> : null}
                  </div>
                </div>
              ) : null}

              <>
                {taskType !== TaskOperationType.RECEIVE && (
                  <div className={styles.asinWrapper}>
                    <p className={styles.asin}>{'PREP ID' + ':'}</p>
                    <p className={styles.asinTitle}>{box.prepId || t(TranslationKey.Missing)}</p>
                    {box.prepId ? <CopyValue text={box.prepId} /> : null}
                  </div>
                )}
                <div className={styles.copyValueWrapper}>
                  <div className={styles.asinWrapper}>
                    <p className={styles.asin}>{t(TranslationKey.ASIN)}</p>
                    <p className={styles.asinTitle}>{item.product?.asin}</p>
                    {item.product?.asin ? <CopyValue text={item.product?.asin} /> : null}
                  </div>
                </div>
              </>

              <p className={styles.title}>{item.product?.amazonTitle}</p>
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
            <p className={styles.asin}>{t(TranslationKey.ASIN)}</p>
            <p className={styles.asinTitle}>{item.product?.asin}</p>
          </div>
          <p className={styles.title}>{item.product?.amazonTitle}</p>
        </div>
      </div>
    </div>
  )
}
