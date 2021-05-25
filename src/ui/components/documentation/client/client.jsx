import React from 'react'

import {Box, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Section, SectionMain} from '@components/section-documentation'

import ClientExchangeExchange from './assets/client/ClientExchangeExchange.jpg'
import ClientExchangeExchangeUsernameClick from './assets/client/ClientExchangeExchangeUsernameClick.jpg'
import ClientExchangeMyRequests from './assets/client/ClientExchangeMyRequests.jpg'
import ClientExchangeMyRequestsCreateRequest from './assets/client/ClientExchangeMyRequestsCreateRequest.jpg'
import ClientExchangeMyRequestsEditRequest from './assets/client/ClientExchangeMyRequestsEditRequest.jpg'
import ClientExchangePrivateLabel from './assets/client/ClientExchangePrivateLabel.jpg'
import ClientInventory from './assets/client/ClientInventory.jpg'
import ClientInventoryCreateProduct from './assets/client/ClientInventoryCreateProduct.jpg'
import ClientInventoryProductToExchange from './assets/client/ClientInventoryProductToExchange.jpg'
import ClientInventoryToOrderProducts from './assets/client/ClientInventoryToOrderProducts.jpg'
import ClientMainPage from './assets/client/ClientMainPage.jpg'
import ClientMainPageInventory from './assets/client/ClientMainPageInventory.jpg'
import ClientOrders from './assets/client/ClientOrders.jpg'
import ClientOrdersSetBarcode from './assets/client/ClientOrdersSetBarcode.jpg'
import ClientProduct from './assets/client/ClientProduct.jpg'
import ClientProductCreateSupplier from './assets/client/ClientProductCreateSupplier.jpg'
import ClientProductEditSupplier from './assets/client/ClientProductEditSupplier.jpg'
import ClientUserMyProfile from './assets/client/ClientUserMyProfile.jpg'
import ClientUserMyProfilePrivateLabel from './assets/client/ClientUserMyProfilePrivateLabel.jpg'
import ClientUserMySubUsers from './assets/client/ClientUserMySubUsers.jpg'
import ClientUserMySubUsersCreate from './assets/client/ClientUserMySubUsersCreate.jpg'
import ClientUserMySubUsersEdit from './assets/client/ClientUserMySubUsersEdit.jpg'
import ClientUserMySubUsersPermission from './assets/client/ClientUserMySubUsersPermission.jpg'
import ClientWarehouse from './assets/client/ClientWarehouse.jpg'
import ClientWarehouseHistory from './assets/client/ClientWarehouseHistory.jpg'
import ClientWarehouseRedistribution from './assets/client/ClientWarehouseRedistribution.jpg'
import ClientWarehouseSendProduct from './assets/client/ClientWarehouseSendProduct.jpg'
import ClientWarehouseSetBarcode from './assets/client/ClientWarehouseSetBarcode.jpg'
import {useStyles} from './client.style'

export const Client = ({refs}) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Section>
        <SectionMain
          ref={refs.clientMainRef}
          img={ClientMainPage}
          link={'https://stoic-northcutt-f04ad5.netlify.app/dashboard'}
          title={texts.ru.clientComponent.mainPage}
        />

        <Typography className={classes.marginTop}>{texts.ru.clientComponent.nextPages}</Typography>
        <ul>
          <Typography component="li">{texts.ru.clientComponent.inventory}</Typography>
          <Typography component="li">{texts.ru.clientComponent.myOrders}</Typography>
          <Typography component="li">{texts.ru.clientComponent.marketOfGoods}</Typography>
        </ul>
        <Typography>{texts.ru.clientComponent.viewMore}</Typography>

        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientMainPageInventory} />
        </Box>
      </Section>

      <Section>
        <SectionMain
          ref={refs.clientExchangeExchangeRef}
          img={ClientExchangeExchange}
          link={'https://stoic-northcutt-f04ad5.netlify.app/exchange'}
          title={texts.ru.clientComponent.marketForks}
        />
        <Typography className={classes.marginTop}>{texts.ru.clientComponent.clickName}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientExchangeExchangeUsernameClick} />
        </Box>
      </Section>

      <Section>
        <SectionMain
          ref={refs.clientExchangePrivateLabelRef}
          img={ClientExchangePrivateLabel}
          link={'https://stoic-northcutt-f04ad5.netlify.app/exchange/private-label'}
          title={texts.ru.clientComponent.privateLabel}
        />
      </Section>

      <Section>
        <SectionMain
          ref={refs.clientExchangeMyRequestsRef}
          img={ClientExchangeMyRequests}
          link={'https://stoic-northcutt-f04ad5.netlify.app/exchange/my-requests'}
          title={texts.ru.clientComponent.marketGoodsMyOrders}
        />

        <Typography className={classes.marginTop}>{texts.ru.clientComponent.clickMakeOrder}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientExchangeMyRequestsCreateRequest} />
        </Box>

        <Typography className={classes.marginTop}>{texts.ru.clientComponent.clickEdit}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientExchangeMyRequestsEditRequest} />
        </Box>
      </Section>

      <Section>
        <SectionMain
          ref={refs.clientInventoryRef}
          img={ClientInventory}
          link={'https://stoic-northcutt-f04ad5.netlify.app/inventory'}
          title={texts.ru.clientComponent.clientInventory}
        />

        <Typography className={classes.marginTop}>{texts.ru.clientComponent.clickAddMyGood}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientInventoryCreateProduct} />
        </Box>

        <Typography className={classes.marginTop}>{texts.ru.clientComponent.clickExchange}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientInventoryProductToExchange} />
        </Box>

        <Typography className={classes.marginTop}>{texts.ru.clientComponent.clickMakeOrderModal}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientInventoryToOrderProducts} />
        </Box>
      </Section>

      <Section>
        <SectionMain
          ref={refs.clientOrdersRef}
          img={ClientOrders}
          link={'https://stoic-northcutt-f04ad5.netlify.app/orders'}
          title={texts.ru.clientComponent.clientMyOrders}
        />

        <Typography className={classes.marginTop}>{texts.ru.clientComponent.clickReallocate}</Typography>
        <Typography>{texts.ru.clientComponent.clickSetBarcode}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientOrdersSetBarcode} />
        </Box>
      </Section>

      <Section>
        <SectionMain
          ref={refs.clientWarehouseRef}
          img={ClientWarehouse}
          link={'https://stoic-northcutt-f04ad5.netlify.app/warehouse'}
          title={texts.ru.clientComponent.clientMyStore}
        />

        <Typography className={classes.marginTop}>{texts.ru.clientComponent.clickSendMyGood}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientWarehouseSendProduct} />
        </Box>

        <Typography className={classes.marginTop}>{texts.ru.clientComponent.clickSetBarcode}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientWarehouseSetBarcode} />
        </Box>

        <Typography className={classes.marginTop}>{texts.ru.clientComponent.clickPereReallocateModal}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientWarehouseRedistribution} />
        </Box>

        <Typography className={classes.marginTop}>{texts.ru.clientComponent.haveHistory}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientWarehouseHistory} />
        </Box>
      </Section>

      <Section>
        <SectionMain
          ref={refs.clientUsersMyProfileRef}
          img={ClientUserMyProfile}
          link={'https://stoic-northcutt-f04ad5.netlify.app/user'}
          title={texts.ru.clientComponent.clientUsersMyProfile}
        />

        <Typography className={classes.marginTop}>{texts.ru.clientComponent.clickExeModal}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientUserMyProfilePrivateLabel} />
        </Box>
      </Section>

      <Section>
        <SectionMain
          ref={refs.clientUsersMySubUsersRef}
          img={ClientUserMySubUsers}
          link={'https://stoic-northcutt-f04ad5.netlify.app/user/subusers'}
          title={texts.ru.clientComponent.clientUsersMyUsers}
        />

        <Typography className={classes.marginTop}>{texts.ru.clientComponent.clickAddUser}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientUserMySubUsersCreate} />
          <img alt="" className={classes.img} src={ClientUserMySubUsersPermission} />
        </Box>

        <Typography className={classes.marginTop}>{texts.ru.clientComponent.clickEditModal}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientUserMySubUsersEdit} />
        </Box>
      </Section>

      <Section>
        <SectionMain ref={refs.clientSettingsRef} title={texts.ru.clientComponent.clientSettings} />
      </Section>

      <Section>
        <SectionMain ref={refs.clientMessagesRef} title={texts.ru.clientComponent.clientMessages} />
      </Section>

      <Section>
        <SectionMain ref={refs.clientFinanceRef} title={texts.ru.clientComponent.clientFinances} />
      </Section>

      <Section>
        <SectionMain
          ref={refs.clientProductRef}
          img={ClientProduct}
          link={'https://stoic-northcutt-f04ad5.netlify.app/product'}
          title={texts.ru.clientComponent.clientProduct}
        />

        <Typography className={classes.marginTop}>{texts.ru.clientComponent.clickAddButton}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientProductCreateSupplier} />
        </Box>
        <Typography className={classes.marginTop}>{texts.ru.clientComponent.clickEditButton}</Typography>
        <Box mt={2.5} textAlign="center">
          <img alt="" className={classes.img} src={ClientProductEditSupplier} />
        </Box>
        <Typography className={classes.marginTop}>{texts.ru.clientComponent.clickDeleteButton}</Typography>
      </Section>
    </React.Fragment>
  )
}
