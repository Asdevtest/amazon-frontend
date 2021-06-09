import React from 'react'

import {observer} from 'mobx-react'

import {BottomCard} from './bottom-card'
import {TopCard} from './top-card'

export const ProductWrapper = observer(
  ({
    curUserRole,
    product,
    handleSupplierButtons,
    selectedSupplier,
    onClickSupplier,
    chipList,
    activeChip = null,
    setActiveChip = null,
    onChangeField,
    actionStatus,
    onClickParseAmazonBtn,
    onClickParseSellCenteralBtn,
  }) => (
    <>
      <TopCard
        curUserRole={curUserRole}
        chipList={chipList}
        activeChip={activeChip}
        setActiveChip={setActiveChip}
        product={product}
        selectedSupplier={selectedSupplier}
        actionStatus={actionStatus}
        onChangeField={onChangeField}
        onClick={handleSupplierButtons}
        onClickSupplier={onClickSupplier}
        onClickParseAmazonBtn={onClickParseAmazonBtn}
        onClickParseSellCenteralBtn={onClickParseSellCenteralBtn}
      />
      <BottomCard curUserRole={curUserRole} product={product} onChangeField={onChangeField} />
    </>
  ),
)
