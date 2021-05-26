import React, {useState} from 'react'

import {PRODUCT_INITIAL_PRODUCT, PRODUCT_INITIAL_SUPPLIERS, PRODUCT_EMPTY_SUPPLIERS} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {ModalContent} from '@components/product/modal-content'
import {ProductWrapper} from '@components/product/product-wrapper'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from './assets/clientAvatar.jpg'

const textConsts = getLocalizedTexts(texts, 'ru').productView

const DRAWER_WIDTH = 200

export const ProductPage = () => {
  const [activeCategory, setCategory] = useState(null)
  const [activeSubCategory, setSubCategory] = useState(0)
  const [product, setProduct] = useState(PRODUCT_INITIAL_PRODUCT)
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
          categoriesList={categoriesList.client}
          drawerOpen={drawerOpen}
          drawerWidth={DRAWER_WIDTH}
          setDrawerOpen={setDrawerOpen}
          setItem={setCategory}
          setSubItem={setSubCategory}
          user={textConsts.appUser}
        />

        <Main drawerWidth={DRAWER_WIDTH}>
          <ProductWrapper
            handleSupplierButtons={handleSupplierButtons}
            onClickSupplier={setSelectedSupplier}
            product={product}
            selected={selectedSupplier}
            setProduct={setProduct}
            suppliers={suppliers}
          />
        </Main>
      </Appbar>
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
