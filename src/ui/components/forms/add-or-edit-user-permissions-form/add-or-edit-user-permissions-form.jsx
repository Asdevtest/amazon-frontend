/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {Box, Divider, ListItemText, Tabs, Typography} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'

import React, {useEffect, useState, useMemo} from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {ITab} from '@components/i-tab/i-tab'

import {t} from '@utils/translations'

import {AccessToProductForm} from './access-to-product-form'
import {useClassNames} from './add-or-edit-user-permissions-form.style'

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
    {value === index && <Box paddingTop={3}>{children}</Box>}
  </div>
)

export const AddOrEditUserPermissionsForm = observer(
  ({
    curUserProductPermissions,
    onCloseModal,
    onSubmit,
    permissionsToSelect,
    permissionGroupsToSelect,
    sourceData,
    shops,
    isWithoutShopsDepends,
    isWithoutProductPermissions,

    productPermissionsData,
  }) => {
    const {classes: classNames} = useClassNames()

    const [tabIndex, setTabIndex] = React.useState(tabsValues.ASSIGN_PERMISSIONS)

    const [selectedShop, setSelectedShop] = useState(null)
    const [showPermissions, setShowPermissions] = useState(false)

    const sourceDataToProductsPermissions = useMemo(
      () => [
        {
          _id: PRODUCTS_WITHOUT_SHOPS_ID,
          name: isWithoutShopsDepends ? t(TranslationKey['All products']) : t(TranslationKey['Products without shops']),
          tmpProductsIds:
            curUserProductPermissions
              ?.filter(el => (isWithoutShopsDepends ? true : !el.shopIds.length))
              ?.map(el => el.productId) || [],
        },
        ...shops.map(shop => ({
          ...shop,
          tmpProductsIds:
            curUserProductPermissions?.filter(el => el.shopIds.includes(shop._id))?.map(el => el.productId) || [],
        })),
      ],
      [curUserProductPermissions],
    )

    const [shopDataToRender, setShopDataToRender] = useState(sourceDataToProductsPermissions)

    const onClickToShowDetails = value => {
      setSelectedShop(value)
    }

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
      setShowPermissions(!showPermissions)
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
      JSON.stringify(formFields.slice().sort()) === JSON.stringify(sourceData?.permissions.slice().sort()) &&
      JSON.stringify(sourceDataToProductsPermissions) === JSON.stringify(shopDataToRender)

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
          {!isWithoutProductPermissions ? (
            <ITab
              disabled={isWithoutProductPermissions}
              classes={{root: classNames.tab, selected: classNames.selectedTab}}
              value={tabsValues.ACCESS_TO_PRODUCTS}
              label={t(TranslationKey['Access to products'])}
            />
          ) : null}
        </Tabs>

        {/* <Typography variant="h5">{t(TranslationKey['Assign permissions'])}</Typography> */}

        <TabPanel value={tabIndex} index={tabsValues.ASSIGN_PERMISSIONS}>
          {window.innerWidth > 768 ? (
            <div className={classNames.form}>
              <div className={classNames.leftSideWrapper}>
                {groupsToSelect.map(item => (
                  <div key={item._id} className={classNames.permissionGroupsToSelectItemWrapper}>
                    <div
                      className={cx(classNames.permissionGroupsToSelectItem, {
                        [classNames.selectedItem]: rightSide.key === item.key,
                      })}
                      onClick={() => onSetRightSide(item)}
                    >
                      <ListItemText primary={`${item.title}`} />
                    </div>

                    <div
                      className={cx(
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
                <Typography className={classNames.rightSideTitle}>{rightSide?.title}</Typography>

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
                      <Box
                        className={classNames.permissionWrapper}
                        onClick={() => onChangePermissionCheckbox(item._id)}
                      >
                        <Checkbox color="primary" checked={formFields.includes(item._id)} />
                        <Typography
                          className={cx(classNames.standartText, {
                            [classNames.keyPermission]: item.key.startsWith('SHOW_'),
                          })}
                        >
                          {item.title}
                        </Typography>
                      </Box>
                    </Tooltip>
                  ))}
              </div>
            </div>
          ) : (
            <div className={classNames.form}>
              <div className={classNames.leftSideWrapper}>
                {groupsToSelect.map(item => (
                  <div key={item._id} className={classNames.permGroupWrapper}>
                    <div
                      className={classNames.permissionGroupsToSelectItemWrapper}
                      onClick={() => onSetRightSide(item)}
                    >
                      <div className={classNames.permissionGroupsToSelectItemSubWrapper}>
                        <div
                          className={cx(
                            classNames.permissionGroupsToSelectCheckboxWrapper,
                            {
                              [classNames.selectedItem]: rightSide.key === item.key && showPermissions,
                            },
                            {
                              [classNames.tabWillBeOpened]: formFields.includes(
                                item.permissions.find(el => el.key.startsWith('SHOW_'))?._id,
                              ),
                            },
                          )}
                          onClick={e => {
                            e.stopPropagation()
                            onClickLeftCheckbox(item)
                          }}
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
                        <div
                          className={cx(classNames.permissionGroupsToSelectItem, {
                            [classNames.selectedItem]: rightSide.key === item.key,
                          })}
                        >
                          <ListItemText primary={`${item.title}`} />
                        </div>
                        <div className={classNames.iconWrapper}>
                          {!showPermissions ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                        </div>
                      </div>
                    </div>
                    {rightSide.key === item.key && showPermissions && (
                      <div className={classNames.rightSideWrapper}>
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
                              <Box
                                className={classNames.permissionWrapper}
                                onClick={() => onChangePermissionCheckbox(item._id)}
                              >
                                <Checkbox color="primary" checked={formFields.includes(item._id)} />
                                <Typography className={cx({[classNames.keyPermission]: item.key.startsWith('SHOW_')})}>
                                  {item.title}
                                </Typography>
                              </Box>
                            </Tooltip>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabPanel>

        <TabPanel value={tabIndex} index={tabsValues.ACCESS_TO_PRODUCTS}>
          <div className={classNames.accordionWrapper}>
            {sourceDataToProductsPermissions
              .map(shop => {
                const sourceData = useMemo(
                  () =>
                    productPermissionsData.filter(el =>
                      shop._id === PRODUCTS_WITHOUT_SHOPS_ID
                        ? isWithoutShopsDepends
                          ? true
                          : !el.originalData.shopIds?.length
                        : el.originalData.shopIds?.includes(shop._id),
                    ),
                  [],
                )

                return (
                  <AccessToProductForm
                    key={shop._id}
                    sourceData={sourceData}
                    shop={shopDataToRender.find(el => el._id === shop._id)}
                    selectedShop={selectedShop}
                    shops={shopDataToRender}
                    setShopDataToRender={setShopDataToRender}
                    onClickToShowDetails={onClickToShowDetails}
                  />
                )
              })
              .sort((a, b) => b.props.sourceData.length - a.props.sourceData.length)}
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
                Array.from(new Set(shopDataToRender.reduce((ac, cur) => (ac = [...ac, ...cur.tmpProductsIds]), []))),
              )
              onCloseModal()
            }}
          >
            {t(TranslationKey.Edit)}
          </Button>

          <Button
            disableElevation
            className={cx(classNames.button, classNames.cancelBtn)}
            color="primary"
            variant="text"
            onClick={onCloseModal}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  },
)
