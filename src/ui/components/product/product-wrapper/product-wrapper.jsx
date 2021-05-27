import React from 'react'

import {BottomCard} from './bottom-card'
import {TopCard} from './top-card'

export const ProductWrapper = ({product, setProduct, handleSupplierButtons, suppliers, selected, onClickSupplier}) => {
  const onChangeField = fieldName => e => {
    setProduct({...product, [fieldName]: e.target.value})
  }
  return (
    <React.Fragment>
      <TopCard
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
