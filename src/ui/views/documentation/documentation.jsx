import React, {useRef, useState} from 'react'

import {Divider, Link, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Anchor} from '@components/anchor'
import {Buyer} from '@components/documentation/buyer'
import {Client} from '@components/documentation/client'
import {Freelancer} from '@components/documentation/freelancer'
import {Offset} from '@components/documentation/offset/offset'
import {Supervisor} from '@components/documentation/supervisor/supervisor'
import {Main} from '@components/main'
import {Navbar} from '@components/navbar-documentation'

import {Appbar} from '../../components/appbar'
import Auth from './assets/Auth.jpg'
import Register from './assets/Register.jpg'
import {useStyles} from './documentation.style'

const DRAWER_WIDTH = 200

const onHistory = () => {
  /*	!!item.route && history.push(item.route);*/
}

export const Documentation = () => {
  const classes = useStyles()
  const [activeCategory, setCategory] = useState(null) // category Биржа товаров
  const [activeSubCategory, setSubCategory] = useState(0) // subCategory
  const [drawerOpen, setDrawerOpen] = useState(false)

  const clientMainRef = useRef(null)
  const clientExchangeExchangeRef = useRef(null)
  const clientExchangePrivateLabelRef = useRef(null)
  const clientExchangeMyRequestsRef = useRef(null)
  const clientInventoryRef = useRef(null)
  const clientOrdersRef = useRef(null)
  const clientWarehouseRef = useRef(null)
  const clientUsersMyProfileRef = useRef(null)
  const clientUsersMySubUsersRef = useRef(null)
  const clientSettingsRef = useRef(null)
  const clientMessagesRef = useRef(null)
  const clientFinanceRef = useRef(null)
  const clientProductRef = useRef(null)

  const freelancerMainRef = useRef(null)
  const freelancerOrdersRef = useRef(null)
  const freelancerSettingsRef = useRef(null)

  const supervisorMainRef = useRef(null)
  const supervisorReadyToCheckRef = useRef(null)
  const supervisorProductsRef = useRef(null)
  const supervisorSettingsRef = useRef(null)

  const buyerProductsRef = useRef(null)
  const buyerMyProductsRef = useRef(null)
  const buyerOrdersMyOrdersRef = useRef(null)
  const buyerOrdersFreeOrdersRef = useRef(null)
  const buyerWarehouseRef = useRef(null)
  const buyerBatchesRef = useRef(null)
  const buyerUsersMyProfileRef = useRef(null)
  const buyerUsersMySubUsersRef = useRef(null)

  const authRef = useRef(null)
  const registerRef = useRef(null)

  const refs = {
    clientMainRef,
    clientExchangeExchangeRef,
    clientExchangePrivateLabelRef,
    clientExchangeMyRequestsRef,
    clientInventoryRef,
    clientOrdersRef,
    clientWarehouseRef,
    clientUsersMyProfileRef,
    clientUsersMySubUsersRef,
    clientSettingsRef,
    clientMessagesRef,
    clientFinanceRef,
    clientProductRef,
    freelancerMainRef,
    freelancerOrdersRef,
    freelancerSettingsRef,
    supervisorMainRef,
    supervisorReadyToCheckRef,
    supervisorProductsRef,
    supervisorSettingsRef,
    buyerProductsRef,
    buyerMyProductsRef,
    buyerOrdersMyOrdersRef,
    buyerOrdersFreeOrdersRef,
    buyerWarehouseRef,
    buyerBatchesRef,
    buyerUsersMyProfileRef,
    buyerUsersMySubUsersRef,
    authRef,
    registerRef,
  }

  return (
    <React.Fragment>
      <Appbar
        drawerWidth={DRAWER_WIDTH}
        notificationCount={2}
        // avatarSrc={avatar}
        onHistory={onHistory}
        setDrawerOpen={setDrawerOpen}
        title={texts.en.documentationView.appBarTitle}
        username={texts.en.documentationView.appBarUserName}
      >
        <Navbar
          activeItem={activeCategory}
          activeSubItem={activeSubCategory}
          drawerOpen={drawerOpen}
          drawerWidth={DRAWER_WIDTH}
          refs={refs}
          setDrawerOpen={setDrawerOpen}
          setItem={setCategory}
          setSubItem={setSubCategory}
        />
        <Main drawerWidth={DRAWER_WIDTH}>
          <div className={classes.mainWrapper}>
            <Typography variant="h3">{texts.en.documentationView.mainTitle}</Typography>
            <Divider className={classes.dividerL} />
            <div className={classes.updateWrapper}>
              <Typography>{texts.en.documentationView.mainCreated}</Typography>
              <Typography>{`Last update: ${texts.en.documentationView.mainLastUpdate}`}</Typography>
            </div>
            <Offset />

            <Client refs={refs} />

            <Freelancer refs={refs} />

            <Supervisor refs={refs} />

            <Buyer refs={refs} />
            <React.Fragment>
              <Anchor ref={authRef}>
                <Typography variant="h4">{texts.en.documentationView.authTitle}</Typography>
              </Anchor>
              <Link href="https://stoic-northcutt-f04ad5.netlify.app/auth" target="_blank">
                {texts.en.documentationView.authLink}
              </Link>
              <Divider className={classes.dividerM} />
              <Typography>{texts.en.documentationView.authDescription}</Typography>
              <div className={classes.imgWrapper}>
                <img alt="" className={classes.img} src={Auth} />
              </div>
              <Offset />
            </React.Fragment>
            <React.Fragment>
              <Anchor ref={registerRef}>
                <Typography variant="h4">{texts.en.documentationView.registerTitle}</Typography>
              </Anchor>
              <Link href="https://stoic-northcutt-f04ad5.netlify.app/register" target="_blank">
                {texts.en.documentationView.registerLink}
              </Link>
              <Divider className={classes.dividerM} />
              <Typography>{texts.en.documentationView.registerDescription}</Typography>
              <div className={classes.imgWrapper}>
                <img alt="" className={classes.img} src={Register} />
              </div>
              <Offset />
            </React.Fragment>
          </div>
        </Main>
      </Appbar>
    </React.Fragment>
  )
}
