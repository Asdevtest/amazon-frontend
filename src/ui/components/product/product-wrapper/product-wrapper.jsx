import React from 'react'

import {observer} from 'mobx-react'

import {BottomCard} from './bottom-card'
import {TopCard} from './top-card'

export const ProductWrapper = observer(
  ({
    product,
    handleSupplierButtons,
    suppliers,
    selected,
    onClickSupplier,
    chipList,
    activeChip = null,
    setActiveChip = null,
    onChangeField,
  }) => (
    <>
      <TopCard
        chipList={chipList}
        activeChip={activeChip}
        setActiveChip={setActiveChip}
        product={product}
        selected={selected}
        suppliers={suppliers}
        onChangeField={onChangeField}
        onClick={handleSupplierButtons}
        onClickSupplier={onClickSupplier}
      />
      <BottomCard product={product} onChangeField={onChangeField} />
    </>
  ),
)
