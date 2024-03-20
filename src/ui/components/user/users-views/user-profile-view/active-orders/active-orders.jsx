import { Paper, Tab, Table, TableBody, TableContainer, TableHead, Tabs, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './active-orders.style'

import { ExchangeProductItem } from './exchange-product-item'

export const ActiveOrders = ({ tabExchange, setTabExchange, productList, handlerClickButtonPrivateLabel }) => {
  const { classes: styles, cx } = useStyles()

  const renderProductList =
    productList.length === 0 ? (
      <Typography className={(styles.text, styles.noActiveOffers)}>
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
    <>
      <Typography variant="h6" className={styles.mainTitle}>
        {t(TranslationKey['Active offers on the commodity exchange'])}
      </Typography>
      <Paper>
        <Tabs
          value={tabExchange}
          aria-label="label tabs"
          classes={{
            flexContainer: styles.tabsHeadContainer,
            indicator: styles.tabsIndicator,
          }}
          onChange={(e, newValue) => setTabExchange(newValue)}
        >
          <Tab
            className={cx(styles.text, {
              [styles.selected]: tabExchange === 0,
            })}
            index={0}
            label={t(TranslationKey['Buy products from this user'])}
          />
        </Tabs>
        <div className={styles.tabContent} role="tabpanel" hidden={tabExchange !== 0}>
          <div className={styles.offersWrapper}>{renderProductList}</div>
        </div>
      </Paper>
    </>
  )
}
