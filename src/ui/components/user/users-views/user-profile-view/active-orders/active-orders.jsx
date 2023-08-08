import { cx } from '@emotion/css'
import React from 'react'

import { Paper, Tab, Table, TableBody, TableContainer, TableHead, Tabs, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useClassNames } from './active-orders.style'
import { ExchangeProductItem } from './exchange-product-item'

export const ActiveOrders = ({ tabExchange, setTabExchange, productList, handlerClickButtonPrivateLabel }) => {
  const { classes: classNames } = useClassNames()

  const renderProductList =
    productList.length === 0 ? (
      <Typography className={(classNames.text, classNames.noActiveOffers)}>
        {t(TranslationKey['No active offers found'])}
      </Typography>
    ) : (
      <TableContainer>
        <Table>
          <TableHead />
          <TableBody>
            {productList.map((product, index) => (
              <ExchangeProductItem
                key={index}
                product={product}
                handlerPrivateLabel={handlerClickButtonPrivateLabel}
                index={index}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )

  return (
    <React.Fragment>
      <Typography variant="h6" className={classNames.mainTitle}>
        {t(TranslationKey['Active offers on the commodity exchange'])}
      </Typography>
      <Paper>
        <Tabs
          value={tabExchange}
          aria-label="label tabs"
          classes={{
            flexContainer: classNames.tabsHeadContainer,
            indicator: classNames.tabsIndicator,
          }}
          onChange={(e, newValue) => setTabExchange(newValue)}
        >
          <Tab
            className={cx(classNames.text, {
              [classNames.selected]: tabExchange === 0,
            })}
            index={0}
            label={t(TranslationKey['Buy products from this user'])}
          />
        </Tabs>
        <div className={classNames.tabContent} role="tabpanel" hidden={tabExchange !== 0}>
          <div className={classNames.offersWrapper}>{renderProductList}</div>
        </div>
      </Paper>
    </React.Fragment>
  )
}
