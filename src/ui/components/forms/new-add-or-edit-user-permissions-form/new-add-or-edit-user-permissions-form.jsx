// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
// import SearchIcon from '@mui/icons-material/Search'
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'

// import {DataGrid} from '@mui/x-data-grid'
import React, {useEffect, useState} from 'react'

import {
  // Accordion,
  // AccordionDetails,
  // AccordionSummary,
  Box,
  Divider, // FormControl,
  // FormControlLabel,
  // InputAdornment,
  ListItemText, // Radio,
  // RadioGroup,
  Tabs,
  Typography,
} from '@material-ui/core'
import clsx from 'clsx'
// import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
// import {Field} from '@components/field'
import {ITab} from '@components/i-tab/i-tab'

import {t} from '@utils/translations'

import {AccessToProductForm} from './access-to-product-form'
// import {AccessToProductForm} from './access-to-product-form'
// import {sourceColumns} from './access-to-products-columns'
import {useClassNames} from './new-add-or-edit-user-permissions-form.style'

const tabsValues = {
  ASSIGN_PERMISSIONS: 'ASSIGN_PERMISSIONS',
  ACCESS_TO_PRODUCTS: 'ACCESS_TO_PRODUCTS',
}

const TabPanel = ({children, value, index, ...other}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box paddingTop={3}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
)

export const NewAddOrEditUserPermissionsForm = observer(
  ({
    onCloseModal,
    onSubmit,
    permissionsToSelect,
    permissionGroupsToSelect,
    sourceData,
    shops,
    products,
    onClickShop,
  }) => {
    const classNames = useClassNames()

    const [tabIndex, setTabIndex] = React.useState(tabsValues.ASSIGN_PERMISSIONS)

    const [showDetails, setShowDetails] = useState(false)
    const [selectedShop, setSelectedShop] = useState('')
    const [selectedAccess, setSelectedAccess] = useState(t(TranslationKey['Access to all products in the store']))
    const [searchInputValue, setSearchInputValue] = useState('')
    const [updatedProducts, setUpdatedProducts] = useState([])

    const onClickToShowDetails = value => (e, isExpanded) => {
      setShowDetails(isExpanded ? value : false)
      setSelectedShop(value)
    }

    useEffect(() => {
      onClickShop(selectedShop)
    }, [selectedShop])

    useEffect(() => {
      !showDetails && setSearchInputValue('')
    }, [showDetails])

    useEffect(() => {
      const productsWithoutShops = products.filter(p => !p.originalData.shopIds.length)
      const currentProducts = selectedShop !== null ? products : productsWithoutShops

      setUpdatedProducts(currentProducts)

      const filter = currentProducts.filter(
        i =>
          i.asin.toLowerCase().includes(searchInputValue.toLowerCase()) ||
          i.originalData.amazonTitle.toLowerCase().includes(searchInputValue.toLowerCase()),
      )
      setUpdatedProducts(filter)
    }, [searchInputValue, selectedShop, products])

    const permissionsIdsFromGroups = permissionGroupsToSelect.reduce(
      (ac, cur) => (ac = [...ac, ...cur.permissions.map(el => el._id)]),
      [],
    )

    // const onSelectionModel = model => {
    //   const curChosenGoodsIds = chosenGoods.map(el => el.id)

    //   const newRowIds = model.filter(el => !curChosenGoodsIds.includes(el))
    //   console.log(newRowIds)
    //   const newSelectedItems = toJS(updatedProducts).filter(el => newRowIds.includes(el.id))
    //   setChosenGoods([...chosenGoods, ...newSelectedItems])
    // }

    const otherPermissionsGroup = {
      key: 'WITHOUT_GROUP',
      title: t(TranslationKey['Without the group']),
      permissions: permissionsToSelect.filter(el => !permissionsIdsFromGroups.includes(el._id)),
      hierarchy: 999,
    }

    const groupsToSelect = (
      otherPermissionsGroup.permissions.length
        ? [...permissionGroupsToSelect, otherPermissionsGroup]
        : [...permissionGroupsToSelect]
    ).sort((a, b) => a.hierarchy - b.hierarchy)

    const [formFields, setFormFields] = useState(sourceData?.permissions || [])

    const onChangePermissionCheckbox = id => {
      if (!formFields.includes(id)) {
        setFormFields([...formFields, id])
      } else {
        const newArr = formFields.filter(el => el !== id)
        setFormFields([...newArr])
      }
    }

    const [rightSide, setRightSide] = useState(groupsToSelect[0])

    const onSetRightSide = item => {
      setRightSide(item)
    }

    const onClickLeftCheckbox = item => {
      if (item.permissions.some(el => formFields.includes(el._id))) {
        const checkedPerms = item.permissions.filter(el => formFields.includes(el._id))

        const checkedPermsIds = checkedPerms.map(el => el._id)

        const filteredFormFields = formFields.filter(el => !checkedPermsIds.includes(el))

        setFormFields([...filteredFormFields])
      } else {
        const permsToCheckIds = item.permissions.map(el => el._id)

        setFormFields([...formFields, ...permsToCheckIds])
      }
    }

    const handleChangeRadio = value => {
      setSelectedAccess(value)
    }

    const submitDisabled =
      (!formFields.length && !sourceData?.permissions.length) ||
      JSON.stringify(formFields.slice().sort()) === JSON.stringify(sourceData?.permissions.slice().sort())

    return (
      <div className={classNames.root}>
        <Tabs
          variant={'fullWidth'}
          classes={{
            root: classNames.row,
            indicator: classNames.indicator,
          }}
          value={tabIndex}
          onChange={(e, value) => {
            console.log('event', e)
            console.log('value', value)
            setTabIndex(value)
          }}
        >
          <ITab
            classes={{root: classNames.tab, selected: classNames.selectedTab}}
            value={tabsValues.ASSIGN_PERMISSIONS}
            label={t(TranslationKey['Assign permissions'])}
          />

          <ITab
            classes={{root: classNames.tab, selected: classNames.selectedTab}}
            value={tabsValues.ACCESS_TO_PRODUCTS}
            label={t(TranslationKey['Access to products'])}
          />
        </Tabs>

        {/* <Typography variant="h5">{t(TranslationKey['Assign permissions'])}</Typography> */}

        <TabPanel value={tabIndex} index={tabsValues.ASSIGN_PERMISSIONS}>
          <div className={classNames.form}>
            <div className={classNames.leftSideWrapper}>
              {groupsToSelect.map(item => (
                <div key={item._id} className={classNames.permissionGroupsToSelectItemWrapper}>
                  <div
                    className={clsx(classNames.permissionGroupsToSelectItem, {
                      [classNames.selectedItem]: rightSide.key === item.key,
                    })}
                    onClick={() => onSetRightSide(item)}
                  >
                    <ListItemText primary={`${item.title}`} />
                  </div>

                  <div
                    className={clsx(
                      classNames.permissionGroupsToSelectCheckboxWrapper,
                      {
                        [classNames.selectedItem]: rightSide.key === item.key,
                      },
                      {
                        [classNames.tabWillBeOpened]: formFields.includes(
                          item.permissions.find(el => el.key.startsWith('SHOW_'))?._id,
                        ),
                      },
                    )}
                    onClick={() => onClickLeftCheckbox(item)}
                  >
                    <Checkbox
                      color="primary"
                      checked={item.permissions.every(el => formFields.includes(el._id))}
                      indeterminate={
                        item.permissions.some(el => formFields.includes(el._id)) &&
                        !item.permissions.every(el => formFields.includes(el._id))
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <Divider flexItem orientation={'vertical'} className={classNames.divider} />

            <div className={classNames.rightSideWrapper}>
              <Typography>{rightSide?.title}</Typography>

              {rightSide?.permissions
                ?.sort((a, b) => a.hierarchy - b.hierarchy)
                .map(item => (
                  <Tooltip
                    key={item.key}
                    // followCursor
                    arrow
                    title={item.description}
                    placement="right-end"
                    TransitionComponent={Zoom}
                    TransitionProps={{timeout: 900}}
                  >
                    <Box className={classNames.permissionWrapper} onClick={() => onChangePermissionCheckbox(item._id)}>
                      <Checkbox color="primary" checked={formFields.includes(item._id)} />
                      <Typography className={clsx({[classNames.keyPermission]: item.key.startsWith('SHOW_')})}>
                        {item.title}
                      </Typography>
                    </Box>
                  </Tooltip>
                ))}
            </div>
          </div>
        </TabPanel>

        <TabPanel value={tabIndex} index={tabsValues.ACCESS_TO_PRODUCTS}>
          <div className={classNames.accordionWrapper}>
            {shops.map(shop => (
              <AccessToProductForm
                key={shop._id}
                shop={shop}
                showDetails={showDetails}
                searchInputValue={searchInputValue}
                selectedAccess={selectedAccess}
                updatedProducts={updatedProducts}
                setSearchInputValue={setSearchInputValue}
                handleChangeRadio={handleChangeRadio}
                onClickToShowDetails={onClickToShowDetails}
              />
            ))}
            <AccessToProductForm
              showDetails={showDetails}
              searchInputValue={searchInputValue}
              selectedAccess={selectedAccess}
              updatedProducts={updatedProducts}
              setSearchInputValue={setSearchInputValue}
              handleChangeRadio={handleChangeRadio}
              onClickToShowDetails={onClickToShowDetails}
            />
          </div>
        </TabPanel>

        <div className={classNames.buttonsWrapper}>
          <Button
            disableElevation
            disabled={submitDisabled}
            className={classNames.button}
            color="primary"
            variant="contained"
            onClick={() => {
              onSubmit(formFields, sourceData._id)
              onCloseModal()
            }}
          >
            {t(TranslationKey.Edit)}
          </Button>

          <Button
            disableElevation
            className={clsx(classNames.button, classNames.cancelBtn)}
            color="primary"
            variant="text"
            onClick={() => onCloseModal()}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  },
)
