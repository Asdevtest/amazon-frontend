import { observer } from 'mobx-react'

import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserLinkCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { NewSupplier } from '@components/shared/svg-icons'

import { formatNormDateTime } from '@utils/date-time'
import { checkAndMakeAbsoluteUrl, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './edit-order-suppliers-table.style'

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
    const { classes: styles, cx } = useStyles()

    return (
      <TableContainer className={styles.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={cx(styles.tableCellPadding, styles.alignCenter)}>
                {t(TranslationKey.Name)}
              </TableCell>
              <TableCell className={styles.alignCenter}>{t(TranslationKey.Link)}</TableCell>

              <TableCell className={styles.alignCenter}>{t(TranslationKey['Price with delivery'])}</TableCell>

              <TableCell className={styles.alignCenter}>{t(TranslationKey['Minimum batch'])}</TableCell>
              <TableCell className={styles.alignCenter}>{t(TranslationKey['Batch price'])}</TableCell>

              <TableCell className={styles.alignCenter}>{t(TranslationKey['Production time'])}</TableCell>
              <TableCell className={styles.alignCenter}>{t(TranslationKey['Price variations'])}</TableCell>

              <TableCell className={styles.alignCenter}>{t(TranslationKey.Comment)}</TableCell>
              <TableCell className={styles.alignCenter}>{t(TranslationKey.Files)}</TableCell>
              <TableCell className={styles.alignCenter}>{t(TranslationKey['Created by'])}</TableCell>
              <TableCell className={styles.alignCenter}>{t(TranslationKey.Updated)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers && suppliers.length ? (
              suppliers.map((supplier, index) => (
                <TableRow
                  key={`supplier_${supplier.id}_${index}`}
                  className={cx(
                    {
                      [styles.tableRowAcceptedSupplier]: selectedSupplier?._id === supplier._id,
                    },
                    {
                      [styles.clickedRow]:
                        isPendingOrder ||
                        orderFields.status === OrderStatusByKey[OrderStatus.AT_PROCESS] ||
                        orderFields.status === OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE],
                    },
                    {
                      [styles.curSelectedSupplier]:
                        (isPendingOrder ||
                          orderFields.status === OrderStatusByKey[OrderStatus.AT_PROCESS] ||
                          orderFields.status === OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]) &&
                        supplier?._id === curSelectedSupplier?._id,
                    },
                  )}
                  onClick={() => setSelectedSupplier(supplier)}
                >
                  <TableCell className={cx(styles.alignCenter, styles.alignCenter)}>
                    <div className={styles.StatsWrapper}>
                      {new Date(productBaseData?.createdAt) < new Date(supplier?.createdAt) ? (
                        <div className={styles.imgWrapper}>
                          <NewSupplier fontSize={'large'} classes={{ root: styles.primary }} />
                        </div>
                      ) : null}
                      {supplier.multiplicity && supplier.boxProperties?.amountInBox ? (
                        <div className={styles.multiplicityWrapper}>
                          <Typography className={styles.multiplicityText}>{'Multiplicity:'}</Typography>
                          <Typography className={styles.amountInBoxText}>
                            {supplier.boxProperties?.amountInBox}
                          </Typography>
                        </div>
                      ) : null}
                    </div>
                    <Typography className={styles.nameCell}>{supplier.name}</Typography>
                  </TableCell>

                  <TableCell className={styles.alignCenter}>
                    {supplier.link !== 'access denied' ? (
                      <div className={styles.linkWrapper}>
                        <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(supplier.link)}>
                          <Typography className={styles.Link}>{t(TranslationKey['Go to supplier site'])}</Typography>
                        </Link>
                        <CopyValue text={supplier.link} />
                      </div>
                    ) : (
                      <Typography>{t(TranslationKey['Link not available'])}</Typography>
                    )}
                  </TableCell>

                  <TableCell className={styles.alignRight}>
                    <Typography className={styles.priceCell}>
                      {toFixedWithDollarSign(supplier.price + supplier.batchDeliveryCostInDollar / supplier.amount, 2)}
                    </Typography>
                  </TableCell>
                  <TableCell className={styles.alignCenter}>
                    <Typography className={styles.amountCell}>{supplier.minlot}</Typography>
                  </TableCell>
                  <TableCell className={styles.alignCenter}>
                    <Typography className={styles.amountCell}>
                      {toFixedWithDollarSign(supplier.batchTotalCostInDollar, 2)}
                    </Typography>
                  </TableCell>
                  <TableCell className={styles.alignCenter}>{supplier?.productionTerm}</TableCell>

                  <TableCell className={styles.alignCenter}>
                    <div className={styles.priceVariationsCell}>
                      {supplier?.priceVariations?.map((el, index) => (
                        <div key={index}>
                          {el.quantity} {t(TranslationKey['pcs.'])}. /{' '}
                          {toFixedWithDollarSign(el?.price / platformSettings?.yuanToDollarRate, 2)}{' '}
                          {t(TranslationKey.Per).toLowerCase()} {t(TranslationKey['pcs.'])}
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell className={styles.alignCenter}>
                    <Typography className={styles.textCell}>{supplier.comment}</Typography>
                  </TableCell>
                  <TableCell>
                    <PhotoAndFilesSlider smallSlider showPreviews files={supplier.images} />
                  </TableCell>
                  <TableCell className={styles.alignCenter}>
                    <UserLinkCell name={supplier.createdBy?.name} userId={supplier.createdBy?._id} />
                  </TableCell>
                  <TableCell className={styles.createdByCell}>
                    <Typography className={styles.normDateCellTypo}>
                      {supplier.updatedAt ? formatNormDateTime(supplier.updatedAt) : '-'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className={cx(styles.alignCenter, styles.tableCellPadding)} colSpan={8}>
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
