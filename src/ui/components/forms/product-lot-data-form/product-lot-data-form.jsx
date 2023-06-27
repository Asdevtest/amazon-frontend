/* eslint-disable no-unused-vars */
import { Modal, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { toJS } from 'mobx'
import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { BatchesModel } from '@models/batches-model'

import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { shortAsin } from '@utils/text'
// import {Button} from '@components/buttons/button'
import { t } from '@utils/translations'

import { productInTransferColumns } from './poduct-in-transfer-column'
import { productLotDataFormColumns } from './product-lot-data-form-column'
import { useClassNames } from './product-lot-data-form.style'

export const ProductLotDataForm = observer(
  ({ product, batchesData, isTransfer, userInfo, onClickToggleArchiveProductLotData }) => {
    const { classes: classNames } = useClassNames()

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
      if (isTransfer && nameSearchValue) {
        setBatches(
          data?.filter(item => String(item?.humanFriendlyId)?.toLowerCase().includes(nameSearchValue.toLowerCase())),
        )
      } else {
        if (nameSearchValue) {
          setBatches(
            data?.filter(item => String(item?.humanFriendlyId)?.toLowerCase().includes(nameSearchValue.toLowerCase())),
          )
        } else {
          setBatches(data)
        }
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
        console.log('error', error)
      }
    }

    return (
      <div className={classNames.productLotDataBlock}>
        <div className={classNames.title}>
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
        <div className={classNames.aboutProduct}>
          <div className={classNames.productInfo}>
            <img className={classNames.img} src={getAmazonImageUrl(product[0]?.images[0])} />
            <Typography className={classNames.productTitle}>{product[0]?.amazonTitle}</Typography>
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
                      {shortAsin(product[0]?.asin)}
                    </a>
                    <CopyValue text={product[0]?.asin} />
                  </>
                ) : (
                  <Typography className={classNames.asin}>{t(TranslationKey['Not found'])}</Typography>
                )}
              </div>
              <div className={classNames.attribute}>
                <Typography className={classNames.attributeTitle}>{t(TranslationKey.SKU)}</Typography>
                <Typography className={classNames.sku}>
                  {product[0]?.skusByClient[0] ? product[0]?.skusByClient[0] : t(TranslationKey['Not found'])}
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
            getRowId={batches => batches?._id}
            columns={
              isTransfer
                ? productInTransferColumns({ onClickShowBatchBtn })
                : productLotDataFormColumns({ onClickShowBatchBtn })
            }
            rows={toJS(batches)}
            columnHeaderHeight={64}
            rowHeight={100}
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
  },
)
