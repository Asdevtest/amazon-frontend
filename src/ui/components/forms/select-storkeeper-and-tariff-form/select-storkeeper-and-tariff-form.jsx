import { cx } from '@emotion/css'
import {
  Box,
  Tabs,
  /* Tab, */
} from '@mui/material'

import React, { useState } from 'react'

import { toJS } from 'mobx'
import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { ITab } from '@components/shared/i-tab/i-tab'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { SearchInput } from '@components/shared/search-input'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

import { logisticsTariffsColumns, warehouseTariffsColumns } from './select-storkeeper-and-tariff-form-columns'
import { useClassNames } from './select-storkeeper-and-tariff-form.style'
import { TotalTariffsColumns } from './total-storkeeper-and-tariff-form-columns'
import { TotalStorkeeperAndWeightBasedTariffFormColumns } from './total-storkeeper-and-weight-based-tariff-form-columns'
import { WeightBasedTariffFormColumns } from './weight-based-tariff-form-columns'

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box paddingTop={3}>{children}</Box>}
  </div>
)

export const SelectStorekeeperAndTariffForm = observer(
  ({
    showCheckbox,
    storekeepers,
    curStorekeeperId,
    curTariffId,
    onSubmit,
    inNotifications,
    total,
    currentVariationTariffId,
    currentDestinationId,
  }) => {
    const { classes: classNames } = useClassNames()

    const [tabIndex, setTabIndex] = React.useState(0)

    const [nameSearchValue, setNameSearchValue] = useState('')

    const filterByNameSearch = data => {
      if (nameSearchValue) {
        return toJS(data).filter(el => el.name.toLowerCase().includes(nameSearchValue.toLowerCase()))
      } else {
        return toJS(data)
      }
    }

    const [curStorekeeper, setCurStorekeeper] = useState(
      curStorekeeperId
        ? storekeepers.find(el => el._id === curStorekeeperId)
        : storekeepers.slice().sort((a, b) => a.name?.localeCompare(b?.name))[0],
    )

    const [variationTariffId, setVariationTariffId] = useState(currentVariationTariffId)
    const [destinationId, setDestinationId] = useState(currentDestinationId)

    const setVariationTariff = (variationId, destinationId) => {
      if (variationTariffId === variationId) {
        setVariationTariffId(null)
        setDestinationId(null)
      } else {
        setVariationTariffId(variationId)
        setDestinationId(destinationId)
      }
    }

    const onClickSelectTariff = tariffId => onSubmit(curStorekeeper._id, tariffId, variationTariffId, destinationId)

    const onClickSelectTariffOld = (tariffId, variationTariffId) =>
      onSubmit(curStorekeeper._id, tariffId, variationTariffId, destinationId)

    const getRowClassName = params => curTariffId === params.row._id && classNames.attentionRow

    return (
      <div className={classNames.root}>
        <div className={classNames.boxesFiltersWrapper}>
          {storekeepers
            .slice()
            .sort((a, b) => a.name?.localeCompare(b?.name))
            .map(storekeeper => (
              <Button
                key={storekeeper._id}
                btnWrapperStyle={classNames.btnWrapperStyle}
                disabled={curStorekeeper?._id === storekeeper._id}
                className={cx(
                  classNames.button,
                  {
                    [classNames.selectedBoxesBtn]: curStorekeeper?._id === storekeeper._id,
                  },
                  {
                    [classNames.selectedStorekeeperBtn]: curStorekeeperId === storekeeper._id,
                  },
                )}
                variant="text"
                onClick={() => setCurStorekeeper(storekeeper)}
              >
                {storekeeper.name}
              </Button>
            ))}
        </div>

        <SearchInput
          inputClasses={classNames.searchInput}
          value={nameSearchValue}
          placeholder={t(TranslationKey.search)}
          onChange={e => setNameSearchValue(e.target.value)}
        />

        <Tabs
          variant={'fullWidth'}
          classes={{
            root: classNames.row,
            indicator: classNames.indicator,
          }}
          value={tabIndex}
          onChange={(e, index) => setTabIndex(index)}
        >
          <ITab label={t(TranslationKey['Weight-based logistics tariffs'])} />
          <ITab label={t(TranslationKey['Logistics tariffs'])} />
          <ITab label={t(TranslationKey['Tariffs of warehouse services'])} />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <div className={classNames.tableWrapper}>
            <MemoDataGrid
              hideFooter
              getRowClassName={getRowClassName}
              rows={
                curStorekeeper?.tariffLogistics?.length
                  ? filterByNameSearch(
                      addIdDataConverter(curStorekeeper.tariffLogistics)
                        .filter(item => item.tariffType === 20)
                        .sort((a, b) => {
                          const aHasMatch = a?.destinationVariations?.some(obj => obj?._id === currentVariationTariffId)
                          const bHasMatch = b?.destinationVariations?.some(obj => obj?._id === currentVariationTariffId)

                          if (aHasMatch && !bHasMatch) {
                            return -1
                          } else if (!aHasMatch && bHasMatch) {
                            return 1
                          } else {
                            return 0
                          }
                        }),
                    )
                  : []
              }
              columns={
                total
                  ? TotalStorkeeperAndWeightBasedTariffFormColumns()
                  : WeightBasedTariffFormColumns(
                      showCheckbox,
                      variationTariffId,
                      currentDestinationId,
                      onClickSelectTariff,
                      setVariationTariff,
                    )
              }
              getRowHeight={() => 'auto'}
            />
          </div>
          {!inNotifications ? (
            <div className={classNames.clearBtnWrapper}>
              <Button
                disableElevation
                color="primary"
                variant={'outlined'}
                className={classNames.resetBtn}
                onClick={() => {
                  setVariationTariffId(null)
                  onSubmit(null, null, null)
                }}
              >
                {t(TranslationKey.reset)}
              </Button>
            </div>
          ) : null}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <div className={classNames.tableWrapper}>
            <MemoDataGrid
              hideFooter
              getRowClassName={getRowClassName}
              rows={
                curStorekeeper?.tariffLogistics?.length
                  ? filterByNameSearch(
                      addIdDataConverter(curStorekeeper.tariffLogistics).filter(item => item.tariffType !== 20),
                    )
                  : []
              }
              columns={total ? TotalTariffsColumns() : logisticsTariffsColumns({ onClickSelectTariffOld })}
              getRowHeight={() => 'auto'}
            />
          </div>
          {!inNotifications ? (
            <div className={classNames.clearBtnWrapper}>
              <Button
                disableElevation
                color="primary"
                variant={'outlined'}
                className={classNames.resetBtn}
                onClick={() => {
                  setVariationTariffId(null)
                  onSubmit(null, null, null)
                }}
              >
                {t(TranslationKey.reset)}
              </Button>
            </div>
          ) : null}
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <div className={classNames.tableWrapper}>
            <MemoDataGrid
              hideFooter
              rows={
                curStorekeeper?.tariffWarehouses?.length
                  ? filterByNameSearch(addIdDataConverter(curStorekeeper.tariffWarehouses))
                  : []
              }
              columns={warehouseTariffsColumns()}
              rowHeight={100}
            />
          </div>
        </TabPanel>
      </div>
    )
  },
)
