import { memo, useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'

import { supplierWeightBasedApproximateCalculationsDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

import { useStyles } from './supplier-approximate-calculations-form.style'

import { SupplierWeightBasedApproximateCalculationsFormColumns } from './supplier-weight-based-approximate-calculations-form-columns/supplier-weight-based-approximate-calculations-form-columns.jsx'

export const SupplierApproximateCalculationsForm = memo(
  ({ product, supplier, storekeepers, onClose, volumeWeightCoefficient, destinationData }) => {
    const { classes: styles } = useStyles()

    const [curStorekeeper, setCurStorekeeper] = useState(
      storekeepers.slice().sort((a, b) => a.name.localeCompare(b.name))[0],
    )

    return (
      <div className={styles.root}>
        <Typography className={styles.title}>{t(TranslationKey['Approximate calculation'])}</Typography>

        <div className={styles.boxesFiltersWrapper}>
          <CustomSwitcher
            fullWidth
            switchMode={'small'}
            condition={curStorekeeper?._id}
            switcherSettings={[...storekeepers]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(storekeeper => ({
                label: () => storekeeper.name || '',
                value: storekeeper._id,
              }))}
            changeConditionHandler={value => {
              setCurStorekeeper(storekeepers.find(storekeeper => storekeeper._id === value))
            }}
          />
        </div>

        <div className={styles.tableWrapper}>
          <CustomDataGrid
            rows={
              curStorekeeper.tariffLogistics?.length
                ? supplierWeightBasedApproximateCalculationsDataConverter(
                    curStorekeeper.tariffLogistics,
                    product,
                    supplier,
                    volumeWeightCoefficient,
                  )
                : []
            }
            columns={SupplierWeightBasedApproximateCalculationsFormColumns(destinationData)}
            getRowHeight={() => 'auto'}
          />
        </div>

        <div className={styles.clearBtnWrapper}>
          <Button danger onClick={onClose}>
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>
    )
  },
)
