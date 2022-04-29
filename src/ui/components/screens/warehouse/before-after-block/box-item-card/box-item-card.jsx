import React from 'react'

import {Checkbox, Link, Paper, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Field} from '@components/field'
import {Input} from '@components/input'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {checkAndMakeAbsoluteUrl} from '@utils/text'

import {useClassNames} from './box-item-card.style'

const textConsts = getLocalizedTexts(texts, 'ru').boxItemCard

export const BoxItemCard = ({item, index, superCount, isNewBox, onChangeBarCode}) => {
  const classNames = useClassNames()

  return (
    <Paper className={classNames.root}>
      <div className={classNames.mainWrapper}>
        <img className={classNames.img} src={item.product?.images[0] && getAmazonImageUrl(item.product.images[0])} />

        <div className={classNames.attributeWrapper}>
          <div className={classNames.countWrapper}>
            <Typography className={classNames.subTitle}>{textConsts.count}</Typography>
            <Input readOnly classes={{root: classNames.inputWrapper, input: classNames.input}} value={item.amount} />
            {superCount > 1 && <Typography className={classNames.superCount}>{`x ${superCount}`}</Typography>}
          </div>

          <div className={classNames.chipWrapper}>
            <Typography className={classNames.subTitle}>{textConsts.barCode}</Typography>

            {item.product.barCode ? (
              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(item.product.barCode)}>
                <Typography className={classNames.barCodeField}>{item.product.barCode}</Typography>
              </Link>
            ) : (
              <Typography className={classNames.barCodeField}>{'N/A'}</Typography>
            )}

            {item.product.barCode && (
              <div className={classNames.barCodeActionsWrapper}>
                {item.isBarCodeAttachedByTheStorekeeper === false && (
                  <Field
                    oneLine
                    containerClasses={classNames.checkboxContainer}
                    label={textConsts.codeCheck}
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
                    label={textConsts.barCodeIsGluedWarehouse}
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
