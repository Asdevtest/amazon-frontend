import React from 'react'

import {Tab, Tabs, Typography, Table, TableBody, TableHead, TableContainer, Paper} from '@material-ui/core'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './active-orders.style'
import {ExchangeProductItem} from './exchange-product-item'

const textConsts = getLocalizedTexts(texts, 'ru').buyerUserActiveOrders

export const ActiveOrders = ({tabExchange, setTabExchange, productList, handlerClickButtonPrivateLabel}) => {
  const classNames = useClassNames()

  const renderProductList =
    productList.length === 0 ? (
      <Typography className={(classNames.text, classNames.noActiveOffers)}>{textConsts.noActiveOffers}</Typography>
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
        {textConsts.mainTitle}
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
            className={clsx(classNames.text, {
              [classNames.selected]: tabExchange === 0,
            })}
            index={0}
            label={textConsts.buyGoodsOfUser}
          />
        </Tabs>
        <div className={classNames.tabContent} role="tabpanel" hidden={tabExchange !== 0}>
          <div className={classNames.offersWrapper}>{renderProductList}</div>
        </div>
      </Paper>
    </React.Fragment>
  )
}
