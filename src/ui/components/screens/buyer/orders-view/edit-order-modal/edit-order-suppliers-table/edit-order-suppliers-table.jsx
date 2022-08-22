import React from 'react'

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {UserLinkCell} from '@components/data-grid-cells/data-grid-cells'

import {priceCalculation} from '@utils/price-calculation'
import {toFixedWithDollarSign, withDollarSign, checkAndMakeAbsoluteUrl} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './edit-order-suppliers-table.style'

export const EditOrderSuppliersTable = observer(({suppliers, selectedSupplier}) => {
  const classNames = useClassNames()

  const copyValue = value => {
    navigator.clipboard.writeText(value)
  }

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
            <TableCell className={classNames.alignCenter}>{t(TranslationKey['Created by'])}</TableCell>
            <TableCell className={classNames.alignCenter}>{t(TranslationKey.Files)}</TableCell>
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
                <TableCell className={clsx(classNames.alignCenter, classNames.alignCenter)}>
                  <Typography className={classNames.nameCell}>{supplier.name}</Typography>
                </TableCell>

                <TableCell className={classNames.alignCenter}>
                  {supplier.link !== 'access denied' ? (
                    <div className={classNames.linkWrapper}>
                      <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(supplier.link)}>
                        <Typography className={classNames.Link}>{t(TranslationKey['Go to supplier site'])}</Typography>
                      </Link>

                      <img
                        className={classNames.copyImg}
                        src="/assets/icons/copy-img.svg"
                        alt=""
                        onClick={e => {
                          e.stopPropagation()
                          copyValue(supplier.link)
                        }}
                      />
                    </div>
                  ) : (
                    <Typography>{t(TranslationKey['Link not available'])}</Typography>
                  )}
                </TableCell>
                <TableCell className={classNames.alignRight}>
                  <Typography className={classNames.priceCell}>{toFixedWithDollarSign(supplier.price, 2)}</Typography>
                </TableCell>
                <TableCell className={classNames.alignRight}>
                  <Typography className={classNames.deliveryCell}>
                    {toFixedWithDollarSign(supplier.batchDeliveryCostInDollar / supplier.amount, 2)}
                  </Typography>
                </TableCell>
                <TableCell className={classNames.alignCenter}>
                  <Typography className={classNames.amountCell}>{supplier.amount}</Typography>
                </TableCell>
                <TableCell className={classNames.alignCenter}>
                  <Typography className={classNames.amountCell}>{supplier.minlot}</Typography>
                </TableCell>
                <TableCell className={classNames.alignCenter}>
                  <Typography className={classNames.amountCell}>
                    {toFixedWithDollarSign(supplier.batchTotalCostInDollar, 2)}
                  </Typography>
                </TableCell>
                <TableCell className={classNames.alignCenter}>
                  <Typography className={classNames.amountCell}>
                    {withDollarSign(priceCalculation(supplier.price, supplier.delivery, supplier.amount))}
                  </Typography>
                </TableCell>

                <TableCell className={classNames.alignCenter}>
                  <Typography className={classNames.textCell}>{supplier.comment}</Typography>
                </TableCell>

                <TableCell className={classNames.alignCenter}>
                  <UserLinkCell name={supplier.createdBy?.name} userId={supplier.createdBy?._id} />
                </TableCell>
                <TableCell>
                  <PhotoAndFilesCarousel small files={supplier.images} width="400px" />
                </TableCell>
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
