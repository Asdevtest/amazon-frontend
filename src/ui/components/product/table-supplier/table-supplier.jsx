import React, {useState} from 'react'

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {UserLinkCell} from '@components/data-grid-cells/data-grid-cells'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './table-supplier.style'

export const TableSupplier = observer(({product, selectedSupplier, onClickSupplier}) => {
  const classNames = useClassNames()
  const [showPhotosModal, setShowPhotosModal] = useState(false)
  const [curImages, setCurImages] = useState([])

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
            <TableCell className={classNames.alignCenter}>{t(TranslationKey.Photos)}</TableCell>
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
                <TableCell className={(classNames.alignCenter, classNames.tableCellPadding)}>{supplier.name}</TableCell>

                <TableCell className={classNames.alignCenter}>
                  <div className={classNames.linkWrapper}>
                    <a download target="_blank" rel="noreferrer" href={supplier.link} className={classNames.Link}>
                      {t(TranslationKey['Go to supplier site'])}
                    </a>

                    <img
                      className={classNames.copyImg}
                      src="/assets/icons/copy-img.svg"
                      alt=""
                      onClick={() => copyValue(supplier.link)}
                    />
                  </div>
                </TableCell>

                <TableCell className={classNames.alignRight}>{toFixedWithDollarSign(supplier.price, 2)}</TableCell>

                <TableCell className={classNames.alignRight}>
                  {toFixedWithDollarSign(supplier.batchDeliveryCostInDollar / supplier.amount, 2)}
                </TableCell>

                <TableCell className={classNames.alignCenter}>{supplier.minlot}</TableCell>
                <TableCell className={classNames.alignCenter}>{toFixedWithDollarSign(supplier.lotcost, 2)}</TableCell>

                <TableCell className={classNames.alignCenter}>{supplier.comment}</TableCell>

                <TableCell>
                  <Button
                    disableElevation
                    tooltipInfoContent={t(TranslationKey['Photos of current supplier'])}
                    disabled={!supplier.images || supplier.images < 1}
                    color="primary"
                    className={classNames.button}
                    variant="contained"
                    onClick={e => {
                      e.stopPropagation()
                      setCurImages(supplier.images)
                      setShowPhotosModal(!showPhotosModal)
                    }}
                  >
                    {t(TranslationKey.Photos)}
                  </Button>
                </TableCell>

                <TableCell className={classNames.alignCenter}>
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

        <BigImagesModal
          isAmazone
          openModal={showPhotosModal}
          setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          images={curImages}
        />
      </Table>
    </TableContainer>
  )
})
