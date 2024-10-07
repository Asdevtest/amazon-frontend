import { memo, useEffect, useState } from 'react'
import { MdOutlineArrowDropDown } from 'react-icons/md'

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
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { useStyles } from './access-to-product-form.style'

import { sourceColumns } from '../access-to-products-columns'

const accessProductSettings = {
  ALL_PRODUCTS: 'ALL_PRODUCTS',
  NEED_SELECT: 'NEED_SELECT',
}

export const AccessToProductForm = memo(props => {
  const { shop, shops, selectedShop, onClickToShowDetails, setShopDataToRender, sourceData, isResearcher } = props

  const { classes: styles, cx } = useStyles()

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
      setChosenGoods(allProductsIds)
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
    setShopDataToRender(shops => {
      const newDataToRender = [...shops]

      const tmpSelectedShop =
        !!chosenGoods?.length &&
        !!allProductsIds?.length &&
        chosenGoods?.length === allProductsIds?.length &&
        shop._id !== 'PRODUCTS_WITHOUT_SHOPS_ID'

      if (selectedAccess === accessProductSettings.NEED_SELECT) {
        return newDataToRender.map(item =>
          item._id === shop._id ? { ...item, tmpSelectedShop, tmpProductsIds: chosenGoods } : item,
        )
      } else if (selectedAccess === accessProductSettings.ALL_PRODUCTS) {
        setChooseAllCheck(true)

        return newDataToRender.map(item =>
          item._id === shop._id
            ? {
                ...item,
                tmpSelectedShop,
                tmpProductsIds: allProductsIds,
              }
            : item,
        )
      } else {
        setChooseAllCheck(false)
        return newDataToRender.map(item =>
          item._id === shop._id
            ? {
                ...item,
                tmpSelectedShop,
                tmpProductsIds: allProductsIds,
              }
            : item,
        )
      }
    })
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

  useEffect(() => {
    setCurProdutsData(getCurrentData())
  }, [selectedShop])

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
          expandIcon={<MdOutlineArrowDropDown size={20} />}
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

              <CustomInputSearch
                allowClear
                wrapperClassName={styles.searchInput}
                value={searchInputValue}
                placeholder={t(TranslationKey.Search)}
                onChange={e => setSearchInputValue(e.target.value.trim())}
              />
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
                  columns={sourceColumns(isResearcher)}
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
})
