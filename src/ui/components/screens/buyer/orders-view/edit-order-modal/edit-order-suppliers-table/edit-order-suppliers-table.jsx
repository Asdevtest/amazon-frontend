import React, {useState} from 'react'

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {priceCalculation} from '@utils/price-calculation'
import {toFixedWithDollarSign, withDollarSign, checkAndMakeAbsoluteUrl} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './edit-order-suppliers-table.style'

export const EditOrderSuppliersTable = observer(({suppliers, selectedSupplier}) => {
  const classNames = useClassNames()

  const [showPhotosModal, setShowPhotosModal] = useState(false)
  const [curImages, setCurImages] = useState([])

  return (
    <TableContainer className={classNames.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={(classNames.tableCellPadding, classNames.alignCenter)}>
              {t(TranslationKey.Title)}
            </TableCell>
            <TableCell className={classNames.alignCenter}>{t(TranslationKey.Link)}</TableCell>
            <TableCell className={classNames.alignCenter}>{t(TranslationKey.Price)}</TableCell>
            <TableCell className={classNames.alignRight}>{t(TranslationKey.Delivery)}</TableCell>
            <TableCell className={classNames.alignCenter}>{t(TranslationKey.Quantity)}</TableCell>
            <TableCell className={classNames.alignCenter}>{t(TranslationKey['Minimum batch'])}</TableCell>
            <TableCell className={classNames.alignCenter}>{t(TranslationKey['Batch price'])}</TableCell>
            <TableCell className={classNames.alignRight}>{t(TranslationKey['Total price'])}</TableCell>
            <TableCell className={classNames.alignCenter}>{t(TranslationKey.Comment)}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers && suppliers.length ? (
            suppliers.map((supplier, index) => (
              <TableRow
                key={`supplier_${supplier.id}_${index}`}
                className={clsx({
                  [classNames.tableRowAcceptedSupplier]: selectedSupplier?._id === supplier._id,
                })}
              >
                <TableCell className={clsx(classNames.alignCenter)}>
                  <Typography className={classNames.textCell}>{supplier.name}</Typography>
                </TableCell>

                <TableCell className={classNames.alignCenter}>
                  <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(supplier.link)}>
                    <Typography className={classNames.link}>{supplier.link}</Typography>
                  </Link>
                </TableCell>
                <TableCell className={classNames.alignRight}>{toFixedWithDollarSign(supplier.price, 2)}</TableCell>
                <TableCell className={classNames.alignRight}>
                  {toFixedWithDollarSign(supplier.batchDeliveryCostInDollar / supplier.amount, 2) || 'N/A'}
                </TableCell>
                <TableCell className={classNames.alignCenter}>{supplier.amount}</TableCell>
                <TableCell className={classNames.alignCenter}>{supplier.minlot}</TableCell>
                <TableCell className={classNames.alignCenter}>{toFixedWithDollarSign(supplier.lotcost, 2)}</TableCell>
                <TableCell className={classNames.alignCenter}>
                  {withDollarSign(priceCalculation(supplier.price, supplier.delivery, supplier.amount))}
                </TableCell>
                <TableCell className={classNames.alignCenter}>
                  <Typography className={classNames.textCell}>{supplier.comment}</Typography>
                </TableCell>
                <TableCell>
                  <Button
                    disableElevation
                    disabled={!supplier.images || supplier.images < 1}
                    color="primary"
                    className={classNames.button}
                    variant="contained"
                    onClick={() => {
                      setCurImages(supplier.images)
                      setShowPhotosModal(!showPhotosModal)
                    }}
                  >
                    {t(TranslationKey.Photos)}
                  </Button>
                </TableCell>
                <BigImagesModal
                  isAmazone
                  openModal={showPhotosModal}
                  setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
                  images={curImages}
                />
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className={clsx(classNames.alignCenter, classNames.tableCellPadding)} colSpan={8}>
                {t(TranslationKey['No suppliers'])}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
})
