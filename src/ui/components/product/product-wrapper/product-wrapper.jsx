import {twitterTabsStylesHook} from '@mui-treasury/styles/tabs'

import React from 'react'

import {Typography, Box, Tabs, Tab} from '@material-ui/core'
import {observer} from 'mobx-react'

import {checkIsClient} from '@utils/checks'

import {Integrations} from '../integrations'
import {Listing} from '../listing'
import {Orders} from '../orders'
import {BottomCard} from './bottom-card'
import {useClassNames} from './product-wrapper.style'
import {TopCard} from './top-card'

const tabsValues = {
  MAIN_INFO: 'MAIN_INFO',
  ORDERS: 'ORDERS',
  INTEGRATIONS: 'INTEGRATIONS',
  LISTING: 'LISTING',
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
    imagesForLoad,
    showProgress,
    progressValue,
    alertFailedText,
    curUserRole,
    product,
    productBase,

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

    const [tabIndex, setTabIndex] = React.useState(tabsValues.MAIN_INFO)
    const tabItemStyles = twitterTabsStylesHook.useTabItem()

    return (
      <React.Fragment>
        <Tabs
          variant={'fullWidth'}
          classes={{
            root: classNames.row,
            indicator: classNames.indicator,
          }}
          value={tabIndex}
          onChange={(e, value) => setTabIndex(value)}
        >
          <Tab classes={tabItemStyles} label={'Основная информация'} value={tabsValues.MAIN_INFO} />
          {checkIsClient(curUserRole) && <Tab classes={tabItemStyles} label={'Заказы'} value={tabsValues.ORDERS} />}
          {checkIsClient(curUserRole) && (
            <Tab classes={tabItemStyles} label={'Интеграции'} value={tabsValues.INTEGRATIONS} />
          )}
          <Tab classes={tabItemStyles} label={'Листинг'} value={tabsValues.LISTING} />
        </Tabs>

        <TabPanel value={tabIndex} index={tabsValues.MAIN_INFO}>
          <TopCard
            imagesForLoad={imagesForLoad}
            showProgress={showProgress}
            progressValue={progressValue}
            alertFailedText={alertFailedText}
            curUserRole={curUserRole}
            product={product}
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
            product={product}
            productBase={productBase}
            formFieldsValidationErrors={formFieldsValidationErrors}
            onChangeField={onChangeField}
          />
        </TabPanel>

        <TabPanel value={tabIndex} index={tabsValues.ORDERS}>
          <Orders productId={product._id} />
        </TabPanel>

        <TabPanel value={tabIndex} index={tabsValues.INTEGRATIONS}>
          <Integrations productId={product._id} />
        </TabPanel>

        <TabPanel value={tabIndex} index={tabsValues.LISTING}>
          <Listing productId={product._id} onClickBack={() => setTabIndex(tabsValues.MAIN_INFO)} />
        </TabPanel>
      </React.Fragment>
    )
  },
)
