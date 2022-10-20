/* eslint-disable no-unused-vars */
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import SearchIcon from '@mui/icons-material/Search'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'

import React, {useEffect, useState} from 'react'

import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Field} from '@components/field'

import {t} from '@utils/translations'

import {sourceColumns} from '../access-to-products-columns'
import {useClassNames} from './access-to-product-form.style'

const accessProductSettings = {
  ALL_PRODUCTS: 'ALL_PRODUCTS',
  NEED_SELECT: 'NEED_SELECT',
}

export const AccessToProductForm = observer(
  ({isReady, shop, shops, selectedShop, updatedProducts, onClickToShowDetails, setShopDataToRender}) => {
    const {classes: classNames} = useClassNames()

    const [curProdutsData, setCurProdutsData] = useState(updatedProducts || null)

    const [searchInputValue, setSearchInputValue] = useState('')

    const [selectedAccess, setSelectedAccess] = useState(accessProductSettings.NEED_SELECT)

    const [chosenGoods, setChosenGoods] = useState(shop?.tmpProductsIds || [])

    const allProductsIds = updatedProducts?.map(product => product._id)

    const handleChangeRadio = value => {
      setSelectedAccess(value)
    }

    useEffect(() => {
      setCurProdutsData(updatedProducts)
    }, [updatedProducts])

    useEffect(() => {
      selectedShop !== shop?._id && setSearchInputValue('')
    }, [selectedShop])

    useEffect(() => {
      if (searchInputValue) {
        const filter = updatedProducts?.filter(
          i =>
            i.asin.toLowerCase().includes(searchInputValue.toLowerCase()) ||
            i.originalData.amazonTitle.toLowerCase().includes(searchInputValue.toLowerCase()),
        )
        setCurProdutsData(filter)
      } else {
        setCurProdutsData(updatedProducts)
      }
    }, [searchInputValue])

    useEffect(() => {
      if (selectedShop === shop?._id) {
        setChosenGoods(shop.tmpProductsIds)
      }
    }, [selectedShop])

    useEffect(() => {
      if (selectedShop === shop?._id && isReady && selectedAccess === accessProductSettings.NEED_SELECT) {
        setShopDataToRender(
          shops.map(item => (item._id === shop._id ? {...item, tmpProductsIds: [...chosenGoods]} : item)),
        )
      }
    }, [chosenGoods])

    useEffect(() => {
      if (selectedShop === shop?._id && isReady) {
        if (selectedAccess === accessProductSettings.ALL_PRODUCTS) {
          setShopDataToRender(
            shops.map(item => (item._id === shop._id ? {...item, tmpProductsIds: allProductsIds} : item)),
          )
        } else {
          setChosenGoods([])
          setShopDataToRender(shops.map(item => (item._id === shop._id ? {...item, tmpProductsIds: []} : item)))
        }
      }
    }, [selectedAccess])

    return (
      shops && (
        <Accordion
          // defaultValue={shop.name}
          classes={{root: classNames.accordion}}
          // style={{borderRadius: '4px', boxShadow: '0px 2px 2px 2px rgba(190, 190, 190, 0.15)'}}
          expanded={selectedShop === shop?._id}
          onChange={() => {
            setCurProdutsData(null)
            onClickToShowDetails(selectedShop === shop?._id ? null : shop?._id)
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            classes={{root: classNames.accordionSummary, expanded: classNames.accordionExpanded}}
          >
            <div className={classNames.accardionTitleWrapper}>
              <Typography className={classNames.title}>{shop?.name}</Typography>
              {/* <Typography className={classNames.selectedValue}>{`(${
                selectedAccess === accessProductSettings.NEED_SELECT
                  ? t(TranslationKey['Access to selected products only'])
                  : t(TranslationKey['Access to all products'])
              })`}</Typography> */}
              {shop.tmpProductsIds.length ? (
                <Typography className={classNames.chosenText}>
                  {`${t(TranslationKey.chosen)}: ${shop.tmpProductsIds.length}`}
                </Typography>
              ) : null}
            </div>
          </AccordionSummary>

          <AccordionDetails classes={{root: classNames.details}}>
            <div className={classNames.detailsShopWrapper}>
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

              <div className={classNames.searchWrapper}>
                <Typography className={classNames.standartText}>
                  {t(TranslationKey['Search by product description and ASIN:'])}
                </Typography>
                <div>
                  <Field
                    containerClasses={classNames.searchContainer}
                    inputClasses={classNames.searchInput}
                    value={searchInputValue}
                    placeholder={t(TranslationKey.search)}
                    endAdornment={
                      <InputAdornment position="start">
                        <SearchIcon color="primary" />
                      </InputAdornment>
                    }
                    onChange={e => setSearchInputValue(e.target.value)}
                  />
                </div>
              </div>

              {selectedShop === shop?._id && curProdutsData ? (
                <div className={classNames.tableWrapper}>
                  <DataGrid
                    disableVirtualization
                    hideFooter
                    disableSelectionOnClick
                    checkboxSelection={selectedAccess === accessProductSettings.NEED_SELECT}
                    // sx={{
                    //   border: 0,
                    //   boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
                    //   backgroundColor: theme.palette.background.main,
                    // }}
                    rows={toJS(curProdutsData)}
                    columns={sourceColumns()}
                    rowHeight={65}
                    selectionModel={chosenGoods}
                    onSelectionModelChange={newSelection => {
                      setChosenGoods(newSelection)
                    }}
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
