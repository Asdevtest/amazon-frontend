import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

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

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { UserLinkCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { NewSupplier } from '@components/shared/svg-icons'

import { formatNormDateTime } from '@utils/date-time'
import { checkAndMakeAbsoluteUrl, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './table-supplier.style'

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

export const TableSupplier = observer(({ isClient, product, productBaseData, selectedSupplier, onClickSupplier }) => {
  const { classes: classNames } = useClassNames()
  const [platformSettings, setPlatformSettings] = useState()

  useEffect(() => {
    UserModel.getPlatformSettings().then(data => setPlatformSettings(data))
  }, [])

  const renderHeader = () => (
    <TableHead className={classNames.tableHead}>
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
    <div className={classNames.wrapper}>
      <TableContainer className={classNames.table}>
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
                  className={cx(classNames.tableRow, {
                    [classNames.tableRowAcceptedSupplier]:
                      product.currentSupplierId && product.currentSupplierId === supplier._id,
                    [classNames.tableRowSelectedSupplier]: selectedSupplier && supplier._id === selectedSupplier._id,
                  })}
                  onClick={() => onClickSupplier(supplier, index)}
                >
                  <TableCell align="center" className={classNames.nameCell}>
                    <div className={classNames.statsWrapper}>
                      {isClient ? (
                        new Date(productBaseData.createdAt) < new Date(supplier.createdAt) ? (
                          <NewSupplier fontSize={'large'} classes={{ root: classNames.primary }} />
                        ) : null
                      ) : null}
                      {supplier?.multiplicity && supplier?.boxProperties?.amountInBox ? (
                        <div className={classNames.multiplicityWrapper}>
                          <Typography className={classNames.multiplicityText}>{'Multiplicity:'}</Typography>
                          <Typography className={classNames.amountInBoxText}>
                            {supplier?.boxProperties?.amountInBox}
                          </Typography>
                        </div>
                      ) : null}
                    </div>

                    <Typography className={classNames.mainText}>{supplier.name}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    {supplier.link !== 'access denied' ? (
                      <div className={classNames.linkWrapper}>
                        <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(supplier.link)}>
                          <Typography className={classNames.link}>
                            {t(TranslationKey['Go to supplier site'])}
                          </Typography>
                        </Link>
                        <CopyValue text={supplier.link} className={classNames.linkIcon} />
                      </div>
                    ) : (
                      <Typography className={classNames.mainText}>{t(TranslationKey['Link not available'])}</Typography>
                    )}
                  </TableCell>

                  <TableCell align="center">
                    <Typography className={classNames.mainText}>
                      {toFixedWithDollarSign(supplier.price + supplier.batchDeliveryCostInDollar / supplier.amount, 2)}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography className={classNames.mainText}>{supplier.minlot}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography className={classNames.mainText}>
                      {toFixedWithDollarSign(supplier.batchTotalCostInDollar, 2)}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography className={classNames.mainText}>{supplier.productionTerm}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    {platformSettings && (
                      <div className={classNames.priceVariationsCell}>
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

                  <TableCell align="center" className={classNames.commentCell}>
                    <Tooltip title={supplier.comment} classes={{ tooltip: classNames.tooltip }}>
                      <div className={classNames.commentWrapper}>{supplier.comment}</div>
                    </Tooltip>
                  </TableCell>

                  <TableCell
                    align="center"
                    onClick={e => {
                      e.stopPropagation()
                    }}
                  >
                    <div className={classNames.filesWrapper}>
                      <PhotoAndFilesSlider smallSlider files={supplier.images} />
                    </div>
                  </TableCell>

                  <TableCell align="center">
                    <UserLinkCell name={supplier.createdBy?.name} userId={supplier.createdBy?._id} />
                  </TableCell>

                  <TableCell align="center">
                    <Typography className={classNames.mainText}>
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
})
