import React from 'react'

import {Checkbox, TableCell, TableRow, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {ColoredChip} from '@components/colored-chip'
import {Field} from '@components/field'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {t} from '@utils/translations'

import {useClassNames} from './product-in-order-table-row.style'

export const ProductInOrderTableRow = observer(({item, handlers, ...restProps}) => {
  const classNames = useClassNames()

  return (
    <TableRow>
      <TableCell className={classNames.orderCell}>
        <div className={classNames.product}>
          <img
            alt=""
            src={item.product.images && item.product.images[0] && getAmazonImageUrl(item.product.images[0])}
            className={classNames.img}
          />
          <div className={classNames.descriptionWrapper}>
            <Typography className={classNames.amazonTitle}>{item.product && item.product.amazonTitle}</Typography>
            <Typography>{item.product && item.product.id}</Typography>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div style={{width: '150px'}}>
          <ColoredChip
            classes={{
              root: classNames.barcodeChip,
              clickable: classNames.barcodeChipHover,
              deletable: classNames.barcodeChipHover,
              deleteIcon: classNames.barcodeChipIcon,
            }}
            tooltipAttentionContent={!item.barCode && t(TranslationKey['A task will be created for the prep center'])}
            tooltipInfoContent={
              !item.barCode &&
              t(TranslationKey['Add a product barcode to the box. A task will be created for the prep center'])
            }
            className={clsx({[classNames.barcodeChipExists]: item.barCode})}
            size="small"
            label={
              item.tmpBarCode.length
                ? t(TranslationKey['File added'])
                : item.barCode
                ? item.barCode
                : t(TranslationKey['Set Barcode'])
            }
            onClick={() => restProps.onClickBarcode(item)}
            onDoubleClick={() => restProps.onDoubleClickBarcode(item)}
            onDelete={!item.barCode ? undefined : () => restProps.onDeleteBarcode(item.product._id)}
          />
        </div>

        {item.tmpBarCode.length ? (
          <Field
            oneLine
            containerClasses={classNames.checkboxContainer}
            tooltipInfoContent={t(TranslationKey['The new barcode will be updated at the product in the inventory'])}
            label={t(TranslationKey['Change in inventory'])}
            inputComponent={
              <Checkbox
                color="primary"
                checked={item.changeBarCodInInventory}
                onClick={() =>
                  restProps.onClickBarcodeInventoryCheckbox(item.product._id, !item.changeBarCodInInventory)
                }
              />
            }
          />
        ) : null}

        {!item.isBarCodeAlreadyAttachedByTheSupplier && !item.isBarCodeAttachedByTheStorekeeper ? (
          <Typography className={classNames.noBarCodeGlued}>{t(TranslationKey['Not glued!'])}</Typography>
        ) : (
          <div>
            {item.isBarCodeAlreadyAttachedByTheSupplier ? (
              <Field
                oneLine
                tooltipInfoContent={t(TranslationKey['The supplier has glued the barcode before shipment'])}
                containerClasses={classNames.checkboxContainer}
                label={t(TranslationKey['The barcode is glued by the supplier'])}
                inputComponent={<Checkbox disabled checked={item.isBarCodeAlreadyAttachedByTheSupplier} />}
              />
            ) : (
              <Field
                oneLine
                tooltipInfoContent={t(
                  TranslationKey['The barcode was glued on when the box was accepted at the prep center'],
                )}
                containerClasses={classNames.checkboxContainer}
                label={t(TranslationKey['The barcode is glued by the Storekeeper'])}
                inputComponent={<Checkbox disabled checked={item.isBarCodeAttachedByTheStorekeeper} />}
              />
            )}
          </div>
        )}
      </TableCell>

      <TableCell>
        <Typography>{item.amount}</Typography>
      </TableCell>

      <TableCell>
        <Typography className={classNames.buyerComment}>{item.order.buyerComment}</Typography>
      </TableCell>

      <TableCell>
        <Button
          disableElevation
          color="primary"
          className={classNames.button}
          variant="contained"
          onClick={() => {
            handlers.onTriggerOpenModal()
            handlers.onSelectPhotos({images: item.product.images, imgIndex: 0})
          }}
        >
          {t(TranslationKey.Photos)}
        </Button>
      </TableCell>
    </TableRow>
  )
})
