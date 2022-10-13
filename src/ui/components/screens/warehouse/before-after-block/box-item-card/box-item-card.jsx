import React from 'react'

import {Checkbox, Link, Typography} from '@material-ui/core'
import clsx from 'clsx'

import {TaskOperationType} from '@constants/task-operation-type'
import {TranslationKey} from '@constants/translations/translation-key'

import {CopyValue} from '@components/copy-value/copy-value'
import {Field} from '@components/field'
import {Text} from '@components/text'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {checkAndMakeAbsoluteUrl} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './box-item-card.style'

export const BoxItemCard = ({
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
}) => {
  const classNames = useClassNames()

  console.log('referenceEditingBox', referenceEditingBox)

  return (
    <div className={classNames.root}>
      <div className={classNames.mainWrapper}>
        <img className={classNames.img} src={getAmazonImageUrl(item.product.images[0])} />

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
                <Typography className={classNames.count}>{item.amount}</Typography>
              </div>

              {superCount > 1 && (
                <div className={classNames.countSubWrapper}>
                  <Typography className={classNames.subTitle}>{t(TranslationKey['Super Box']) + ':'}</Typography>
                  <Typography className={classNames.count}>{`x${superCount}`}</Typography>
                </div>
              )}
            </div>
            {((readOnly && taskType === TaskOperationType.RECEIVE) || taskType !== TaskOperationType.RECEIVE) && (
              <div className={classNames.countSubWrapper}>
                <Typography className={classNames.subTitle}>{t(TranslationKey['Box number:'])}</Typography>
                <Typography className={classNames.count}>{boxId}</Typography>
              </div>
            )}
          </div>

          <div className={classNames.attributeFooterWrapper}>
            <div
              className={clsx(classNames.barCodeWrapper, {
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
                  <div className={classNames.barCodeActionsWrapper}>
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
                  </div>
                )}
              </div>
              <div className={classNames.copyValueWrapper}>
                <div className={classNames.asinWrapper}>
                  <Typography className={classNames.asin}>{t(TranslationKey.ASIN)}</Typography>
                  <Typography className={classNames.asinTitle}>{item.product?.asin}</Typography>
                </div>
                {item.product?.asin ? <CopyValue text={item.product?.asin} /> : null}
              </div>

              <Typography className={classNames.title}>{item.product?.amazonTitle}</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames.attributeFooterWrapperMobile}>
        <div
          className={clsx(classNames.barCodeWrapper, {
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
              <div className={classNames.barCodeActionsWrapper}>
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
