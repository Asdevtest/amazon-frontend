import { memo, useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { BatchesModel } from '@models/batches-model'

import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useStyles } from './product-lot-data-form.style'

import { productInTransferColumns } from './poduct-in-transfer-column'
import { productLotDataFormColumns } from './product-lot-data-form-column'

export const ProductLotDataForm = memo(props => {
  const { product, batchesData, isTransfer, userInfo, onClickToggleArchiveProductLotData } = props
  const { classes: styles } = useStyles()

  const data = batchesData.map(item => {
    if (isTransfer) {
      return {
        ...item,
        cls: item?.logicsTariff.cls,
        etd: item?.logicsTariff.etd,
        eta: item?.logicsTariff.eta,
        fbaShipment: item?.fbaShipment,
      }
    } else {
      return {
        ...item,
        cls: item?.boxes[0]?.logicsTariff.cls,
        etd: item?.boxes[0]?.logicsTariff.etd,
        eta: item?.boxes[0]?.logicsTariff.eta,
        fbaShipment: Array.from(new Set(item.boxes.reduce((ac, c) => [...ac, c.fbaShipment && c.fbaShipment], []))),
      }
    }
  })

  const [batches, setBatches] = useState(data)

  const [batchInfo, setBatchInfo] = useState([])
  const [nameSearchValue, setNameSearchValue] = useState('')
  const [isArchive, setIsArchive] = useState(false)

  const [showBatchInfoModal, setShowBatchInfoModal] = useState(false)

  useEffect(() => {
    const searchFields = ['humanFriendlyId', 'fbaShipment']

    if (nameSearchValue) {
      setBatches(
        data?.filter(el =>
          searchFields.some(key => String(el[key]).toLowerCase().includes(nameSearchValue.toLowerCase())),
        ),
      )
    } else if (!isTransfer) {
      setBatches(data)
    }
  }, [nameSearchValue, data])

  const setOpenBatchInfoModal = () => {
    setShowBatchInfoModal(!showBatchInfoModal)
  }

  const onClickShowBatchBtn = async rowId => {
    try {
      const result = await BatchesModel.getBatchesByGuid(rowId)
      setBatchInfo(result)
      setOpenBatchInfoModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.productLotDataBlock}>
      <div className={styles.title}>
        {t(TranslationKey[`${isTransfer ? 'Data of product boxes to be shipped' : 'Product batches data'}`])}

        {!isTransfer && (
          <Button
            variant="contained"
            onClick={() => {
              onClickToggleArchiveProductLotData(!isArchive)
              setIsArchive(!isArchive)
            }}
          >
            {isArchive ? t(TranslationKey['Actual batches']) : t(TranslationKey['Batches archive'])}
          </Button>
        )}
      </div>

      <div className={styles.aboutProduct}>
        <div className={styles.productInfo}>
          <img className={styles.img} src={getAmazonImageUrl(product[0]?.images[0])} />
          <Typography className={styles.productTitle}>{product[0]?.amazonTitle}</Typography>

          <div>
            <AsinOrSkuLink withCopyValue withAttributeTitle="asin" asin={product[0].asin} />
            <AsinOrSkuLink withCopyValue withAttributeTitle="sku" asin={product[0]?.skuByClient} />
          </div>
        </div>

        <SearchInput
          value={nameSearchValue}
          inputClasses={styles.searchInput}
          placeholder={t(TranslationKey['Lot number and FBA search'])}
          onChange={e => setNameSearchValue(e.target.value)}
        />
      </div>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          localeText={getLocalizationByLanguageTag()}
          getRowId={batches => batches?._id}
          columns={
            isTransfer
              ? productInTransferColumns({ onClickShowBatchBtn })
              : productLotDataFormColumns({ onClickShowBatchBtn })
          }
          rows={batches}
          rowHeight={80}
        />
      </div>

      <BatchInfoModal
        userInfo={userInfo}
        openModal={showBatchInfoModal}
        setOpenModal={setOpenBatchInfoModal}
        batch={batchInfo}
      />
    </div>
  )
})
