import React from 'react'

import {Box, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import FreelancerMainPage from '@components/documentation/freelancer/assets/freelancer/FreelancerMainPage.jpg'
import {Section, SectionMain} from '@components/section-documentation'

import BuyerBatches from './assets/buyer/BuyerBatches.jpg'
import BuyerMyProducts from './assets/buyer/BuyerMyProducts.jpg'
import BuyerOrdersFreeOrders from './assets/buyer/BuyerOrdersFreeOrders.jpg'
import BuyerOrdersMyOrders from './assets/buyer/BuyerOrdersMyOrders.jpg'
import BuyerProducts from './assets/buyer/BuyerProducts.jpg'
import BuyerWarehouse from './assets/buyer/BuyerWarehouse.jpg'
import BuyerWarehouseHistory from './assets/buyer/BuyerWarehouseHistory.jpg'
import BuyerWarehouseRedistribution from './assets/buyer/BuyerWarehouseRedistribution.jpg'
import BuyerWarehouseSendProduct from './assets/buyer/BuyerWarehouseSendProduct.jpg'
import BuyerWarehouseSetBarcode from './assets/buyer/BuyerWarehouseSetBarcode.jpg'
import {useStyles} from './buyer.style'

export const Buyer = ({refs}) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Section>
        <SectionMain
          img={BuyerProducts}
          link={'https://stoic-northcutt-f04ad5.netlify.app/buyer/products'}
          ref={refs.buyerProductsRef}
          title={texts.ru.buyerComponent.goods}
        />

        {/* <Typography className={classes.marginTop}>{`Возможно перейти на страницу "Мои заказы"`}</Typography>
        <Typography>{`Переход на другие страницы осуществляется путем нажатие кнопки "View more".`}</Typography>

        <Box mt={2.5} textAlign='center'>
          <img alt='' src={FreelancerMainPageRedirect} className={classes.img} />
        </Box> */}
      </Section>

      <Section>
        <SectionMain
          img={BuyerMyProducts}
          link={'https://stoic-northcutt-f04ad5.netlify.app/buyer/my-products'}
          ref={refs.buyerMyProductsRef}
          title={texts.ru.buyerComponent.myGoods}
        />
      </Section>

      <Section>
        <SectionMain
          img={BuyerOrdersMyOrders}
          link={'https://stoic-northcutt-f04ad5.netlify.app/buyer/orders/my-orders'}
          ref={refs.buyerOrdersMyOrdersRef}
          title={texts.ru.buyerComponent.myOrders}
        />
      </Section>

      <Section>
        <SectionMain
          img={BuyerOrdersFreeOrders}
          link={'https://stoic-northcutt-f04ad5.netlify.app/buyer/orders/free-orders'}
          ref={refs.buyerOrdersFreeOrdersRef}
          title={texts.ru.buyerComponent.freeOrders}
        />
      </Section>

      <Section>
        <SectionMain
          img={BuyerWarehouse}
          link={'https://stoic-northcutt-f04ad5.netlify.app/buyer/warehouse'}
          ref={refs.buyerWarehouseRef}
          title={texts.ru.buyerComponent.myStore}
        />

        <Typography className={classes.marginTop}>{texts.ru.buyerComponent.clickSend}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={BuyerWarehouseSendProduct} />
        </Box>

        <Typography className={classes.marginTop}>{texts.ru.buyerComponent.clickSetBarcode}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={BuyerWarehouseSetBarcode} />
        </Box>

        <Typography className={classes.marginTop}>{texts.ru.buyerComponent.clickReallocate}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={BuyerWarehouseRedistribution} />
        </Box>

        <Typography className={classes.marginTop}>{texts.ru.buyerComponent.haveHistory}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={BuyerWarehouseHistory} />
        </Box>
      </Section>

      <Section>
        <SectionMain
          img={BuyerBatches}
          link={'https://stoic-northcutt-f04ad5.netlify.app/buyer/batches'}
          ref={refs.buyerBatchesRef}
          title={texts.ru.buyerComponent.batchGoods}
        />
      </Section>

      <Section>
        <SectionMain
          img={FreelancerMainPage}
          link={'https://stoic-northcutt-f04ad5.netlify.app/buyer/user'}
          ref={refs.buyerUsersMyProfileRef}
          title={texts.ru.buyerComponent.myProfile}
        />
      </Section>

      <Section>
        <SectionMain
          img={FreelancerMainPage}
          link={'https://stoic-northcutt-f04ad5.netlify.app/buyer/subusers'}
          ref={refs.buyerUsersMySubUsersRef}
          title={texts.ru.buyerComponent.myUsers}
        />
      </Section>
    </React.Fragment>
  )
}
