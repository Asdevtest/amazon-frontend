import React, {useState} from 'react'

import {PRODUCT_INITIAL_PRODUCT, PRODUCT_INITIAL_SUPPLIERS, PRODUCT_EMPTY_SUPPLIERS} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import categoryImgBeautyAndPersonalCare from '@components/product/assets/beautyAndPersonalCare.jpg'
import categoryImgHealthHouseholdAndBabyCare from '@components/product/assets/healthHouseholdAndBabyCare.jpg'
import categoryImgHomeAndKitchen from '@components/product/assets/homeAndKitchen.jpg'
import categoryImgSportsAndOutdoors from '@components/product/assets/sportsAndOutdoors.jpg'
import categoryImgToysAndGames from '@components/product/assets/toysAndGames.jpg'
import {ModalContent} from '@components/product/modal-content'
import {ProductWrapper} from '@components/product/product-wrapper'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from './assets/clientAvatar.jpg'

const textConsts = getLocalizedTexts(texts, 'ru').productView

const PRODUCT_IMAGES = [
  categoryImgHomeAndKitchen,
  categoryImgSportsAndOutdoors,
  categoryImgToysAndGames,
  categoryImgHealthHouseholdAndBabyCare,
  categoryImgBeautyAndPersonalCare,
]

export const ClientProductView = () => {
  const [activeCategory, setCategory] = useState(null)
  const [activeSubCategory, setSubCategory] = useState(0)
  const [product, setProduct] = useState({...PRODUCT_INITIAL_PRODUCT, images: PRODUCT_IMAGES})
  const [suppliers, setSuppliers] = useState(PRODUCT_INITIAL_SUPPLIERS)
  const [selectedSupplier, setSelectedSupplier] = useState(0)
  const [modalAddSupplier, setModalAddSupplier] = useState(false)
  const [modalEditSupplier, setModalEditSupplier] = useState(false)

  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleSupplierButtons = action => {
    if (action === 'add') {
      setModalAddSupplier(true)
    } else if (action === 'edit') {
      setModalEditSupplier(true)
    } else {
      setSuppliers(suppliers.filter((supplier, index) => selectedSupplier !== index))
    }
  }

  return (
    <React.Fragment>
      <Navbar
        activeItem={activeCategory}
        activeSubItem={activeSubCategory}
        categoriesList={categoriesList.client}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        setItem={setCategory}
        setSubItem={setSubCategory}
        user={textConsts.appUser}
      />
      <Main>
        <Appbar
          avatarSrc={avatar}
          notificationCount={2}
          setDrawerOpen={setDrawerOpen}
          title={textConsts.appBarTitle}
          username={textConsts.appBarUsername}
        >
          <MainContent>
            <ProductWrapper
              handleSupplierButtons={handleSupplierButtons}
              product={product}
              selected={selectedSupplier}
              setProduct={setProduct}
              suppliers={suppliers}
              onClickSupplier={setSelectedSupplier}
            />
          </MainContent>
        </Appbar>
      </Main>
      <Modal openModal={modalAddSupplier} setOpenModal={setModalAddSupplier}>
        <ModalContent
          modeAddOrEdit={'add'}
          selected={selectedSupplier}
          setOpenModal={setModalAddSupplier}
          setSuppliers={setSuppliers}
          supplier={PRODUCT_EMPTY_SUPPLIERS}
          suppliers={suppliers}
          title={textConsts.addVendor}
        />
      </Modal>
      <Modal openModal={modalEditSupplier} setOpenModal={setModalEditSupplier}>
        <ModalContent
          modeAddOrEdit={'edit'}
          selected={selectedSupplier}
          setOpenModal={setModalEditSupplier}
          setSuppliers={setSuppliers}
          supplier={suppliers[selectedSupplier]}
          suppliers={suppliers}
          title={textConsts.editVendor}
        />
      </Modal>
    </React.Fragment>
  )
}
