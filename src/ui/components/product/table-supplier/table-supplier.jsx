import { observer } from 'mobx-react'

import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'

import { ACCESS_DENIED } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { UserLinkCell } from '@components/data-grid/data-grid-cells'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { NewSupplier, OrderedIcon } from '@components/shared/svg-icons'

import { formatNormDateTime } from '@utils/date-time'
import { checkAndMakeAbsoluteUrl, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './table-supplier.style'

const tableHeaders = [
  () => t(TranslationKey.Name),
  () => t(TranslationKey.Link),
  () => t(TranslationKey['Price with delivery']),
  () => t(TranslationKey['Minimum batch']),
  () => t(TranslationKey['Batch price']),
  () => t(TranslationKey['Production time']),
  () => t(TranslationKey['Price variations']),
  () => t(TranslationKey.Comment),
  () => t(TranslationKey.Files),
  () => t(TranslationKey['Created by']),
  () => t(TranslationKey.Updated),
]

export const TableSupplier = observer(
  ({ isClient, product, productBaseData, selectedSupplier, onClickSupplier, platformSettings }) => {
    const { classes: styles, cx } = useStyles()

    const renderHeader = () => (
      <TableHead className={styles.tableHead}>
        <TableRow>
          {tableHeaders.map(title => (
            <TableCell key={title()} align="center">
              {title()}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )

    return (
      <div className={styles.wrapper}>
        <TableContainer className={styles.table}>
          <Table>
            {SettingsModel.languageTag && renderHeader()}
            <TableBody>
              {!!product?.suppliers?.length &&
                (product?.currentSupplier && product?.suppliers?.find(el => product.currentSupplier._id === el._id)
                  ? [
                      product.suppliers.find(el => product.currentSupplier._id === el._id),
                      ...product.suppliers.filter(el => product.currentSupplier._id !== el._id),
                    ]
                  : product.suppliers
                ).map((supplier, index) => (
                  <TableRow
                    key={`supplier_${supplier.id}_${index}`}
                    className={cx(styles.tableRow, {
                      [styles.tableRowAcceptedSupplier]:
                        product.currentSupplierId && product.currentSupplierId === supplier._id,
                      [styles.tableRowSelectedSupplier]: selectedSupplier && supplier._id === selectedSupplier._id,
                    })}
                    onClick={() => onClickSupplier(supplier, index)}
                  >
                    <TableCell align="center" className={styles.nameCell}>
                      <div className={styles.statsWrapper}>
                        {isClient && new Date(productBaseData.createdAt) < new Date(supplier.createdAt) && (
                          <NewSupplier classes={{ root: styles.primary }} className={styles.newSupplierIcon} />
                        )}

                        {productBaseData?.orderSupplier?._id === supplier?._id && (
                          <OrderedIcon classes={{ root: styles.primary }} className={styles.orderedIcon} />
                        )}

                        {supplier?.multiplicity && supplier?.boxProperties?.amountInBox && (
                          <div className={styles.multiplicityWrapper}>
                            <Typography className={styles.multiplicityText}>{'Multiplicity:'}</Typography>
                            <Typography className={styles.amountInBoxText}>
                              {supplier?.boxProperties?.amountInBox}
                            </Typography>
                          </div>
                        )}
                      </div>

                      <Typography className={styles.mainText}>{supplier.name}</Typography>
                    </TableCell>

                    <TableCell align="center">
                      {supplier.link !== ACCESS_DENIED ? (
                        <div className={styles.linkWrapper}>
                          <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(supplier.link)}>
                            <Typography className={styles.link}>{t(TranslationKey['Go to supplier site'])}</Typography>
                          </Link>
                          <CopyValue text={supplier.link} className={styles.linkIcon} />
                        </div>
                      ) : (
                        <Typography className={styles.mainText}>{t(TranslationKey['Link not available'])}</Typography>
                      )}
                    </TableCell>

                    <TableCell align="center">
                      <Typography className={styles.mainText}>
                        {toFixedWithDollarSign(
                          supplier.price + supplier.batchDeliveryCostInDollar / supplier.amount,
                          2,
                        )}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Typography className={styles.mainText}>{supplier.minlot}</Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Typography className={styles.mainText}>
                        {toFixedWithDollarSign(supplier.batchTotalCostInDollar, 2)}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Typography className={styles.mainText}>{supplier.productionTerm}</Typography>
                    </TableCell>

                    <TableCell align="center">
                      {platformSettings && (
                        <div className={styles.priceVariationsCell}>
                          {supplier?.priceVariations?.map((el, index) => (
                            <div key={index}>
                              {el.quantity} {t(TranslationKey['pcs.'])}. /{' '}
                              {toFixedWithDollarSign(el.price / platformSettings?.yuanToDollarRate, 2)}{' '}
                              {t(TranslationKey.Per).toLowerCase()} {t(TranslationKey['pcs.'])}
                            </div>
                          ))}
                        </div>
                      )}
                    </TableCell>

                    <TableCell align="center" className={styles.commentCell}>
                      <Tooltip title={supplier.comment} classes={{ tooltip: styles.tooltip }}>
                        <div className={styles.commentWrapper}>{supplier.comment}</div>
                      </Tooltip>
                    </TableCell>

                    <TableCell
                      align="center"
                      onClick={e => {
                        e.stopPropagation()
                      }}
                    >
                      <div className={styles.filesWrapper}>
                        <PhotoAndFilesSlider smallSlider showPreviews files={supplier.images} />
                      </div>
                    </TableCell>

                    <TableCell align="center">
                      <UserLinkCell name={supplier.createdBy?.name} userId={supplier.createdBy?._id} />
                    </TableCell>

                    <TableCell align="center">
                      <Typography className={styles.mainText}>
                        {!(supplier && supplier.updatedAt) ? '-' : formatNormDateTime(supplier.updatedAt)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  },
)
