import {twitterTabsStylesHook} from '@mui-treasury/styles/tabs'

import React, {useEffect, useState} from 'react'

import {Typography, Box, Tabs} from '@material-ui/core'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'
import {UserRoleCodeMap} from '@constants/user-roles'

import {SettingsModel} from '@models/settings-model'

import {ITab} from '@components/i-tab/i-tab'

import {checkIsBuyer, checkIsClient} from '@utils/checks'
import {t} from '@utils/translations'

import {Integrations} from '../integrations'
import {Listing} from '../listing'
import {Orders} from '../orders'
import {SuppliersAndIdeas} from '../suppliers-and-ideas'
import {BottomCard} from './bottom-card'
import {useClassNames} from './product-wrapper.style'
import {TopCard} from './top-card'

const tabsValues = {
  MAIN_INFO: 'MAIN_INFO',
  ORDERS: 'ORDERS',
  INTEGRATIONS: 'INTEGRATIONS',
  LISTING: 'LISTING',
  SUPPLIERS_AND_IDEAS: 'SUPPLIERS_AND_IDEAS',
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
      <Box p={3}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
)

export const ProductWrapper = observer(
  ({
    user,
    imagesForLoad,
    showProgress,
    progressValue,
    alertFailedText,
    product,
    shops,
    productBase,
    userRole,

    handleSupplierButtons,
    selectedSupplier,
    formFieldsValidationErrors,
    onClickSupplier,
    onClickSetProductStatusBtn,
    onChangeField,
    actionStatus,
    handleProductActionButtons,
    onClickParseProductData,
    onChangeImagesForLoad,
  }) => {
    const classNames = useClassNames()

    const curUserRole = UserRoleCodeMap[userRole]

    const [tabIndex, setTabIndex] = React.useState(tabsValues.MAIN_INFO)
    const tabItemStyles = twitterTabsStylesHook.useTabItem()
    const [updatedProduct, setUpdatedProduct] = useState(product)

    useEffect(() => {
      setUpdatedProduct(() => ({...product}))
    }, [SettingsModel.languageTag, product])

    return (
      <React.Fragment>
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
            tooltipInfoContent={t(TranslationKey['General product information from the Amazon page'])}
            classes={tabItemStyles}
            value={tabsValues.MAIN_INFO}
            label={t(TranslationKey['Basic information'])}
          />

          {checkIsClient(curUserRole) && (
            <ITab
              tooltipInfoContent={t(TranslationKey['All orders related to this product'])}
              classes={tabItemStyles}
              label={t(TranslationKey.Orders)}
              value={tabsValues.ORDERS}
            />
          )}
          {checkIsClient(curUserRole) && (
            <ITab
              tooltipInfoContent={t(TranslationKey['Goods from the store, linked to the product card'])}
              classes={tabItemStyles}
              label={t(TranslationKey.Integrations)}
              value={tabsValues.INTEGRATIONS}
            />
          )}
          {!checkIsBuyer(curUserRole) && (
            <ITab classes={tabItemStyles} label={t(TranslationKey.Content)} value={tabsValues.LISTING} />
          )}

          <ITab
            classes={tabItemStyles}
            label={t(TranslationKey['Suppliers and Ideas'])}
            value={tabsValues.SUPPLIERS_AND_IDEAS}
          />
        </Tabs>

        <TabPanel value={tabIndex} index={tabsValues.MAIN_INFO}>
          <TopCard
            user={user}
            imagesForLoad={imagesForLoad}
            showProgress={showProgress}
            progressValue={progressValue}
            alertFailedText={alertFailedText}
            curUserRole={curUserRole}
            product={updatedProduct}
            shops={shops}
            productBase={productBase}
            selectedSupplier={selectedSupplier}
            actionStatus={actionStatus}
            handleProductActionButtons={handleProductActionButtons}
            formFieldsValidationErrors={formFieldsValidationErrors}
            onChangeField={onChangeField}
            onClickSetProductStatusBtn={onClickSetProductStatusBtn}
            onClickSupplierBtns={handleSupplierButtons}
            onClickSupplier={onClickSupplier}
            onClickParseProductData={onClickParseProductData}
            onChangeImagesForLoad={onChangeImagesForLoad}
          />
          <BottomCard
            curUserRole={curUserRole}
            product={updatedProduct}
            productBase={productBase}
            formFieldsValidationErrors={formFieldsValidationErrors}
            onChangeField={onChangeField}
          />
        </TabPanel>

        <TabPanel value={tabIndex} index={tabsValues.ORDERS}>
          <Orders productId={updatedProduct._id} />
        </TabPanel>

        <TabPanel value={tabIndex} index={tabsValues.INTEGRATIONS}>
          <Integrations productId={product._id} />
        </TabPanel>

        <TabPanel value={tabIndex} index={tabsValues.LISTING}>
          <Listing productId={product._id} onClickBack={() => setTabIndex(tabsValues.MAIN_INFO)} />
        </TabPanel>

        <TabPanel value={tabIndex} index={tabsValues.SUPPLIERS_AND_IDEAS}>
          <SuppliersAndIdeas productId={product._id} />
        </TabPanel>
      </React.Fragment>
    )
  },
)
