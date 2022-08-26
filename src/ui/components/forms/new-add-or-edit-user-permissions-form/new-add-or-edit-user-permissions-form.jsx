import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'

import React, {useEffect, useState} from 'react'

import {Box, Divider, ListItemText, Tabs, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {ITab} from '@components/i-tab/i-tab'

import {t} from '@utils/translations'

import {AccessToProductForm} from './access-to-product-form'
import {useClassNames} from './new-add-or-edit-user-permissions-form.style'

const tabsValues = {
  ASSIGN_PERMISSIONS: 'ASSIGN_PERMISSIONS',
  ACCESS_TO_PRODUCTS: 'ACCESS_TO_PRODUCTS',
}

const PRODUCTS_WITHOUT_SHOPS_ID = 'PRODUCTS_WITHOUT_SHOPS_ID'

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

    const [selectedShop, setSelectedShop] = useState(null)

    const [isReady, setIsReady] = useState(true)

    const sourceDataToProductsPermissions = [
      {_id: PRODUCTS_WITHOUT_SHOPS_ID, name: t(TranslationKey['Products without shops']), tmpProductsIds: []},
      ...shops.map(shop => ({...shop, tmpProductsIds: []})),
    ]

    const [shopDataToRender, setShopDataToRender] = useState(sourceDataToProductsPermissions)

    const [updatedProducts, setUpdatedProducts] = useState(null)

    const onClickToShowDetails = value => {
      setSelectedShop(value)

      setIsReady(false)
      onClickShop && onClickShop(value === PRODUCTS_WITHOUT_SHOPS_ID ? null : value)
    }

    useEffect(() => {
      const productsWithoutShops = products?.filter(p => !p.originalData.shopIds.length)
      const currentProducts = selectedShop === PRODUCTS_WITHOUT_SHOPS_ID ? productsWithoutShops : products

      setIsReady(true)
      setUpdatedProducts(currentProducts)
    }, [selectedShop, products])

    const permissionsIdsFromGroups = permissionGroupsToSelect.reduce(
      (ac, cur) => (ac = [...ac, ...cur.permissions.map(el => el._id)]),
      [],
    )

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

    const submitDisabled =
      (!formFields.length && !sourceData?.permissions.length) ||
      (JSON.stringify(formFields.slice().sort()) === JSON.stringify(sourceData?.permissions.slice().sort()) &&
        JSON.stringify(sourceDataToProductsPermissions) === JSON.stringify(shopDataToRender))

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
            {shopDataToRender.map(shop => (
              <AccessToProductForm
                key={shop._id}
                isReady={isReady}
                shop={shop}
                selectedShop={selectedShop}
                shops={shopDataToRender}
                setShopDataToRender={setShopDataToRender}
                updatedProducts={updatedProducts}
                onClickToShowDetails={onClickToShowDetails}
              />
            ))}
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
              onSubmit(
                formFields,
                sourceData._id,
                shopDataToRender.reduce((ac, cur) => (ac = [...ac, ...cur.tmpProductsIds]), []),
              )
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
