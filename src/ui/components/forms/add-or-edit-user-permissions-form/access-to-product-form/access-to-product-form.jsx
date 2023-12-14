import { cx } from '@emotion/css'
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

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { useStyles } from './access-to-product-form.style'

import { sourceColumns } from '../access-to-products-columns'

const accessProductSettings = {
  ALL_PRODUCTS: 'ALL_PRODUCTS',
  NEED_SELECT: 'NEED_SELECT',
}

export const AccessToProductForm = React.memo(
  ({ shop, shops, selectedShop, onClickToShowDetails, setShopDataToRender, sourceData }) => {
    const { classes: styles } = useStyles()

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 100 })
    const [curProdutsData, setCurProdutsData] = useState(sourceData)
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

    const handleSelectionModel = model => {
      if (selectedAccess === accessProductSettings.NEED_SELECT) {
        setChosenGoods(model)
      }
      setSelectionModel(model)
    }

    const getCurrentData = () =>
      sourceData
        ?.slice(
          paginationModel.page * paginationModel.pageSize,
          paginationModel.page * paginationModel.pageSize + paginationModel.pageSize,
        )
        ?.sort((a, b) => chosenGoods?.includes(b?._id) - chosenGoods?.includes(a?._id))

    useEffect(() => {
      if (searchInputValue) {
        const filter = sourceData?.filter(
          i =>
            i.originalData.skuByClient?.toLowerCase().includes(searchInputValue.toLowerCase()) ||
            i.asin.toLowerCase().includes(searchInputValue.toLowerCase()) ||
            i.originalData.amazonTitle.toLowerCase().includes(searchInputValue.toLowerCase()),
        )
        setCurProdutsData(filter)
      } else {
        setCurProdutsData(getCurrentData())
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
        setChosenGoods([])
        setChooseAllCheck(false)
      } else {
        setSelectedAccess(accessProductSettings.ALL_PRODUCTS)
        setSelectionModel(allProductsIds)
        setChosenGoods(allProductsIds)
        setChooseAllCheck(true)
      }
    }

    useEffect(() => {
      if (!sourceData?.length) {
        return
      }
      setCurProdutsData(getCurrentData())
    }, [paginationModel])

    return (
      shops && (
        <Accordion
          classes={{ root: styles.accordion }}
          expanded={selectedShop === shop?._id}
          onChange={() => {
            onClickToShowDetails(selectedShop === shop?._id ? null : shop?._id)
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            classes={{ root: styles.accordionSummary, expanded: styles.accordionExpanded }}
          >
            <div className={styles.accardionTitleWrapper}>
              <Checkbox
                color="primary"
                checked={chooseAllCheck}
                indeterminate={chosenGoods.length && !chooseAllCheck}
                onClick={onClickChooseAllCheck}
              />

              <Typography className={styles.title}>{shop?.name}</Typography>

              <Typography
                className={cx(styles.chosenText, {
                  [styles.chosenTextSelectAll]:
                    shop.tmpProductsIds.length && shop.tmpProductsIds.length === sourceData.length,
                })}
              >
                {`${t(TranslationKey.chosen)}: ${shop.tmpProductsIds.length} / ${sourceData.length}`}
              </Typography>
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <div className={styles.detailsShopWrapper}>
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
                      className={styles.standartText}
                      control={<Radio color="primary" />}
                      label={t(TranslationKey['Access to all products'])}
                    />
                    <FormControlLabel
                      value={accessProductSettings.NEED_SELECT}
                      className={styles.standartText}
                      control={<Radio color="primary" />}
                      label={t(TranslationKey['Access to selected products only'])}
                    />
                  </RadioGroup>
                </FormControl>
              ) : null}

              <div className={styles.searchWrapper}>
                <Typography className={styles.standartText}>
                  {t(TranslationKey['Search by product description and ASIN, SKU:'])}
                </Typography>
                <div>
                  <SearchInput
                    inputClasses={styles.searchInput}
                    value={searchInputValue}
                    placeholder={t(TranslationKey.search)}
                    onChange={e => setSearchInputValue(e.target.value)}
                  />
                </div>
              </div>

              {selectedShop === shop?._id ? (
                <div className={styles.tableWrapper}>
                  <CustomDataGrid
                    keepNonExistentRowsSelected
                    checkboxSelection
                    disableRowSelectionOnClick
                    disableColumnMenu
                    rowCount={sourceData?.length}
                    paginationModel={paginationModel}
                    isRowSelectable={() => selectedAccess !== accessProductSettings.ALL_PRODUCTS}
                    rows={curProdutsData || []}
                    columns={sourceColumns()}
                    rowHeight={65}
                    rowSelectionModel={selectionModel}
                    onRowSelectionModelChange={model => handleSelectionModel(model)}
                    onPaginationModelChange={setPaginationModel}
                  />
                </div>
              ) : null}
            </div>
          </AccordionDetails>
        </Accordion>
      )
    )
  },
)
