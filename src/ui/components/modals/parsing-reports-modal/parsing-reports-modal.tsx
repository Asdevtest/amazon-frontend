import { FC, memo } from 'react'

import { ProductCell } from '@components/data-grid/data-grid-cells'
import { Modal } from '@components/shared/modal'

import { ParsingReports } from '@views/client/parsing-reports'
import { ParsingReportsType } from '@views/client/parsing-reports/parsing-reports.type'

import { IProduct } from '@typings/models/products/product'

import { useStyles } from './parsing-reports-modal.style'

interface ParsingReportsModalProps {
  openModal: boolean
  setOpenModal: (openModal?: boolean) => void
  product: IProduct
  table: ParsingReportsType
}

export const ParsingReportsModal: FC<ParsingReportsModalProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { product, table, openModal, setOpenModal } = props

  return (
    <Modal missClickModalOn openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.root}>
        <ProductCell
          image={product.images?.[0]}
          title={product.amazonTitle}
          asin={product.asin}
          sku={product.skuByClient}
        />

        <ParsingReports productId={product?._id} table={table} className={styles.tableStyles} />
      </div>
    </Modal>
  )
})
