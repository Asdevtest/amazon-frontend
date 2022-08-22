import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import SearchIcon from '@mui/icons-material/Search'
import {DataGrid} from '@mui/x-data-grid'

import React from 'react'

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
} from '@material-ui/core'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Field} from '@components/field'

import {t} from '@utils/translations'

import {sourceColumns} from '../access-to-products-columns'
import {useClassNames} from './access-to-product-form.style'

export const AccessToProductForm = observer(
  ({
    shop,
    updatedProducts,
    onClickToShowDetails,
    handleChangeRadio,
    selectedAccess,
    showDetails,
    searchInputValue,
    setSearchInputValue,
  }) => {
    const classNames = useClassNames()

    return (
      <Accordion
        // defaultValue={shop.name}
        classes={{root: classNames.accordion}}
        // style={{borderRadius: '4px', boxShadow: '0px 2px 2px 2px rgba(190, 190, 190, 0.15)'}}
        expanded={shop ? showDetails === shop?._id : showDetails === null}
        onChange={shop ? onClickToShowDetails(shop?._id) : onClickToShowDetails(null)}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          classes={{root: classNames.accordionSummary, expanded: classNames.accordionExpanded}}
        >
          <Typography className={classNames.title}>
            {shop ? shop.name : t(TranslationKey['Products without shops'])}
          </Typography>
          <Typography className={classNames.selectedValue}>{`(${selectedAccess})`}</Typography>
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
                  value={t(TranslationKey['Access to all products in the store'])}
                  control={<Radio color="primary" />}
                  label={t(TranslationKey['Access to all products in the store'])}
                />
                <FormControlLabel
                  value={t(TranslationKey['Access to selected products only'])}
                  control={<Radio color="primary" />}
                  label={t(TranslationKey['Access to selected products only'])}
                />
              </RadioGroup>
            </FormControl>

            <div className={classNames.searchWrapper}>
              <Typography>{t(TranslationKey['Search by product description and ASIN:'])}</Typography>
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

            <div className={classNames.tableWrapper}>
              <DataGrid
                hideFooter
                checkboxSelection
                disableSelectionOnClick
                sx={{
                  border: 0,
                  boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
                  backgroundColor: '#fff',
                }}
                rows={toJS(updatedProducts)}
                columns={sourceColumns()}
                rowHeight={65}
                onSelectionModelChange={newSelection => console.log(newSelection)}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    )
  },
)
