/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { Typography } from '@mui/material'

import React, { useState } from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'

import { calcTotalFbaForProduct, roundSafely } from '@utils/calculation'
import { t } from '@utils/translations'

import { supplierApproximateCalculationsFormColumns } from './supplier-approximate-calculations-form-columns'
import { useClassNames } from './supplier-approximate-calculations-form.style'

const supplierApproximateCalculationsDataConverter = (tariffLogistics, product, supplier, volumeWeightCoefficient) => {
  const fInalWeightOfUnit =
    Math.max(
      roundSafely(
        (supplier.boxProperties?.boxLengthCm *
          supplier?.boxProperties?.boxWidthCm *
          supplier?.boxProperties?.boxHeightCm) /
          volumeWeightCoefficient,
      ) || 0,
      parseFloat(supplier?.boxProperties?.boxWeighGrossKg) || 0,
    ) / supplier.boxProperties.amountInBox

  return tariffLogistics.map((item, i) => {
    const costDeliveryToChina =
      (+supplier.price * (+supplier.amount || 0) + +supplier.batchDeliveryCostInDollar) / +supplier.amount

    const costDeliveryToUsa =
      costDeliveryToChina +
      Math.max(
        item.conditionsByRegion.central.rate,
        item.conditionsByRegion.east.rate,
        item.conditionsByRegion.west.rate,
      ) *
        fInalWeightOfUnit

    const roi = ((product.amazon - calcTotalFbaForProduct(product) - costDeliveryToUsa) / costDeliveryToUsa) * 100

    return {
      originalData: item,
      id: i,

      name: item.name,
      costDeliveryToChina,
      costDeliveryToUsa,
      roi,
    }
  })
}

export const SupplierApproximateCalculationsForm = observer(
  ({ product, supplier, storekeepers, onClose, volumeWeightCoefficient }) => {
    const { classes: classNames } = useClassNames()

    const [curStorekeeper, setCurStorekeeper] = useState(
      storekeepers.slice().sort((a, b) => a.name.localeCompare(b.name))[0],
    )

    return (
      <div className={classNames.root}>
        <Typography className={classNames.title}>{t(TranslationKey['Approximate calculation'])}</Typography>

        <div className={classNames.boxesFiltersWrapper}>
          {storekeepers
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(storekeeper => (
              <Button
                key={storekeeper._id}
                disabled={curStorekeeper?._id === storekeeper._id}
                className={cx(classNames.button, {
                  [classNames.selectedBoxesBtn]: curStorekeeper?._id === storekeeper._id,
                })}
                variant="text"
                onClick={() => setCurStorekeeper(storekeeper)}
              >
                {storekeeper.name}
              </Button>
            ))}
        </div>

        <div className={classNames.tableWrapper}>
          <MemoDataGrid
            hideFooter
            // sx={{
            //   border: 0,
            //   boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
            //   backgroundColor: theme.palette.background.general,
            // }}
            rows={
              curStorekeeper.tariffLogistics?.length
                ? supplierApproximateCalculationsDataConverter(
                    curStorekeeper.tariffLogistics,
                    product,
                    supplier,
                    volumeWeightCoefficient,
                  )
                : []
            }
            columns={supplierApproximateCalculationsFormColumns()}
            rowHeight={100}
          />
        </div>

        <div className={classNames.clearBtnWrapper}>
          <Button danger onClick={onClose}>
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>
    )
  },
)
