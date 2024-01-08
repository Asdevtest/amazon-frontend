import { useEffect, useState } from 'react'

import WatchLaterSharpIcon from '@mui/icons-material/WatchLaterSharp'
import { Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

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

import { useStyles } from './about-product-modal.style'

import { aboutProductsColumns } from './about-product-columns/about-products-columns'
import { batchDataColumns } from './batch-data-columns/batch-data-columns'

const SwitcherStatus = {
  ORDER_INFORMATION: 'ORDER_INFORMATION',
  BATCH_DATA: 'BATCH_DATA',
}

export const AboutProductModal = props => {
  const { selectedProduct, shops, getBatches, batches, showLoading, setShowBatchModal, getCurrentBatch } = props

  const { classes: styles } = useStyles()

  const selectedProductShop = shops?.find(shop => shop._id === selectedProduct?.shopId)

  const [activeTab, setActiveTab] = useState(SwitcherStatus.ORDER_INFORMATION)

  useEffect(() => {
    if (activeTab === SwitcherStatus.BATCH_DATA) {
      getBatches()
    }
  }, [activeTab])

  const handleChange = value => {
    setActiveTab(value)
  }
  const switcherSettings = [
    { label: () => t(TranslationKey['Orders info']), value: SwitcherStatus.ORDER_INFORMATION },
    { label: () => t(TranslationKey['Batch data']), value: SwitcherStatus.BATCH_DATA },
  ]

  const batchRowHandler = guid => {
    getCurrentBatch(guid)
    setShowBatchModal()
  }

  const columns = activeTab === SwitcherStatus.BATCH_DATA ? batchDataColumns(batchRowHandler) : aboutProductsColumns
  const rows = activeTab === SwitcherStatus.BATCH_DATA ? batches : selectedProduct?.orders

  const updatedText = `${t(TranslationKey.Updated)}: ${formatDateTime(selectedProduct?.updatedAt)}`

  if (showLoading) {
    return <CircularProgressWithLabel />
  }

  return (
    <div className={styles.root}>
      <div className={styles.modalHeader}>
        <p className={styles.title}>{t(TranslationKey['Product information'])}</p>
        <p className={styles.updated}>{updatedText}</p>
      </div>
      <Divider />
      <div className={styles.subHeader}>
        <PhotoAndFilesSlider withoutFiles preMediumSlider files={selectedProduct?.images} />
        <p className={styles.amazonTitle}>{selectedProduct.amazonTitle}</p>
        <div>
          {selectedProductShop && <p className={styles.shopName}>Shop: {selectedProductShop.name}</p>}
          <AsinOrSkuLink withCopyValue withAttributeTitle={'asin'} asin={selectedProduct.asin} />
          <AsinOrSkuLink withCopyValue withAttributeTitle={'sku'} asin={selectedProduct.skuByClient} />
        </div>
      </div>
      <Divider />
      <TableContainer>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center" className={styles.tableCell}>
                {t(TranslationKey.Available)}
              </TableCell>
              <TableCell align="center" className={styles.tableCell}>
                {t(TranslationKey.Reserved)}
              </TableCell>
              <TableCell align="center" className={styles.tableCell}>
                {t(TranslationKey.Inbound)}
              </TableCell>
              <TableCell align="center" className={styles.tableCell}>
                {t(TranslationKey.Order)}
              </TableCell>
              <TableCell align="center" className={styles.tableCell}>
                In Transfer
              </TableCell>
              <TableCell align="center" className={styles.tableCell}>
                {t(TranslationKey['In stock'])}
              </TableCell>
              <TableCell align="center" className={styles.tableCell}>
                {t(TranslationKey['Stock sum'])}
              </TableCell>
              <TableCell align="center" className={styles.tableCell}>
                {t(TranslationKey['Stock cost'])}
              </TableCell>
              <TableCell align="center" className={styles.tableCell}>
                {t(TranslationKey['Recommendation for additional purchases'])}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center" className={styles.tableCell}>
                {selectedProduct?.fbaFbmStockSum || '-'}
              </TableCell>
              <TableCell align="center" className={styles.tableCell}>
                {selectedProduct?.reservedSum || '-'}
              </TableCell>
              <TableCell align="center" className={styles.tableCell}>
                {selectedProduct?.sentToFbaSum || '-'}
              </TableCell>
              <TableCell align="right" className={styles.tableCell}>
                <p className={styles.amountOrder}>{selectedProduct?.amountInOrders}</p>
                <p className={styles.waitOrder}>
                  <WatchLaterSharpIcon color="primary" />
                  {selectedProduct?.amountInPendingOrders}
                </p>
              </TableCell>
              <TableCell align="center" className={styles.tableCell}>
                {selectedProduct?.inTransfer || '-'}
              </TableCell>
              <TableCell align="center" className={styles.tableCell}>
                {selectedProduct?.boxAmounts?.map(box => (
                  <p key={box._id} className={styles.inStock}>
                    <span className={styles.storekeeperName}>{box.storekeeper.name}</span>
                    <span> {box.amountInBoxes}</span>
                  </p>
                ))}
              </TableCell>
              <TableCell align="center" className={styles.tableCell}>
                {selectedProduct?.sumStock}
              </TableCell>
              <TableCell align="center" className={styles.tableCell}>
                {toFixed(selectedProduct?.stockCost, 0)}
              </TableCell>
              <TableCell align="center" className={styles.tableCell}>
                <FourMonthesStockCell
                  withoutPadding
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

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          useResizeContainer
          getRowHeight={() => 'auto'}
          slots={{
            pagination: () => null,
          }}
          rows={rows ?? []}
          getRowId={row => row._id}
          columns={columns}
        />
      </div>
    </div>
  )
}
