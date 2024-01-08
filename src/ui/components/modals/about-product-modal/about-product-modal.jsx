import { useEffect, useState } from 'react'

import WatchLaterSharpIcon from '@mui/icons-material/WatchLaterSharp'
import { Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { FourMonthesStockCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { formatDateTime } from '@utils/date-time'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './about-product-modal.style'

import { aboutProductsColumns } from './about-product-columns/about-products-columns'
import { batchDataColumns } from './batch-data-columns/batch-data-columns'

export const AboutProductModal = ({ selectedProduct, shops, getBatches, batches, showLoading }) => {
  const { classes: classNames } = useClassNames()

  const shop = shops?.find(shop => shop._id === selectedProduct?.shopId)

  const [activeTab, setActiveTab] = useState('orderInformation')

  useEffect(() => {
    if (activeTab === 'batchData') {
      getBatches()
    }
  }, [activeTab])

  const handleChange = value => {
    setActiveTab(value)
  }
  const switcherSettings = [
    { label: () => t(TranslationKey['Orders info']), value: 'orderInformation' },
    { label: () => t(TranslationKey['Batch data']), value: 'batchData' },
  ]

  if (showLoading) {
    return <CircularProgressWithLabel />
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.modalHeader}>
        <Typography variant="h5">{t(TranslationKey['Product information'])}</Typography>
        <Typography>{t(TranslationKey.Updated) + ': ' + formatDateTime(selectedProduct.updatedAt)}</Typography>
      </div>
      <Divider />
      <div className={classNames.subHeader}>
        <PhotoAndFilesSlider withoutFiles smallPhotos mediumSlider files={selectedProduct?.images} />
        <Typography className={classNames.amazonTitle}>{selectedProduct.amazonTitle}</Typography>
        <div>
          {shop && <p>Shop: {shop.name}</p>}
          <AsinOrSkuLink withCopyValue withAttributeTitle={'asin'} asin={selectedProduct.asin} />
          <AsinOrSkuLink withCopyValue withAttributeTitle={'sku'} asin={selectedProduct.skuByClient} />
        </div>
      </div>
      <Divider />
      <TableContainer>
        <Table sx={{ marginBottom: 10 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t(TranslationKey.Available)}</TableCell>
              <TableCell>{t(TranslationKey.Reserved)}</TableCell>
              <TableCell>{t(TranslationKey.Inbound)}</TableCell>
              <TableCell>{t(TranslationKey.Order)}</TableCell>
              <TableCell>In Transfer</TableCell>
              <TableCell>{t(TranslationKey['In stock'])}</TableCell>
              <TableCell>{t(TranslationKey['Stock sum'])}</TableCell>
              <TableCell>{t(TranslationKey['Stock cost'])}</TableCell>
              <TableCell>{t(TranslationKey['Recommendation for additional purchases'])}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{selectedProduct?.fbaFbmStockSum || '-'}</TableCell>
              <TableCell align="center">{selectedProduct?.reservedSum || '-'}</TableCell>
              <TableCell align="center">{selectedProduct?.sentToFbaSum || '-'}</TableCell>
              <TableCell align="right">
                <p className={classNames.amountOrder}>{selectedProduct?.amountInOrders}</p>
                <p className={classNames.waitOrder}>
                  <WatchLaterSharpIcon color="primary" />
                  {selectedProduct?.amountInPendingOrders}
                </p>
              </TableCell>
              <TableCell align="center">{selectedProduct?.inTransfer || '-'}</TableCell>
              <TableCell align="center">
                {selectedProduct?.boxAmounts?.map(box => (
                  <p key={box._id} className={classNames.inStock}>
                    <span className={classNames.storekeeperName}>{box.storekeeper.name}</span>
                    <span> {box.amountInBoxes}</span>
                  </p>
                ))}
              </TableCell>
              <TableCell align="center">{selectedProduct?.sumStock}</TableCell>
              <TableCell align="center">{toFixed(selectedProduct?.stockCost, 0)}</TableCell>
              <TableCell align="center">
                <FourMonthesStockCell
                  value={selectedProduct?.purchaseQuantity}
                  fourMonthesStock={selectedProduct?.fourMonthesStock}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <CustomSwitcher
        fullWidth
        switcherSettings={switcherSettings}
        condition={activeTab}
        switchMode="medium"
        changeConditionHandler={handleChange}
      />

      <div className={classNames.tableWrapper}>
        {activeTab === 'orderInformation' && !showLoading ? (
          <CustomDataGrid getRowHeight={() => 'auto'} rows={selectedProduct?.orders} columns={aboutProductsColumns()} />
        ) : (
          <CustomDataGrid
            rows={batches ?? []}
            getRowHeight={() => 'auto'}
            columns={batchDataColumns()}
            loading={!batches?.length}
            getRowId={row => row.humanFriendlyId}
          />
        )}
      </div>
    </div>
  )
}
