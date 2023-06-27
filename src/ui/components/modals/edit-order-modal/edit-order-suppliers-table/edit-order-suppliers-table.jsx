import { cx } from '@emotion/css'
import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import React from 'react'

import { observer } from 'mobx-react'

import { OrderStatus, OrderStatusByKey } from '@constants/statuses/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserLinkCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { NewSupplier } from '@components/shared/svg-icons'

import { formatNormDateTime } from '@utils/date-time'
import { checkAndMakeAbsoluteUrl, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './edit-order-suppliers-table.style'

export const EditOrderSuppliersTable = observer(
  ({
    suppliers,
    selectedSupplier,
    setSelectedSupplier,
    curSelectedSupplier,
    isPendingOrder,
    productBaseData,
    orderFields,
    platformSettings,
  }) => {
    const { classes: classNames } = useClassNames()

    return (
      <TableContainer className={classNames.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={cx(classNames.tableCellPadding, classNames.alignCenter)}>
                {t(TranslationKey.Name)}
              </TableCell>
              <TableCell className={classNames.alignCenter}>{t(TranslationKey.Link)}</TableCell>

              <TableCell className={classNames.alignCenter}>{t(TranslationKey['Price with delivery'])}</TableCell>

              <TableCell className={classNames.alignCenter}>{t(TranslationKey['Minimum batch'])}</TableCell>
              <TableCell className={classNames.alignCenter}>{t(TranslationKey['Batch price'])}</TableCell>

              <TableCell className={classNames.alignCenter}>{t(TranslationKey['Production time'])}</TableCell>
              <TableCell className={classNames.alignCenter}>{t(TranslationKey['Price variations'])}</TableCell>

              <TableCell className={classNames.alignCenter}>{t(TranslationKey.Comment)}</TableCell>
              <TableCell className={classNames.alignCenter}>{t(TranslationKey.Files)}</TableCell>
              <TableCell className={classNames.alignCenter}>{t(TranslationKey['Created by'])}</TableCell>
              <TableCell className={classNames.alignCenter}>{t(TranslationKey.Updated)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers && suppliers.length ? (
              suppliers.map((supplier, index) => (
                <TableRow
                  key={`supplier_${supplier.id}_${index}`}
                  className={cx(
                    {
                      [classNames.tableRowAcceptedSupplier]: selectedSupplier?._id === supplier._id,
                    },
                    {
                      [classNames.clickedRow]:
                        isPendingOrder ||
                        orderFields.status === OrderStatusByKey[OrderStatus.AT_PROCESS] ||
                        orderFields.status === OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE],
                    },
                    {
                      [classNames.curSelectedSupplier]:
                        (isPendingOrder ||
                          orderFields.status === OrderStatusByKey[OrderStatus.AT_PROCESS] ||
                          orderFields.status === OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]) &&
                        supplier?._id === curSelectedSupplier?._id,
                    },
                  )}
                  onClick={() => setSelectedSupplier(supplier)}
                >
                  <TableCell className={cx(classNames.alignCenter, classNames.alignCenter)}>
                    <div className={classNames.StatsWrapper}>
                      {new Date(productBaseData?.createdAt) < new Date(supplier?.createdAt) ? (
                        <div className={classNames.imgWrapper}>
                          <NewSupplier fontSize={'large'} classes={{ root: classNames.primary }} />
                        </div>
                      ) : null}
                      {supplier.multiplicity && supplier.boxProperties?.amountInBox ? (
                        <div className={classNames.multiplicityWrapper}>
                          <Typography className={classNames.multiplicityText}>{'Multiplicity:'}</Typography>
                          <Typography className={classNames.amountInBoxText}>
                            {supplier.boxProperties?.amountInBox}
                          </Typography>
                        </div>
                      ) : null}
                    </div>
                    <Typography className={classNames.nameCell}>{supplier.name}</Typography>
                  </TableCell>

                  <TableCell className={classNames.alignCenter}>
                    {supplier.link !== 'access denied' ? (
                      <div className={classNames.linkWrapper}>
                        <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(supplier.link)}>
                          <Typography className={classNames.Link}>
                            {t(TranslationKey['Go to supplier site'])}
                          </Typography>
                        </Link>
                        <CopyValue text={supplier.link} />
                      </div>
                    ) : (
                      <Typography>{t(TranslationKey['Link not available'])}</Typography>
                    )}
                  </TableCell>

                  <TableCell className={classNames.alignRight}>
                    <Typography className={classNames.priceCell}>
                      {toFixedWithDollarSign(supplier.price + supplier.batchDeliveryCostInDollar / supplier.amount, 2)}
                    </Typography>
                  </TableCell>
                  <TableCell className={classNames.alignCenter}>
                    <Typography className={classNames.amountCell}>{supplier.minlot}</Typography>
                  </TableCell>
                  <TableCell className={classNames.alignCenter}>
                    <Typography className={classNames.amountCell}>
                      {toFixedWithDollarSign(supplier.batchTotalCostInDollar, 2)}
                    </Typography>
                  </TableCell>
                  <TableCell className={classNames.alignCenter}>{supplier?.productionTerm}</TableCell>

                  <TableCell className={classNames.alignCenter}>
                    <div className={classNames.priceVariationsCell}>
                      {supplier?.priceVariations?.map((el, index) => (
                        <div key={index}>
                          {el.quantity} {t(TranslationKey['pcs.'])}. /{' '}
                          {toFixedWithDollarSign(el.price / platformSettings.yuanToDollarRate, 2)}{' '}
                          {t(TranslationKey.Per).toLowerCase()} {t(TranslationKey['pcs.'])}
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell className={classNames.alignCenter}>
                    <Typography className={classNames.textCell}>{supplier.comment}</Typography>
                  </TableCell>
                  <TableCell>
                    <PhotoAndFilesCarousel small files={supplier.images} width="400px" />
                  </TableCell>
                  <TableCell className={classNames.alignCenter}>
                    <UserLinkCell name={supplier.createdBy?.name} userId={supplier.createdBy?._id} />
                  </TableCell>
                  <TableCell className={classNames.createdByCell}>
                    <Typography className={classNames.normDateCellTypo}>
                      {supplier.updatedAt ? formatNormDateTime(supplier.updatedAt) : '-'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className={cx(classNames.alignCenter, classNames.tableCellPadding)} colSpan={8}>
                  {t(TranslationKey['No suppliers'])}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  },
)
