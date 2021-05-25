import {createContext, React, useState} from 'react'

import {Grid} from '@material-ui/core'

import {INVENTORY_CARD_LIST} from '@constants/mocks'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
//  import { InventoryTable } from '@components/inventory-table' ЖДЕМ ГОТОВЫЙ КОМПОНЕНТ ОТ Евгения
import {ContentCard} from '@components/content-card'
import {Main, MainTitle} from '@components/main'
import {Navbar} from '@components/navbar-documentation'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from './assets/clientAvatar.jpg'
import {useClassNames} from './inventory.style'

const DRAWER_WIDTH = 200

export const AlertUpdate = createContext({})

const textConsts = getLocalizedTexts(texts, 'en').iventoryView

export const Inventory = () => {
  const classNames = useClassNames()
  const [activeCategory, setCategory] = useState(2)
  const [activeSubCategory, setSubCategory] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [updateAlert, setUpdateAlert] = useState(false)
  const [successAlert, setSuccessAlert] = useState(false)
  const [currentAsin, setCurrentAsin] = useState(false)

  return (
    <React.Fragment>
      <AlertUpdate.Provider
        value={{
          updateAlert,
          setUpdateAlert,
          successAlert,
          setSuccessAlert,
          currentAsin,
          setCurrentAsin,
        }}
      >
        <Appbar
          avatarSrc={avatar}
          drawerWidth={DRAWER_WIDTH}
          notificationCount={2}
          setDrawerOpen={setDrawerOpen}
          title={textConsts.appBarTitle}
          username={textConsts.appBarUsername}
        >
          <Navbar
            activeItem={activeCategory}
            activeSubItem={activeSubCategory}
            drawerOpen={drawerOpen}
            drawerWidth={DRAWER_WIDTH}
            setDrawerOpen={setDrawerOpen}
            setItem={setCategory}
            setSubItem={setSubCategory}
            user={textConsts.appUser}
          />
          <Main drawerWidth={DRAWER_WIDTH}>
            <Grid container justify="center" spacing={1}>
              {INVENTORY_CARD_LIST.map((el, index) => (
                <Grid key={index} item>
                  <ContentCard count={el.count} timer={el.timer} title={el.label} />
                </Grid>
              ))}
            </Grid>
            <MainTitle className={classNames.mainTitle}>{textConsts.listOfGoods}</MainTitle>
            {/* ЖДЕМ ГОТОВЫЙ КОМПОНЕНТ ОТ Евгения <InventoryTable />*/}
          </Main>
        </Appbar>
      </AlertUpdate.Provider>
    </React.Fragment>
  )
}
