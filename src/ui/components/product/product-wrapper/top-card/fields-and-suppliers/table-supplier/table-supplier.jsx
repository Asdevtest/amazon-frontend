import React, {useState} from 'react'

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign, checkAndMakeAbsoluteUrl} from '@utils/text'

import {useClassNames} from './table-supplier.style'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

export const TableSupplier = observer(({product, selectedSupplier, onClickSupplier}) => {
  const classNames = useClassNames()
  const [showPhotosModal, setShowPhotosModal] = useState(false)
  const [curImages, setCurImages] = useState([])

  return (
    <TableContainer className={classNames.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={(classNames.tableCellPadding, classNames.alignCenter)}>
              {textConsts.tableName}
            </TableCell>
            <TableCell className={classNames.alignCenter}>{textConsts.tableLink}</TableCell>
            <TableCell className={classNames.alignCenter}>{textConsts.tablePrice}</TableCell>
            <TableCell className={classNames.alignRight}>{textConsts.tableSheep}</TableCell>
            <TableCell className={classNames.alignCenter}>{textConsts.tableCount}</TableCell>
            <TableCell className={classNames.alignCenter}>{textConsts.tableMinBatch}</TableCell>
            <TableCell className={classNames.alignCenter}>{textConsts.tableBatchCost}</TableCell>
            {/* <TableCell className={classNames.alignRight}>{textConsts.tableCost}</TableCell> */}
            <TableCell className={classNames.alignCenter}>{textConsts.tableComment}</TableCell>
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
                  <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(supplier.link)}>
                    <Typography className={classNames.link}>{supplier.link}</Typography>
                  </Link>
                </TableCell>
                <TableCell className={classNames.alignRight}>{toFixedWithDollarSign(supplier.price, 2)}</TableCell>
                <TableCell className={classNames.alignRight}>
                  {toFixedWithDollarSign(supplier.batchDeliveryCostInDollar / supplier.amount, 2)}
                </TableCell>
                <TableCell className={classNames.alignCenter}>{supplier.amount}</TableCell>
                <TableCell className={classNames.alignCenter}>{supplier.minlot}</TableCell>
                <TableCell className={classNames.alignCenter}>{toFixedWithDollarSign(supplier.lotcost, 2)}</TableCell>
                <TableCell className={classNames.alignCenter}>{supplier.comment}</TableCell>
                <TableCell>
                  <Button
                    disableElevation
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
                    {textConsts.supplierPhotos}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className={(classNames.alignCenter, classNames.tableCellPadding)} colSpan={8}>
                {textConsts.tableCellNoVendors}
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
