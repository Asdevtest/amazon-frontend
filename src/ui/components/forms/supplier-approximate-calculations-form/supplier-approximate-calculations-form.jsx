import { observer } from 'mobx-react'
import { useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { Button } from '@components/shared/buttons/button'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { TabPanel } from '@components/shared/tab-panel'

import {
  supplierApproximateCalculationsDataConverter,
  supplierWeightBasedApproximateCalculationsDataConverter,
} from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

import { useClassNames } from './supplier-approximate-calculations-form.style'

import { supplierApproximateCalculationsFormColumns } from './supplier-approximate-calculations-form-columns'
import { SupplierWeightBasedApproximateCalculationsFormColumns } from './supplier-weight-based-approximate-calculations-form-columns/supplier-weight-based-approximate-calculations-form-columns.jsx'

const tabsValues = {
  WITHOUT_WEIGHT_LOGISTICS_TARIFF: 'WITHOUT_WEIGHT_LOGISTICS_TARIFF',
  WEIGHT_BASED_LOGISTICS_TARIFF: 'WEIGHT_BASED_LOGISTICS_TARIFF',
}

export const SupplierApproximateCalculationsForm = observer(
  ({ product, supplier, storekeepers, onClose, volumeWeightCoefficient, destinationData }) => {
    const { classes: classNames } = useClassNames()

    const [tabIndex, setTabIndex] = useState(tabsValues.WEIGHT_BASED_LOGISTICS_TARIFF)

    const [curStorekeeper, setCurStorekeeper] = useState(
      storekeepers.slice().sort((a, b) => a.name.localeCompare(b.name))[0],
    )

    return (
      <div className={classNames.root}>
        <Typography className={classNames.title}>{t(TranslationKey['Approximate calculation'])}</Typography>

        <div className={classNames.boxesFiltersWrapper}>
          <CustomSwitcher
            switchMode={'medium'}
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

        {SettingsModel.languageTag && (
          <CustomSwitcher
            switchMode={'medium'}
            condition={tabIndex}
            switcherSettings={[
              {
                label: () => t(TranslationKey['Weight-based logistics tariffs']) || '',
                value: tabsValues.WEIGHT_BASED_LOGISTICS_TARIFF,
              },
              {
                label: () => t(TranslationKey['Logistics tariffs']) || '',
                value: tabsValues.WITHOUT_WEIGHT_LOGISTICS_TARIFF,
              },
            ]}
            changeConditionHandler={value => setTabIndex(value)}
          />
        )}

        <TabPanel value={tabIndex} index={tabsValues.WEIGHT_BASED_LOGISTICS_TARIFF}>
          <div className={classNames.tableWrapper}>
            <MemoDataGrid
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
        </TabPanel>

        <TabPanel value={tabIndex} index={tabsValues.WITHOUT_WEIGHT_LOGISTICS_TARIFF}>
          <div className={classNames.tableWrapper}>
            <MemoDataGrid
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
        </TabPanel>

        <div className={classNames.clearBtnWrapper}>
          <Button danger onClick={onClose}>
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>
    )
  },
)
