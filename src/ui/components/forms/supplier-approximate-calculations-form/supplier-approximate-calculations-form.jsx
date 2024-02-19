import { memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'

import { supplierWeightBasedApproximateCalculationsDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './supplier-approximate-calculations-form.style'

import { SupplierWeightBasedApproximateCalculationsFormColumns } from './supplier-weight-based-approximate-calculations-form-columns'

export const SupplierApproximateCalculationsForm = memo(props => {
  const { product, supplier, storekeepers, onClose, volumeWeightCoefficient /* , destinationData */ } = props
  const { classes: styles } = useStyles()

  const [curStorekeeper, setCurStorekeeper] = useState([])

  useEffect(() => {
    if (storekeepers.length > 0) {
      setCurStorekeeper(storekeepers.sort((a, b) => a.name.localeCompare(b.name))[0])
    }
  }, [storekeepers])

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Approximate calculation'])}</p>

      <CustomSwitcher
        fullWidth
        condition={curStorekeeper?._id}
        switcherSettings={[...storekeepers]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(storekeeper => ({
            label: () => storekeeper.name || '',
            value: storekeeper._id,
          }))}
        changeConditionHandler={value => setCurStorekeeper(storekeepers.find(storekeeper => storekeeper._id === value))}
      />

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
          columns={SupplierWeightBasedApproximateCalculationsFormColumns()}
          getRowHeight={() => 'auto'}
        />
      </div>

      <div className={styles.buttonsWrapper}>
        <Button styleType={ButtonType.DANGER} onClick={onClose}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
})
