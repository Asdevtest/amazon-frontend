/* eslint-disable no-unused-vars */
import {Typography} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'

import React, {useEffect, useState} from 'react'

import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {CopyValue} from '@components/copy-value'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {shortAsin} from '@utils/text'
// import {Button} from '@components/buttons/button'
import {t} from '@utils/translations'

import {productLotDataFormColumns} from './product-lot-data-form-column'
import {useClassNames} from './product-lot-data-form.style'

export const ProductLotDataForm = observer(({product, batchesData}) => {
  console.log(batchesData)
  const {classes: classNames} = useClassNames()

  const [batches, setBatches] = useState(batchesData)
  const [nameSearchValue, setNameSearchValue] = useState('')

  console.log('nameSearchValue', nameSearchValue)

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
        <DataGrid
          hideFooter
          localeText={getLocalizationByLanguageTag()}
          getRowId={batches => batches._id}
          columns={productLotDataFormColumns()}
          rows={toJS(batches)}
          headerHeight={64}
          rowHeight={100}
        />
      </div>
    </div>
  )
})
