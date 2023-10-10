import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useState } from 'react'

import { Tabs, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { Button } from '@components/shared/buttons/button'
import { ITab } from '@components/shared/i-tab'
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

    const [tabIndex, setTabIndex] = React.useState(tabsValues.WEIGHT_BASED_LOGISTICS_TARIFF)

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

        {SettingsModel.languageTag && (
          <Tabs
            variant={'fullWidth'}
            classes={{
              root: classNames.tabsRoot,
              indicator: classNames.indicator,
            }}
            value={tabIndex}
            onChange={(e, index) => setTabIndex(index)}
          >
            <ITab
              label={t(TranslationKey['Weight-based logistics tariffs'])}
              value={tabsValues.WEIGHT_BASED_LOGISTICS_TARIFF}
            />
            <ITab label={t(TranslationKey['Logistics tariffs'])} value={tabsValues.WITHOUT_WEIGHT_LOGISTICS_TARIFF} />
          </Tabs>
        )}

        <TabPanel value={tabIndex} index={tabsValues.WEIGHT_BASED_LOGISTICS_TARIFF}>
          <div className={classNames.tableWrapper}>
            <MemoDataGrid
              hideFooter
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
              hideFooter
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
