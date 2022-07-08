import React from 'react'

import {Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {UserLinkCell} from '@components/data-grid-cells/data-grid-cells'

import {checkAndMakeAbsoluteUrl, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './table-supplier.style'

export const TableSupplier = observer(({product, selectedSupplier, onClickSupplier}) => {
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
              {t(TranslationKey.Name)}
            </TableCell>
            <TableCell className={classNames.alignCenter}>{t(TranslationKey.Link)}</TableCell>
            <TableCell className={classNames.alignCenter}>{t(TranslationKey.Price)}</TableCell>
            <TableCell className={classNames.alignRight}>{t(TranslationKey.Delivery)}</TableCell>
            <TableCell className={classNames.alignCenter}>{t(TranslationKey['Minimum batch'])}</TableCell>
            <TableCell className={classNames.alignCenter}>{t(TranslationKey['Batch price'])}</TableCell>

            <TableCell className={classNames.alignCenter}>{t(TranslationKey.Comment)}</TableCell>
            <TableCell className={classNames.alignCenter}>{t(TranslationKey.Files)}</TableCell>
            <TableCell className={classNames.alignRight}>{t(TranslationKey['Created by'])}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.suppliers.length ? (
            product.suppliers.map((supplier, index) => (
              <TableRow
                key={`supplier_${supplier.id}_${index}`}
                className={clsx({
                  [classNames.tableRowSelectedSupplier]: selectedSupplier && supplier._id === selectedSupplier._id,
                  [classNames.tableRowAcceptedSupplier]:
                    product.currentSupplierId && product.currentSupplierId === supplier._id,
                })}
                onClick={() => onClickSupplier(supplier, index)}
              >
                <TableCell className={[classNames.alignCenter, classNames.nameCell]}>{supplier.name}</TableCell>

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

                <TableCell className={classNames.alignRight}>{toFixedWithDollarSign(supplier.price, 2)}</TableCell>

                <TableCell className={classNames.alignRight}>
                  {toFixedWithDollarSign(supplier.batchDeliveryCostInDollar / supplier.amount, 2)}
                </TableCell>

                <TableCell className={classNames.alignCenter}>{supplier.minlot}</TableCell>
                <TableCell className={classNames.alignCenter}>{toFixedWithDollarSign(supplier.lotcost, 2)}</TableCell>

                <TableCell className={[classNames.alignCenter, classNames.commentCell]}>{supplier.comment}</TableCell>

                <TableCell className={classNames.filesCell}>
                  <div className={classNames.filesWrapper}>
                    <PhotoAndFilesCarousel files={supplier.images} width="350px" />
                  </div>
                </TableCell>

                <TableCell className={classNames.createdByCell}>
                  <UserLinkCell name={supplier.createdBy?.name} userId={supplier.createdBy?._id} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className={(classNames.alignCenter, classNames.tableCellPadding)} colSpan={8}>
                {t(TranslationKey['No suppliers'])}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
})
