import { cx } from '@emotion/css'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { useClassNames } from './access-to-product-form.style'

import { sourceColumns } from '../access-to-products-columns'

const accessProductSettings = {
  ALL_PRODUCTS: 'ALL_PRODUCTS',
  NEED_SELECT: 'NEED_SELECT',
}

export const AccessToProductForm = React.memo(
  observer(({ shop, shops, selectedShop, onClickToShowDetails, setShopDataToRender, sourceData }) => {
    const { classes: classNames } = useClassNames()

    const [curProdutsData, setCurProdutsData] = useState(sourceData || null)
    const [searchInputValue, setSearchInputValue] = useState('')
    const [selectedAccess, setSelectedAccess] = useState(accessProductSettings.NEED_SELECT)
    const [chosenGoods, setChosenGoods] = useState(shop?.tmpProductsIds || [])
    const [selectionModel, setSelectionModel] = useState(shop?.tmpProductsIds || [])
    const [chooseAllCheck, setChooseAllCheck] = useState(shop.tmpProductsIds.length === sourceData.length)

    const allProductsIds = sourceData?.map(product => product._id)

    const handleChangeRadio = value => {
      setSelectedAccess(value)

      if (value === accessProductSettings.NEED_SELECT) {
        setSelectionModel(chosenGoods)
      }

      if (value === accessProductSettings.ALL_PRODUCTS) {
        setSelectionModel(allProductsIds)
      }
    }

    useEffect(() => {
      if (searchInputValue) {
        const filter = sourceData?.filter(
          i =>
            i.originalData.skusByClient?.some(sku => sku.toLowerCase().includes(searchInputValue.toLowerCase())) ||
            i.asin.toLowerCase().includes(searchInputValue.toLowerCase()) ||
            i.originalData.amazonTitle.toLowerCase().includes(searchInputValue.toLowerCase()),
        )
        setCurProdutsData(filter)
      } else {
        setCurProdutsData(sourceData)
      }
    }, [searchInputValue])

    useEffect(() => {
      let newDataToRender = [...shops]

      if (selectedAccess === accessProductSettings.NEED_SELECT) {
        newDataToRender = newDataToRender.map(item =>
          item._id === shop._id ? { ...item, tmpProductsIds: chosenGoods } : item,
        )
      } else if (selectedAccess === accessProductSettings.ALL_PRODUCTS) {
        newDataToRender = newDataToRender.map(item =>
          item._id === shop._id ? { ...item, tmpProductsIds: allProductsIds } : item,
        )
        setChooseAllCheck(true)
      } else {
        setChooseAllCheck(false)
      }

      setShopDataToRender(newDataToRender)
    }, [selectedAccess, chosenGoods])

    useEffect(() => {
      if (shop.tmpProductsIds.length && shop.tmpProductsIds.length === sourceData.length) {
        setChooseAllCheck(true)
      } else {
        setChooseAllCheck(false)
      }
    }, [shop?.tmpProductsIds.length])

    const onClickChooseAllCheck = e => {
      e.stopPropagation()

      if (chooseAllCheck) {
        setSelectedAccess(accessProductSettings.NEED_SELECT)
        setSelectionModel([])
        setChooseAllCheck(false)
      } else {
        setSelectedAccess(accessProductSettings.ALL_PRODUCTS)
        setSelectionModel(allProductsIds)
        setChooseAllCheck(true)
      }
    }

    const handleSelectionModel = model => {
      if (selectedAccess === accessProductSettings.NEED_SELECT) {
        setChosenGoods(model)
      }

      setSelectionModel(model)
    }

    console.log(curProdutsData.slice().sort((a, b) => chosenGoods?.includes(b?._id) - chosenGoods?.includes(a?._id)))

    return (
      shops && (
        <Accordion
          classes={{ root: classNames.accordion }}
          expanded={selectedShop === shop?._id}
          onChange={() => {
            onClickToShowDetails(selectedShop === shop?._id ? null : shop?._id)
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            classes={{ root: classNames.accordionSummary, expanded: classNames.accordionExpanded }}
          >
            <div className={classNames.accardionTitleWrapper}>
              <Checkbox
                color="primary"
                checked={chooseAllCheck}
                indeterminate={chosenGoods.length && !chooseAllCheck}
                onClick={onClickChooseAllCheck}
              />

              <Typography className={classNames.title}>{shop?.name}</Typography>

              {/* <Typography className={classNames.selectedValue}>{`(${
                traiding-shop.tmpProductsIds.length === sourceData.length
                  ? t(TranslationKey['Access to all products'])
                  : t(TranslationKey['Access to selected products only'])
              })`}</Typography> */}

              <Typography
                className={cx(classNames.chosenText, {
                  [classNames.chosenTextSelectAll]:
                    shop.tmpProductsIds.length && shop.tmpProductsIds.length === sourceData.length,
                })}
              >
                {`${t(TranslationKey.chosen)}: ${shop.tmpProductsIds.length} / ${sourceData.length}`}
              </Typography>
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <div className={classNames.detailsShopWrapper}>
              {curProdutsData ? (
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={selectedAccess}
                    onChange={e => handleChangeRadio(e.target.value)}
                  >
                    <FormControlLabel
                      value={accessProductSettings.ALL_PRODUCTS}
                      className={classNames.standartText}
                      control={<Radio color="primary" />}
                      label={t(TranslationKey['Access to all products'])}
                    />
                    <FormControlLabel
                      value={accessProductSettings.NEED_SELECT}
                      className={classNames.standartText}
                      control={<Radio color="primary" />}
                      label={t(TranslationKey['Access to selected products only'])}
                    />
                  </RadioGroup>
                </FormControl>
              ) : null}

              <div className={classNames.searchWrapper}>
                <Typography className={classNames.standartText}>
                  {t(TranslationKey['Search by product description and ASIN, SKU:'])}
                </Typography>
                <div>
                  <SearchInput
                    inputClasses={classNames.searchInput}
                    value={searchInputValue}
                    placeholder={t(TranslationKey.search)}
                    onChange={e => setSearchInputValue(e.target.value)}
                  />
                </div>
              </div>

              {selectedShop === shop?._id ? (
                <div className={classNames.tableWrapper}>
                  <MemoDataGrid
                    disableVirtualization
                    keepNonExistentRowsSelected
                    checkboxSelection
                    disableRowSelectionOnClick
                    disableColumnMenu
                    hideFooterSelectedRowCount
                    isRowSelectable={() => selectedAccess !== accessProductSettings.ALL_PRODUCTS}
                    rows={toJS(
                      curProdutsData
                        .slice()
                        .sort((a, b) => chosenGoods?.includes(b?._id) - chosenGoods?.includes(a?._id)),
                    )}
                    columns={sourceColumns()}
                    rowHeight={65}
                    rowSelectionModel={selectionModel}
                    onRowSelectionModelChange={model => handleSelectionModel(model)}
                  />
                </div>
              ) : null}
            </div>
          </AccordionDetails>
        </Accordion>
      )
    )
  }),
)
