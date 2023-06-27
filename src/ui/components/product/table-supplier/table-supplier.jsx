/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { UserLinkCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { NewSupplier } from '@components/shared/svg-icons'

import { formatNormDateTime } from '@utils/date-time'
import { checkAndMakeAbsoluteUrl, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './table-supplier.style'
import { UserModel } from '@models/user-model'

export const TableSupplier = observer(({ isClient, product, productBaseData, selectedSupplier, onClickSupplier }) => {
  const { classes: classNames } = useClassNames()
  const [platformSettings, setPlatformSettings] = useState()

  useEffect(() => {
    UserModel.getPlatformSettings().then(data => setPlatformSettings(data))
  }, [])

  const renderHeader = () => (
    <TableHead className={classNames.tableHead}>
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
  )

  return (
    <TableContainer className={classNames.table} sx={{ maxHeight: 540 }}>
      <Table className={classNames.tableBody}>
        {SettingsModel.languageTag && renderHeader()}
        <TableBody>
          {product.suppliers.length ? (
            (product.currentSupplier && product.suppliers.find(el => product.currentSupplier._id === el._id)
              ? [
                  product.suppliers.find(el => product.currentSupplier._id === el._id),
                  ...product.suppliers.filter(el => product.currentSupplier._id !== el._id),
                ]
              : product.suppliers
            ).map((supplier, index) => (
              <TableRow
                key={`supplier_${supplier.id}_${index}`}
                className={cx(classNames.tableRowPosition, {
                  [classNames.tableRowAcceptedSupplier]:
                    product.currentSupplierId && product.currentSupplierId === supplier._id,
                  [classNames.tableRowSelectedSupplier]: selectedSupplier && supplier._id === selectedSupplier._id,
                })}
                onClick={() => onClickSupplier(supplier, index)}
              >
                <TableCell className={cx(classNames.alignCenter, classNames.nameCell)}>
                  <div className={classNames.StatsWrapper}>
                    {isClient ? (
                      new Date(productBaseData.createdAt) < new Date(supplier.createdAt) ? (
                        <div className={classNames.imgWrapper}>
                          <NewSupplier fontSize={'large'} classes={{ root: classNames.primary }} />
                        </div>
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

                  {supplier.name}
                </TableCell>

                <TableCell className={classNames.alignCenter}>
                  {supplier.link !== 'access denied' ? (
                    <div className={classNames.linkWrapper}>
                      <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(supplier.link)}>
                        <Typography className={classNames.Link}>{t(TranslationKey['Go to supplier site'])}</Typography>
                      </Link>
                      <CopyValue text={supplier.link} />
                    </div>
                  ) : (
                    <Typography>{t(TranslationKey['Link not available'])}</Typography>
                  )}
                </TableCell>

                <TableCell className={classNames.alignCenter}>
                  {toFixedWithDollarSign(supplier.price + supplier.batchDeliveryCostInDollar / supplier.amount, 2)}
                </TableCell>

                <TableCell className={classNames.alignCenter}>{supplier.minlot}</TableCell>

                <TableCell className={classNames.alignCenter}>
                  {toFixedWithDollarSign(supplier.batchTotalCostInDollar, 2)}
                </TableCell>

                <TableCell className={classNames.alignCenter}>{supplier.productionTerm}</TableCell>
                <TableCell className={cx(classNames.alignCenter)}>
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

                <TableCell className={cx(classNames.alignCenter, classNames.commentCell)}>{supplier.comment}</TableCell>

                <TableCell
                  className={classNames.alignCenterFiles}
                  onClick={e => {
                    e.stopPropagation()
                  }}
                >
                  <div className={classNames.filesWrapper}>
                    <PhotoAndFilesCarousel small files={supplier.images} width="350px" />
                  </div>
                </TableCell>

                <TableCell className={classNames.createdByCell}>
                  <UserLinkCell name={supplier.createdBy?.name} userId={supplier.createdBy?._id} />
                </TableCell>

                <TableCell className={classNames.createdByCell}>
                  <Typography className={classNames.normDateCellTypo}>
                    {!(supplier && supplier.updatedAt) ? '-' : formatNormDateTime(supplier.updatedAt)}
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
})
