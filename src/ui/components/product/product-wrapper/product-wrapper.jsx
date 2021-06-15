import React from 'react'

import {observer} from 'mobx-react'

import {BottomCard} from './bottom-card'
import {TopCard} from './top-card'

export const ProductWrapper = observer(
  ({
    curUserRole,
    product,
    suppliers,
    handleSupplierButtons,
    selectedSupplier,
    onClickSupplier,
    onClickSetProductStatusBtn,
    onChangeField,
    actionStatus,
    handleProductActionButtons,
    onClickParseProductData,
  }) => (
    <>
      <TopCard
        curUserRole={curUserRole}
        product={product}
        suppliers={suppliers}
        selectedSupplier={selectedSupplier}
        actionStatus={actionStatus}
        handleProductActionButtons={handleProductActionButtons}
        onChangeField={onChangeField}
        onClickSetProductStatusBtn={onClickSetProductStatusBtn}
        onClickSupplierBtns={handleSupplierButtons}
        onClickSupplier={onClickSupplier}
        onClickParseProductData={onClickParseProductData}
      />
      <BottomCard curUserRole={curUserRole} product={product} onChangeField={onChangeField} />
    </>
  ),
)
