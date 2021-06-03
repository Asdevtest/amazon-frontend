import React from 'react'

import {BottomCard} from './bottom-card'
import {TopCard} from './top-card'

export const ProductWrapper = ({
  product,
  setProduct,
  handleSupplierButtons,
  suppliers,
  selected,
  onClickSupplier,
  chipList,
  activeChip = null,
  setActiveChip = null,
}) => {
  const onChangeField = fieldName => e => {
    setProduct({...product, [fieldName]: e.target.value})
  }
  return (
    <React.Fragment>
      <TopCard
        chipList={chipList}
        activeChip={activeChip}
        setActiveChip={setActiveChip}
        product={product}
        selected={selected}
        setProduct={setProduct}
        suppliers={suppliers}
        onChangeField={onChangeField}
        onClick={handleSupplierButtons}
        onClickSupplier={onClickSupplier}
      />
      <BottomCard product={product} setProduct={setProduct} onChangeField={onChangeField} />
    </React.Fragment>
  )
}
