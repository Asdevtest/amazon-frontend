/* eslint-disable no-unused-vars */
import {Modal, Typography} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {BatchesModel} from '@models/batches-model'

import {CopyValue} from '@components/copy-value'
import {MemoDataGrid} from '@components/memo-data-grid'
import {BatchInfoModal} from '@components/modals/batch-info-modal'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {shortAsin} from '@utils/text'
// import {Button} from '@components/buttons/button'
import {t} from '@utils/translations'

import {productLotDataFormColumns} from './product-lot-data-form-column'
import {useClassNames} from './product-lot-data-form.style'

export const ProductLotDataForm = observer(({product, batchesData}) => {
  const {classes: classNames} = useClassNames()

  const [batches, setBatches] = useState(batchesData)
  const [batchInfo, setBatchInfo] = useState([])
  const [nameSearchValue, setNameSearchValue] = useState('')

  const [showBatchInfoModal, setShowBatchInfoModal] = useState(false)

  useEffect(() => {
    if (nameSearchValue) {
      setBatches(
        batchesData.filter(item =>
          item.humanFriendlyId.toString().toLowerCase().includes(nameSearchValue.toLowerCase()),
        ),
      )
    }
    if (!nameSearchValue) {
      setBatches(batchesData)
    }
  }, [nameSearchValue])

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
    <div className={classNames.productLotDataBlock}>
      <div className={classNames.title}>{t(TranslationKey['Product lot data'])}</div>
      <div className={classNames.aboutProduct}>
        <div className={classNames.productInfo}>
          <img className={classNames.img} src={getAmazonImageUrl(product[0].images[0])} />
          <Typography className={classNames.productTitle}>{product[0].amazonTitle}</Typography>
          <div className={classNames.attributeWrapper}>
            <div className={classNames.attribute}>
              <Typography className={classNames.attributeTitle}>{t(TranslationKey.ASIN)}</Typography>
              {product[0].asin ? (
                <>
                  <a
                    className={classNames.asin}
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.amazon.com/dp/${product[0].asin}`}
                  >
                    {shortAsin(product[0].asin)}
                  </a>
                  <CopyValue text={product[0].asin} />
                </>
              ) : (
                <Typography className={classNames.asin}>{t(TranslationKey['Not found'])}</Typography>
              )}
            </div>
            <div className={classNames.attribute}>
              <Typography className={classNames.attributeTitle}>{t(TranslationKey.SKU)}</Typography>
              <Typography className={classNames.sku}>
                {product[0].skusByClient[0] ? product[0].skusByClient[0] : t(TranslationKey['Not found'])}
              </Typography>
            </div>
          </div>
        </div>
        <div className="searchPanel">
          <SearchInput
            value={nameSearchValue}
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey['Lot number search'])}
            onChange={e => setNameSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className={classNames.tableWrapper}>
        <MemoDataGrid
          hideFooter
          localeText={getLocalizationByLanguageTag()}
          getRowId={batches => batches._id}
          columns={productLotDataFormColumns({onClickShowBatchBtn})}
          rows={toJS(batches)}
          headerHeight={64}
          rowHeight={100}
        />
      </div>

      <BatchInfoModal openModal={showBatchInfoModal} setOpenModal={setOpenBatchInfoModal} batch={batchInfo} />
    </div>
  )
})
