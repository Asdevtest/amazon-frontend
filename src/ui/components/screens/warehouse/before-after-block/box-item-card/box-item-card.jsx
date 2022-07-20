import React from 'react'

import {Checkbox, Link, Paper, Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Field} from '@components/field'
import {Input} from '@components/input'
import {Text} from '@components/text'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {checkAndMakeAbsoluteUrl} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './box-item-card.style'

export const BoxItemCard = ({item, index, superCount, isNewBox, onChangeBarCode}) => {
  const classNames = useClassNames()

  return (
    <Paper className={classNames.root}>
      <div className={classNames.mainWrapper}>
        <img className={classNames.img} src={item.product?.images[0] && getAmazonImageUrl(item.product.images[0])} />

        <div className={classNames.attributeWrapper}>
          <div className={classNames.countWrapper}>
            <Text
              tooltipInfoContent={t(TranslationKey['Number of products in the box'])}
              className={classNames.subTitle}
            >
              {t(TranslationKey.Quantity) + ':'}
            </Text>
            <Input readOnly classes={{root: classNames.inputWrapper, input: classNames.input}} value={item.amount} />
            {superCount > 1 && <Typography className={classNames.superCount}>{`x ${superCount}`}</Typography>}
          </div>

          <div className={classNames.chipWrapper}>
            <Text tooltipInfoContent={t(TranslationKey['Product barcode'])} className={classNames.subTitle}>
              {t(TranslationKey.BarCode) + ':'}
            </Text>

            {item.barCode ? (
              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(item.barCode)}>
                <Typography className={classNames.barCodeField}>{item.barCode}</Typography>
              </Link>
            ) : (
              <Typography className={classNames.barCodeField}>{'N/A'}</Typography>
            )}

            {item.barCode && (
              <div className={classNames.barCodeActionsWrapper}>
                {item.isBarCodeAttachedByTheStorekeeper === false && (
                  <Field
                    oneLine
                    containerClasses={classNames.checkboxContainer}
                    label={t(TranslationKey['BarCode is glued by supplier'])}
                    tooltipInfoContent={t(TranslationKey['The supplier has glued the barcode before shipment'])}
                    inputComponent={
                      <Checkbox
                        disabled={!isNewBox}
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
                    tooltipInfoContent={t(
                      TranslationKey['The barcode was glued on when the box was accepted at the prep center'],
                    )}
                    inputComponent={
                      <Checkbox
                        disabled={!isNewBox}
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
        </div>
      </div>

      <Typography className={classNames.title}>{item.product?.amazonTitle}</Typography>
    </Paper>
  )
}
