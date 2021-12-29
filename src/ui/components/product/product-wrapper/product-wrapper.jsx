import {twitterTabsStylesHook} from '@mui-treasury/styles/tabs'

import React from 'react'

import {Typography, Box, Tabs, Tab} from '@material-ui/core'
import {observer} from 'mobx-react'

import {Listing} from '../listing'
import {BottomCard} from './bottom-card'
import {useClassNames} from './product-wrapper.style'
import {TopCard} from './top-card'

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
    alertFailedText,
    curUserRole,
    product,
    suppliers,
    handleSupplierButtons,
    selectedSupplier,
    formFieldsValidationErrors,
    onClickSupplier,
    onClickSetProductStatusBtn,
    onChangeField,
    actionStatus,
    handleProductActionButtons,
    onClickParseProductData,
  }) => {
    const classNames = useClassNames()

    const [tabIndex, setTabIndex] = React.useState(0)
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
          onChange={(e, index) => setTabIndex(index)}
        >
          <Tab classes={tabItemStyles} label={'Основная информация'} />
          <Tab classes={tabItemStyles} label={'Listing'} />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <TopCard
            alertFailedText={alertFailedText}
            curUserRole={curUserRole}
            product={product}
            suppliers={suppliers}
            selectedSupplier={selectedSupplier}
            actionStatus={actionStatus}
            handleProductActionButtons={handleProductActionButtons}
            formFieldsValidationErrors={formFieldsValidationErrors}
            onChangeField={onChangeField}
            onClickSetProductStatusBtn={onClickSetProductStatusBtn}
            onClickSupplierBtns={handleSupplierButtons}
            onClickSupplier={onClickSupplier}
            onClickParseProductData={onClickParseProductData}
          />
          <BottomCard
            curUserRole={curUserRole}
            product={product}
            formFieldsValidationErrors={formFieldsValidationErrors}
            onChangeField={onChangeField}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Listing product={product} onClickBack={() => setTabIndex(0)} />
        </TabPanel>
      </React.Fragment>
    )
  },
)
